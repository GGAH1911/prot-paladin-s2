# 조사 도구 (2·3단계에서 쓴 것)

사이트 빌드에는 쓰이지 않는다. 전문화 데이터를 새로 만들거나 패치로 다시 받을 때 쓴다. 파일 안의 캐시·작업 경로(`/Users/insung/.aside/u/0/...`)는 작업한 Mac 기준이니 다른 컴퓨터에서는 맨 위 상수를 바꿔 쓴다.

| 파일 | 하는 일 |
|---|---|
| `builds.mjs` | Wowhead talent builds 가이드의 빌드 표(영웅·이름·추천·코드) 읽기 (`ROLE=healer|dps`) |
| `parse-builds.mjs` | 표 머리에 영웅 기호가 있는 표까지 읽는 개선판 |
| `check-stars.mjs` | 빌드 표를 행 단위로 읽어(추천 = `(Recommended)`/`(Best)` 글자나 `legendary-available` 아이콘) 사이트 가이드의 ★와 대조 |
| `tooltip.mjs` | nether 툴팁(영문·한글)을 받아 사이트 spells 형식으로 정리: meta ' · ', 다른 전문화 문단 제거, 한글 조사 기호, 요구 조건(직업·레벨·무기는 지우고 은신·형태는 meta 끝으로) |
| `lint-tt.mjs` | spells/spellsKo에 남은 요구 조건 표시·전문화 머리글·[전문화: … / …] 갈래 점검 |
| `wh-text.mjs` | Wowhead 가이드 HTML을 읽기 쉬운 글로 변환 |
| `page-dispel.mjs` | 던전 기술 페이지의 Dispel type(+효과로 적용되는 하위 디버프) 수집 |
| `neighbor-dispel.mjs` | 던전 기술 id 뒤 1~6번 중 같은 이름의 별도 디버프를 찾아 해제 종류 수집(Stormslam 381512 → 381515) |
| `role-healer.mjs`, `role-dps.mjs` | 힐러·딜러 역할 층 생성·검사 스크립트 |

- Wowhead(CloudFront)는 한 IP의 연속 요청을 403으로 막는다. 요청 사이 1~2초를 쉬고, 막히면 다른 IP(tme-laptop)에서 받거나 기다린다. nether 툴팁 API는 따로 막히지 않았다.
- 특성 계산기 선택 노드 읽기는 브라우저가 필요하다: `https://www.wowhead.com/talent-calc/blizzard/<code>` 에서 `.dragonflight-talent-trees-tree[data-tree-type]` 별로 `a.dragonflight-talent-tree-talent[data-full="1"],[data-partial="1"]` 의 href `spell=<id>/<slug>`.
