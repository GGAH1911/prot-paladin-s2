// Wowhead 기술 페이지의 Dispel type 칸(+ 효과에서 발동·적용되는 하위 기술)을 던전 기술 전부에 대해 읽는다
import fs from 'node:fs';
const ROOT = '/Users/insung/.aside/u/0/prot-paladin-s2';
const D = JSON.parse(fs.readFileSync(ROOT + '/data/core/dungeons.json', 'utf8'));
const MISSING = new Set();
const C = '/Users/insung/.aside/u/0/healer-work/_cache/page/';
async function page(id) {
  const f = C + id + '.html'; if (fs.existsSync(f)) return fs.readFileSync(f, 'utf8'); if (process.env.CACHE_ONLY) { MISSING.add(id); return ''; }
  for (let i = 0; i < 4; i++) { try { const r = await fetch('https://www.wowhead.com/spell=' + id, { headers: { 'user-agent': 'Mozilla/5.0' } }); const t = await r.text(); if (r.ok) { fs.writeFileSync(f, t); return t; } } catch (e) {} await new Promise(r => setTimeout(r, 2500)); }
  return '';
}
const dtype = s => { const i = s.indexOf('Dispel type</th>'); if (i < 0) return null; const m = s.slice(i, i + 200).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').match(/Dispel type (\S+)/); return m ? m[1] : null; };
const name = s => ((s.match(/<title>([^<]*)/) || [])[1] || '').split(' - ')[0];
const kids = s => { const i = s.indexOf('id="spelldetails"'); const part = i < 0 ? '' : s.slice(i, i + 60000); return [...new Set([...part.matchAll(/href="\/spell=(\d+)/g)].map(m => m[1]))]; };
const ids = new Map(); for (const [d, m] of Object.entries(D.tips)) for (const [n, id] of Object.entries(m)) if (!ids.has(id)) ids.set(id, d + ':' + n);
const list = [...ids]; const out = []; let k = 0;
async function w() { while (k < list.length) { const [id, where] = list[k++]; const s = await page(id); const t = dtype(s); const sub = [];
  for (const c of kids(s).filter(x => x !== id).slice(0, 4)) { const cs = await page(c); const ct = dtype(cs); if (ct && ct !== 'n/a') sub.push(`${c} ${name(cs)}:${ct}`); }
  out.push({ where, id, n: name(s), t, sub }); } }
await Promise.all(Array.from({ length: 2 }, w));
out.sort((a, b) => a.where.localeCompare(b.where));
fs.writeFileSync('/Users/insung/.aside/u/0/healer-work/_cache/page-dispel.json', JSON.stringify(out, null, 1));
for (const o of out) if ((o.t && o.t !== 'n/a') || o.sub.length) console.log(`${o.where} | ${o.id} | ${o.t} | ${o.sub.join(', ')}`);
fs.writeFileSync('/Users/insung/.aside/u/0/healer-work/_cache/page-missing.txt', [...MISSING].join(' '));
console.log('missing', MISSING.size);
console.log('total', out.length, 'nopage', out.filter(o => o.t === null).length);
