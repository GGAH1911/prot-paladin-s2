# 쐐기 치트시트 (한밤 2시즌)

https://ggah1911.github.io/prot-paladin-s2/

- `index.html` 첫 화면(직업 또는 역할 → 전문화 → 영웅 특성). 저장된 전문화가 있으면 바로 치트시트로 이동
- `<직업>/<전문화>/` 치트시트, `<직업>/<전문화>/<영웅>/` 스킬 가이드, `specs/` 전체 목록
- `assets/` 엔진(app.js, app.css), `data/` 층별 데이터(roster, core 던전 공용, role 역할, spec 전문화)
- `tools/build.mjs` 로스터와 데이터에서 페이지 셸을 다시 만든다: `node tools/build.mjs`
- `tools/migrate-v1.mjs` 옛 단일 파일에서 데이터를 옮긴 1회용 스크립트(기록용)
- `design/` 확장 설계 문서, `audits/` 검수 기록
