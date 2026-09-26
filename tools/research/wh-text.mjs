// Wowhead 가이드 HTML에서 본문 BBCode(markup)를 읽기 쉬운 글로 바꾼다: node wh-text.mjs <html>
import fs from 'node:fs';
const s = fs.readFileSync(process.argv[2], 'utf8');
const m = s.match(/WH\.markup\.printHtml\("((?:[^"\\]|\\.)*)"/) || s.match(/"body":"((?:[^"\\]|\\.)*)"/);
let t = m ? JSON.parse('"' + m[1] + '"') : s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
t = t.replace(/\[(spell|npc|item|affix)=(\d+)[^\]]*\]/g, '[$1 $2]').replace(/\[\/?(b|i|u|url[^\]]*|color[^\]]*|center|ul|ol|li|table[^\]]*|tr|td[^\]]*|h\d[^\]]*|small|div[^\]]*|tab[^\]]*|tabs[^\]]*|icon[^\]]*|span[^\]]*|hr|toc[^\]]*|section[^\]]*|pad|img[^\]]*|quote[^\]]*|copy[^\]]*|symbol[^\]]*)\]/g, ' ').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n');
console.log(t);
