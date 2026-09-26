# 2단계: 힐러 역할 층과 전문화 7개 (2026-09-27)

## 결과
| 전문화 | 기본 영웅 | 해제("나") | 보스 문장 | 기술 | 가이드 카드 | 기록 |
|---|---|---|---|---|---|---|
| 신성 성기사 | Herald of the Sun | 마법·독·질병 (Cleanse) | 61 | 57 | 40 | [stage2-paladin-holy.md](stage2-paladin-holy.md) |
| 수양 사제 | Voidweaver | 마법 (Purify) | 72 | 62 | 38 | [stage2-priest-discipline.md](stage2-priest-discipline.md) |
| 신성 사제 | Oracle | 마법 (Purify) | 64 | 52 | 46 | [stage2-priest-holy.md](stage2-priest-holy.md) |
| 복원 주술사 | Totemic | 마법·저주 (Purify Spirit), 독 (Poison Cleansing Totem) | 74 | 62 | 39 | [stage2-shaman-restoration.md](stage2-shaman-restoration.md) |
| 운무 수도사 | Conduit of the Celestials | 마법·독·질병 (Detox) | 66 | 65 | 46 | [stage2-monk-mistweaver.md](stage2-monk-mistweaver.md) |
| 회복 드루이드 | Wildstalker | 마법·저주·독 (Nature's Cure) | 76 | 72 | 55 | [stage2-druid-restoration.md](stage2-druid-restoration.md) |
| 보존 기원사 | Flameshaper | 마법·독 (Naturalize), 저주·질병·출혈 (Cauterizing Flame) | 72 | 61 | 42 | [stage2-evoker-preservation.md](stage2-evoker-preservation.md) |

- 7개 모두 `node tools/add-spec.mjs <폴더> --check` 오류 0, 경고 0. 조사 폴더 사본은 `audits/research/<class>-<spec>/`.
- 차단기가 두 쐐기 빌드 어디에도 없는 전문화: 신성 성기사(Rebuke), 운무 수도사(Spear Hand Strike), 회복 드루이드(Skull Bash), 보존 기원사(Quell). 이 전문화들은 차단을 쓰지 않고 기절·제어 수단을 `[제어]`/`[차단]` 대체 수단으로 적었다.
- 신성·수양 사제 Oracle은 Wowhead 표에 델브 빌드가 없어, 델브 칸을 "델브 (Archon 빌드)"/"델브 (Voidweaver 빌드)"로 이름 붙여 채웠다(★ 없음).

## 힐러 역할 층 (`data/role/healer.json`)
- `detail`: 28보스 111줄(보스당 3~4줄). 특정 힐러 기술 이름은 쓰지 않았다.
- `brief`: 보스 요약 카드에 덧붙는 항목 38개. html 안 이름은 전부 `data/core/spells.en.json` 이름과 같고 그 던전 core tips에 있음(스크립트로 확인). 독·질병 항목은 `{m:"dispel.poison|disease"}`를 달아 전문화 답(예: "→ Cleanse")이 붙는다.
- `answers`: 전문화가 준비되기 전 일반 문구.
- 해제 종류는 nether 툴팁의 buff 칸(Magic/Poison/Disease/Curse/Bleed) 기준으로만 썼다. 확인된 보스 해제: Regurgitate(질병), Spiteful Venom·Toxic Spores·Heartstop Poison·Poison Nova·Poison Spit(독), Glacial Torment(연결 디버프 1235549)·Corroding Spittle·Bloodthorn Roots(마법), Wretched Discharge(질병).

## core 층과 어긋나는 점 (고치지 않고 기록만 함)
- **Stormslam**(Kyrakka & Erkhart): core는 "힐러가 다음 Stormslam 전에 탱커 디버프를 해제한다"고 쓰지만, 툴팁 buff 칸에 해제 종류가 없다. 역할 층은 해제 대신 "다음 Stormslam 전에 탱커 체력을 가득 채워라"로 썼다.
- **Mind-Numbing Poison**(Atroxus): core 요약은 `dispel.poison` 항목이지만 툴팁에 해제 종류가 없다. 역할 층은 "장판을 밟지 마라"로 썼다.
- **Searing Blows**(Kokia): core 요약은 "출혈 중첩"이라고 쓰지만, 툴팁상 Searing Wounds는 화염 도트다.
- 모두 게임 안에서 확인할 필요가 있다. core 문장은 탱커·보호 성기사 화면에도 나오므로 이번 단계에서 바꾸지 않았다.

## 엔진 변경 (`assets/app.js`)
1. 상세 공략 `abWrap`: `Power Word: Shield`, `Holy Word: Serenity`처럼 콜론이 든 이름을, 그 이름이 tips(core·전문화)나 한글 사전에 있을 때만 한 덩어리로 감싼다. 전에는 "Power Word"와 "Shield"로 쪼개져 툴팁·한글 변환이 안 됐다.
2. `decorateTips`: 상세 공략의 공용·역할 블록(`.deepbody` 안, `.dblk.spec` 밖)에서는 전문화 tips를 쓰지 않는다. 기원사 기술 Echo가 Den of Nalorakk의 "Echo"(Echo of Nalorakk 약칭)에 붙던 문제를 막는다.
- 쉼표가 든 이름(예: Invoke Chi-Ji, the Red Crane)은 여전히 한 덩어리로 못 감싼다. 운무는 상세 문장에 "Invoke Chi-Ji" 별칭을 쓰고 tips에 같은 id를 넣었다.

## 검증
- 로컬 `tools/dev/pages-sim.mjs`(포트 8972)와 옛 사이트 `14cf529`(포트 8973)로 비교.
- **보호 성기사 무변경**: 옛 저장값 `pp-tiplang`·`pp-hero` / 새 저장값 `wg:lang`·`wg:hero:paladin/protection`, 영문·한글 × Templar·Lightsmith 4조합 × 9탭 = 36조합, 상세 전부 펼친 `#main` 텍스트 대소문자 무시 차이 **0**. 역할 층 추가 뒤, 엔진 변경 1 뒤, 엔진 변경 2와 전문화 7개 반영 뒤 세 번 돌렸고 모두 0. 엔진 변경 2 전후로 보호 성기사 9탭의 툴팁 연결(이름=id) 목록도 똑같다.
- **새 전문화 7개**: 영문·한글 × 영웅 2개 × 9탭에서 오류 화면·`{…}`·`|1`·`undefined`·`NaN` 없음. 공통 탭 해제 담당표와 "나" 표시, 공통 탭 툴팁(실제 hover), 가이드 두 개의 카드 아이콘·카드 툴팁(hover)·빌드 코드 3개 이상을 확인했다. 문제 0.
- 회귀: 혈기 죽음의 기사·양조 수도사 화면도 같은 검사로 문제 0.
- 문장 안 기술 이름이 한글로 들어간 곳: 스크립트로 한글 툴팁 이름을 대조해 0건.

## 확인 못 한 것 (공통)
- Wowhead·Icy Veins의 던전별 힐러 팁은 대부분 "Coming Soon"이라, 보스별 문장은 전문화마다 일반 원칙을 적용했고 각 `spec.note`에 적었다.
- 매크로와 일부 상호작용(예: Bloodthorn Roots 마법 해제, 제어기로 시전 끊기, NPC Avatar에 광역 치유가 들어가는지)은 게임 안에서 확인하지 않았다. 전문화별 목록은 각 기록 파일에 있다.
