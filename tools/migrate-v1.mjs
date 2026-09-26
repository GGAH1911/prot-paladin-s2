// 0단계 1회용 이전 스크립트: 옛 단일 파일(index.html + guides/*.html)의 데이터를 층별 JSON으로 옮긴다.
// 사용법: node tools/migrate-v1.mjs <옛 index.html> <옛 guides 폴더> <design/roster.json> <spec-icons.json>
// 결과: data/roster.json, data/core/*.json, data/role/*.json, data/spec/paladin-protection.json
// 화면에 보이는 글자는 바꾸지 않는다. 문장 끝 "→ SotR" 같은 전문화 문구만 메커니즘 키로 떼어 낸다.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const [oldIndex, oldGuides, rosterSrc, iconSrc] = process.argv.slice(2);
const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'data');
const w = (p, o) => { fs.mkdirSync(path.dirname(path.join(OUT, p)), { recursive: true }); fs.writeFileSync(path.join(OUT, p), JSON.stringify(o) + '\n'); };

// ---- 옛 데이터 실행 ----
const L = fs.readFileSync(oldIndex, 'utf8').split('\n');
const s = L.findIndex(l => l.startsWith('const TAGS=')), e = L.findIndex(l => l.startsWith('const NPC_RE='));
const O = vm.runInNewContext(L.slice(s, e).join('\n') + '\n;({TAGS,M,RIO,TRASH,D,BRIEF,DETAIL,TIPMAP,SPELLS,SPELLS_KO,KO_NAMES,MOBS})',
  { document: { addEventListener() {}, getElementById() { return {}; } } });

// ---- 메커니즘 키: 문장 끝 대응 문구를 떼어 낸다 ----
// 규칙은 모두 실제 문장에서 뽑았다(렌더링 기준 27곳). 결과는 [태그, 앞부분, {m, sep?, post?}] 이고,
// 화면에서는 앞부분 + sep(기본 " → ") + 전문화 답 + post 로 다시 합친다.
const AB = n => `<span class="ab">${n}</span>`;
const RULES = [
  { re: / → SotR \+ 생존기(.*)$/, m: 'tankbuster.major' },
  { re: / → SotR 유지(.*)$/, m: 'tankbuster.hold' },
  { re: / → SotR(.*)$/, m: 'tankbuster' },
  { re: new RegExp(` → ${AB('Cleanse Toxins').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(.*)$`), m: 'dispel.poison' },
  { re: new RegExp(` → ${AB('Blessing of Freedom').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(.*)$`), m: 'freedom' },
  // 문장 중간 2곳
  { re: / SotR 유지(.*)$/, m: 'tankbuster.hold', sep: ' ' },
  { re: new RegExp(`은 ${AB('Blessing of Freedom').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(.*)$`), m: 'freedom', sep: '은 ' },
];
let converted = 0;
const mech = ([t, x]) => {
  for (const r of RULES) {
    const mm = x.match(r.re);
    if (!mm) continue;
    converted++;
    const o = { m: r.m };
    if (r.sep) o.sep = r.sep;
    if (mm[1]) o.post = mm[1];
    return [t, x.slice(0, mm.index), o];
  }
  return [t, x];
};
const answersProt = {
  tankbuster: 'SotR', 'tankbuster.major': 'SotR + 생존기', 'tankbuster.hold': 'SotR 유지',
  'dispel.poison': '{Cleanse Toxins}', 'dispel.disease': '{Cleanse Toxins}', freedom: '{Blessing of Freedom}',
};

// ---- 던전 공용 층 ----
const dungeons = O.D.slice(1).map(d => ({
  id: d.id, name: d.name, sub: d.sub, ...(d.time ? { time: d.time } : {}),
  // k:"Trash" 항목은 옛 화면에서도 그리지 않았으므로 옮기지 않는다
  bosses: d.bosses.filter(b => b.k !== 'Trash').map(b => ({ n: b.n, k: b.k, ...(b.t ? { t: b.t } : {}), i: b.i.map(mech) })),
}));
const trash = Object.fromEntries(Object.entries(O.TRASH).map(([id, gs]) => [id, gs.map(g => ({ n: g.n, i: g.i.map(mech) }))]));
const detail = {}, tankDetail = {}, specDetail = {};
for (const [did, bs] of Object.entries(O.DETAIL)) for (const [bn, x] of Object.entries(bs)) {
  (detail[did] ||= {})[bn] = { ...(x.overview ? { overview: x.overview } : {}), phases: x.phases || [], group: x.group || [] };
  if (x.tank?.length) (tankDetail[did] ||= {})[bn] = x.tank;
  if (x.prot?.length) (specDetail[did] ||= {})[bn] = x.prot;
}

// ---- 툴팁 매핑: 공통 탭(general) 매핑은 전문화 층으로. 던전 매핑은 그대로 둔다 ----
const specTips = { ...O.TIPMAP.general };
const commonTips = {};
// 해제 담당표는 공용 층으로 가므로 거기서 쓰는 Remove Curse 툴팁은 공용 매핑에 둔다
for (const k of ['remove curse']) { commonTips[k] = specTips[k]; delete specTips[k]; }
const dungeonTips = Object.fromEntries(Object.entries(O.TIPMAP).filter(([k]) => k !== 'general'));
const dungeonIds = new Set(Object.values(dungeonTips).flatMap(m => Object.values(m)).concat(Object.values(commonTips)));
const specOnly = new Set(Object.values(specTips).filter(id => !dungeonIds.has(id)));

// ---- 가이드 ----
const guideSrc = h => fs.readFileSync(path.join(oldGuides, `${h}.html`), 'utf8');
const guideData = {};
const cardPool = {};
const cardKey = c => `${c.id}:${c.desc}:${c.badges.map(b => b.cls + b.text).join('|')}`;
let gEN = {}, gKO = {};
for (const h of ['templar', 'lightsmith']) {
  const src = guideSrc(h);
  const lines = src.split('\n');
  const ev = n => vm.runInNewContext(lines.find(l => l.startsWith(`const ${n}=`)) + `;${n}`, {});
  const hEN = ev('G_EN'), hKO = ev('G_KO'), hExtra = ev('KO_EXTRA');
  for (const id in hKO) if (gKO[id] && JSON.stringify(gKO[id]) !== JSON.stringify(hKO[id])) throw new Error('guide ko differs ' + id);
  Object.assign(gEN, hEN); Object.assign(gKO, hKO);
  const body = src.slice(src.indexOf('<div class="tier">'), src.indexOf('<script>'));
  const tiers = body.split(/<div class="tier"(?: id="([a-z]+)")?>/).slice(1);
  const sections = [];
  for (let i = 0; i < tiers.length; i += 2) {
    const id = tiers[i] || null, t = tiers[i + 1];
    const head = t.match(/<div class="tier-header">(.*?)<\/div>/)[1];
    const hm = head.match(/^(.*?)(?: <span class="count">(.*)<\/span>)?$/);
    const parseCards = chunk => [...chunk.matchAll(/<div class="skill-card">\s*<div class="icon-slot"><a href="https:\/\/www\.wowhead\.com\/spell=(\d+)"><\/a><\/div>\s*<div class="info"><div class="name">(.*?)<\/div><div class="desc">(.*?)<\/div><\/div>\s*<\/div>/g)]
      .map(([, id, nm, desc]) => {
        const badges = [...nm.matchAll(/<span class="badge ([a-z]+)">(.*?)<\/span>/g)].map(([, cls, text]) => ({ cls, text }));
        const c = { id: +id, name: nm.replace(/<span class="badge.*$/, ''), desc, badges };
        const k = cardKey(c); if (!cardPool[k]) cardPool[k] = c;
        return Object.keys(cardPool).indexOf(k);
      });
    const sec = { ...(id ? { id } : {}), title: hm[1], ...(hm[2] ? { note: hm[2] } : {}) };
    const subs = t.split('<div class="subcat">').slice(1);
    if (subs.length) sec.groups = subs.map(sc => ({ title: sc.match(/<div class="subcat-title">(.*?)<\/div>/)[1], cards: parseCards(sc) }));
    else sec.cards = parseCards(t);
    // 카드 격자 밖의 설명 문단(유지 버프 안내, 빌드 코드 표)은 HTML 그대로 둔다
    if (id === 'builds') {
      sec.html = t.slice(t.indexOf('<div class="tier-body">') + 23, t.lastIndexOf('</div>', t.lastIndexOf('</div>') - 1)).trim();
      delete sec.cards;
    } else {
      const after = t.split('</div>\n    <p').slice(1).join('</div>\n    <p');
      if (after) sec.html = ('<p' + after).replace(/\s*<\/div>\s*<\/div>\s*$/, '').trim();
    }
    sections.push(sec);
  }
  guideData[h] = { subtitle: src.match(/<div class="subtitle">(.*?)<\/div>/)[1], sections, koExtra: hExtra };
}
const cards = Object.values(cardPool);

// ---- 기술 툴팁 나누기 ----
const specSpellIds = new Set([...specOnly, ...Object.keys(gEN)]);
const coreSpells = {}, coreSpellsKo = {}, specSpells = {}, specSpellsKo = {};
for (const id of Object.keys(O.SPELLS)) {
  if (specOnly.has(id)) { specSpells[id] = O.SPELLS[id]; if (O.SPELLS_KO[id]) specSpellsKo[id] = O.SPELLS_KO[id]; }
  else { coreSpells[id] = O.SPELLS[id]; if (O.SPELLS_KO[id]) coreSpellsKo[id] = O.SPELLS_KO[id]; }
}
for (const id of Object.keys(gEN)) {
  if (O.SPELLS[id] && JSON.stringify(O.SPELLS[id]) !== JSON.stringify(gEN[id])) throw new Error('spell text differs ' + id);
}

// ---- 한글 이름 나누기: 전문화 기술 이름·전문화 용어는 전문화 층, 나머지는 공용 ----
const specTerms = new Set(['Holy Power', 'Templar', 'Lightsmith', 'SotR', 'Rite of Sanctification', 'Essence']);
Object.values(specSpells).forEach(x => specTerms.add(x.n));
const coreNames = {}, specNames = {};
for (const [k, v] of Object.entries(O.KO_NAMES)) (specTerms.has(k) ? specNames : coreNames)[k] = v;

// ---- 공통 탭(전문화 층) ----
const gen = O.D[0];
const general = {
  name: gen.name, sub: gen.sub,
  bosses: gen.bosses.map(b => b.html ? { n: b.n, k: b.k, block: b.k === 'Dispel' ? 'dispel' : 'macros' } : { n: b.n, k: b.k, ...(b.hero ? { hero: b.hero } : {}), i: b.i }),
};

// ---- 로스터 ----
const R = JSON.parse(fs.readFileSync(rosterSrc, 'utf8'));
const ICON = JSON.parse(fs.readFileSync(iconSrc, 'utf8'));
const INK = { WARRIOR: ['#906538', '#C69B6D'], PALADIN: ['#D7156B', '#F48CBA'], HUNTER: ['#557725', '#AAD372'], ROGUE: ['#776F00', '#FFF468'], PRIEST: ['#707070', '#FFFFFF'], DEATHKNIGHT: ['#C41E3A', '#E44F69'], SHAMAN: ['#006DD8', '#0282FF'], MAGE: ['#107A96', '#3FC7EB'], WARLOCK: ['#5A5CE8', '#8788EE'], MONK: ['#007F4C', '#00FF98'], DRUID: ['#B25300', '#FF7C0A'], DEMONHUNTER: ['#A330C9', '#BA5ED8'], EVOKER: ['#2B7C6B', '#33937F'] };
const roster = {
  meta: { ...R.meta, icons: 'ChrSpecialization.SpellIconFileID → https://www.wowhead.com/icon=<id> (2026-09-26)' },
  roles: { tank: { ko: '탱커', en: 'Tank' }, healer: { ko: '힐러', en: 'Healer' }, dps: { ko: '딜러', en: 'DPS' } },
  classes: R.classes.map(c => ({
    slug: c.slug, token: c.token, en: c.en, ko: c.ko, color: c.color, ink: INK[c.token],
    specs: c.specs.map(sp => {
      const id = `${c.slug}/${sp.slug}`;
      const ready = id === 'paladin/protection';
      return {
        slug: sp.slug, en: sp.en, ko: sp.ko, enFull: sp.enFull, koFull: sp.koFull, role: sp.role, icon: ICON[id].icon,
        status: ready ? 'ready' : 'soon',
        heroes: sp.heroTalents.map(h => ({ slug: h.slug, en: h.en, ko: h.ko })),
        // 새 사용자 기본 영웅: Wowhead 쐐기 추천(★). 확인한 전문화만 채우고, 없으면 첫 영웅을 쓴다
        ...(ready ? { defaultHero: 'lightsmith', defaultHeroSource: 'Wowhead 특성 빌드 쐐기 ★ (2026-09-14)' } : {}),
      };
    }),
  })),
};

// ---- 쓰기 ----
w('roster.json', roster);
w('core/dungeons.json', {
  dungeons, trash, detail, rio: O.RIO, tips: dungeonTips, commonTips,
  generalVideo: { href: 'https://www.youtube.com/watch?v=a3dZhEYU6Mc', label: '▶ Dalaran Gaming S2 가이드' },
  sources: [
    { t: 'Icy Veins S2 던전 가이드', u: 'https://www.icy-veins.com/wow/midnight-mythic-season-2-guide' },
    { t: 'Wowhead S2 Overview', u: 'https://www.wowhead.com/guide/midnight/mythic-plus-season-overview' },
    { t: 'Raider.IO Quick Boss Guides', u: 'https://raider.io/news' },
    { t: 'Method 던전 가이드', u: 'https://www.method.gg/guides/dungeons' },
  ],
  dispel: {
    rows: [
      { type: 'poison', label: '독', cls: 'disp', who: '드루이드, 수도사, 기원사', whoAll: '성기사(보호·징벌), 드루이드, 수도사, 기원사', owner: '해제 가능한 파티원' },
      { type: 'disease', label: '질병', cls: 'disp', who: '수도사, 사제', whoAll: '성기사(보호·징벌), 수도사, 사제', owner: '해제 가능한 파티원' },
      { type: 'curse', label: '저주', cls: 'int', whoAll: '마법사 {Remove Curse}, 드루이드, 주술사', owner: '딜러' },
      { type: 'magic', label: '마법', cls: 'pos', whoAll: '힐러 대부분 (사제, 신성 성기사, 회복 드루이드, 운무 수도사, 복원 주술사, 보존 기원사)', owner: '힐러' },
      { type: 'bleed', label: '출혈', cls: 'tb', whoAll: '성기사 {Blessing of Protection} (탱커 자신 금지)', owner: '급할 때' },
    ],
    note: '드루이드·수도사 등은 전문화에 따라 풀 수 있는 종류가 달라요. 게임 툴팁으로 확인하세요.',
  },
});
w('core/spells.en.json', coreSpells);
w('core/spells.ko.json', coreSpellsKo);
w('core/names.ko.json', coreNames);
w('core/npcs.json', O.MOBS);
const TAGS = { tb: '탱버', int: '차단', dodge: '회피', disp: '해제', pos: '위치', tip: '참고', aoe: '광역 피해', prio: '우선 처치', cc: '제어' };
w('role/tank.json', {
  role: 'tank', label: '탱커 운영', tags: TAGS, order: ['tb', 'int', 'pos', 'dodge', 'disp', 'cc', 'aoe', 'prio', 'tip'], off: [],
  answers: { tankbuster: '생존기', 'tankbuster.major': '큰 생존기', 'tankbuster.hold': '방어 버프 유지', 'dispel.poison': '독 해제 담당', 'dispel.disease': '질병 해제 담당', freedom: '이동 방해 해제' },
  detail: tankDetail,
});
w('role/healer.json', {
  role: 'healer', label: '힐러 운영', tags: TAGS, order: ['aoe', 'disp', 'tb', 'dodge', 'int', 'pos', 'tip', 'prio', 'cc'], off: ['prio', 'cc'],
  answers: { tankbuster: '탱커 치유 준비', 'tankbuster.major': '탱커 외부 생존기', 'tankbuster.hold': '탱커 치유 준비', 'dispel.poison': '독 해제 담당', 'dispel.disease': '질병 해제 담당', freedom: '이동 방해 해제' },
  detail: {},
});
w('role/dps.json', {
  role: 'dps', label: '딜러 운영', tags: TAGS, order: ['int', 'prio', 'cc', 'dodge', 'aoe', 'disp', 'pos', 'tip', 'tb'], off: ['tb'],
  answers: { 'dispel.poison': '독 해제 담당', 'dispel.disease': '질병 해제 담당', freedom: '이동 방해 해제' },
  detail: {},
});
// 가이드 데이터는 생성 스크립트만 쓰므로 치트시트가 받는 파일과 나눈다
const guideOnlyIds = Object.keys(gEN).filter(id => !coreSpells[id] && !specSpells[id]);
w('spec/paladin-protection.guide.json', {
  cards, heroes: guideData,
  en: Object.fromEntries(guideOnlyIds.map(id => [id, gEN[id]])),
  // 가이드 한글 툴팁은 옛 가이드 값(G_KO)을 그대로 쓴다
  ko: Object.fromEntries(Object.entries(gKO).map(([id, v]) => [id, { n: v.n, m: v.m, d: v.d }])),
  pdf: { templar: 'files/prot-guide-templar-a4.pdf', lightsmith: 'files/prot-guide-lightsmith-a4.pdf' },
});
w('spec/paladin-protection.json', {
  id: 'paladin/protection', updated: '2026-09-26', patch: '12.1.0',
  // 옛 꼬리말의 출처 순서를 지키려고 공용 출처 목록에서 끼워 넣을 위치(after)를 둔다
  sources: [{ t: 'Icy Veins Prot Paladin M+ Tips', u: 'https://www.icy-veins.com/wow/protection-paladin-pve-tank-mythic-plus-tips', after: 0 }],
  answers: answersProt,
  kit: { dispel: { poison: 'Cleanse Toxins', disease: 'Cleanse Toxins' } },
  general,
  macros: O.M,
  macroNote: 'ESC → 매크로 → 새로 만들기 후 붙여넣기. 기술명은 위 게임 언어(한글/English) 설정을 따릅니다.',
  heroCards: {
    templar: { title: 'Templar 포인트', items: [['tip', '{Divine Toll} → {Hammer of Light}는 큰 일반몹 풀과 쫄 단계에 맞추기'], ['tb', '폭딜 중에도 SotR 유지. 주요 탱버: {busters}']] },
    lightsmith: { title: 'Lightsmith 포인트', items: [['tb', '{Holy Bulwark} 자신에게 쓸 타이밍: {busters}'], ['tip', '쫄·광역 피해 구간엔 {Holy Bulwark}를 힐러나 약한 아군에게'], ['tip', '{Sacred Weapon}은 큰 일반몹 풀과 쫄 단계에 맞추기']] },
  },
  detail: specDetail,
  tips: specTips,
  spells: specSpells, spellsKo: specSpellsKo, names: specNames,
});
console.log(JSON.stringify({ converted, dungeons: dungeons.length, cards: cards.length, coreSpells: Object.keys(coreSpells).length, specSpells: Object.keys(specSpells).length, coreNames: Object.keys(coreNames).length, specNames: Object.keys(specNames).length, sections: Object.fromEntries(Object.entries(guideData).map(([h, g]) => [h, g.sections.map(s => `${s.title}:${s.cards ? s.cards.length : s.groups ? s.groups.map(x => x.cards.length).join('+') : 'html'}${s.html ? '+html' : ''}`)])) }, null, 1));
