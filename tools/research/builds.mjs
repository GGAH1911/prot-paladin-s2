// 사용법: node builds.mjs <class> <spec>  → Wowhead talent builds 가이드의 빌드 표(영웅·이름·추천·코드)와 갱신일
const [cls, sp] = process.argv.slice(2);
const u = `https://www.wowhead.com/guide/classes/${cls}/${sp}/talent-builds-pve-${process.env.ROLE || "dps"}`;
const s = await (await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
const t = s.replace(/\\\//g, '/').replace(/\\"/g, '"').replace(/\\r\\n|\\n/g, '\n');
const rows = []; const re = /\[tr\]\s*\[td[^\]]*\]((?:(?!\[\/tr\]).)*?)C[A-Za-z0-9]{80,}/gs;
for (const m of t.matchAll(/\[td align=left\]((?:(?!\[td align=left\]).){0,400}?)\[copy="([^"]*)"\]\s*(C[A-Za-z0-9]{60,})/gs)) {
  const cell = m[1];
  const hero = (cell.match(/wow-hero-talent-([a-z-]+)/) || [])[1] || null;
  const label = (cell.match(/\[b\](?:\[color=[^\]]+\])?([^\[]+)/) || [])[1]?.trim();
  rows.push({ hero, label, rec: /Recommended|\(Best\)/i.test(cell), copy: m[2], code: m[3] });
}
const upd = (t.match(/"dateModified"\s*:\s*"([^"]+)"/) || t.match(/Last Updated[^0-9]*([0-9][^<"]{4,30})/) || [])[1];
console.log(JSON.stringify({ url: u, updated: upd, rows }, null, 1));
