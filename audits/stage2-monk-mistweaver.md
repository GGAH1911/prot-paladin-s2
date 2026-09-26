# 2단계: 운무 수도사 (2026-09-27)

## 출처
- Wowhead 운무 특성 빌드(2026-09-05 갱신): 코드 6개와 (Recommended) 표시. 레이드·쐐기·델브 모두 Conduit of the Celestials에만 추천 표시.
- Wowhead 운무 쐐기 팁(2026-09-05 갱신): 운무는 차단기가 없다는 평가, 던전별 해제 대상(Improved Detox를 7개 던전에서 필수), 어픽스 대응(Ascendant에 Tiger Tail Sweep·Ring of Peace, Void Emissary에 Touch of Death·Fatal Touch, Devour 흡수 효과는 Detox → Tiger's Lust).
- Wowhead 운무 로테이션(2026-09-05 갱신): 쐐기 우선순위(Thunder Focus Tea 쿨마다, 5대상 이상 Spinning Crane Kick), 큰 피해 전 준비 순서(Renewing Mist 충전 소진 → Soothing Mist → Enveloping Mist 3~4번 → Rising Sun Kick), Revival은 치유 뒤 해제, Life Cocoon 활용.
- nether.wowhead.com 툴팁 API(영문·한글): 기술 65개.
- Wowhead 특성 계산기에서 쐐기 빌드 2개의 선택 노드(부모가 미리 읽은 `_cache/talents-monk-mistweaver.json`). 두 빌드는 직업·전문화 트리가 같고 영웅 트리만 다르다.

## 기본 영웅
- Conduit of the Celestials. 쐐기 (Recommended)가 Conduit of the Celestials에만 붙어 있음.

## 검증하며 고친 것
- Spear Hand Strike, Diffuse Magic, Dampen Harm, Summon Jade Serpent Statue(직접 소환), Soothe, Swift Art는 두 쐐기 빌드 어디에도 없어 쓰지 않음. Wowhead 쐐기 팁이 던전별로 권하는 Soothe·Diffuse Magic·Swift Art 교체도 같은 이유로 문장에 넣지 않음.
- Teachings of the Monastery는 툴팁에 Talent가 있는데 두 빌드의 선택 노드에 없어 카드·문장에서 뺌.
- 차단기가 없으므로 [차단] 대신 [제어] 태그로 Leg Sweep·Paralysis·Ring of Peace를 씀. Leg Sweep(1분)·Touch of Death·Roll·Resuscitate·Reawaken·Vivify·Renewing Mist·Detox는 툴팁에 Talent가 없는 기본 기술.
- Detox 툴팁은 "Removes all Magic effects", Improved Detox는 "additionally removes all Poison and Disease effects"이고 두 쐐기 빌드 모두 선택 → kit.dispel 마법·독·질병.
- 해제 문장은 `_cache/boss-dispel-types.txt`에 종류가 있는 것만 씀(Regurgitate 질병, Spiteful Venom·Toxic Spores·Heartstop Poison·Poison Nova·Poison Spit 독, Bloodthorn Roots·Glacial Torment·Corroding Spittle 마법, Wretched Discharge 질병). Stormslam·Mind-Numbing Poison은 해제하라고 쓰지 않음.
- Revival 툴팁: "clears them of 3 harmful Magic, all Poison, and all Disease effects" → 여러 명 해제용으로 안내.
- Fortifying Brew 툴팁은 양조·풍운 문단이 섞여 나와 운무에 맞는 첫 문장("Turns your skin to stone for 15 sec.")만 남김. Blackout Kick의 풍운 계산식도 뺌.
- 쿨타임은 툴팁 기본값에 빌드 특성 수치를 더해 씀: Life Cocoon 2분 − Chrysalis 45초 = 1분 15초, Invoke Chi-Ji 2분 − Gift of the Celestials 1분 = 1분(지속 12초), Paralysis 45초 − Ancient Arts 15초 = 30초, Leg Sweep 1분 − 10초 = 50초, Touch of Death 3분 − Fatal Touch 90초 = 1분 30초, Fortifying Brew 6분 → 툴팁 주석의 Expeditious Fortification 값 5.5분.
- 상세 문장에서 "Invoke Chi-Ji, the Red Crane"은 쉼표 때문에 이름 전체가 한 번에 감싸지지 않아, 상세 문장에는 "Invoke Chi-Ji"로 쓰고 tips·names에 같은 id(325197) 별칭을 넣음. 공통 탭·영웅 카드는 전체 이름.

## 확인 못 한 것
- 보스별 운무 대응은 던전별 운무 전용 공략이 없어 일반 원칙을 적용함(spec.note).
- Mana Tea·Sheilun's Gift 툴팁의 일부 수치가 0으로 나와 숫자를 쓰지 않음. Fortifying Brew의 피해 감소율은 운무 문단에 없어 쓰지 않음.
- Life Cocoon 흡수 보호막이 Legion Strike의 치유 감소에 영향을 받지 않는다는 점은 흡수 보호막이 치유가 아니라는 일반 원칙으로 쓴 것이고 게임에서 확인하지 않음.
- Soothing Mist·Enveloping Mist가 NPC인 Avatar of Sethraliss를 치유하는지 게임에서 확인하지 않음(직접 치유 대상 기믹이라 단일 치유만 안내).
- Icy Veins 운무 쐐기 팁은 읽지 않음(Wowhead 3개 페이지로 대신함).
