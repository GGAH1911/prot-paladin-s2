# 3단계: 딜러 역할 층과 전문화 27개 (2026-09-27)

## 결과
| 전문화 | 기본 영웅 | 아군 해제("나") | 보스 문장 | 기술 | 가이드 카드 | 기록 |
|---|---|---|---|---|---|---|
| 무기 전사 | Slayer | 없음 | 65 | 58 | 47 | [stage3-warrior-arms.md](stage3-warrior-arms.md) |
| 분노 전사 | Mountain Thane | 없음 | 72 | 59 | 46 | [stage3-warrior-fury.md](stage3-warrior-fury.md) |
| 징벌 성기사 | Herald of the Sun | 독 (Cleanse Toxins), 질병 (Cleanse Toxins) | 64 | 54 | 48 | [stage3-paladin-retribution.md](stage3-paladin-retribution.md) |
| 야수 사냥꾼 | Pack Leader | 없음 | 72 | 54 | 52 | [stage3-hunter-beast-mastery.md](stage3-hunter-beast-mastery.md) |
| 사격 사냥꾼 | Sentinel | 없음 | 59 | 61 | 49 | [stage3-hunter-marksmanship.md](stage3-hunter-marksmanship.md) |
| 생존 사냥꾼 | Sentinel | 없음 | 65 | 68 | 50 | [stage3-hunter-survival.md](stage3-hunter-survival.md) |
| 암살 도적 | Fatebound | 없음 | 66 | 49 | 46 | [stage3-rogue-assassination.md](stage3-rogue-assassination.md) |
| 무법 도적 | Trickster | 없음 | 65 | 63 | 53 | [stage3-rogue-outlaw.md](stage3-rogue-outlaw.md) |
| 잠행 도적 | Deathstalker | 없음 | 66 | 57 | 49 | [stage3-rogue-subtlety.md](stage3-rogue-subtlety.md) |
| 암흑 사제 | Archon | 질병 (Purify Disease) | 60 | 65 | 49 | [stage3-priest-shadow.md](stage3-priest-shadow.md) |
| 냉기 죽음의 기사 | Deathbringer | 없음 | 66 | 54 | 53 | [stage3-death-knight-frost.md](stage3-death-knight-frost.md) |
| 부정 죽음의 기사 | San'layn | 없음 | 62 | 61 | 50 | [stage3-death-knight-unholy.md](stage3-death-knight-unholy.md) |
| 정기 주술사 | Farseer | 저주 (Cleanse Spirit), 독 (Poison Cleansing Totem) | 56 | 61 | 47 | [stage3-shaman-elemental.md](stage3-shaman-elemental.md) |
| 고양 주술사 | Stormbringer | 저주 (Cleanse Spirit), 독 (Poison Cleansing Totem) | 57 | 63 | 46 | [stage3-shaman-enhancement.md](stage3-shaman-enhancement.md) |
| 비전 마법사 | Sunfury | 저주 (Remove Curse) | 60 | 101 | 52 | [stage3-mage-arcane.md](stage3-mage-arcane.md) |
| 화염 마법사 | Sunfury | 저주 (Remove Curse) | 62 | 49 | 49 | [stage3-mage-fire.md](stage3-mage-fire.md) |
| 냉기 마법사 | Frostfire | 저주 (Remove Curse) | 59 | 104 | 44 | [stage3-mage-frost.md](stage3-mage-frost.md) |
| 고통 흑마법사 | Soul Harvester | 없음 | 58 | 53 | 42 | [stage3-warlock-affliction.md](stage3-warlock-affliction.md) |
| 악마 흑마법사 | Diabolist | 마법 (Singe Magic) | 61 | 66 | 56 | [stage3-warlock-demonology.md](stage3-warlock-demonology.md) |
| 파괴 흑마법사 | Diabolist | 없음 | 65 | 59 | 52 | [stage3-warlock-destruction.md](stage3-warlock-destruction.md) |
| 풍운 수도사 | Shado-Pan | 독 (Detox), 질병 (Detox) | 60 | 51 | 50 | [stage3-monk-windwalker.md](stage3-monk-windwalker.md) |
| 조화 드루이드 | Elune's Chosen | 저주 (Remove Corruption), 독 (Remove Corruption) | 70 | 57 | 54 | [stage3-druid-balance.md](stage3-druid-balance.md) |
| 야성 드루이드 | Wildstalker | 저주 (Remove Corruption), 독 (Remove Corruption) | 69 | 55 | 45 | [stage3-druid-feral.md](stage3-druid-feral.md) |
| 파멸 악마사냥꾼 | Fel-Scarred | 없음 | 61 | 57 | 52 | [stage3-demon-hunter-havoc.md](stage3-demon-hunter-havoc.md) |
| 포식 악마사냥꾼 | Annihilator | 없음 | 60 | 56 | 48 | [stage3-demon-hunter-devourer.md](stage3-demon-hunter-devourer.md) |
| 황폐 기원사 | Scalecommander | 독 (Expunge), 저주 (Cauterizing Flame), 질병 (Cauterizing Flame), 출혈 (Cauterizing Flame) | 60 | 55 | 52 | [stage3-evoker-devastation.md](stage3-evoker-devastation.md) |
| 증강 기원사 | Scalecommander | 독 (Expunge), 질병 (Cauterizing Flame), 저주 (Cauterizing Flame), 출혈 (Cauterizing Flame) | 61 | 51 | 48 | [stage3-evoker-augmentation.md](stage3-evoker-augmentation.md) |

- 27개 모두 `add-spec --check` 오류 0·경고 0, 툴팁 점검(`dps-work/_tools/lint-tt.mjs`: 요구 조건 표시·다른 전문화 머리글·[전문화: … / …] 갈래) 0건. 조사 폴더 사본은 `audits/research/<class>-<spec>/`.
- 이로써 40개 전문화 전부 ready.

## 딜러 역할 층 (`data/role/dps.json`)
- `detail`: 28보스 108줄(보스당 3~4줄). 우선 처치·제어·차단 담당·딜 쿨기 구간·딜러 소크를 딜러 공통 시점으로 썼고 특정 딜러 기술 이름은 쓰지 않았다.
- `brief`: 처음 44개 중 core 보스 요약과 같은 기술·태그를 되풀이하는 23개를 빼고 21개. 힐러 역할 층 요약도 같은 기준으로 겹치는 2개(Atroxus 독, Xathuux Legion Strike)를 뺐다.

## 진행 중 바로잡은 것
- **Stormslam 해제**: 시전 기술 381512와 따로 걸리는 디버프 381515가 있고 디버프는 **Magic**이다(암흑 사제 포크 발견). 2단계에서 뺀 힐러 해제 문장을 역할 층과 힐러 7개에 넣었다. 던전 기술 401개의 id 뒤 1~6번을 nether 툴팁으로 훑어 같은 이름의 별도 디버프를 찾았고(`audits/research/dungeon-dispel-same-name.txt`), 새로 나온 것은 Stormslam뿐이었다(Glacial Torment·Cold Claws는 이미 반영).
- **어픽스 이름**: Wowhead affix 툴팁 기준 160 Devour(균열이 플레이어 정수를 먹는 파티 디버프), 158 Voidbound(Voidbound Emissary가 주변 적을 강화), 162 Pulsar, 148 Ascendant. 이름이 섞인 5곳(암흑 사제, 화염 마법사, 냉기 죽음의 기사, 무법 도적, 정기 주술사·복원 주술사)을 고쳤다.
- **★(Wowhead 추천)**: 빌드 표는 "(Recommended)" 글자 대신 추천 아이콘(`wow-atlas-quest-legendary-available`)만 쓰는 경우가 많다. 행 단위로 다시 읽는 점검 도구(`dps-work/_tools/check-stars.mjs`)로 40개 가이드를 대조해 풍운 수도사(4행)·부정 죽음의 기사(1행)를 고쳤고, 나머지는 표와 일치한다.
- **한글 모드 반쯤 번역**: 통칭 "Holy Word"(신성 사제), 다른 id로 연결한 "Infernal Bolt"(악마 흑마법사), 매크로 제목 "Soulburn + Teleport"(파괴 흑마법사)가 "신성 Word"·"지옥불정령 Bolt"처럼 섞여 나와 정확한 기술 이름과 names 사전으로 고쳤다. 40개 전부 한글 모드에서 한글·영문이 섞인 기술 이름 0.
- **툴팁 도구**: 설명 앞 "Requires Melee Weapon" 표시 때문에 다른 전문화 문단이 걸러지지 않던 문제를 고쳤고, 직업·레벨·무기 조건만 지우고 은신·형태 조건("Requires Stealth", "Requires Cat Form")은 meta 끝에 남기게 했다. 분노 전사는 고치기 전 도구로 받은 툴팁 13개를 다시 받았다.
- **Wowhead 요청 제한**: 한 IP에서 연속 요청하면 CloudFront가 403으로 막는다. 조사 도중 이 Mac과 tme-laptop이 모두 잠시 막혀 화염·냉기 마법사가 Icy Veins 위주로 만들어졌고, 막힘이 풀린 뒤 화염 마법사에 Wowhead 쐐기 팁을 보강했다(보스 문장 +6).

## 검증
- 새 전문화: 영문·한글 × 영웅 2개 × 9탭에서 오류 화면·`{…}`·`|1`·`undefined`·`NaN` 없음, 공통 탭 해제 담당표·툴팁(실제 hover), 가이드 두 개의 카드 아이콘·카드 툴팁·빌드 코드 3개 이상. 27개 문제 0.
- **보호 성기사 무변경**: 옛 사이트 14cf529 대비 영문·한글 × Templar·Lightsmith × 9탭 = 36조합, `#main` 텍스트 대소문자 무시 차이 **0**(3단계 중 두 번, 머지 전 마지막 한 번).
- 전문화 목록: 40개 링크, "준비 중" 배지 0.

## 확인 못 한 것 (공통)
- 보스별 전문화 전용 출처는 대부분 Wowhead 던전별 한두 줄이라 쿨기·생존기 배치는 일반 원칙을 적용했고 각 `spec.note`에 적었다.
- 제어기(기절·광역 제어)가 분신·쫄에 통하는지, 이동기·무적기로 특정 기믹을 푸는 것, 매크로 동작은 게임 안에서 확인하지 않았다. 전문화별 목록은 각 기록 파일에 있다.
- core 층의 Searing Blows "출혈" 표기(툴팁상 Searing Wounds는 화염 도트)는 보호 성기사 화면에도 나오는 문장이라 그대로 뒀다.
