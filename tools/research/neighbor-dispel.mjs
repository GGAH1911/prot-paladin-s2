// 던전 기술 id 뒤 1~6번 id 중 이름이 같은 것(따로 걸리는 디버프)을 nether 툴팁으로 찾아 해제 종류(buff 칸)를 읽는다
import fs from 'node:fs';
const ROOT = '/Users/insung/.aside/u/0/prot-paladin-s2';
const D = JSON.parse(fs.readFileSync(ROOT + '/data/core/dungeons.json', 'utf8'));
const E = JSON.parse(fs.readFileSync(ROOT + '/data/core/spells.en.json', 'utf8'));
const C = '/Users/insung/.aside/u/0/healer-work/_cache/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function tt(id) { const f = `${C}${id}.0.json`; if (fs.existsSync(f)) { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) {} }
  for (let i = 0; i < 4; i++) { try { const r = await fetch(`https://nether.wowhead.com/tooltip/spell/${id}?dataEnv=1&locale=0`); if (r.status === 404) { fs.writeFileSync(f, '{}'); return {}; } if (r.ok) { const j = await r.json(); fs.writeFileSync(f, JSON.stringify(j)); return j; } } catch (e) {} await sleep(1500); } return null; }
const disp = j => ((j?.buff || '').match(/<th class="q"><b class="q">([^<]+)<\/b><\/th>/) || [])[1] || '';
const where = new Map(); for (const [d, m] of Object.entries(D.tips)) for (const [n, id] of Object.entries(m)) { if (!where.has(id)) where.set(id, []); where.get(id).push(d); }
const ids = [...where.keys()]; const out = []; let k = 0;
async function w() { while (k < ids.length) { const id = ids[k++]; const base = await tt(id); const name = base?.name || E[id]?.n; if (!name) continue;
  for (let d = 1; d <= 6; d++) { const j = await tt(String(+id + d)); await sleep(60); if (j && j.name === name) { const t = disp(j); if (t) out.push(`${where.get(id).join(',')}:${name} | ${id} → ${+id + d} | ${t}`); } } } }
await Promise.all(Array.from({ length: 4 }, w));
fs.writeFileSync(C + 'neighbor-dispel.txt', out.sort().join('\n') + '\n'); fs.writeFileSync(C + 'neighbor-done', 'ok');
