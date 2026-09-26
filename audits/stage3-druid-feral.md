# 3단계: 야성 드루이드 (2026-09-27)

## 출처
- Wowhead 야성 특성 빌드(2026-08-12 갱신): 영웅별 레이드·쐐기·델브 코드와 (Recommended) 표시(`dps-work/_cache/builds-druid-feral.json`)
- Wowhead 야성 쐐기 팁(2026-08-18 갱신): 던전별 유틸 항목(Remove Corruption 해제 대상, Soothe, Typhoon, Ursol's Vortex, 변신으로 벗는 감속), 어픽스 대응
- Wowhead 야성 로테이션(2026-08-12 갱신): 도트 유지, 쿨기 겹치기(Tiger's Fury·Berserk·Convoke the Spirits), 전투 전 준비
- nether.wowhead.com 툴팁 API(영문·한글): 기술 55개
- Wowhead 특성 계산기에서 두 영웅의 쐐기 빌드 선택 노드(`dps-work/_cache/talents-druid-feral.json`)

## 기본 영웅
- Wildstalker. Wowhead 빌드 표에서 쐐기·델브 ★는 Wildstalker에만 있고, 레이드 ★는 Druid of the Claw에 있다.
- 쐐기 팁 페이지의 던전별 추천 코드 8개는 모두 Druid of the Claw 쐐기 코드다. 빌드 구획 문단에 적었다.

## 검증하며 고친 것
- 두 쐐기 빌드 어디에도 없는 특성은 쓰지 않았다: Mighty Bash, Mass Entanglement, Brutal Slash, Lunar Inspiration, Incarnation: Avatar of Ashamane(두 빌드 모두 Berserk: Heart of the Lion). Wowhead가 권하는 Mass Entanglement도 뺐다.
- 한쪽 빌드에만 있는 것은 표시했다: Typhoon·Maim·Tiger Dash·Heart of the Wild와 Ravage 계열(Druid of the Claw), Wild Charge와 Bloodseeker Vines 계열(Wildstalker). 스크립트로 문장마다 표시가 붙었는지 확인했다.
- 해제: Remove Corruption 툴팁 "removing all Curse and Poison effects" → kit.dispel 저주·독. 보스 해제 문장은 `dungeon-dispel-types.txt`에 있는 독만 썼다(Spiteful Venom, Toxic Spores, Heartstop Poison, Poison Splash, Mind-Numbing Poison, Poison Nova, Poison Spit). 보스 기믹에는 저주가 없다.
- 차단: Skull Bash(15초)는 두 쐐기 빌드 모두에 있어 모든 차단 순번 문장에 넣었다. Incapacitating Roar·Typhoon·Maim 카드에는 보스 면역 배지를 달았다.
- 변신으로 이동 방해를 벗는 것은 Cat Form 툴팁("The act of shapeshifting frees you from movement impairing effects")이 근거다. 보스 문장(Regurgitate, Bloodthorn Roots, Cold Claws)은 Wowhead 쐐기 팁이 변신으로 풀린다고 적은 것만 썼다.
- 쿨타임은 두 빌드 공통 특성을 반영했다: Berserk 2분(Berserk: Heart of the Lion), Tiger's Fury 지속 15초(Predator), Barkskin 12초(Improved Barkskin).
- Convoke the Spirits 툴팁의 다른 전문화 갈래 숫자(12·20)를 지우고 야성 값 16회만 남겼다.
- 공통 탭 어픽스는 Wowhead affix 번호(148 Ascendant, 158 Voidbound, 162 Pulsar, 160 Devour) 순서대로 옮겼다.

## 확인 못 한 것
- 보스별 쿨기·생존기 배치는 야성 전용 출처가 없어 로테이션 가이드의 일반 원칙을 적용했다(spec.note).
- Frantic Frenzy와 Feral Frenzy는 두 빌드 모두 선택돼 있다. 계산기에서 두 노드가 모두 찍혀 있어, 쓰는 버튼은 툴팁에 쿨타임이 있는 Frantic Frenzy로 적었다. 둘의 대체 관계는 툴팁에 적혀 있지 않다.
- 게임 안에서 확인하지 않은 것: Incapacitating Roar가 분신·Wild Imp·Lasher에 통하는지(core 문장에 기댐), Typhoon으로 A Knot of Snakes가 풀리는 것(Wowhead 문장), 매크로 동작.
- Heart of the Wild(Druid of the Claw 빌드)는 형태별 효과가 길어 카드와 문장에 쓰지 않았다.
