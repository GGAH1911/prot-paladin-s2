/* 쐐기 가이드 엔진. 페이지 셸이 window.WG = {page, spec, hero, base} 를 정하고 이 파일을 부른다.
   page: select(첫 화면) | sheet(치트시트) | guide(스킬 가이드) | specs(전문화 목록) | notfound(404)
   데이터: data/roster.json, data/core/*, data/role/<역할>.json, data/spec/<직업>-<전문화>.json */
(() => {
"use strict";
const CFG = window.WG || {};
const BASE = CFG.base || "./";
const J = p => fetch(BASE + p).then(r => { if (!r.ok) throw new Error(p + " " + r.status); return r.json(); });

// ---------- 저장값 ----------
const ls = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
};
const ss = {
  get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
};
// 옛 보호 성기사 사이트(pp-*) 저장값을 한 번만 옮긴다. pp-*는 되돌릴 때를 위해 지우지 않는다.
function migrate() {
  if (ls.get("wg:v")) return;
  const hero = ls.get("pp-hero"), lang = ls.get("pp-tiplang"), tab = ls.get("pp-tab"), open = ls.get("pp-open");
  if ([hero, lang, tab, open].some(x => x != null)) {
    ls.set("wg:spec", "paladin/protection");
    // 옛 사이트는 영웅을 고른 적이 없으면 기사단으로 보였으므로 그대로 둔다
    ls.set("wg:hero:paladin/protection", hero === "lightsmith" ? "lightsmith" : "templar");
  }
  if (lang === "ko" || lang === "en") ls.set("wg:lang", lang);
  if (tab) ls.set("wg:tab", tab);
  if (open) ls.set("wg:open", open);
  ls.set("wg:v", "1");
}
migrate();
let lang = ls.get("wg:lang") === "ko" ? "ko" : "en";

// ---------- 로스터 ----------
let ROSTER, SPECS = [], BYID = {};
function indexRoster(r) {
  ROSTER = r;
  r.classes.forEach(c => c.specs.forEach(s => {
    const o = { id: `${c.slug}/${s.slug}`, cls: c, ...s };
    SPECS.push(o); BYID[o.id] = o;
  }));
}
const ROLE_ICON = { tank: "🛡", healer: "✚", dps: "⚔" };
const specName = s => lang === "ko" ? s.koFull : s.enFull;
const heroName = h => h ? (lang === "ko" ? h.ko : h.en) : "";
const heroOf = (s, slug) => s.heroes.find(h => h.slug === slug);
const defaultHero = s => s.defaultHero || s.heroes[0].slug;
const savedHero = s => { const h = ls.get("wg:hero:" + s.id); return heroOf(s, h) ? h : null; };
const isLight = hex => { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) > 170; };
function setClassColor(c) {
  const st = document.documentElement.style;
  st.setProperty("--cls", c.color); st.setProperty("--cls-ink", c.ink[0]); st.setProperty("--cls-ink-d", c.ink[1]);
}
const esc = x => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function icon(s, size) {
  const c = s.cls, light = isLight(c.color);
  return `<span class="ico${light ? " light" : ""}" style="--c:${c.color};${size ? `--s:${size}px;` : ""}${light ? "color:#1D1D1F" : ""}" aria-hidden="true">${esc((lang === "ko" ? s.ko : s.en).charAt(0))}<img src="https://wow.zamimg.com/images/wow/icons/large/${s.icon}.jpg" alt="" loading="lazy" onerror="this.remove()"></span>`;
}
function classIcon(c, size) {
  const light = isLight(c.color);
  return `<span class="ico${light ? " light" : ""}" style="--c:${c.color};${size ? `--s:${size}px;` : ""}${light ? "color:#1D1D1F" : ""}" aria-hidden="true">${esc((lang === "ko" ? c.ko : c.en).charAt(0))}<img src="https://wow.zamimg.com/images/wow/icons/large/classicon_${c.token.toLowerCase()}.jpg" alt="" loading="lazy" onerror="this.remove()"></span>`;
}
const sheetUrl = (id, hash) => `${BASE}${id}/${hash || ""}`;
const guideUrl = (id, hero) => `${BASE}${id}/${hero}/`;

// ---------- 전문화 전환 시트 (S5) ----------
function specListHtml(role, currentId, mode) {
  // mode: "sheet"(링크 대신 data-go) 또는 "page"(정적 링크)
  const list = role === "class" ? SPECS : SPECS.filter(s => s.role === role);
  const badge = s => s.status === "ready" ? "" : `<span class="badge">준비 중</span>`;
  const attrs = s => `href="${sheetUrl(s.id)}" data-spec="${s.id}"${s.id === currentId ? ' aria-current="page"' : ""}`;
  if (role !== "dps" && role !== "class") {
    return `<div class="stiles">${list.map(s => `<a class="stile" ${attrs(s)} style="--cls-ink:${s.cls.ink[0]};--cls-ink-d:${s.cls.ink[1]}">${icon(s, 36)}<span><span class="sn">${esc(specName(s))}</span>${badge(s)}</span></a>`).join("")}</div>`;
  }
  const byCls = ROSTER.classes.map(c => [c, list.filter(s => s.cls === c)]).filter(([, l]) => l.length);
  return `<div>${byCls.map(([c, l]) => `<div class="clsrow" style="--cls-ink:${c.ink[0]};--cls-ink-d:${c.ink[1]}"><div class="cn"><span class="dot" style="--cls:${c.color}"></span>${esc(lang === "ko" ? c.ko : c.en)}</div><div class="chips">${l.map(s => `<a class="chip${s.status === "ready" ? "" : " soon"}" ${attrs(s)}>${icon(s, 24)}${esc(lang === "ko" ? s.ko : s.en)}${role === "class" ? `<span class="rl">${ROSTER.roles[s.role].ko}</span>` : ""}${badge(s)}</a>`).join("")}</div></div>`).join("")}</div>`;
}
function openSheet(role, currentId) {
  if (document.querySelector(".sheet")) return;
  const el = document.createElement("div");
  el.className = "sheet"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", "전문화 변경");
  let r = role;
  const draw = () => {
    el.innerHTML = `<div class="sheet-panel"><div class="sheet-head"><div class="t"><h2>전문화 변경</h2><button class="x" type="button" aria-label="닫기">✕</button></div>
      <div class="seg rseg" role="group" aria-label="역할">${["tank", "healer", "dps", "class"].map(k => `<button type="button" data-role="${k}" aria-pressed="${k === r}">${k === "class" ? "직업별" : ROSTER.roles[k].ko + " " + SPECS.filter(s => s.role === k).length}</button>`).join("")}</div></div>
      <div class="sheet-body">${specListHtml(r, currentId)}<p class="note">준비 중인 전문화도 고를 수 있습니다. 던전 공략과 역할 운영까지 볼 수 있고, 내 기술 대응은 순서대로 채웁니다.</p></div></div>`;
  };
  draw();
  document.body.appendChild(el);
  history.pushState({ wgSheet: 1 }, "");
  const close = back => { el.remove(); removeEventListener("popstate", onPop); document.removeEventListener("keydown", onKey); if (back) history.back(); };
  const onPop = () => close(false);
  const onKey = e => { if (e.key === "Escape") close(true); };
  addEventListener("popstate", onPop);
  document.addEventListener("keydown", onKey);
  el.addEventListener("click", e => {
    if (e.target === el || e.target.closest(".x")) return close(true);
    const rb = e.target.closest("[data-role]"); if (rb) { r = rb.dataset.role; draw(); return; }
    const a = e.target.closest("a[data-spec]");
    if (a) {
      e.preventDefault();
      ls.set("wg:spec", a.dataset.spec);
      // 시트 기록을 새 주소로 바꿔서, 뒤로 가기 한 번이면 이전 전문화로 돌아가게 한다
      location.replace(a.href.split("#")[0] + location.hash);
    }
  });
  el.querySelector(".x").focus();
}
// 빠른 전환 줄·목록 페이지의 링크를 누르면 그 전문화를 내 전문화로 저장한다
document.addEventListener("click", e => {
  const a = e.target.closest("a[data-spec]");
  if (a && !a.closest(".sheet")) ls.set("wg:spec", a.dataset.spec);
}, true);

// ---------- 상단 고정 바 ----------
function topbar(s, view, hero) {
  const g = s.status === "ready" && hero;
  return `<header class="lnav"><div class="in wrap">
    <button class="nm" id="nm" type="button" aria-haspopup="dialog" title="같은 역할의 다른 전문화"><span class="dot"></span><span class="n">${esc(specName(s))}</span>${hero ? `<span class="h">· ${esc(heroName(heroOf(s, hero)))}</span>` : ""}<span class="car" aria-hidden="true">▾</span></button>
    <nav class="vseg" aria-label="보기"><a href="${sheetUrl(s.id)}"${view === "sheet" ? ' aria-current="page"' : ""}><span class="long">치트시트</span><span class="short">치트</span></a><a href="${g ? guideUrl(s.id, hero) : "#"}"${view === "guide" ? ' aria-current="page"' : ""}${g ? "" : ' aria-disabled="true" title="가이드 준비 중"'}><span class="long">스킬 가이드</span><span class="short">가이드</span></a></nav>
    <button class="pill" id="chg" type="button"><span class="long">전문화 변경</span><span class="short">변경</span></button>
  </div></header>`;
}
function bindTopbar(s) {
  document.getElementById("nm").onclick = () => openSheet(s.role, s.id);
  document.getElementById("chg").onclick = () => openSheet(s.role, s.id);
  // 가이드로 갔다가 돌아올 때 보던 위치를 복원한다
  document.querySelectorAll(".vseg a").forEach(a => a.addEventListener("click", () => ss.set("wg:scroll:" + location.pathname, String(scrollY))));
}
function specRow(s) {
  const same = s.role === "dps" ? SPECS.filter(x => x.cls === s.cls && x.role === "dps") : SPECS.filter(x => x.role === s.role);
  return `<div class="specrow"><div class="in wrap">${same.map(x => `<a class="sr${x.status === "ready" ? "" : " soon"}" href="${sheetUrl(x.id)}" data-spec="${x.id}"${x.id === s.id ? ' aria-current="page"' : ""} style="--c:${x.cls.color}">${icon(x, 32)}<span>${esc(lang === "ko" ? x.ko : x.en)}${s.role === "dps" ? "" : `<br>${esc(lang === "ko" ? x.cls.ko : x.cls.en)}`}</span></a>`).join("")}${s.role === "dps" ? `<button class="sr" type="button" id="alldps"><span class="more">…</span><span>딜러 전체</span></button>` : ""}</div></div>`;
}

// ---------- 공유 링크·준비 중 배너 ----------
function bannerHtml(s, visiting) {
  const mine = BYID[ls.get("wg:spec")];
  let h = "";
  if (visiting && mine) {
    h += `<div class="banner share" id="bshare"><b>${esc(ro(s.koFull))}</b> 보는 중입니다. 저장된 내 전문화는 ${esc(mine.koFull)}입니다.<div class="acts"><a class="pill gray" href="${sheetUrl(mine.id, location.hash)}">내 전문화로</a><button class="pill" type="button" id="bsave">이 전문화로 저장</button></div></div>`;
  } else if (visiting && ss.get("wg:nudge-off") !== "1") {
    h += `<div class="banner share" id="bshare">이 전문화를 내 전문화로 저장하면, 다음부터 첫 화면에서 바로 이 치트시트가 열립니다.<div class="acts"><button class="pill" type="button" id="bsave">저장</button><button class="pill gray" type="button" id="bclose">닫기</button></div></div>`;
  }
  if (s.status !== "ready") {
    const roleOk = s.role === "tank";
    h += `<div class="banner"><b>이 전문화의 기술 대응은 준비 중입니다.</b> ${roleOk ? "던전 공략과 탱커 운영은 볼 수 있습니다." : "던전 공략은 볼 수 있고, 역할 팁도 준비 중입니다."} 가이드도 준비되면 열립니다.</div>`;
  }
  return h;
}
function bindBanner(s, onSave) {
  const sv = document.getElementById("bsave"), cl = document.getElementById("bclose");
  if (sv) sv.onclick = () => { ls.set("wg:spec", s.id); document.getElementById("bshare").remove(); onSave(); };
  if (cl) cl.onclick = () => { ss.set("wg:nudge-off", "1"); document.getElementById("bshare").remove(); };
}

// ---------- 게임 언어: 한글 이름 치환 ----------
const JOSA = [["으로", "로"], ["이나", "나"], ["을", "를"], ["은", "는"], ["이", "가"], ["과", "와"]];
function josaFix(word, rest) {
  const c = word.charCodeAt(word.length - 1); if (c < 0xAC00 || c > 0xD7A3) return null;
  const jong = (c - 0xAC00) % 28;
  for (const [a, b] of JOSA) for (const p of [a, b]) {
    if (!rest.startsWith(p)) continue;
    const nx = rest.charAt(p.length);
    const ok = !/[가-힣]/.test(nx) || (b === "로" && /[도는서써부만의]/.test(nx)) || (b === "와" && /[의도는]/.test(nx));
    if (!ok) continue;
    return [p.length, b === "로" ? ((jong === 0 || jong === 8) ? "로" : "으로") : (jong ? a : b)];
  }
  return null;
}
function makeKo(dict) {
  const re = new RegExp("(?<![A-Za-z'’])(" + Object.keys(dict).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")(?![A-Za-z'’])", "g");
  return s => {
    let out = "", i = 0, m; re.lastIndex = 0;
    while ((m = re.exec(s))) {
      const ko = dict[m[1]]; out += s.slice(i, m.index) + ko; i = m.index + m[0].length;
      const p = josaFix(ko, s.slice(i)); if (p) { out += p[1]; i += p[0]; }
      re.lastIndex = i;
    }
    return out + s.slice(i);
  };
}
// "산레인으로", "기사단으로"처럼 받침에 맞는 조사 로/으로
const ro = w => { const c = w.charCodeAt(w.length - 1); if (c < 0xAC00 || c > 0xD7A3) return w + "(으)로"; const j = (c - 0xAC00) % 28; return w + (j === 0 || j === 8 ? "로" : "으로"); };
const tipNorm = s => s.replace(/\s*\([^)]*\)\s*$/, "").replace(/[’]/g, "'").replace(/\s+/g, " ").trim().toLowerCase();

// ---------- Wowhead 링크: 게임 언어가 한글이면 한국어 Wowhead(/ko/), 영문이면 영문 ----------
const wh = path => `https://www.wowhead.com/${lang === "ko" ? "ko/" : ""}${path}`;
function whLinks(root) {
  (root || document).querySelectorAll('a[href*="wowhead.com/"]').forEach(a => {
    const m = a.href.match(/^https:\/\/(?:www|ko)\.wowhead\.com\/(?:ko\/)?(.*)$/); if (!m) return;
    a.href = wh(m[1]);
  });
}

// ---------- 툴팁 공용 ----------
const tipEl = document.createElement("div"); tipEl.id = "sptip"; tipEl.setAttribute("role", "tooltip"); tipEl.hidden = true;
const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
let tipFor = null, showTip = () => {};
function placeTip(el) {
  tipEl.hidden = false;
  const r = el.getBoundingClientRect(), vw = innerWidth, vh = innerHeight, w = tipEl.offsetWidth, h = tipEl.offsetHeight;
  let left = Math.min(Math.max(8, r.left), vw - w - 8), top = r.bottom + 8;
  if (top + h > vh - 8 && r.top - h - 8 > 8) top = r.top - h - 8;
  tipEl.style.left = left + "px"; tipEl.style.top = Math.max(8, top) + "px";
}
function hideTip() { tipEl.hidden = true; tipFor = null; }
function spellTipHtml(id, en, ko) {
  const useKo = lang === "ko" && ko;
  const s = useKo ? { n: ko.n, m: ko.m, d: ko.d, i: en.i } : en;
  return `<div class="tt-head"><img src="https://wow.zamimg.com/images/wow/icons/medium/${s.i}.jpg" alt=""><div><div class="tt-name">${esc(s.n)}${useKo ? `<span class="tt-orig">${esc(en.n)}</span>` : ""}</div>${s.m ? `<div class="tt-meta">${esc(s.m)}</div>` : ""}</div></div><div class="tt-desc">${s.d ? esc(s.d).replace(/\n/g, "<br>") : (useKo ? '<span class="tt-none">Wowhead에 공식 설명이 없는 기술입니다.</span>' : '<span class="tt-none">No official description on Wowhead.</span>')}</div><a class="tt-link" href="${wh("spell=" + id)}" target="_blank" rel="noopener">${lang === "ko" ? "Wowhead에서 보기" : "View on Wowhead"}</a>`;
}
function bindTips(sel) {
  document.body.appendChild(tipEl);
  if (canHover) {
    document.addEventListener("mouseover", e => { const el = e.target.closest(sel); if (el && el !== tipFor) showTip(el); });
    document.addEventListener("mouseout", e => { const el = e.target.closest(sel); if (el && (!e.relatedTarget || !el.contains(e.relatedTarget)) && !tipEl.contains(e.relatedTarget)) hideTip(); });
    tipEl.addEventListener("mouseleave", hideTip);
  }
  document.addEventListener("click", e => {
    const el = e.target.closest(sel);
    if (el) { e.preventDefault(); e.stopPropagation(); if (tipFor === el && !canHover) hideTip(); else showTip(el); return; }
    if (!tipEl.contains(e.target)) hideTip();
  }, true);
  // 터치·클릭으로 생긴 focus 는 무시 (그 뒤 click 이 툴팁을 토글하므로, 여기서 먼저 열면 click 이 바로 닫아 버림)
  let lastPtr = 0; document.addEventListener("pointerdown", () => { lastPtr = Date.now(); }, true);
  document.addEventListener("focusin", e => { if (Date.now() - lastPtr < 800) return; const el = e.target.closest && e.target.closest(sel); if (el) showTip(el); });
  document.addEventListener("focusout", e => { if (e.target.closest && e.target.closest(sel)) hideTip(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") hideTip(); });
  addEventListener("scroll", () => { if (!tipEl.hidden) hideTip(); }, { passive: true });
}
function langSeg(id) {
  return `<div class="seg" id="${id}" role="group" aria-label="게임 언어 (기술·NPC 이름과 툴팁)"><button type="button" data-l="ko" aria-pressed="${lang === "ko"}">한글</button><button type="button" data-l="en" aria-pressed="${lang === "en"}">English</button></div>`;
}

// ---------- 모바일: 영상 링크를 YouTube 앱으로 열기 ----------
(function () {
  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (!isAndroid && !isIOS) return;
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href*="youtube.com/watch"]'); if (!a) return;
    const u = new URL(a.href), v = u.searchParams.get("v"), t = parseInt(u.searchParams.get("t"), 10);
    if (!v) return;
    e.preventDefault();
    const q = `watch?v=${v}${t > 0 ? `&t=${t}` : ""}`;
    if (isAndroid) {
      // 앱이 없으면 browser_fallback_url로 웹 영상이 열림
      location.href = `intent://www.youtube.com/${q}#Intent;scheme=https;package=com.google.android.youtube;S.browser_fallback_url=${encodeURIComponent(a.href)};end`;
      return;
    }
    // iOS: 앱으로 넘어가면 페이지가 숨겨짐. 1.5초 뒤에도 그대로면 앱이 없는 것이니 웹으로 열기
    let left = false; const onHide = () => { left = true; };
    document.addEventListener("visibilitychange", onHide, { once: true });
    addEventListener("pagehide", onHide, { once: true });
    location.href = `youtube://www.youtube.com/${q}`;
    setTimeout(() => { if (!left && !document.hidden) location.href = a.href; }, 1500);
  });
})();

const app = () => document.getElementById("app");
function fail(err) {
  console.error(err);
  app().innerHTML = `<div class="center"><h1>불러오지 못했습니다</h1><p>네트워크를 확인하고 새로고침해 주세요.</p><p><a class="pill" href="${BASE}specs/">전문화 목록</a></p></div>`;
}

// =====================================================================
// 치트시트 (S2·S6·S7)
// =====================================================================
async function sheetPage() {
  const s = BYID[CFG.spec];
  if (!s) { location.replace(BASE + "?pick"); return; }
  setClassColor(s.cls);
  const [core, en, ko, names, npcs, role, spec] = await Promise.all([
    J("data/core/dungeons.json"), J("data/core/spells.en.json"), J("data/core/spells.ko.json"), J("data/core/names.ko.json"),
    J("data/core/npcs.json"), J(`data/role/${s.role}.json`),
    s.status === "ready" ? J(`data/spec/${s.id.replace("/", "-")}.json`) : Promise.resolve(null),
  ]);
  const saved = ls.get("wg:spec");
  let visiting = saved !== s.id;
  const save = (k, v) => { if (!visiting) ls.set(k, v); };

  const TAGS = role.tags;
  const A = n => `<span class="ab">${n}</span>`;
  const MOBS = npcs;
  const SPELLS = { ...en, ...(spec ? spec.spells : {}) }, SPELLS_KO = { ...ko, ...(spec ? spec.spellsKo : {}) };
  // 한글 이름 사전: 치트시트에 쓰는 기술(공용 + 전문화 매핑)만 넣는다
  const specTipIds = new Set(Object.values(spec ? spec.tips : {}));
  const KO_ALL = (() => { const o = {}; for (const id in SPELLS) { if (!en[id] && !specTipIds.has(id)) continue; const k = SPELLS_KO[id]; if (k && k.n) o[SPELLS[id].n] = k.n; } return Object.assign(o, names, spec ? spec.names : {}); })();
  const koText = makeKo(KO_ALL);
  const NPC_RE = new RegExp("(?<![A-Za-z'’])(" + [...new Set([...Object.keys(KO_ALL), ...Object.keys(MOBS)])].sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")(?![A-Za-z'’])", "g");
  const tokens = str => str.replace(/\{([^{}]+)\}/g, (m, n) => A(n));
  const answer = key => {
    const a = (spec && spec.answers[key]) ?? role.answers[key] ?? role.answers[key.split(".")[0]];
    return a == null ? null : tokens(a);
  };
  const itemHtml = ([, x, o]) => {
    if (!o) return x;
    const ans = answer(o.m);
    return ans == null ? x + (o.post || "") : x + (o.sep ?? " → ") + ans + (o.post || "");
  };

  // 공통 탭: 준비된 전문화는 전문화 층, 준비 중이면 해제 담당표만
  const general = spec ? { id: "general", ...spec.general } : { id: "general", name: "공통", sub: "파티 공통 정보", bosses: [{ n: "해제 담당표", k: "Dispel", block: "dispel" }] };
  const D = [general, ...core.dungeons];
  const DETAIL = core.detail, RDETAIL = role.detail, SDETAIL = spec ? spec.detail : {};
  const TRASH = core.trash, RIO = core.rio;
  const rioArticle = id => `https://raider.io/news/${RIO[id][0]}`;
  const rioVideo = (id, t) => `https://www.youtube.com/watch?v=${RIO[id][1]}${t ? `&t=${t}s` : ""}`;

  // 영웅
  let hero = s.heroes[0].slug;
  const qh = new URLSearchParams(location.search).get("hero");
  hero = heroOf(s, qh) ? qh : (savedHero(s) || defaultHero(s));

  // 태그: 데이터에 실제로 있는 태그만 역할 순서대로 보여 준다
  const TAGK = Object.fromEntries(Object.entries(TAGS).map(([k, v]) => [v, k]));
  const present = new Set();
  D.forEach(d => d.bosses.forEach(b => (b.i || []).forEach(([t]) => present.add(t))));
  Object.values(TRASH).forEach(gs => gs.forEach(g => g.i.forEach(([t]) => present.add(t))));
  [role.brief, spec && spec.brief].forEach(src => Object.values(src || {}).forEach(bs => Object.values(bs).forEach(arr => arr.forEach(([t]) => present.add(t)))));
  if (spec) Object.values(spec.heroCards).forEach(h => h.items.forEach(([t]) => present.add(t)));
  const tagRe = new RegExp(`^\\[(${Object.values(TAGS).join("|")})\\]\\s*`);
  [DETAIL, RDETAIL, SDETAIL].forEach(src => Object.values(src).forEach(bs => Object.values(bs).forEach(x => {
    const lines = Array.isArray(x) ? x : [...(x.phases || []).flatMap(p => p.points), ...(x.group || [])];
    lines.forEach(l => { const m = String(l).match(tagRe); present.add(m ? TAGK[m[1]] : "tip"); });
  })));
  const ORDER = role.order.filter(t => present.has(t));
  let off = []; try { off = JSON.parse(ls.get("wg:tags:" + s.role) || "[]"); } catch (e) {}
  if (!Array.isArray(off) || ls.get("wg:tags:" + s.role) == null) off = role.off;
  let on = new Set(ORDER.filter(t => !off.includes(t)));
  if (!on.size) on = new Set(ORDER);

  let active = D[1].id;
  const st = ls.get("wg:tab"); if (st && D.some(d => d.id === st)) active = st;
  const h0 = location.hash.slice(1); if (D.some(d => d.id === h0)) active = h0;
  let openState = {}; try { openState = JSON.parse(ls.get("wg:open") || "{}") || {}; } catch (e) { openState = {}; }

  // ---- 화면 뼈대 ----
  const heroSeg = `<div class="seg" id="hero" role="group" aria-label="Hero talent">${s.heroes.map(h => `<button type="button" data-h="${h.slug}" aria-pressed="${h.slug === hero}" data-ko="${esc(h.ko)}">${esc(h.en)}</button>`).join("")}</div>`;
  app().innerHTML = topbar(s, "sheet", hero) + specRow(s) + `<div class="wrap">
    <div id="banners">${bannerHtml(s, visiting)}</div>
    <p class="lede" id="lede"></p>
    <nav class="tabbar" aria-label="던전"><div class="tabs" id="tabs" role="tablist"></div><div class="tabtrack" id="tabtrack" hidden><div class="tabthumb" id="tabthumb"></div></div></nav>
    <div class="ctrl"><div class="herorow"><span class="herogrp"><span data-ko="영웅 특성">Hero</span>${heroSeg}</span><span class="langgrp"><span class="tlabel">게임 언어</span>${langSeg("tiplang")}</span></div><div class="filters" id="filters"></div></div>
    <main id="main"></main>
    <footer id="foot"></footer></div>`;
  bindTopbar(s);
  bindBanner(s, () => { visiting = false; });
  const alldps = document.getElementById("alldps"); if (alldps) alldps.onclick = () => openSheet("dps", s.id);
  const tabsEl = document.getElementById("tabs"), mainEl = document.getElementById("main"), filtEl = document.getElementById("filters");

  const roleKo = ROSTER.roles[s.role].ko;
  const footer = () => {
    const src = core.sources.slice();
    if (spec) spec.sources.forEach(x => src.splice(x.after + 1, 0, x));
    return `<div><b style="color:var(--int)">차단</b> 항목의 <span class="need must">필수</span>는 놓치면 파티가 죽을 수 있는 시전, <span class="need rec">권장</span>은 피해를 줄이는 용도라 놓쳐도 생존기로 버틸 수 있는 시전입니다.</div>
      <div>한글 모드의 NPC·던전 이름은 Mythic Dungeon Tools와 LittleWigs 애드온의 한국어 번역 데이터, 기술 이름은 Wowhead 한국어 데이터를 따릅니다. 몹 이름을 누르면 나오는 생김새 이미지는 Wowhead 모델 썸네일입니다.</div>
      ${spec && spec.note ? `<div>${esc(spec.note)}</div>` : ""}
      ${spec ? `<div><b style="color:var(--tip)">참고</b> 태그는 가이드 원문이 아니라 ${esc(s.koFull)} 키트에 맞춘 추가 팁입니다.</div>` : ""}
      <div>출처: ${src.map(x => `<a href="${x.u}" target="_blank" rel="noopener">${esc(x.t)}</a>`).join(" · ")}</div>
      <div>전문화 목록과 아이콘은 게임 데이터(${esc(ROSTER.meta.gameBuild)}) 기준입니다. <a href="${BASE}specs/">전체 전문화</a> · <a href="${BASE}?pick">처음부터 고르기</a></div>`;
  };
  document.getElementById("foot").innerHTML = footer();

  // ---- 매크로·해제 담당표 ----
  const macros = () => `<p class="note" style="margin:0 0 10px">${spec.macroNote}</p><div class="macros">` +
    spec.macros.map(([n, d, c], i) => `<div class="mac"><div class="machead"><div><div class="ab">${n}</div><div class="macdesc">${d}</div></div><button class="copy" id="copy-${i}" data-i="${i}">복사</button></div><pre id="mac-${i}">${c}</pre></div>`).join("") + `</div>`;
  const dispelTable = () => {
    const kit = spec ? spec.kit.dispel : {};
    const rows = core.dispel.rows.map(r => {
      const mine = kit[r.type];
      // 내가 풀 수 있으면 내 전문화를 맨 앞에 두고, 목록에서 내 직업 항목은 뺀다
      const others = r.whoAll.split(", ").filter(x => !x.startsWith(s.cls.ko)).join(", ");
      const who = mine ? `${esc(s.koFull)} ${A(mine)}${others ? ", " + tokens(others) : ""}` : tokens(r.whoAll);
      return `<tr><td><span class="tag t-${r.cls}">${r.label}</span></td><td>${who}</td><td${mine ? ' class="me"' : ""}>${mine ? "나" : r.owner}</td></tr>`;
    }).join("");
    return `<div class="tbl"><table><thead><tr><th>디버프</th><th>풀 수 있는 직업</th><th>담당</th></tr></thead><tbody>${rows}</tbody></table></div><p class="note">${core.dispel.note}</p>`;
  };
  document.addEventListener("click", e => {
    const b = e.target.closest(".copy"); if (!b) return;
    const i = +b.dataset.i, txt = document.getElementById("mac-" + i).textContent;
    const done = () => { b.textContent = "복사됨"; setTimeout(() => b.textContent = "복사", 1500); };
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(document.getElementById("mac-" + i)); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent = "선택됨"; setTimeout(() => b.textContent = "복사", 1500); };
    try { navigator.clipboard.writeText(txt).then(done, fallback); } catch (err) { fallback(); }
  });

  // ---- 상세 공략 ----
  const escH = x => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const abWrap = x => escH(x).replace(/([A-Z](?:[A-Za-z'’\-]+|(?=\s[A-Z]))(?:\s(?:(?:of|the|and|&amp;|on|in|to|a)\s)*[A-Z][A-Za-z'’\-]*)*)/g, m => `<span class="ab">${m}</span>`);
  function deepItems(arr) {
    return (arr || []).map(x => { const m = String(x).match(tagRe); return [m ? TAGK[m[1]] : "tip", m ? String(x).slice(m[0].length) : String(x)]; })
      .filter(([t]) => on.has(t))
      .map(([t, x]) => `<li><span class="tag t-${t}">${TAGS[t]}</span><span>${abWrap(x)}</span></li>`).join("");
  }
  // 역할 층 문장 중 전문화가 자기 문구로 바꿔 쓰는 줄(roleOverride: {"던전/보스": {줄번호: 문장}})
  function roleLines(did, bn) {
    const arr = (RDETAIL[did] || {})[bn]; if (!arr) return arr;
    const ov = spec && spec.roleOverride && spec.roleOverride[`${did}/${bn}`];
    return ov ? arr.map((l, i) => ov[i] ?? l) : arr;
  }
  function deepHtml(did, b) {
    const x = (DETAIL[did] || {})[b.n]; if (!x) return "";
    const key = `deep-${did}-${b.n}`;
    const open = openState[key] === true;
    const blk = (title, arr, cls) => { const lis = deepItems(arr); return lis ? `<div class="dblk${cls ? " " + cls : ""}"><h4>${title}</h4><ul class="items">${lis}</ul></div>` : ""; };
    const phases = (x.phases || []).map(p => blk(escH(p.title), p.points)).join("");
    const body = (x.overview ? `<p class="dover">${abWrap(x.overview)}</p>` : "") + phases + blk(role.label, roleLines(did, b.n), "role") + blk(`${s.koFull} 활용`, (SDETAIL[did] || {})[b.n], "spec") + blk("파티 공통", x.group);
    return `<details class="deep fold" data-k="${key}"${open ? " open" : ""}><summary><span>상세 공략</span><span class="chev" aria-hidden="true">▾</span></summary><div class="deepbody">${body || '<p class="empty">선택한 태그 항목 없음</p>'}</div></details>`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest(".expall"); if (!b) return;
    const all = [...document.querySelectorAll("details.deep")]; const openAll = all.some(d => !d.open);
    all.forEach(d => { d.open = openAll; openState[d.dataset.k] = openAll; });
    save("wg:open", JSON.stringify(openState));
    b.textContent = openAll ? "상세 모두 접기" : "상세 모두 펼치기";
  });
  document.addEventListener("toggle", e => { const el = e.target; if (!el.matches || !el.matches("details.fold")) return; openState[el.dataset.k] = el.open; save("wg:open", JSON.stringify(openState)); }, true);

  // ---- 툴팁 ----
  const TIPS = core.tips;
  function decorateTips(did) {
    const maps = [TIPS[did] || {}, spec ? spec.tips : {}, core.commonTips];
    mainEl.querySelectorAll(".ab").forEach(el => {
      if (el.dataset.sid) return;
      const k = tipNorm(el.textContent); let id = null;
      for (const m of maps) { if (m[k]) { id = m[k]; break; } }
      if (!id) return;
      el.dataset.sid = id; el.classList.add("has-tip"); el.tabIndex = 0; el.setAttribute("role", "button");
    });
  }
  function npcMark(el, name) { el.dataset.npc = name; el.classList.add("has-tip", "npc-tip"); el.tabIndex = 0; el.setAttribute("role", "button"); }
  function npcDecorate(root) {
    root.querySelectorAll(".mob, .ab:not([data-sid]), .boss h3 > span").forEach(el => { const n = el.textContent.trim(); if (MOBS[n]) npcMark(el, n); });
    // 태그 없이 본문에 적힌 몹 이름도 감싸기. 더 긴 이름(예: Adderis & Aspix)에 속한 경우는 그대로 둠
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = []; let n;
    while ((n = w.nextNode())) if (!n.parentElement.closest(".ab,.mob,[data-npc],pre,a,button,.tag,.need")) nodes.push(n);
    nodes.forEach(t => {
      const str = t.data; let m, i = 0, frag = null; NPC_RE.lastIndex = 0;
      while ((m = NPC_RE.exec(str))) {
        if (!MOBS[m[1]]) continue;
        frag = frag || document.createDocumentFragment();
        frag.append(str.slice(i, m.index));
        const sp = document.createElement("span"); sp.className = "npc"; sp.textContent = m[1]; npcMark(sp, m[1]); frag.append(sp);
        i = m.index + m[1].length;
      }
      if (frag) { frag.append(str.slice(i)); t.replaceWith(frag); }
    });
  }
  function koApply(root) {
    root.querySelectorAll(".ab,.mob,.npc").forEach(el => {
      const e2 = el.textContent, sk = el.dataset.sid && SPELLS_KO[el.dataset.sid];
      // 툴팁 ID의 공식 이름은 본문 이름이 그 주문과 같을 때만 씀 (예: "Holy Armaments (Lightsmith)" 매크로 제목은 제외)
      const k = (sk && tipNorm(e2) === tipNorm(SPELLS[el.dataset.sid].n) && sk.n) || KO_ALL[e2] || koText(e2);
      if (k === e2) return;
      el.textContent = k;
      const nx = el.nextSibling;
      if (nx && nx.nodeType === 3) { const p = josaFix(k, nx.data); if (p) nx.data = p[1] + nx.data.slice(p[0]); }
    });
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = []; let n;
    while ((n = w.nextNode())) if (!n.parentElement.closest(".ab,.mob,.npc")) nodes.push(n);
    nodes.forEach(n => { const t = koText(n.data); if (t !== n.data) n.data = t; });
  }
  function showNpc(el) {
    const name = el.dataset.npc, [id, disp] = MOBS[name] || [], k = KO_ALL[name], useKo = lang === "ko" && k;
    tipFor = el;
    tipEl.innerHTML = `${disp ? `<img class="tt-model" src="https://wow.zamimg.com/modelviewer/live/webthumbs/npc/${disp % 256}/${disp}.png" alt="">` : ""}<div class="tt-name">${esc(useKo ? k : name)}${useKo ? `<span class="tt-orig">${esc(name)}</span>` : ""}</div><a class="tt-link" href="${wh("npc=" + id)}" target="_blank" rel="noopener">${lang === "ko" ? "Wowhead에서 3D 모델 보기" : "View 3D model on Wowhead"} ↗</a>`;
  }
  showTip = el => {
    if (el.dataset.npc) { showNpc(el); return placeTip(el); }
    const e2 = SPELLS[el.dataset.sid]; if (!e2) return;
    tipFor = el;
    tipEl.innerHTML = spellTipHtml(el.dataset.sid, e2, SPELLS_KO[el.dataset.sid]);
    placeTip(el);
  };
  bindTips(".has-tip");

  // ---- 언어 ----
  function applyChrome() {
    const k = lang === "ko";
    [...tabsEl.children].forEach((b, i) => b.textContent = k ? (KO_ALL[D[i].name] || D[i].name) : D[i].name);
    document.querySelectorAll("[data-ko]").forEach(el => { if (el.dataset.en == null) el.dataset.en = el.innerHTML; el.innerHTML = k ? el.dataset.ko : el.dataset.en; });
    document.getElementById("lede").textContent = `쐐기 ${core.dungeons.length}개 던전 ${roleKo} 치트시트 · 기술·NPC 이름은 ${k ? "한글" : "영문"} 클라이언트 기준`;
    document.querySelector(".lnav .n").textContent = specName(s);
    const hn = document.querySelector(".lnav .h"); if (hn) hn.textContent = "· " + heroName(heroOf(s, hero));
    document.title = `${specName(s)} · 쐐기 치트시트`;
    whLinks();
  }
  document.querySelectorAll("#tiplang button").forEach(b => b.onclick = () => {
    lang = b.dataset.l; ls.set("wg:lang", lang);
    document.querySelectorAll("#tiplang button").forEach(x => x.setAttribute("aria-pressed", x.dataset.l === lang));
    hideTip(); render(); applyChrome();
  });

  // ---- 탭·필터·영웅 ----
  D.forEach(d => {
    const b = document.createElement("button"); b.className = "tab"; b.id = "tab-" + d.id; b.type = "button"; b.setAttribute("role", "tab"); b.textContent = d.name;
    b.onclick = () => { active = d.id; save("wg:tab", d.id); history.replaceState(history.state, "", location.pathname + location.search + "#" + d.id); render(); };
    tabsEl.appendChild(b);
  });
  ORDER.forEach(k => {
    const b = document.createElement("button"); b.className = "filt t-" + k; b.id = "f-" + k; b.type = "button"; b.textContent = TAGS[k]; b.setAttribute("aria-pressed", "true");
    b.onclick = () => { on.has(k) ? on.delete(k) : on.add(k); if (!on.size) ORDER.forEach(x => on.add(x)); save("wg:tags:" + s.role, JSON.stringify(ORDER.filter(x => !on.has(x)))); render(); };
    filtEl.appendChild(b);
  });
  document.querySelectorAll("#hero button").forEach(b => b.onclick = () => {
    hero = b.dataset.h; save("wg:hero:" + s.id, hero);
    const g = document.querySelector(".vseg a:nth-child(2)"); if (g && s.status === "ready") g.href = guideUrl(s.id, hero);
    render(); applyChrome();
  });

  function abName(html) { const m = html.match(/<span class="ab">([^<]+)<\/span>/); return m ? m[1] : null; }
  function heroCard(d) {
    if (!spec) return "";
    const busters = [];
    d.bosses.forEach(b => { if (b.k.startsWith("Boss")) b.i.forEach(([t, x]) => { if (t === "tb") { const n = abName(x); if (n) busters.push(`${n} <span style="color:var(--muted)">(${b.n})</span>`); } }); });
    const list = busters.length ? busters.map(x => `<span class="ab">${x}</span>`).join(", ") : "보스 탱버 정보 없음";
    const hc = spec.heroCards[hero];
    const lis = hc.items.filter(([t]) => on.has(t)).map(([t, x]) => `<li><span class="tag t-${t}">${TAGS[t]}</span><span>${tokens(x.replace("{busters}", "\u0000")).replace("\u0000", list)}</span></li>`).join("");
    return `<section class="boss herocard"><h3>${hc.title}<small>Hero</small></h3>${lis ? `<ul class="items">${lis}</ul>` : `<p class="empty">선택한 태그 항목 없음</p>`}</section>`;
  }
  function trashSection(d, fold) {
    const tr = TRASH[d.id]; if (!tr) return "";
    const cards = tr.map((g, gi) => {
      const lis = g.i.filter(([t]) => on.has(t)).map(it => `<li><span class="tag t-${it[0]}">${TAGS[it[0]]}</span><span>${itemHtml(it)}</span></li>`).join("");
      const body = lis ? `<ul class="items">${lis}</ul>` : `<p class="empty">선택한 태그 항목 없음</p>`;
      return fold({ n: g.n, k: `Trash · ${g.i.length}` }, body, " trash", `trash-${d.id}-${gi}`, false);
    }).join("");
    return `<div class="sechead"><h2>일반몹</h2><p>구간을 눌러 펼치기 · 출처 Icy Veins</p></div>` + cards;
  }
  function render() {
    [...tabsEl.children].forEach((b, i) => b.setAttribute("aria-selected", D[i].id === active));
    [...filtEl.children].forEach(b => b.setAttribute("aria-pressed", on.has(b.id.slice(2))));
    document.querySelectorAll("#hero button").forEach(b => b.setAttribute("aria-pressed", b.dataset.h === hero));
    const d = D.find(x => x.id === active);
    const bosses = d.bosses.filter(b => (!b.hero || b.hero === hero) && b.k !== "Trash");
    const fold = (b, body, cls = "", key = b.k, defOpen = b.k !== "Macro") => {
      const open = key in openState ? openState[key] : defOpen;
      return `<details class="boss fold${cls}" data-k="${key}"${open ? " open" : ""}><summary><h3>${b.n}<small>${b.k} <span class="chev" aria-hidden="true">▾</span></small></h3></summary>${body}</details>`;
    };
    const blockHtml = b => b.block === "dispel" ? dispelTable() : macros();
    mainEl.innerHTML = `<div><h2 class="dname">${d.name}</h2><p class="dsub">${d.sub}${d.time ? ` · <span class="dtime">제한 시간 <b>${d.time}분</b></span>` : ""}${RIO[d.id] ? `</p><p class="dlinks"><a class="vid" href="${rioVideo(d.id)}" target="_blank" rel="noopener">▶ Raider.IO 영상</a><a class="vid rio" href="${rioArticle(d.id)}" target="_blank" rel="noopener">Raider.IO 글</a><button class="expall" type="button">상세 모두 펼치기</button>` : ` · <a class="vid" href="${core.generalVideo.href}" target="_blank" rel="noopener">${core.generalVideo.label}</a>`}</p></div>` + (d.id !== "general" ? heroCard(d) : "") + bosses.map(b => {
      if (b.block) return fold(b, blockHtml(b));
      // 보스 요약 항목 = 공용 층 + 역할 층(role.brief) + 전문화 층(spec.brief)
      const extra = [...(((role.brief || {})[d.id] || {})[b.n] || []), ...(((spec && spec.brief || {})[d.id] || {})[b.n] || [])];
      const lis = [...b.i, ...extra].filter(([t]) => on.has(t)).map(it => `<li><span class="tag t-${it[0]}">${TAGS[it[0]]}</span><span>${itemHtml(it)}</span></li>`).join("");
      const body = lis ? `<ul class="items">${lis}</ul>` : `<p class="empty">선택한 태그 항목 없음</p>`;
      if (d.id === "general") return fold(b, body, b.hero ? " herocard" : "");
      const vid = (RIO[d.id] && b.k !== "Trash") ? `<a class="vid" href="${rioVideo(d.id, b.t)}" target="_blank" rel="noopener">▶ 영상</a>` : "";
      return `<section class="boss${b.hero ? " herocard" : ""}"><h3><span>${b.n}</span><small>${vid}${b.k}</small></h3>${body}${deepHtml(d.id, b)}</section>`;
    }).join("") + trashSection(d, fold);
    decorateTips(d.id);
    npcDecorate(mainEl);
    if (lang === "ko") koApply(mainEl);
    whLinks(mainEl);
    const t = document.getElementById("tab-" + active); t && t.scrollIntoView({ block: "nearest", inline: "center" });
  }
  render();
  applyChrome();
  const back = ss.get("wg:scroll:" + location.pathname);
  if (back != null) { ss.set("wg:scroll:" + location.pathname, ""); if (+back > 0) scrollTo(0, +back); }

  // ---- 던전 목록 스크롤 막대 ----
  (function () {
    const track = document.getElementById("tabtrack"), thumb = document.getElementById("tabthumb");
    const sync = () => {
      const sw = tabsEl.scrollWidth, cw = tabsEl.clientWidth;
      if (sw <= cw + 1) { track.hidden = true; return; }
      track.hidden = false;
      const tw = track.clientWidth, w = Math.max(28, tw * cw / sw), x = (tw - w) * tabsEl.scrollLeft / (sw - cw);
      thumb.style.width = w + "px"; thumb.style.transform = "translateX(" + x + "px)";
    };
    tabsEl.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    if (window.ResizeObserver) new ResizeObserver(sync).observe(tabsEl);
    let drag = null;
    thumb.addEventListener("pointerdown", e => { e.preventDefault(); e.stopPropagation(); thumb.setPointerCapture(e.pointerId); thumb.classList.add("dragging"); drag = { x: e.clientX, left: tabsEl.scrollLeft }; });
    thumb.addEventListener("pointermove", e => { if (!drag) return; const sw = tabsEl.scrollWidth, cw = tabsEl.clientWidth, tw = track.clientWidth, w = thumb.offsetWidth; tabsEl.scrollLeft = drag.left + (e.clientX - drag.x) * (sw - cw) / Math.max(1, tw - w); });
    const end = () => { drag = null; thumb.classList.remove("dragging"); };
    thumb.addEventListener("pointerup", end); thumb.addEventListener("pointercancel", end);
    track.addEventListener("pointerdown", e => { if (e.target === thumb) return; const r = thumb.getBoundingClientRect(); tabsEl.scrollBy({ left: (e.clientX < r.left ? -1 : 1) * tabsEl.clientWidth * 0.8, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); });
    tabsEl.addEventListener("wheel", e => { if (tabsEl.scrollWidth <= tabsEl.clientWidth + 1) return; if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { tabsEl.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
    sync(); setTimeout(sync, 300);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
  })();
}

// =====================================================================
// 스킬 가이드 (S3). 본문은 tools/build.mjs가 정적 HTML로 만들고, 여기서는 상단 바·툴팁·언어만 붙인다
// =====================================================================
function guidePage() {
  const s = BYID[CFG.spec], G = window.GUIDE;
  setClassColor(s.cls);
  const hero = CFG.hero;
  const visiting = ls.get("wg:spec") !== s.id;
  if (!visiting) ls.set("wg:hero:" + s.id, hero);
  document.getElementById("top").innerHTML = topbar(s, "guide", hero);
  bindTopbar(s);
  document.getElementById("langslot").innerHTML = `<span class="langseg">게임 언어 ${langSeg("tiplang")}</span>`;
  document.querySelectorAll("[data-hero-go]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); location.replace(a.href); }));
  const KO_ALL = (() => { const o = {}; for (const id in G.en) { if (G.ko[id]) o[G.en[id].n] = G.ko[id].n; } return Object.assign(o, G.koExtra); })();
  const koText = makeKo(KO_ALL);
  document.querySelectorAll(".skill-card[data-sid]").forEach(c => { c.tabIndex = 0; c.setAttribute("role", "button"); });
  showTip = card => { const id = card.dataset.sid, e2 = G.en[id]; if (!e2) return; tipFor = card; tipEl.innerHTML = spellTipHtml(id, e2, G.ko[id]); placeTip(card); };
  bindTips(".skill-card[data-sid]");
  const koOrig = new Map();
  const w = document.createTreeWalker(document.getElementById("gbody"), NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { const p = n.parentElement; if (!p.closest("script,style,#sptip,.kname,.langseg,.lnav")) if (/[A-Za-z]/.test(n.data)) koOrig.set(n, n.data); }
  function applyBodyLang() {
    const ko = lang === "ko";
    koOrig.forEach((en, n) => {
      const card = n.parentElement.classList.contains("name") && n.parentElement.closest(".skill-card[data-sid]");
      const k = card && G.ko[card.dataset.sid];
      n.data = ko ? ((k && n === n.parentElement.firstChild && en.trim() === G.en[card.dataset.sid].n) ? k.n : koText(en)) : en;
    });
    document.querySelectorAll(".skill-card").forEach(c => {
      const nm = c.querySelector(".info .name"), el = c.querySelector(".kname"); if (!nm || !el) return;
      const t = nm.firstChild, en = koOrig.get(t);
      el.textContent = (ko && en && t.data !== en) ? en : "";
    });
    document.querySelector(".lnav .n").textContent = specName(s);
    document.querySelector(".lnav .h").textContent = "· " + heroName(heroOf(s, hero));
    whLinks();
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("#tiplang button"); if (!b) return;
    lang = b.dataset.l; ls.set("wg:lang", lang);
    document.querySelectorAll("#tiplang button").forEach(x => x.setAttribute("aria-pressed", x.dataset.l === lang));
    applyBodyLang(); if (tipFor) showTip(tipFor);
  });
  applyBodyLang();
  document.querySelectorAll(".bcode").forEach(i => i.addEventListener("focus", () => i.select()));
  document.querySelectorAll(".bcopy").forEach(b => b.addEventListener("click", async () => {
    const inp = b.parentElement.querySelector(".bcode"); let ok = false;
    try { await navigator.clipboard.writeText(inp.value); ok = true; } catch (e) {}
    if (!ok) { inp.focus(); inp.select(); try { ok = document.execCommand("copy"); } catch (e) {} }
    b.textContent = ok ? "복사됨" : "직접 복사"; b.classList.toggle("done", ok);
    setTimeout(() => { b.textContent = "복사"; b.classList.remove("done"); }, 1600);
  }));
  const pr = document.getElementById("print"); if (pr) pr.onclick = () => print();
}

// =====================================================================
// 첫 화면 (S1): 역할 → 전문화 → 영웅. 저장된 전문화가 있으면 바로 치트시트로
// =====================================================================
const OLD_TABS = ["general", "altar", "vale", "nalorakk", "murder", "voidscar", "kings", "ruby", "temple"];
function selectPage() {
  const q = new URLSearchParams(location.search);
  const saved = BYID[ls.get("wg:spec")];
  const h = location.hash;
  if (!q.has("pick")) {
    // 재방문: 저장된 전문화로. 뒤로 가기가 이 화면으로 돌아오지 않게 replace
    if (saved) { location.replace(sheetUrl(saved.id, h || (ls.get("wg:tab") ? "#" + ls.get("wg:tab") : ""))); return; }
    // 옛 보호 성기사 주소(/#altar 등)로 들어온 경우
    if (OLD_TABS.includes(h.slice(1))) { location.replace(sheetUrl("paladin/protection", h)); return; }
  }
  // 1단계는 두 갈래: 직업으로 찾기(기본, 게임 캐릭터 선택과 같은 순서) 또는 역할로 찾기
  const CLS = Object.fromEntries(ROSTER.classes.map(c => [c.slug, c]));
  const pick = { by: q.get("by") === "role" ? "role" : "class", role: q.get("role"), cls: q.get("class"), spec: BYID[q.get("spec")] ? q.get("spec") : null };
  if (pick.spec) { const sp = BYID[pick.spec]; pick.role = sp.role; pick.cls = sp.cls.slug; }
  if (!ROSTER.roles[pick.role]) pick.role = null;
  if (!CLS[pick.cls]) pick.cls = null;
  const first = () => pick.by === "class" ? pick.cls : pick.role;
  const roleDesc = { tank: "적을 붙잡고 큰 공격을 받아 냅니다", healer: "파티 체력을 지키고 해제를 맡습니다", dps: "딜과 차단, 우선 처치를 맡습니다" };
  const classSpecs = c => `<div class="stiles">${c.specs.map(x => BYID[`${c.slug}/${x.slug}`]).map(x => `<a class="stile" href="${sheetUrl(x.id)}" data-spec="${x.id}"${x.id === pick.spec ? ' aria-current="page"' : ""}>${icon(x, 36)}<span><span class="sn">${esc(x.ko)}</span><span class="rl">${ROLE_ICON[x.role]} ${ROSTER.roles[x.role].ko}</span>${x.status === "ready" ? "" : '<span class="badge">준비 중</span>'}</span></a>`).join("")}</div>`;
  const draw = () => {
    const sp = BYID[pick.spec];
    if (sp) setClassColor(sp.cls);
    const c = CLS[pick.cls];
    const chip1 = pick.by === "class"
      ? (c ? `<span class="dot" style="--cls:${c.color}"></span>${esc(c.ko)}` : "직업")
      : (pick.role ? ROLE_ICON[pick.role] + " " + ROSTER.roles[pick.role].ko : "역할");
    const step1 = pick.by === "class"
      ? `<div class="ctiles">${ROSTER.classes.map(x => `<button class="ctile" type="button" data-cls="${x.slug}" aria-pressed="${pick.cls === x.slug}" style="--cls-ink:${x.ink[0]};--cls-ink-d:${x.ink[1]}">${classIcon(x, 34)}<span><span class="cn2">${esc(x.ko)}</span><span class="ce">${esc(x.en)}</span></span></button>`).join("")}</div>`
      : `<div class="tiles">${["tank", "healer", "dps"].map(r => `<button class="tile" type="button" data-role="${r}" aria-pressed="${pick.role === r}"><span class="ro">${ROLE_ICON[r]}</span><span><span class="tt">${ROSTER.roles[r].ko}</span><span class="ts">${roleDesc[r]} · 전문화 ${SPECS.filter(x => x.role === r).length}개</span></span></button>`).join("")}</div>`;
    const step2 = !first() ? "" : pick.by === "class" ? classSpecs(c) : specListHtml(pick.role, pick.spec);
    app().innerHTML = `<div class="summary"><div class="in wrap">
        <span class="sumchip${first() ? "" : " empty"}" data-to="first">${chip1}</span>›
        <span class="sumchip${sp ? "" : " empty"}" data-to="spec">${sp ? `<span class="dot" style="--cls:${sp.cls.color}"></span>${esc(sp.koFull)}` : "전문화"}</span>›
        <span class="sumchip empty">영웅 특성</span>
      </div></div>
      <div class="wrap">
      <section class="s1-hero"><h1>쐐기 치트시트</h1><p>한밤 2시즌 쐐기 던전 8개를 내 전문화에 맞춰 봅니다. 세 번만 고르면 됩니다.</p></section>
      <section class="step" id="st-first"><h2>${pick.by === "class" ? "직업." : "역할."} <span>${pick.by === "class" ? "어떤 직업을 플레이하나요?" : "어떤 역할로 쐐기에 가나요?"}</span></h2>
        <div class="seg byseg" role="group" aria-label="찾는 방법"><button type="button" data-by="class" aria-pressed="${pick.by === "class"}">직업으로 찾기</button><button type="button" data-by="role" aria-pressed="${pick.by === "role"}">역할로 찾기</button></div>
        ${step1}</section>
      <section class="step${first() ? "" : " locked"}" id="st-spec" ${first() ? "" : 'aria-disabled="true"'}><h2>전문화. <span>${pick.by === "class" ? "어떤 전문화인가요?" : "무엇을 플레이하나요?"}</span></h2><p class="hint">준비 중인 전문화도 고를 수 있습니다. 던전 공략은 바로 볼 수 있습니다.</p>
        ${step2}</section>
      <section class="step${sp ? "" : " locked"}" id="st-hero" ${sp ? "" : 'aria-disabled="true"'}><h2>영웅 특성. <span>나중에 바꿔도 됩니다</span></h2><p class="hint">치트시트의 영웅 카드와 스킬 가이드가 이 선택을 따릅니다.</p>
        ${sp ? `<div class="tiles">${sp.heroes.map(hh => `<button class="tile" type="button" data-hero="${hh.slug}"><span><span class="tt">${esc(hh.ko)}</span><span class="ts">${esc(hh.en)}${hh.slug === defaultHero(sp) && sp.defaultHero ? " · 쐐기 추천" : ""}</span></span></button>`).join("")}</div><p class="later"><button class="pill gray" type="button" data-hero="${defaultHero(sp)}">나중에 고를게요 (${esc(ro(heroOf(sp, defaultHero(sp)).ko))} 시작)</button></p>` : ""}</section>
      <p class="s1-foot">고른 전문화는 이 기기에만 저장됩니다. 나중에 치트시트 위쪽 <b>전문화 변경</b>으로 바꿀 수 있습니다. 전체 목록은 <a href="${BASE}specs/">전문화 목록</a>에 있습니다.<br>전문화 목록과 한글 이름은 게임 데이터(${esc(ROSTER.meta.gameBuild)}) 기준입니다.</p>
      </div>`;
  };
  const syncUrl = () => {
    const parts = ["pick", "by=" + pick.by];
    if (pick.by === "class" && pick.cls) parts.push("class=" + pick.cls);
    if (pick.by === "role" && pick.role) parts.push("role=" + pick.role);
    if (pick.spec) parts.push("spec=" + pick.spec);
    history.replaceState(null, "", location.pathname + "?" + parts.join("&"));
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const go = id => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); };
  draw();
  app().addEventListener("click", e => {
    const by = e.target.closest("[data-by]");
    if (by) { if (pick.by !== by.dataset.by) { pick.by = by.dataset.by; pick.spec = null; syncUrl(); draw(); } return; }
    const cb = e.target.closest("[data-cls]");
    if (cb) { pick.cls = cb.dataset.cls; if (pick.spec && BYID[pick.spec].cls.slug !== pick.cls) pick.spec = null; syncUrl(); draw(); go("st-spec"); return; }
    const r = e.target.closest("[data-role]");
    if (r) { pick.role = r.dataset.role; if (pick.spec && BYID[pick.spec].role !== pick.role) pick.spec = null; syncUrl(); draw(); go("st-spec"); return; }
    const a = e.target.closest("a[data-spec]");
    if (a) { e.preventDefault(); e.stopPropagation(); pick.spec = a.dataset.spec; syncUrl(); draw(); go("st-hero"); return; }
    const hh = e.target.closest("[data-hero]");
    if (hh) {
      ls.set("wg:spec", pick.spec); ls.set("wg:hero:" + pick.spec, hh.dataset.hero);
      syncUrl();
      location.href = sheetUrl(pick.spec, ls.get("wg:tab") ? "#" + ls.get("wg:tab") : "");
      return;
    }
    const c = e.target.closest("[data-to]");
    if (c) go("st-" + c.dataset.to);
  });
}

// =====================================================================
// 전문화 목록 (/specs/) — 정적 링크는 build.mjs가 만들고, 여기서는 현재 전문화 표시만
// =====================================================================
function specsPage() {
  const saved = ls.get("wg:spec");
  if (saved) document.querySelectorAll(`a[data-spec="${saved}"]`).forEach(a => a.setAttribute("aria-current", "page"));
  if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }
}

// =====================================================================
// 404 (S9): 주소를 로스터와 맞춰 가장 가까운 페이지로
// =====================================================================
function notFoundPage() {
  const dist = (a, b) => { const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]); for (let j = 1; j <= n; j++) d[0][j] = j; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; };
  const best = (x, list) => { let b = null, bd = 3; list.forEach(v => { const dd = dist(x, v); if (dd < bd) { bd = dd; b = v; } }); return b; };
  const segs = location.pathname.slice(BASE.length).split("/").filter(Boolean).map(x => decodeURIComponent(x).toLowerCase());
  let target = null;
  const c = segs[0] && best(segs[0], ROSTER.classes.map(x => x.slug));
  if (c) {
    const cls = ROSTER.classes.find(x => x.slug === c);
    const sp = segs[1] && best(segs[1], cls.specs.map(x => x.slug));
    if (sp) {
      const spec = BYID[`${c}/${sp}`];
      const hs = segs[2] && segs[2] !== "compare" ? best(segs[2], spec.heroes.map(h => h.slug)) : null;
      target = hs && spec.status === "ready" ? guideUrl(spec.id, hs) : sheetUrl(spec.id, location.hash);
    }
  }
  app().innerHTML = `<div class="center"><h1>페이지를 찾지 못했습니다</h1><p>${target ? "가장 가까운 페이지로 이동합니다." : "전문화를 다시 골라 주세요."}</p><p><a class="pill" href="${target || BASE + "?pick"}">${target ? "바로 이동" : "전문화 고르기"}</a></p></div>`;
  setTimeout(() => location.replace(target || BASE + "?pick"), target ? 600 : 1500);
}

// ---------- 시작 ----------
J("data/roster.json").then(r => {
  indexRoster(r);
  const run = { sheet: sheetPage, guide: guidePage, select: selectPage, specs: specsPage, notfound: notFoundPage }[CFG.page];
  return run && run();
}).catch(fail);
})();
