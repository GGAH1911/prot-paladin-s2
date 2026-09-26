# 3단계: 황폐 기원사 (2026-09-27)

## 출처
- Wowhead 황폐 특성 빌드(2026-09-23 갱신): 빌드 6개(영웅 2개 × 레이드·쐐기·델브). 추천 아이콘(legendary-available)과 (Best)는 Scalecommander 세 행에만 있음
- Wowhead 황폐 쐐기 팁(2026-08-18 갱신): 던전별 유틸 평가(Quell Must, Cauterizing Flame Good/Must, Zephyr Good, Sleep Walk·Overawe 선택)와 예시 기술, 어픽스 대응 표(148 Ascendant: Quell·Tail Swipe·Wing Buffet·Terror of the Skies / 162 Pulsar: Hover·Time Spiral·Rescue / 160 Devour: Expunge·Cauterizing Flame·Rescue / 158 Voidbound: 없음)
- Wowhead 황폐 로테이션(2026 시즌 2): 단일·광역 우선순위, Tip the Scales는 Eternity Surge에, Flameshaper는 Fire Breath 1단계, Deep Breath 끊기 매크로
- nether.wowhead.com 툴팁 API(영문·한글): 기술 55개
- 쐐기 빌드 2개의 실제 선택 노드: dps-work/_cache/talents-evoker-devastation.json (부모가 특성 계산기에서 읽은 것)

## 기본 영웅
- Scalecommander. 빌드 표의 레이드·쐐기·델브 (Best)★가 모두 Scalecommander에만 있다. 쐐기 팁의 던전별 추천 코드도 Scalecommander 쐐기 코드와 같다.

## 검증하며 고친 것
- 해제: Expunge(독, 두 빌드), Cauterizing Flame(출혈·독·저주·질병, 두 빌드) → kit.dispel 독·저주·질병·출혈. 보스 문장의 해제는 audits/research/dungeon-dispel-types.txt에 있는 종류만 썼다(Regurgitate·Wretched Discharge 질병, Spiteful Venom·Toxic Spores·Heartstop Poison·Mind-Numbing Poison·Poison Nova·Poison Spit 독, Grievous Thrash·Severing Axe·Savage Maul 출혈). 마법(Glacial Torment·Corroding Spittle·Stormslam·Cold Claws)은 황폐가 풀 수 없어 쓰지 않았다.
- 차단: Quell 20초(두 빌드). Tail Swipe·Wing Buffet은 두 빌드의 Clobbering Sweep·Heavy Wingbeats로 1분. Terror of the Skies(두 빌드)로 Deep Breath 3초 기절. 이 넷과 Landslide에 보스 면역 배지.
- 빌드에 없어 뺀 것: Sleep Walk, Overawe, Unravel, Azure Sweep·Unbound Flame(로테이션 선택지), Imposing Presence. Wowhead 팁은 Sleep Walk·Overawe를 선택 유틸로 소개하지만 쐐기 빌드에 없다.
- 한쪽 빌드 전용 표시: Scalecommander(Mass Disintegrate, Bombardments, Melt Armor, Onyx Legacy, Strafing Run, Hardened Scales, Slipstream, Charged Blast, Time Spiral), Flameshaper(Consume Flame, Legacy of the Lifebinder, Essence Well, Twin Flame, Ashes in Motion, Oppressing Roar, Spatial Paradox). 해당 영웅 가이드·운영 칸에만 넣었다.
- 툴팁 손질: Living Flame의 보존 갈래 제거, Fire Breath·Deep Breath의 증강(Sands of Time) 갈래 제거, Eternity Surge 대상 수를 Eternity's Span 값(2·4·6)으로 정리, Dragonrage 한글의 "/ 합니다" 잔여 정리, Oppressing Roar의 Overawe(빌드에 없음) 갈래 제거, Terror of the Skies 등 "[Breath of Eons / Deep Breath]"를 Deep Breath로.
- 이름 충돌: Burnout(Ruby Life Pools 보스 기술), Melt Armor(Voidscar Arena core tips)는 그 던전 문장과 영웅 카드에 쓰지 않았다.

## 확인 못 한 것
- 보스별 황폐 전용 출처는 Wowhead 던전별 유틸 예시(대부분 일반몹 기술)뿐이다. 보스 기믹에 맞는 예시(Kokia의 Blaze Volley→Quell, Inferno→Zephyr, Poison Spit→Quell, Wretched Discharge→Quell)만 "(Wowhead)"로 표시했고, 나머지는 로테이션 가이드의 일반 원칙을 적용했다(spec.note).
- Rising Fury: Scalecommander 빌드는 1271687, Flameshaper 빌드는 1271788(Unbound Flame 효과가 붙은 상위 판)로 읽혀 두 영웅 모두 이 노드를 찍은 것으로 보고 공통 카드로 두었다. 1271788의 Unbound Flame 부분은 쓰지 않았다.
- Rescue로 Bloodthorn Roots·Condensed Mass를 푸는 것은 툴팁("이동 방해 효과 제거")과 Wowhead 설명에 기댄 것이고 게임 안에서 확인하지 않았다.
- Tail Swipe·Wing Buffet·Deep Breath 기절이 분신·Lasher·미라·Animated Gold·Infused Whelp·Faithless Tormentor에 통하는지는 core 층 문장에 기댔다.
- 매크로(특히 Tip the Scales + Eternity Surge 묶음)는 게임 안에서 시험하지 않았다. Deep Breath 끊기 매크로는 Wowhead 로테이션 원문 그대로다.
