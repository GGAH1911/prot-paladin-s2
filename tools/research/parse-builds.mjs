// 사용법: node parse-builds.mjs <html 파일> <url>  → {url, updated, rows:[{hero,label,rec,copy,code}]}
// 행 [tr]…[copy="X"]CODE 를 찾고, 영웅은 행 안의 wow-hero-talent 기호, 없으면 그 앞 마지막 영웅 기호(표 머리)로 정한다.
import fs from 'node:fs';
const [file, u] = process.argv.slice(2);
const t = fs.readFileSync(file, 'utf8').replace(/\\\//g, '/').replace(/\\"/g, '"').replace(/\\r\\n|\\n/g, ' ');
const rows = []; const seen = new Set();
for (const m of t.matchAll(/\[copy="([^"]*)"\]\s*(C[A-Za-z0-9]{60,})/g)) {
  const rowStart = t.lastIndexOf('[tr]', m.index);
  const cell = t.slice(rowStart, m.index);
  const heroes = [...t.slice(0, m.index).matchAll(/wow-hero-talent-([a-z-]+)/g)];
  const inRow = (cell.match(/wow-hero-talent-([a-z-]+)/) || [])[1];
  const hero = inRow || (heroes.length ? heroes[heroes.length - 1][1] : null);
  const label = cell.replace(/\[symbol=[^\]]*\]/g, '').replace(/\[b\]\((Best|Recommended)\)\[\/b\]/gi, '').replace(/\[[^\]]*\]/g, ' ').replace(/\\t/g, ' ').replace(/\s+/g, ' ').trim();
  const key = hero + '|' + m[1] + '|' + m[2] + '|' + m.index; if (seen.has(key)) continue; seen.add(key);
  rows.push({ hero, label, rec: /legendary-available|\(Best\)|\(Recommended\)/i.test(cell), copy: m[1], code: m[2] });
}
const upd = (t.match(/"dateModified"\s*:\s*"([^"]+)"/) || [])[1];
console.log(JSON.stringify({ url: u, updated: upd, rows }, null, 1));
