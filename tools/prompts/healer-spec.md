# 힐러 전문화 데이터 만들기 (포크용 공통 지시)

너는 포크다. 탱커 5개(혈기·방어 전사·수호 드루이드·복수 악사·양조 수도사)를 만든 것과 같은 방식으로 **힐러 전문화 하나**의 데이터를 만든다. 사이트 저장소(pages-site)와 git은 건드리지 마라. 결과는 `<작업폴더>/<class>-<spec>/` 폴더에만 쓴다.

## 참고 템플릿 (형식을 그대로 따를 것)
- `<저장소>/data/spec/monk-brewmaster.json`, `monk-brewmaster.guide.json` (해제 가능한 전문화 예)
- `<저장소>/tools/add-spec.mjs` (검사 도구: 끝나면 `node <저장소>/tools/add-spec.mjs <작업폴더>/<폴더> --check` 가 오류 0으로 통과해야 한다)
- `<저장소>/audits/stage1-*.md` (report.md 형식), `<저장소>/audits/research/*/` (조사 원본 예)
- 영웅 slug·한글명: `<저장소>/data/roster.json`
- 던전 기믹 사실: `<저장소>/data/core/dungeons.json` (dungeons·detail), 던전 기술 툴팁 `data/core/spells.en.json`

## 출력 파일
1. `spec.json` — 탱커 spec 파일과 같은 키. 힐러에 맞게:
   - `answers`: 문장 끝 "→" 뒤에 붙는 대응 문구. 키 tankbuster, tankbuster.major, tankbuster.hold(탱커가 큰 한 방을 맞을 때 힐러가 할 일: 예 "탱커에게 {Ironbark}"), dispel.poison, dispel.disease(내가 풀 수 있으면 {해제 기술}, 아니면 "해제 가능한 파티원 담당"), freedom(이동 방해 해제 수단이 있으면 그 기술).
   - `kit.dispel`: 이 전문화가 **아군에게서 풀 수 있는 종류만** {poison|disease|curse|magic: "기술명"}. 해제 기술 툴팁 원문으로 확인하고, 특성이 필요한 종류는 두 쐐기 빌드에서 그 특성을 골랐는지 확인.
   - `general`: 공통 탭. 영웅 운영 2개(hero 필드), "주요 쿨기"(k:"CD": 광역 치유 쿨기·외부 생존기·자기 생존기 쿨타임과 효과, 툴팁 수치), 해제 담당표 {block:"dispel"}, 매크로 {block:"macros"}, "생존·유틸"(k:"Kit"), "어픽스"(k:"Affix", 이번 시즌 어픽스 Devour/Ascendant/Pulsar/Voidbound/Xal'atath's Guile 사실은 혈기 파일 공통 탭 참고).
   - `heroCards`: 영웅별 던전 카드 템플릿. `{busters}`는 그 던전 보스의 탱버 목록으로 바뀐다(외부 생존기 타이밍 안내에 써라).
   - `detail`: 28보스 전부, 보스당 **1~3줄**. 태그 접두는 [탱버]/[차단]/[회피]/[해제]/[위치]/[참고]/[광역 피해]. 이 전문화의 **어떤 쿨기를 어느 기믹에** 쓰는지, 무엇을 해제하는지. 역할 공통(모든 힐러에게 같은 말)은 쓰지 마라: 그건 역할 층이 따로 만든다.
   - `tips`, `spells`, `spellsKo`, `names`(자원 이름 등 한글 클라이언트 명칭), `sources`, `note`(보스 문장 근거의 한계 한 문장), `macros`, `macroNote`, `id`, `updated`("2026-09-27"), `patch`.
2. `guide.json` — 같은 형식. 구획은 힐러용:
   `1. 기본 치유 순환` / `2. 광역 피해 대응` / `3. 해제·외부 생존기` / `4. 자기 생존·차단·부활` / `5. 전투 전 준비` / `6. 유지 버프`(id "upkeep", html에 유지 방법과 Advanced Cooldown Settings 추적 방법) / `특성 빌드 코드`(id "builds", 혈기와 같은 build-row 마크업, 레이드·쐐기·델브, ★=Wowhead 추천).
3. `roster-patch.json` — {"defaultHero", "defaultHeroSource"} (Wowhead 빌드 표의 쐐기 추천 기준. 둘 다면 본문 평가 근거를 적는다)
4. `report.md` — 출처, 검증하며 고친 것, 확인 못 한 것.

## 반드시 지킬 검증 (탱커 때 실제로 틀린 게 나왔다)
- 빌드 코드는 Wowhead 해당 전문화 talent builds 가이드에서. 코드를 `https://www.wowhead.com/talent-calc/blizzard/<코드>`로 열어 `a.dragonflight-talent-tree-talent` 중 `data-full="1"` 또는 `data-partial="1"`인 노드의 href slug로 실제 선택 노드를 읽어라. **두 영웅의 쐐기 빌드 어디에도 없는 특성 기술은 카드·문장·공통 탭에 쓰지 마라.** 한쪽 빌드에만 있으면 "(○○ 빌드)"라고 표시. 기본 기술은 툴팁 meta에 'Talent'가 없는 것으로 판별.
- 모든 쿨타임·수치는 `https://nether.wowhead.com/tooltip/spell/<id>?dataEnv=1&locale=0|1` 툴팁 원문 기준. 정리 규칙은 기존 spells와 같게(meta ' · ', 다른 전문화 문단 제거). 한글 조사 기호 `|1을;를;`은 앞 글자 받침에 맞게 고른다.
- 기믹이 마법인지 물리인지 판단이 필요하면 `data/core/spells.en.json` 해당 기술 설명의 "X damage" 학파로 확인.
- 출처(Wowhead·Icy Veins 해당 힐러 M+ tips, 던전 가이드 힐러 파트)를 우선 찾는다. 없으면 일반 원칙이라고 note에 쓴다.
- 기술·자원·스탯 이름은 항상 영어, 설명은 한국어(완결 문장, 명사화 피하기, 보호 성기사 문장 문체 "~하라/~한다").
- 끝나면 add-spec --check 통과를 확인하고, 폴더 경로와 요약(기본 영웅, 해제 가능 종류, 카드 수, 확인 못 한 것)을 짧게 보고.
