// 사용법: node tooltip.mjs --spec Mistweaver --ko 운무 <id> [id...]  (옵션 --out 파일)
// nether.wowhead.com 툴팁(영문 locale=0·한글 locale=1)을 받아 사이트 spells 형식으로 정리한다.
// 규칙: meta 는 ' · '로 잇고 'Requires …'/'… 필요'는 뺀다. 전문화별 문단은 --spec/--ko 문단만 남긴다. 한글 |1X;Y; 는 받침으로 고른다.
import fs from 'node:fs';
const args = process.argv.slice(2); const opt = {}; const ids = [];
for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[++i]; else ids.push(args[i]); }
const CACHE = '/Users/insung/.aside/u/0/dps-work/_cache/';
async function get(id, loc) {
  const f = `${CACHE}${id}.${loc}.json`; if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf8'));
  for (let i = 0; i < 4; i++) { try { const r = await fetch(`https://nether.wowhead.com/tooltip/spell/${id}?dataEnv=1&locale=${loc}`); if (!r.ok) throw new Error(r.status); const j = await r.json(); fs.writeFileSync(f, JSON.stringify(j)); return j; } catch (e) { await new Promise(r => setTimeout(r, 700)); } }
  return null;
}
const ent = s => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const jong = ch => { const c = ch.charCodeAt(0) - 0xac00; if (c < 0 || c > 11171) return null; return c % 28; };
function josa(s) {
  return s.replace(/(.?)\|1([^;]*);([^;]*);/g, (m, prev, a, b) => {
    let p = prev; const j = jong(p || '');
    if (j == null) return prev + (/[0-9]$/.test(p) ? ('013678'.includes(p) ? a : b) : a); // 숫자·영문: 숫자는 읽는 소리, 영문은 받침 있는 쪽
    if (/^으로$/.test(a) && (j === 0 || j === 8)) return prev + b; // ㄹ받침/받침없음 → 로
    return prev + (j ? a : b);
  });
}
// 직업·레벨·무기 요구 조건만 지우고 은신·형태(Requires Stealth, Requires Cat Form 등)는 남긴다
const DROPREQ = new RegExp('^(?:Requires (?:level \\d+|Warrior|Paladin|Hunter|Rogue|Priest|Death Knight|Shaman|Mage|Warlock|Monk|Druid|Demon Hunter|Evoker|(?:Melee|Ranged|One-Handed|Two-Handed|Main Hand|Off Hand) Weapon|Weapon)|(?:전사|성기사|사냥꾼|도적|사제|죽음의 기사|주술사|마법사|흑마법사|수도사|드루이드|악마사냥꾼|기원사) 필요|(?:근접|원거리|한손|양손)? ?무기 필요)$');
// 설명 쪽에 붙어 오는 요구 조건(은신·형태 등)은 meta 끝으로 옮긴다
function reqs(html) {
  const t = html.split('</table><table>').slice(1).join('');
  return [...t.matchAll(/<(?:span|div) class="wowhead-tooltip-requirements"[^>]*>([\s\S]*?)<\/(?:span|div)>/g)].map(m => ent(m[1].replace(/<[^>]+>/g, '')).trim()).filter(x => x && !DROPREQ.test(x));
}
const withReq = (m, html) => [m, ...reqs(html)].filter(Boolean).join(' · ');
function meta(html) {
  const first = html.split('</table><table>')[0];
  let t = first.replace(/<!--[\s\S]*?-->/g, '').replace(/<a class="whtt-name"[\s\S]*?<\/a>/, '').replace(/<(table|div|span class="wowhead-tooltip-requirements")/g, '\n<$1').replace(/<\/table>/g, '</table>\n');
  t = t.replace(/<(br|\/td|\/th|\/div|\/tr)[^>]*>/gi, '\n').replace(/<[^>]+>/g, '');
  return ent(t).split('\n').map(x => x.trim()).filter(x => x && !DROPREQ.test(x) && !/^요구 레벨/.test(x)).join(' · ');
}
// 전문화 이름(로스터 전체, 영문·한글): 아이콘 유무와 관계없이 "Holy, Discipline" 같은 머리글 줄을 알아본다
const SPECN = ["Arms","무기","Fury","분노","Protection","방어","Holy","신성","보호","Retribution","징벌","Beast Mastery","야수","Marksmanship","사격","Survival","생존","Assassination","암살","Outlaw","무법","Subtlety","잠행","Discipline","수양","Shadow","암흑","Blood","혈기","Frost","냉기","Unholy","부정","Elemental","정기","Enhancement","고양","Restoration","복원","Arcane","비전","Fire","화염","Affliction","고통","Demonology","악마","Destruction","파괴","Brewmaster","양조","Mistweaver","운무","Windwalker","풍운","Balance","조화","Feral","야성","Guardian","수호","회복","Havoc","파멸","Vengeance","복수","Devourer","포식","Devastation","황폐","Preservation","보존","Augmentation","증강"];
const NAME = '(?:' + SPECN.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')';
const HEAD = new RegExp('^' + NAME + '(?: \\([^)]*\\))?(?:, ' + NAME + '(?: \\([^)]*\\))?)*$');
function desc(html, spec) {
  const parts = html.split('</table><table>'); let t = parts.slice(1).join('</table><table>');
  t = t.replace(/<!--[\s\S]*?-->/g, '').replace(/<span class='tooltip-inside-icon'[^>]*?><\/span>/g, '');
  // 설명 앞 'Requires Melee Weapon' 같은 요구 조건 표시는 전문화 머리글과 붙어 오므로 먼저 지운다
  t = t.replace(/<(span|div) class="wowhead-tooltip-requirements"[^>]*>[\s\S]*?<\/\1>/g, '\n');
  t = t.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ''); t = ent(t);
  const lines = t.split('\n').map(l => l.replace(/[ \t]+/g, ' ').trim());
  const hasSpec = lines.some(l => HEAD.test(l));
  const inl = new RegExp('\\[((?:\\s*' + NAME + ': [^\\[\\]]*?)(?: / \\s*' + NAME + ': [^\\[\\]]*?)*)\\]', 'g');
  const out = []; let cur = null;
  for (let l of lines) {
    // 문장 안 [A: x / B: y] 는 내 전문화 갈래만 남긴다
    l = l.replace(inl, (m, inner) => { const keep = inner.split(' / ').map(p => p.trim()).filter(p => p.startsWith(spec + ': ')); return keep.length ? '[' + keep.join(' / ') + ']' : ''; }).trim();
    if (HEAD.test(l)) { cur = l.split(', ').map(x => x.replace(/ \(.*\)$/, '').trim()); continue; }
    if (!l) { if (out.length && out[out.length - 1] !== '') out.push(''); continue; }
    if (!hasSpec || cur === null || (cur && cur.includes(spec))) { if (!out.includes(l)) out.push(l); else if (out[out.length - 1] === '') out.pop(); }
  }
  while (out.length && out[out.length - 1] === '') out.pop();
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
const res = {}; const warn = [];
for (const id of ids) {
  const [e, k] = [await get(id, 0), await get(id, 1)];
  if (!e || !e.tooltip) { warn.push('툴팁 없음 ' + id); continue; }
  const en = { n: e.name, i: e.icon, m: withReq(meta(e.tooltip), e.tooltip), d: desc(e.tooltip, opt.spec) };
  const ko = k && k.tooltip ? { n: k.name, m: josa(withReq(meta(k.tooltip), k.tooltip)), d: josa(desc(k.tooltip, opt.ko)) } : null;
  if (!en.d) warn.push(`영문 설명 비었음 ${id} ${e.name} (전문화 문단 이름 확인)`);
  if (ko && !ko.d) warn.push(`한글 설명 비었음 ${id} ${k.name}`);
  if (ko && /\|\d/.test(ko.d + ko.m)) warn.push('조사 기호 남음 ' + id);
  res[id] = { en, ko };
}
const txt = JSON.stringify(res, null, 1);
if (opt.out) fs.writeFileSync(opt.out, txt); else console.log(txt);
warn.forEach(w => console.error('경고', w));
