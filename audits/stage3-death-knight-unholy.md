# 3단계: 부정 죽음의 기사 (2026-09-27)

## 출처
- Wowhead 부정 특성 빌드(2026-09-05 갱신): 빌드 5개(Rider: Single Target·M+/Delves/Cleave·Open World★, San'layn: Single Target/Cleave★·M+/Delves★)
- Wowhead 부정 쐐기 팁: 던전별 유틸 평가(Death Grip·Raise Ally·Anti-Magic Zone·Mind Freeze), 던전별 팁(Anti-Magic Shell·Death's Advance·Death Grip 사용처), 어픽스 대응
- Wowhead 부정 로테이션(Midnight 시즌 2): 단일·광역 우선순위, Forbidden Knowledge 구간 우선순위, Army of the Dead·Dark Transformation 동기화, 전투 전 Raise Dead
- nether.wowhead.com 툴팁 API(영문·한글): 기술 61개
- 쐐기 빌드 2개의 실제 선택 노드: 부모가 받아 둔 `_cache/talents-death-knight-unholy.json`(특성 계산기 data-full/data-partial)
- Wowhead 페이지는 tme-laptop에서 받음(이 Mac IP의 CloudFront 차단 회피)

## 기본 영웅
- San'layn. 빌드 표에서 쐐기(M+/Delves) ★는 San'layn에만 있다. Rider의 ★는 필드(Open World) 빌드에만 있다.

## 빌드 칸 채운 방법
- 표에 델브 전용 행이 없고 쐐기 행 이름이 "M+/Delves"(San'layn), "M+/Delves/Cleave"(Rider)라 델브를 겸한다. 그래서 델브 칸은 "델브 (M+/Delves 행과 같은 코드)"로 이름을 밝혀 같은 코드를 한 번 더 넣었다(★ 없음).
- 레이드 칸은 단일 대상 행(San'layn "Single Target/Cleave"★, Rider "Single Target")을 넣었다. Rider는 필드(Open World)★ 행도 네 번째로 넣었다.

## 검증하며 고친 것
- 쐐기 빌드 두 개 모두에 없는 특성은 쓰지 않음: Asphyxiate, Lichborne, Grip of the Dead(Wowhead 쐐기 팁은 "Must Have"로 소개하지만 두 쐐기 빌드에 선택되지 않음), Coil of Devastation·Unholy Devotion(Rider 빌드에만 있으나 이 가이드에서 쓰지 않음).
- 한쪽 빌드에만 있는 특성은 표시: Death Pact·Death Defiance·Blightfall·Vampiric Strike 계열(San'layn), Wraith Walk·Outnumber·기수 계열(Rider). 스크립트로 두 빌드와 대조했다.
- 기본 기술(툴팁에 Talent 없음): Death Grip, Anti-Magic Shell, Death's Advance, Raise Ally, Chains of Ice, Death and Decay, Death Coil, Epidemic, Festering Strike, Raise Dead.
- 쿨타임: Anti-Magic Shell 1분 → Anti-Magic Barrier(두 빌드)로 40초·지속과 흡수량 40% 증가. Death's Advance·Death Grip은 Death's Echo(두 빌드)로 2회 충전. Death Grip 사거리는 Death's Reach로 10미터 증가. Death Pact 2분 → Death Defiance로 1분 30초.
- 피해 학파는 core 툴팁으로 확인해 마법 피해(Nature·Shadow·Holy·Fire·Frost·Chaos)에는 Anti-Magic Shell/Anti-Magic Zone, 물리 광역(Ravenous Bellow·Killing Spree·Overwhelming Onslaught)에는 Icebound Fortitude를 썼다.
- 해제 종류는 `dungeon-dispel-types.txt` 기준: Bloodthorn Roots·Glacial Torment·Corroding Spittle·Cold Claws(마법)만 "Anti-Magic Shell을 미리 켜면 걸리지 않는다"로 썼다(툴팁: "preventing application of harmful magical effects"). 아군 해제 기술은 없어 kit.dispel은 비움.
- 툴팁 손질: meta의 "Requires level N (전문화)" 표시를 뺐다. Death Grip 한글 툴팁의 "[혈기: … / …]" 갈래를 부정 문장("대상을 끌어당깁니다.")만 남겼다. Trollbane's Icy Fury는 툴팁 앞 기술 이름이 빠져 있고 쓰지 않아 뺐다.
- 같은 이름 두 개(Vampiric Strike 433895 기술, 433901 특성): 문장 tips는 실제로 누르는 433895를 가리키고, 가이드 카드는 특성 433901을 쓴다.
- Death Charge는 툴팁에 Death's Advance와의 관계가 적혀 있지 않아, 툴팁 문장(이동 방해 벗어남, 10초 이동 속도 100%, 넉백 면역)만 썼다.

## 확인 못 한 것
- 보스별 부정 전용 출처는 Wowhead 쐐기 팁의 던전별 한두 줄뿐이다. 나머지는 일반 원칙을 적용했고 spec.note에 적었다(Ruby Life Pools는 Wowhead도 "DK 전용 대응 없음").
- Forbidden Knowledge 구간의 Necrotic Coil·Graveyard 사용은 Wowhead 로테이션 문장만 근거다. 두 기술의 툴팁에는 Forbidden Knowledge와의 관계가 적혀 있지 않다.
- Vampiric Strike(433901) 툴팁은 "your next become Vampiric Strike"로 앞 기술 이름이 빠져 있다. Scourge Strike를 바꾼다는 설명은 Gift of the San'layn 툴팁과 Wowhead 로테이션(Scourge Strike 자리에 Vampiric Strike)에 기댄 것이다.
- Anti-Magic Shell로 Cold Claws·Glacial Torment가 걸리지 않는다는 것은 툴팁 문구에서 끌어낸 것이고 게임 안에서 확인하지 않았다(Bloodthorn Roots·Corroding Spittle은 Wowhead 팁이 근거).
- Army of the Dead + Dark Transformation 매크로는 Wowhead 설명(Dark Transformation은 전역 쿨다운 없음)에 따른 것이고 게임 안에서 확인하지 않았다. 다른 매크로도 마찬가지다.
