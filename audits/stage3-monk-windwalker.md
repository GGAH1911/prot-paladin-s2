# 3단계: 풍운 수도사 (2026-09-27)

## 출처
- Wowhead 풍운 특성 빌드(2026-08-13 갱신): 영웅마다 레이드 단일·레이드 광역·쐐기·델브 4개 코드와 (Recommended) 표시
- Wowhead 풍운 로테이션(12.1): 단일·광역 우선순위, Zenith·Celestial Conduit·Invoke Xuen·Touch of Death·Touch of Karma·Fortifying Brew 사용법, 전투 전 점검
- Wowhead 풍운 쐐기 팁: 던전별 유틸 평가(독·질병 해제, 격노 해제, 자기 해제, 감속 해제, 광역 감속)와 어픽스 대응
- nether.wowhead.com 툴팁 API(영문·한글): 기술 51개
- 쐐기 빌드 두 개(Shado-Pan "Mythic+ (Weekly Keys)", Conduit of the Celestials "Mythic+ (High Keys)")의 실제 선택 노드: `_cache/talents-monk-windwalker.json`

## 기본 영웅
- Shado-Pan. 빌드 표 본문에서 (Recommended)는 Shado-Pan 레이드 단일·레이드 광역, Conduit of the Celestials 델브에만 붙어 있고 쐐기 행에는 없다(`builds-index.md`의 "★ 두 영웅 모두"는 표 파서가 앞 행의 표시를 끌어온 것으로 보인다). 쐐기 절 본문이 "Shado-pan is the recommended Hero Talents"라고 쓰고, Conduit은 "높은 단수·조율된 파티에서 더 강할 수 있지만 쿨기 타이밍이 엄격하다"고 평가해 Shado-Pan으로 정했다.
- 가이드 빌드 칸의 ★도 본문의 (Recommended) 표시를 따랐다(쐐기 행은 ★ 없음).

## 검증하며 고친 것
- 두 쐐기 빌드에 없는 특성은 쓰지 않았다: Strike of the Windlord, Slicing Winds, Diffuse Magic(Wowhead가 자기 마법 해제로 "Required"라 하지만 빌드에 없음), Swift Art, Improved Detox(풍운 Detox 툴팁이 이미 독·질병 해제).
- 한쪽 빌드에만 있는 특성은 표시했다: Flurry Strikes·Shado Over the Battlefield·Stand Ready·Stillstep Coil·Efficient Training(Shado-Pan), Invoke Xuen·Heart of the Jade Serpent·Vivacious Vivification(Conduit of the Celestials). 영웅 전용 카드는 그 영웅 가이드에만 넣었다. Celestial Conduit(443028)은 Conduit 빌드가 고른 영웅 노드 1248989가 주는 기술이다.
- 기본 기술(툴팁 meta에 Talent 없음): Leg Sweep, Touch of Karma, Touch of Death, Roll, Flying Serpent Kick, Expel Harm, Vivify, Spinning Crane Kick, Tiger Palm, Blackout Kick.
- 쿨타임은 두 빌드 공통 특성을 반영했다: Touch of Death 1분 30초(Fatal Touch), Fortifying Brew 5분 30초(Expeditious Fortification), Roll 3회 충전 15초(Celerity), Leg Sweep 반경 10야드(Tiger Tail Sweep). Zenith는 1분 30초 충전 2회이고 Shado-Pan은 Efficient Training으로 10초 줄어든다고 적었다.
- 해제: Detox 툴팁 "Removes all Poison and Disease effects" → kit.dispel 독·질병. 보스 해제 문장은 `dungeon-dispel-types.txt`에 있는 것만: Regurgitate(질병), Spiteful Venom·Toxic Spores·Heartstop Poison·Mind-Numbing Poison/Poison Splash·Poison Nova·Poison Spit(독), Wretched Discharge(질병).
- Pressure Points(두 빌드)로 Paralysis가 격노를 지운다. 격노는 대부분 일반몹이라 공통 탭 유틸에만 적었다.
- 툴팁 손질: Fortifying Brew(양조 Stagger 갈래), Vivify(운무 Invigorating Mists 갈래), Expel Harm(Healing Sphere·Reverse Harm 갈래), Touch of Death(양조·옛 효과 갈래)를 풍운 문장만 남겼다.
- 상세 문장의 쉼표 이름 "Invoke Xuen, the White Tiger"는 "Invoke Xuen" 별칭으로 쓰고 tips·names에 같은 id(123904)를 넣었다.
- core tips와 이름이 겹치는 전문화 기술은 없었다(스크립트 확인).

## 확인 못 한 것
- Fortifying Brew의 풍운 툴팁에는 수치가 없다("15초 동안 피부가 돌로 변한다"). 최대 생명력 증가로 Touch of Death·Touch of Karma가 강해진다는 문장은 Wowhead 로테이션만 근거다.
- Tiger's Lust로 Bloodthorn Roots와 Devour 효과를 푸는 것, Condensed Mass 감속을 푸는 것은 툴팁("removes all roots and snares")과 Wowhead 문장에서 끌어냈고 게임에서 확인하지 않았다.
- Leg Sweep·Ring of Peace가 분신·Wild Imp·Animated Gold·Faithless Tormentor에 통하는지는 core 문장에 기댔다.
- Touch of Karma로 Galvanized·Echoing Fury 피해를 흡수하는 것은 툴팁의 "모든 피해 흡수"에서 끌어낸 일반 원칙이다.
- 매크로는 게임에서 시험하지 않았다.

- (부모 보완) Wowhead 빌드 표는 "(Recommended)" 글자 대신 추천 아이콘(legendary-available)으로 Current Recommendations를 표시한다. 아이콘 기준으로 Shado-Pan 쐐기(Weekly Keys), Conduit 레이드 2행·쐐기(High Keys)에 ★를 더했다. 기본 영웅은 본문 평가대로 Shado-Pan을 유지한다.
