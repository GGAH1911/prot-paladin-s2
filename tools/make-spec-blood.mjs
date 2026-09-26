// 사용법: node tools/make-spec-blood.mjs audits/research/blood-research.json audits/research/blood-bosses.json
// 조사 결과(blood-research.json, blood-bosses.json)로 data/spec/death-knight-blood(.guide).json 을 만든다
import fs from 'node:fs';
import path from 'node:path';
const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..') + '/';
const R = JSON.parse(fs.readFileSync(process.argv[2] || 'blood-research.json', 'utf8'));
const B = JSON.parse(fs.readFileSync(process.argv[3] || 'blood-bosses.json', 'utf8'));
const EN = id => R.spells[id].en, KO = id => R.spells[id].ko;

// 12.1 Wowhead 쐐기 빌드 두 개(Deathbringer·San'layn) 모두 고르지 않은 기술은 가이드에서 뺀다(특성 계산기 확인 2026-09-26)
const DROP = new Set([48743, 1263824]); // Death Pact, Consumption
const FIX = {
  48792: '받는 피해 30% 감소 8초, 기절 면역. 방어도를 무시하는 공격과 마법 피해에 모두 통한다',
  48707: '5초 동안 마법 피해 흡수, 해로운 마법 효과 적용 방지. 쐐기 빌드의 Anti-Magic Barrier로 쿨 40초',
  55233: '최대 생명력 30%·받는 치유와 흡수 30% 증가 10초. 큰 물리 탱버에 맞춘다',
  49028: '8초 동안 무막 30%, 공격 복제. 폭딜과 방어를 겸하는 핵심 쿨기',
  391477: 'Death Strike를 쓸 때마다 Blood Plague 피해 증가, 최대 4중첩 15초. Death Strike를 꾸준히 쓰면 유지된다',
  441378: 'Reaper\'s Mark가 터진 뒤 다음 Marrowrend 2번이 룬 1개로 줄고 낫 공격이 붙는다. Bone Shield도 함께 채운다',
  219786: 'Bone Shield 5중첩 이상이면 Death Strike 비용 5 감소, 최대 룬 마력 10 증가',
  433925: 'San\'layn 전용. Haste 증가 버프, 최대 5중첩 20초. Dancing Rune Weapon 구간에 쌓는다',
};
const cards = [], idx = {};
for (const c of R.guide.cards) {
  if (DROP.has(c.id)) continue;
  idx[c.id] = cards.length;
  cards.push({ id: c.id, name: c.name, desc: FIX[c.id] || c.desc, badges: c.badges });
}
const ci = ids => ids.filter(id => !DROP.has(id)).map(id => { if (!(id in idx)) throw new Error('card ' + id); return idx[id]; });
const T = R.guide.tiers;
const upkeepHtml = hero => {
  const txt = R.guide.upkeep.text.filter((t, i) => i !== 2 || true).map(t => t.replace(/\s*\(게임 메뉴 이름은 보호 성기사 가이드 기준\. 혈기 전용 확인은 안 함\)/, '').replace(/\(Wowhead 로테이션 'Bone Shield Management'\)/, ''));
  return `<p class="bnote" style="margin:12px 0 6px">${txt[0]}</p>\n    <p class="bnote" style="margin:0 0 6px">${txt[1]}</p>\n    <p class="bnote" style="margin:0 0 6px">${hero === 'sanlayn' ? 'San\'layn은 Bone Shield를 자동으로 채워 주는 수단이 없어 관리가 가장 어렵습니다. 막대로 띄워 두세요.' : 'Deathbringer는 Reaper\'s Mark 폭발로 얻는 Exterminate가 Marrowrend를 싸게 만들어 Bone Shield 관리 부담이 적습니다.'}</p>\n    <ol class="howto">\n      <li>ESC → Options → Gameplay Enhancements → <b>Advanced Cooldown Settings</b> → <b>Buffs</b> 탭에서 Bone Shield와 Death and Decay를 <b>Tracked Bars</b> 칸으로 옮기기. Tracked Buffs 칸에 두면 막대에 시간이 안 나옵니다.</li>\n      <li><b>Bone Shield</b> 막대는 <b>Stack Based Bar</b>를 켜고 <b>+ Add Threshold</b>로 5중첩에 기준선을 두기. 5 아래로 내려가면 Marrowrend 신호입니다.</li>\n    </ol>`;
};
const star = '<span class="star" title="Wowhead 추천">★</span>';
const buildsHtml = hero => {
  const b = R.builds[hero], L = { raid: '레이드', mplus: '쐐기 (Mythic+)', delve: '델브' };
  const rows = ['raid', 'mplus', 'delve'].map(k => `    <div class="build-row"><div class="bname">${L[k]}${b.star[k] ? star : ''}</div><input class="bcode" readonly value="${b[k]}" aria-label="${L[k]} 특성 코드"><button class="bcopy" type="button">복사</button><a class="blink" href="https://www.wowhead.com/talent-calc/blizzard/${b[k]}" target="_blank" rel="noopener">트리 보기</a></div>`).join('\n');
  return `<p class="bnote">게임에서 특성 창(N) → 위쪽 빌드 목록 드롭다운 → <b>Import</b> → 붙여넣기. ★ = Wowhead 추천.</p>\n${rows}\n    <p class="bnote" style="margin:10px 0 0">이 가이드의 기술 카드는 쐐기 빌드 기준입니다. Wowhead는 쐐기에서 두 영웅 특성을 모두 추천하고, 운영이 쉬운 Deathbringer를 특히 권합니다.</p>`;
};
const heroes = {};
for (const h of ['deathbringer', 'sanlayn']) {
  const add = R.guide.heroes[h];
  const secs = [];
  secs.push({ title: T[0].title, cards: ci([...T[0].cards, ...add.tier1Add]) });
  secs.push({ title: T[1].title, groups: T[1].groups.map(g => ({ title: g.title === '회복 / 디스펠' ? '회복' : g.title, cards: ci(g.cards) })).filter(g => g.cards.length) });
  secs.push({ title: T[2].title, cards: ci(T[2].cards) });
  secs.push({ title: T[3].title, cards: ci(T[3].cards) });
  secs.push({ id: 'upkeep', title: T[4].title, note: '트래킹 바로 띄워서 보기', cards: ci([...T[4].cards, ...add.upkeepAdd]), html: upkeepHtml(h) });
  secs.push({ id: 'builds', title: '특성 빌드 코드', note: `Wowhead 기준 (${R.builds.updated} 갱신, 12.1)`, html: buildsHtml(h) });
  heroes[h] = { subtitle: `${h === 'sanlayn' ? "San'layn" : 'Deathbringer'} 빌드`, sections: secs, koExtra: { 'Runic Power': '룬 마력', "San'layn": '산레인', Deathbringer: '죽음의 인도자', Options: '설정', 'Gameplay Enhancements': '게임플레이 향상', 'Advanced Cooldown Settings': '고급 재사용 대기시간 설정', Buffs: '강화 효과', 'Tracked Bars': '추적 막대', 'Tracked Buffs': '추적 강화 효과', Import: '가져오기', 'Mythic+': '신화+', 'Stack Based Bar': 'Stack Based Bar', parry: '무기 막기' } };
}
// 보호 성기사 가이드 koExtra 의 게임 메뉴 번역을 그대로 쓴다(같은 메뉴)
const prot = JSON.parse(fs.readFileSync(SITE + 'data/spec/paladin-protection.guide.json', 'utf8'));
for (const h of Object.keys(heroes)) for (const k of ['Options', 'Gameplay Enhancements', 'Advanced Cooldown Settings', 'Buffs', 'Tracked Bars', 'Tracked Buffs', 'Import', 'Mythic+', 'parry']) {
  const v = prot.heroes.lightsmith.koExtra[k] ?? prot.heroes.templar.koExtra[k]; if (v) heroes[h].koExtra[k] = v; else delete heroes[h].koExtra[k];
}
delete heroes.deathbringer.koExtra['Stack Based Bar']; delete heroes.sanlayn.koExtra['Stack Based Bar'];

const spells = {}, spellsKo = {}, tips = {};
for (const [id, v] of Object.entries(R.spells)) {
  if (DROP.has(+id)) continue;
  spells[id] = v.en; spellsKo[id] = v.ko; tips[v.en.n.toLowerCase().replace(/[’]/g, "'")] = id;
}
const A = n => `<span class="ab">${n}</span>`;
const general = {
  name: '공통', sub: '키트 요약 · 위에서 Hero talent 선택',
  bosses: [
    { n: 'Deathbringer 운영', k: 'Hero', hero: 'deathbringer', i: [
      ['tip', `${A("Reaper's Mark")}(45초)를 쿨마다 쓰고, 폭발 뒤 ${A('Exterminate')}로 강화된 ${A('Marrowrend')} 2번을 쓴다`],
      ['tb', `거의 상시 받는 피해 7.5% 감소가 붙고 ${A('Blood Plague')} 치유가 두 배라 방어가 안정적이다`],
      ['tip', `${A('Exterminate')}가 ${A('Bone Shield')}를 채워 줘서 뼈 관리 부담이 적다`],
      ['tip', `딜은 San'layn보다 낮지만 운영이 쉽다. Wowhead는 쐐기에 특히 좋은 선택으로 평가한다`]] },
    { n: "San'layn 운영", k: 'Hero', hero: 'sanlayn', i: [
      ['tip', `${A('Dancing Rune Weapon')}이 폭딜의 중심이다. 쿨마다 쓰고 그동안 ${A('Essence of the Blood Queen')}을 쌓는다`],
      ['tb', `${A('Bone Shield')}를 자동으로 채워 주는 수단이 없다. 추적 막대를 띄우고 5중첩 아래로 떨어지지 않게 ${A('Marrowrend')}를 쓴다`],
      ['tip', `대상이 오래 사는 풀과 5~8마리 지속 전투에서 딜이 크게 앞선다`],
      ['tip', `운영이 까다로워 Wowhead는 쐐기에서 '가혹하다(punishing)'고 평가한다. 익숙하지 않으면 Deathbringer`]] },
    { n: '생존기 쿨타임', k: 'CD', i: [
      ['tb', `${A('Bone Shield')} · ${A('Marrowrend')}로 생성, 30초 · 5중첩 이상 유지 (${A('Ossuary')})`],
      ['tb', `${A('Death Strike')} · 룬 마력 45 · 지난 5초 동안 받은 피해에 비례해 회복, 혈기 방어의 핵심`],
      ['tb', `${A('Vampiric Blood')} · 1분 30초 · 최대 생명력과 받는 치유 30% 증가 10초`],
      ['tb', `${A('Icebound Fortitude')} · 2분 · 받는 피해 30% 감소 8초, 기절 면역`],
      ['tb', `${A('Dancing Rune Weapon')} · 2분 · 무막 30% 8초`],
      ['tb', `${A('Anti-Magic Shell')} · 1분 (Anti-Magic Barrier로 40초) · 마법 피해 흡수 5초, 해로운 마법 효과 방지`],
      ['tb', `${A('Purgatory')} · 4분에 한 번 · 죽을 피해를 막고 3초 동안 그만큼 치유를 흡수, 흡수가 남으면 사망 (패시브)`],
      ['tip', `${A('Anti-Magic Zone')} · 4분 · 파티 마법 피해 15% 감소 6초`],
      ['tip', `${A('Lichborne')} · 2분 · 매혹·공포·수면 면역 10초`],
      ['tip', `${A("Death's Advance")} · 45초 · 이동 속도 증가, 밀쳐내기 면역 10초`]] },
    { n: '해제 담당표', k: 'Dispel', block: 'dispel' },
    { n: '매크로', k: 'Macro', block: 'macros' },
    { n: '생존·유틸', k: 'Kit', i: [
      ['tb', `${A('Death Strike')}는 맞은 직후에 써야 회복량이 크다. 큰 탱버엔 ${A('Vampiric Blood')}/${A('Icebound Fortitude')}`],
      ['int', `${A('Mind Freeze')} 15초 원거리 차단. 보조로 ${A('Death Grip')}(시전 끊기), ${A('Asphyxiate')}, ${A('Blinding Sleet')}`],
      ['pos', `흩어진 일반몹은 ${A("Gorefiend's Grasp")}로 모으고 3초 침묵. 자신에게 쓰지 말 것 (Icy Veins)`],
      ['disp', `혈기는 해제 기술이 없다. 독·질병·마법·저주는 해제 가능한 파티원에게 맡긴다`],
      ['tip', `마법 광역 피해엔 ${A('Anti-Magic Zone')}, 전투 부활은 ${A('Raise Ally')}`]] },
    { n: '어픽스', k: 'Affix', i: [
      ['tip', `Devour 주간: 보호막은 받은 치유로 지워진다. 내 보호막은 ${A('Death Strike')} 회복으로 지운다`],
      ['int', `Ascendant 주간: 오브는 ${A('Blinding Sleet')}, ${A("Gorefiend's Grasp")}로 한꺼번에, 단일은 ${A('Mind Freeze')}/${A('Asphyxiate')}`],
      ['pos', `Pulsar 주간: 오브를 받으러 갈 때 ${A("Death's Advance")}, ${A('Death and Decay')} 안에서 싸우기`],
      ['tip', `12단 이상 Xal'atath's Guile: 죽을 때마다 15초 감소`]] },
  ],
};
const macros = R.macros.map(([t, d, c]) => [t, d, c]);
const spec = {
  id: 'death-knight/blood', updated: '2026-09-27', patch: '12.1.0',
  note: '혈기 보스별 대응 문장은 던전별 혈기 전용 공략이 없어, Wowhead·Icy Veins 혈기 가이드의 일반 원칙(물리 탱버는 Bone Shield·Death Strike·Vampiric Blood, 마법 피해는 Anti-Magic Shell)을 각 기믹에 적용해 썼습니다. 기믹의 피해 종류는 게임 툴팁으로 확인했습니다.',
  sources: [
    { t: 'Icy Veins Blood DK M+ Tips', u: 'https://www.icy-veins.com/wow/blood-death-knight-pve-tank-mythic-plus-tips', after: 0 },
    { t: 'Wowhead Blood DK M+ Tips', u: 'https://www.wowhead.com/guide/classes/death-knight/blood/mythic-plus-dungeon-tips', after: 1 },
  ],
  answers: B.answers,
  kit: { dispel: {} },
  general, macros,
  macroNote: 'ESC → 매크로 → 새로 만들기 후 붙여넣기. 기술명은 위 게임 언어(한글/English) 설정을 따릅니다.',
  heroCards: {
    deathbringer: { title: 'Deathbringer 포인트', items: [['tip', "{Reaper's Mark}는 큰 일반몹 풀과 보스 폭딜 구간에 맞추고, 폭발 뒤 {Exterminate} 강화 {Marrowrend}를 쓴다"], ['tb', '큰 탱버엔 {Vampiric Blood}·{Icebound Fortitude}를 나눠 배정: {busters}']] },
    sanlayn: { title: "San'layn 포인트", items: [['tb', '{Bone Shield} 5중첩을 확인하고 받을 탱버: {busters}'], ['tip', '{Dancing Rune Weapon}은 큰 일반몹 풀과 보스 폭딜 구간에 맞춰 {Essence of the Blood Queen}을 쌓는다']] },
  },
  detail: {},
  tips, spells, spellsKo,
  names: { 'Runic Power': '룬 마력', "San'layn": '산레인', Deathbringer: '죽음의 인도자' },
};
const detailObj = {}; for (const [k, v] of Object.entries(B.bosses)) { const i = k.indexOf('/'); (detailObj[k.slice(0, i)] ||= {})[k.slice(i + 1)] = v; }
spec.detail = detailObj;
fs.writeFileSync(SITE + 'data/spec/death-knight-blood.json', JSON.stringify(spec) + '\n');
fs.writeFileSync(SITE + 'data/spec/death-knight-blood.guide.json', JSON.stringify({ cards, heroes, en: {}, ko: Object.fromEntries(Object.entries(spellsKo).map(([id, v]) => [id, { n: v.n, m: v.m, d: v.d }])) }) + '\n');
// 로스터: 준비 완료 + 기본 영웅
const RO = JSON.parse(fs.readFileSync(SITE + 'data/roster.json', 'utf8'));
const dk = RO.classes.find(c => c.slug === 'death-knight').specs.find(s => s.slug === 'blood');
dk.status = 'ready'; dk.defaultHero = 'deathbringer'; dk.defaultHeroSource = 'Wowhead 특성 빌드 쐐기 ★는 두 영웅 모두. 본문이 쐐기에 Deathbringer를 권함 (2026-09-21)';
fs.writeFileSync(SITE + 'data/roster.json', JSON.stringify(RO) + '\n');
console.log('cards', cards.length, 'spells', Object.keys(spells).length, 'detail bosses', Object.values(detailObj).reduce((a, x) => a + Object.keys(x).length, 0));
