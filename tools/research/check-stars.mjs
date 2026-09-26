// 가이드 HTML의 빌드 표를 행 단위로 읽어(추천 = 같은 행의 (Recommended)/(Best) 글자나 legendary-available 아이콘) 사이트 가이드의 ★와 대조한다
import fs from 'node:fs';
const ROOT = '/Users/insung/.aside/u/0/prot-paladin-s2';
const [dir, ...bases] = process.argv.slice(2); const out = [];
for (const base of bases) {
  const f = dir + base + '.html'; if (!fs.existsSync(f)) { out.push(base + ': 원문 없음'); continue; }
  const s = fs.readFileSync(f, 'utf8').replace(/\\\//g, '/').replace(/\\"/g, '"');
  const rows = s.split('[tr]').slice(1).map(r => r.split('[/tr]')[0]);
  const rec = new Set(), all = new Set(), non = new Set();
  for (const r of rows) { const codes = [...r.matchAll(/C[A-Za-z0-9]{60,}/g)].map(m => m[0]); codes.forEach(c => all.add(c)); if (/\(Recommended\)|\(Best\)|wow-atlas-quest-legendary-available/i.test(r)) codes.forEach(c => rec.add(c)); else codes.forEach(c => non.add(c)); }
  const gp = ROOT + '/data/spec/' + base + '.guide.json'; if (!fs.existsSync(gp)) { out.push(base + ': (아직 없음)'); continue; }
  const G = JSON.parse(fs.readFileSync(gp, 'utf8')); const bad = [];
  for (const [h, g] of Object.entries(G.heroes)) { const html = g.sections.find(x => x.id === 'builds').html;
    for (const row of html.split('build-row').slice(1)) { const star = /class="star"/.test(row.split('bcode')[0]); const code = (row.match(/value="([^"]+)"/) || [])[1]; const name = (row.match(/bname">([^<]*)/) || [])[1];
      if (star && !rec.has(code) && !non.has(code)) bad.push(`${h} ${name}: ★인데 표에 추천 없음(코드 공유 아님)`); if (star && !rec.has(code) && non.has(code)) bad.push(`${h} ${name}: ★인데 표에 추천 없음`); if (!star && rec.has(code) && !non.has(code)) bad.push(`${h} ${name}: 표는 추천인데 ★ 없음`); if (code && !all.has(code)) bad.push(`${h} ${name}: 표에 없는 코드`); } }
  out.push(base + ': ' + (bad.length ? bad.join('; ') : 'ok'));
}
console.log(out.join('\n'));
