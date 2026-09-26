# 3단계: 사격 사냥꾼 (2026-09-27)

## 출처
- Wowhead 사격 특성 빌드(메타 갱신 2026-08-12): 빌드 7개(Sentinel 레이드 단일·레이드 광역·쐐기·델브, Dark Ranger 레이드 단일·쐐기·델브)와 ★ 표시. ★는 Sentinel 네 행에만 있다.
- Wowhead 사격 쐐기 팁(Midnight Season 2): 사격의 쐐기 평가, 던전별 유틸(Tranquilizing Shot, Intimidation, Feign Death + Emergency Salve, Disengage + Posthaste), 어픽스 대응
- Wowhead 사격 로테이션: Precise Shots 소모 규칙, Trick Shots 유지, Unstable Trigger 두 번 쓰기, Trueshot 사용(마지막은 Bullseye 30중첩까지 아끼기), Sentinel의 Moonlight Chakram 타이밍, Dark Ranger 우선순위
- nether.wowhead.com 툴팁 API(영문·한글): 기술 61개
- 두 쐐기 빌드의 실제 선택 노드: 부모가 받아 둔 `_cache/talents-hunter-marksmanship.json`(특성 계산기 data-full/data-partial)

## 기본 영웅
- Sentinel. Wowhead 빌드 표에서 쐐기 ★는 Sentinel에만 붙어 있다(레이드·델브도 Sentinel만 ★).

## 검증하며 고친 것
- 두 쐐기 빌드의 직업 트리는 같다. 전문화 트리는 Sentinel이 On Target·Bulletstorm, Dark Ranger가 Kill Shot·Deathblow만 다르다. Kill Shot은 Dark Ranger에서 Black Arrow로 바뀌므로 Kill Shot 카드는 두지 않았다. Deathblow·Black Arrow 계열은 "(Dark Ranger)"로 표시했다.
- **차단기 있음**: Counter Shot(특성, 24초)이 두 쐐기 빌드에 모두 있어 모든 차단 순번 문장에 넣었다. 쿨이 길어 "한 번만 맡는다/순번 간격을 넓게"라고 적었다. Dark Ranger는 Wailing Arrow(기본 표시 없음, Wailing Dead로 얻음)가 8미터 안 NPC 시전을 끊고 1초 침묵시켜 보조 광역 차단으로 적었다.
- 빌드에 없어 쓰지 않은 것: Binding Shot, Tar Trap, Concussive Shot, Devilsaur Tranquilizer. Wowhead 던전별 팁은 Binding Shot·Tar Trap을 여러 곳(Temple 필수 등)에서 권하지만 쐐기 기본 빌드에 없어 문장에 쓰지 않았다(Wowhead도 "기본 빌드에 없는 유틸"로 분류).
- 기본 기술(툴팁에 Talent 없음): Arcane Shot, Multi-Shot, Steady Shot, Freezing Trap, Exhilaration, Aspect of the Turtle, Feign Death, Disengage, Aspect of the Cheetah, Hunter's Mark, Harrier's Cry(6분, 파티 Haste 30% 40초).
- 쿨타임은 두 빌드 공통 특성을 반영해 계산: Exhilaration 1분 30초(Natural Mending −30초), Aspect of the Turtle 2분 15초(Improved −30초, Born To Be Wild −15초), Aspect of the Cheetah 2분 15초(Sentinel은 Conditioning −30초로 1분 45초), Feign Death 25초(Improved −5초), Survival of the Fittest 2회 충전·8초(Padded Armor, Lone Survivor), Trueshot 15초(Sentinel은 Can't Miss, Won't Miss로 17초).
- 해제: 아군 해제 기술이 없다(`kit.dispel` 비움). Emergency Salve로 Feign Death·Aspect of the Turtle이 **내** 독·질병을 지우므로 answers에 "내 독/질병은 Feign Death"를 붙였다. 보스 문장의 자기 해제는 Wowhead 던전별 팁 그대로: Toxic Spores(Hoardmonger), Mind-Numbing Poison(Atroxus), Wretched Discharge(Mchimba). 모두 `dungeon-dispel-types.txt`의 독·질병과 일치.
- Wowhead 던전별 팁에서 보스에 쓴 것: Spiteful Hunt 고정은 Feign Death(Writhing Coil), Kystia 분신은 하나 Counter Shot·하나 Intimidation, Condensed Mass 감속은 Disengage(Posthaste), Desiccation은 Exhilaration으로 90% 넘겨 해제, A Knot of Snakes는 Intimidation(겹치면 Guttural Roar로 둘 다).
- Tranquilizing Shot(적 Enrage·Magic 제거)은 Wowhead가 권하는 대상이 전부 일반몹이라 보스 문장에는 넣지 않고 공통 탭·카드에만 두었다.
- 전문화 기술 이름과 core 던전 기술 이름이 겹치는 것이 없음을 스크립트로 확인했다.

## 확인 못 한 것
- 보스별 사격 전용 출처가 적다. Wowhead 던전별 팁은 주로 일반몹 유틸이라, 나머지 보스 문장(쿨기 배치, Survival of the Fittest 시점 등)은 일반 원칙을 적용했다(spec.json note).
- Wowhead 던전별 추천 빌드 코드 8개는 모두 같은 코드이고, 빌드 표의 Sentinel 쐐기 코드와 글자가 다르다(앞부분은 Sentinel 계열). 특성 판정은 빌드 표 쐐기 코드 기준으로 했다.
- Wailing Arrow가 보스 부하의 시전을 실제로 끊는지, Intimidation·Guttural Roar가 Mirror Images 분신·Wild Imp·Animated Gold에 통하는지는 게임 안에서 확인하지 않았다(core 층 문장과 툴팁 "Non-Player targets"에 기댐).
- Emergency Salve가 Heartstop Poison 같은 다중첩 독을 한 번에 다 지우는지는 툴팁 "removes poison and disease effects"만 근거다.
- Disengage 툴팁의 Posthaste 이동 속도가 "0%"로 나와 Posthaste 툴팁 값(50%)을 썼다.
- 매크로는 게임 안에서 확인하지 않았다.
