# 3단계: 비전 마법사 (2026-09-27)

## 출처
- Wowhead 비전 특성 빌드(2026-08-31 갱신): 빌드 6개(영웅 2개 × 레이드·쐐기·델브)와 ★ 표시
- Wowhead 비전 쐐기 팁: 던전별 유틸 평가(Spellsteal, Remove Curse, Energized Barriers, Greater Invisibility, Blink, Ring of Frost)와 던전별 팁 한두 줄, 어픽스 대응
- Wowhead 비전 로테이션: 우선순위, Arcane Surge·Touch of the Magi 사용 시점, Prismatic Bolt, 전투 전 점검(Arcane Intellect, Prismatic Barrier, Mirror Image)
- nether.wowhead.com 툴팁 API(영문·한글): 기술 101개(공용 `_tools/tooltip.mjs`)
- 쐐기 빌드 두 개의 실제 선택 노드: 부모가 미리 받아 둔 `_cache/talents-mage-arcane.json`

## 기본 영웅
- Sunfury. Wowhead 빌드 표에서 레이드·쐐기·델브 ★가 모두 Sunfury에만 붙어 있고, 로테이션 가이드도 "모든 콘텐츠에 Sunfury"를 권한다.

## 검증하며 고친 것
- 두 쐐기 빌드에 없는 특성은 쓰지 않았다: Arcane Familiar, Evocation(둘 다 툴팁에 Talent), Dragon's Breath, Ring of Frost, Mass Barrier, Blast Wave, Ice Nova, Kleptomania. Wowhead 팁이 권하는 Ring of Frost·Dragon's Breath는 빌드에 없어 뺐다.
- 한쪽 빌드에만 있는 특성은 표시했다: High Voltage(Sunfury 빌드), Orb Mastery(Spellslinger 빌드). 영웅 트리 특성은 해당 영웅 가이드·운영 칸에만 넣었다.
- 차단: Counterspell은 기본 기술(툴팁에 Talent 없음)이고, 두 빌드의 Quick Witted로 25초 → 20초.
- 해제: Remove Curse(저주)가 두 빌드 모두에 있어 kit.dispel = {curse}. 적에게 쓰는 Spellsteal은 "생존·유틸"에 넣었다.
- freedom: 두 빌드가 고른 Energized Barriers("Casting your barrier removes all snare effects")로 Prismatic Barrier를 걸면 감속이 풀린다. Shimmer 툴팁에는 기절·속박 해제 문구가 없어 쓰지 않았다(Blink는 Shimmer로 대체됨).
- 쿨타임은 두 빌드 공통 특성을 반영: Ice Block 3분(Winter's Protection·Permafrost Bauble), Ice Cold로 6초 70% 감소, Mirror Image 1분 30초(Improved Conjuration), Alter Time 55초(Master of Time), Shimmer 27초·충전 2회(Flow of Time·Spatial Manipulation), Prismatic Barrier 충전 2회·마법 피해 20% 감소(Improved Prismatic Barrier).
- Greater Invisibility 1분은 Master of Escape 툴팁이 "Invisibility"를 60초 줄인다고만 적어 Wowhead의 "1-minute Invis" 문장을 근거로 표시했다.
- 툴팁 손질: Arcane Missiles 설명 첫 줄 "Requires Clearcasting"을 meta 끝으로 옮겼다. Spellsteal은 빌드에 없는 Kleptomania 갈래를 빼고 기본 문장만 남겼다.
- Prismatic Bolt는 발동 기술(1295924)과 특성(1295946)이 이름이 같아, 문장 속 이름은 발동 기술 툴팁으로 이었다(tips). 가이드에는 두 카드를 모두 둔다.
- 피해 학파: Prismatic Barrier(마법 피해 감소)는 core 툴팁에서 자연·암흑·화염 피해인 기믹(Ritual Venom, Echoing Fury, Toxic Aura, Dark Bloom, Infernal Crush, Inferno, Galvanized)에만 권했고, 물리 광역(Monstrous Roar, Killing Spree)에는 Mirror Image를 권했다.
- 해제 종류는 `dungeon-dispel-types.txt` 기준: Glacial Torment·Corroding Spittle은 마법 효과라 Prismatic Barrier의 "해로운 마법 효과 지속 25% 감소"만 썼다.

## 확인 못 한 것
- 보스별 비전 전용 출처는 Wowhead 던전별 한두 줄뿐이다. 나머지는 일반 원칙을 적용했고 spec.note에 적었다.
- 다음은 Wowhead 문장만 근거이고 게임에서 확인하지 않았다: Greater Invisibility로 Bloodthorn Roots 벗어나기, Boneslicer 피하기, Void Cascade 피하기, Shimmer로 Malefic Wave 넘기, Serpentine Gust 시야 가리기.
- Supernova로 쫄 시전을 늦추는 것은 띄우기 효과에서 끌어낸 것이고, 각 쫄에 통하는지는 확인하지 않았다(보스 면역 배지).
- Wowhead의 Spellsteal 대상(Bound by Shadow, Blaze of Glory, Stormcloud Barrier, Accumulate Charge)과 Remove Curse 대상(Curse of Doom, Hex, Insatiable Hunger)은 대부분 일반몹 기술이라 공통 탭에만 적었다.
- Prismatic Barrier 흡수량은 공식(생명력 30% × 유연성)만 있어 "생명력 30%"로 적었다.
- 매크로는 게임에서 시험하지 않았다.
