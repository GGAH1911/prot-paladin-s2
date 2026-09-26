// 사용법: node lint-tt.mjs <폴더...>  — spells/spellsKo 설명에 남은 요구 조건 표시·다른 전문화 머리글·[전문화: a / b] 갈래를 찾는다
import fs from 'node:fs';
const R = JSON.parse(fs.readFileSync('/Users/insung/.aside/u/0/prot-paladin-s2/data/roster.json', 'utf8'));
const NAMES = [...new Set(R.classes.flatMap(c => c.specs.flatMap(s => [s.en, s.ko])))];
const esc = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const HEAD = new RegExp('^(?:' + NAMES.map(esc).join('|') + ')(?: \\([^)]*\\))?(?:, (?:' + NAMES.map(esc).join('|') + ')(?: \\([^)]*\\))?)*$');
const INL = new RegExp('\\[\\s*(?:' + NAMES.map(esc).join('|') + '):[^\\]]*\\/');
let total = 0;
for (const dir of process.argv.slice(2)) {
  const S = JSON.parse(fs.readFileSync(dir + '/spec.json', 'utf8')); const out = [];
  for (const [id, v] of Object.entries(S.spells)) for (const [lang, d] of [['en', v.d || ''], ['ko', (S.spellsKo[id] || {}).d || '']]) {
    const lines = d.split('\n').map(l => l.trim());
    if (/Requires |필요\s*$/m.test(d)) out.push(`${id} ${v.n} ${lang}: 요구 조건 표시`);
    if (lines.some(l => HEAD.test(l))) out.push(`${id} ${v.n} ${lang}: 전문화 머리글 줄 "${lines.find(l => HEAD.test(l))}"`);
    if (INL.test(d)) out.push(`${id} ${v.n} ${lang}: [전문화: … / …] 갈래`);
  }
  console.log(dir.split('/').pop(), out.length); out.forEach(x => console.log('  ', x)); total += out.length;
}
process.exit(total ? 1 : 0);
