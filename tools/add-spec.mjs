// 조사 폴더(spec.json, guide.json, roster-patch.json)를 사이트 데이터로 옮기고 검사한다.
// 사용법: node tools/add-spec.mjs <폴더> [--check]   (--check 는 검사만 하고 쓰지 않는다)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [dir, flag] = process.argv.slice(2);
const rd = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const S = rd(path.join(dir, 'spec.json')), G = rd(path.join(dir, 'guide.json'));
const P = fs.existsSync(path.join(dir, 'roster-patch.json')) ? rd(path.join(dir, 'roster-patch.json')) : {};
const core = rd(path.join(ROOT, 'data/core/dungeons.json'));
const coreEn = rd(path.join(ROOT, 'data/core/spells.en.json'));
const R = rd(path.join(ROOT, 'data/roster.json'));
const [cls, sp] = S.id.split('/');
const rs = R.classes.find(c => c.slug === cls)?.specs.find(s => s.slug === sp);
const errs = [], warns = [];
if (!rs) errs.push('roster에 없는 전문화 ' + S.id);

const need = ['id', 'answers', 'kit', 'general', 'heroCards', 'detail', 'tips', 'spells', 'spellsKo', 'names', 'sources'];
need.forEach(k => { if (!(k in S)) errs.push('spec.json 키 없음: ' + k); });

// 보스 28개 키
const want = new Set(Object.entries(core.detail).flatMap(([d, bs]) => Object.keys(bs).map(b => `${d}/${b}`)));
const got = new Set(Object.entries(S.detail || {}).flatMap(([d, bs]) => Object.keys(bs).map(b => `${d}/${b}`)));
[...want].filter(k => !got.has(k)).forEach(k => errs.push('보스 문장 없음: ' + k));
[...got].filter(k => !want.has(k)).forEach(k => errs.push('모르는 보스 키: ' + k));
const TAGRE = /^\[(탱버|차단|회피|해제|위치|참고)\]\s/;
Object.entries(S.detail || {}).forEach(([d, bs]) => Object.entries(bs).forEach(([b, arr]) => arr.forEach(l => { if (!TAGRE.test(l)) errs.push(`태그 없는 문장 ${d}/${b}: ${l}`); })));

// 이름 → 툴팁 연결
const norm = s => s.replace(/\s*\([^)]*\)\s*$/, '').replace(/[’]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
const known = new Set([...Object.keys(S.tips || {}), ...Object.values(core.tips).flatMap(m => Object.keys(m)), ...Object.keys(core.commonTips)]);
const checkName = (n, where) => { if (!known.has(norm(n))) warns.push(`툴팁 없는 기술 이름(${where}): ${n}`); };
for (const [k, id] of Object.entries(S.tips || {})) if (!S.spells[id] && !coreEn[id]) errs.push(`tips 의 ${k} → ${id} 툴팁 데이터 없음`);
for (const b of S.general?.bosses || []) for (const [, h] of b.i || []) for (const m of h.matchAll(/<span class="ab">([^<]+)<\/span>/g)) checkName(m[1], '공통 탭 ' + b.n);
for (const [h, hc] of Object.entries(S.heroCards || {})) {
  if (rs && !rs.heroes.some(x => x.slug === h)) errs.push('모르는 영웅 ' + h);
  for (const [, t] of hc.items) for (const m of t.matchAll(/\{([^{}]+)\}/g)) if (m[1] !== 'busters') checkName(m[1], 'heroCards ' + h);
}
for (const [k, v] of Object.entries(S.answers || {})) for (const m of String(v).matchAll(/\{([^{}]+)\}/g)) checkName(m[1], 'answers ' + k);
for (const b of S.general?.bosses || []) if (b.hero && rs && !rs.heroes.some(x => x.slug === b.hero)) errs.push('공통 탭 모르는 영웅 ' + b.hero);
if (rs) rs.heroes.forEach(h => { if (!S.heroCards?.[h.slug]) errs.push('heroCards 없음 ' + h.slug); if (!G.heroes?.[h.slug]) errs.push('가이드 없음 ' + h.slug); });
for (const [id, v] of Object.entries(S.spells || {})) { if (!v.n || !v.i) errs.push('spells 형식 ' + id); if (!S.spellsKo[id]) warns.push('한글 툴팁 없음 ' + id + ' ' + v.n); }
for (const [id, v] of Object.entries(S.spellsKo || {})) if (/\|\d/.test(v.d || '') || /\|\d/.test(v.m || '')) errs.push('한글 조사 기호 남음 ' + id);
if (S.general?.bosses?.some(b => b.block === 'macros') && !(S.macros?.length)) errs.push('매크로 블록이 있는데 macros 없음');

// 가이드
(G.cards || []).forEach((c, i) => { if (!S.spells[c.id] && !coreEn[c.id] && !G.en?.[c.id]) errs.push(`가이드 카드 ${i} ${c.name}(${c.id}) 툴팁 없음`); });
for (const [h, g] of Object.entries(G.heroes || {})) {
  const ids = g.sections.flatMap(s => [...(s.cards || []), ...(s.groups || []).flatMap(x => x.cards)]);
  ids.forEach(i => { if (!G.cards[i]) errs.push(`가이드 ${h} 카드 번호 ${i} 없음`); });
  const b = g.sections.find(s => s.id === 'builds');
  if (!b || (b.html.match(/class="bcode"/g) || []).length < 3) errs.push(`가이드 ${h} 빌드 코드 3개 아님`);
  if (!g.sections.find(s => s.id === 'upkeep')) warns.push(`가이드 ${h} 유지 버프 구획 없음`);
}
if (P.defaultHero && rs && !rs.heroes.some(x => x.slug === P.defaultHero)) errs.push('defaultHero 가 영웅 목록에 없음');

console.log(`${S.id}: 보스 ${got.size}/28, 문장 ${[...Object.values(S.detail || {})].reduce((a, x) => a + Object.values(x).reduce((p, q) => p + q.length, 0), 0)}, 기술 ${Object.keys(S.spells || {}).length}, 카드 ${(G.cards || []).length}, 해제 ${JSON.stringify(S.kit?.dispel)}, 기본 영웅 ${P.defaultHero}`);
warns.forEach(w => console.log('  경고', w));
errs.forEach(e => console.log('  오류', e));
if (errs.length) process.exit(1);
if (flag === '--check') process.exit(0);
const base = S.id.replace('/', '-');
fs.writeFileSync(path.join(ROOT, `data/spec/${base}.json`), JSON.stringify(S) + '\n');
fs.writeFileSync(path.join(ROOT, `data/spec/${base}.guide.json`), JSON.stringify(G) + '\n');
rs.status = 'ready';
if (P.defaultHero) { rs.defaultHero = P.defaultHero; rs.defaultHeroSource = P.defaultHeroSource; }
fs.writeFileSync(path.join(ROOT, 'data/roster.json'), JSON.stringify(R) + '\n');
fs.mkdirSync(path.join(ROOT, 'audits/research'), { recursive: true });
if (fs.existsSync(path.join(dir, 'report.md'))) fs.copyFileSync(path.join(dir, 'report.md'), path.join(ROOT, `audits/stage1-${base}.md`));
console.log('  → data/spec 에 썼습니다');
