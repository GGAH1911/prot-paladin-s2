# 3단계: 냉기 죽음의 기사 (2026-09-27)

## 출처
- Wowhead 냉기 특성 빌드(2026-09-05 갱신): 코드 6개(영웅 2개 × 레이드·쐐기·델브)와 ★ 표시. 부모가 받아 둔 `_cache/builds-death-knight-frost.json`
- Wowhead 냉기 로테이션(2026-09-05 갱신): 단일·광역 우선순위, 개시 순서, Pillar of Frost·Frostwyrm's Fury·Reaper's Mark 사용법, Killing Streak 설명
- Wowhead 냉기 쐐기 팁(2026-08-18 갱신): 던전별 유틸(Mind Freeze·Death Grip·Blinding Sleet), Anti-Magic Zone 사용처, Anti-Magic Shell·Death's Advance 사용처, 어픽스 대응. 가이드 HTML은 tme-laptop에서 받음
- nether.wowhead.com 툴팁 API(영문·한글): 기술 54개(공용 `_tools/tooltip.mjs`)
- Wowhead 특성 계산기에서 두 쐐기 빌드의 실제 선택 노드(부모가 받아 둔 `_cache/talents-death-knight-frost.json`)

## 기본 영웅
- Deathbringer. Wowhead 빌드 표에서 레이드·쐐기·델브 ★가 모두 Deathbringer에만 붙어 있다. 쐐기 팁의 던전별 추천 코드 8개도 모두 Deathbringer 쐐기 코드와 같다.

## 검증하며 고친 것
- 두 쐐기 빌드에 없는 특성은 쓰지 않았다: Asphyxiate, Wraith Walk, Control Undead, Frostbane(455993), Unyielding Will. Wowhead 쐐기 팁은 Bloodthorn Roots를 Wraith Walk로 풀라고 하고 King's Rest에서 Control Undead를 "Situational"로 권하지만, 쐐기 기본 빌드에는 없어 뺐다.
- 한쪽 빌드에만 있는 것은 표시했다: Blinding Sleet·Reaper's Mark·Exterminate·Wave of Souls·Deathly Blows·Rune Carved Plates·Death's Messenger(Deathbringer), Coldthirst·Rider's Champion·Apocalypse Now·Ride or Die!·Fury of the Horsemen·Death Charge(Rider of the Apocalypse). Blinding Sleet와 Coldthirst는 같은 직업 트리 선택 칸에서 영웅 빌드마다 다르게 골랐다.
- 기본 기술(툴팁에 Talent 없음): Anti-Magic Shell, Death Grip, Death's Advance, Raise Ally, Lichborne, Chains of Ice, Remorseless Winter, Path of Frost, Death Gate. Mind Freeze·Anti-Magic Zone·Icebound Fortitude·Death Pact·Raise Dead는 특성이고 두 쐐기 빌드 모두 골랐다.
- Glacial Advance(194913)는 툴팁 meta가 "Talent / Specialization"이고 선택 노드 목록에 없다. Wowhead 로테이션이 두 영웅 빌드 모두의 광역 우선순위(대상 3명 이상)에 넣고 있어 전문화 기본 기술로 보고 썼다. Arctic Assault(두 빌드 모두)도 Glacial Advance를 쏜다.
- 쿨타임은 두 빌드 공통 특성으로 계산했다: Anti-Magic Shell 1분 → 40초(Anti-Magic Barrier, 지속·흡수량 40% 증가), Death Pact 2분 → 1분 30초(Death Defiance), Death Grip·Death's Advance 2회 충전(Death's Echo), Raise Ally Runic Power 소모 없음(Death Notes). Lichborne·Raise Dead 1분 30초는 Deathbringer만(Death's Messenger).
- 피해 학파를 core 툴팁 "X damage"로 대조했다. Anti-Magic Shell은 마법 피해만 흡수하므로 방어도를 무시하는 물리 광역(Ravenous Bellow, Killing Spree, Overwhelming Onslaught)과 물리 취약(Galvanized, Corruption)에는 Icebound Fortitude를 썼다. Lightfire Beams는 Radiant(마법)라 Anti-Magic Shell로 흡수된다고 썼다.
- 밀쳐내기·끌어당김(Unstable Singularity, Gale Force, Chillstorm, Winds of Change, Serpentine Gust)은 Death's Advance 툴팁("immune to forced movement effects and knockbacks")을 근거로 썼다. Unstable Singularity·Gale Force는 Wowhead 팁에도 있다.
- 툴팁 손질: Death Grip 한글 설명에 섞인 혈기 갈래("[혈기: 겨 당신을 공격하게 합니다 / 깁니다]")를 빼고 냉기 문장만 남겼다. 마법사 Frost와 전문화 이름이 같아 전문화 문단 필터 결과를 전부 눈으로 확인했다.
- 이름 충돌: 영웅 특성 Echoing Fury(1265855)는 Den of Nalorakk 보스 기술 Echoing Fury와 이름이 같아 싣지 않았다. 나머지 기술은 core tips와 겹치지 않는다(스크립트 확인).
- 해제: 아군 해제 기술이 없다(kit.dispel 비움). Wowhead 팁의 "독은 Anti-Magic Shell로 막는다"는 자연 피해 흡수로 옮겨 적었다.

## 확인 못 한 것
- Chosen of Frostbrood는 선택 노드가 1265637 하나이고, 1265632(Haste 15%)·1265633(Pillar of Frost 2초 연장)은 같은 노드의 추가 효과로 Wowhead 로테이션이 설명하는 것을 근거로 썼다. 노드 단계별 획득 조건은 계산기에서 확인하지 않았다.
- Wowhead 쐐기 팁의 Ruby Life Pools 밀쳐내기 기술 id(372581)는 core 데이터와 맞지 않아, Chillstorm·Winds of Change 문장은 Death's Advance 툴팁만 근거로 썼다. Kokia Anti-Magic Zone 문장의 "add cast" 기술 id(284826)도 이름을 확인할 수 없어 Firestorm 구간의 Inferno로 옮겨 썼다.
- Anti-Magic Shell로 Malefic Wave·Gilded Destruction·Lightning Spire를 흡수하는 것은 Wowhead 문장과 툴팁 학파만 근거이고 게임 안에서 확인하지 않았다.
- Death Charge의 사용 방법(별도 버튼인지 Death's Advance 대체인지)은 툴팁에 없어 효과만 적었다.
- Blinding Sleet가 분신·Wild Imp·Animated Gold에 통하는지, 매크로 동작은 게임 안에서 확인하지 않았다.
- 보스별 냉기 전용 출처는 Wowhead 쐐기 팁의 던전별 한두 줄뿐이다. 나머지는 일반 원칙을 적용했고 spec.note에 적었다.
