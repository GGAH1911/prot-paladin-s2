# 2단계: 보존 기원사 (2026-09-27)

## 출처
- Wowhead 보존 특성 빌드(페이지 메타 dateModified 2026-08-12. 회복 드루이드 페이지와 같은 값이고 본문에 따로 적힌 갱신 날짜는 없음): 코드 6개와 (Best) 표시
- Wowhead 보존 로테이션(2026-09-21 갱신): 쐐기 순환(Temporal Anomaly → Reversion, 큰 피해 전 Dream Breath → Emerald Blossom), Stasis 조합, Rewind·Dream Flight 설명, 30미터 사거리 운영, 전투 전 준비
- Wowhead 보존 쐐기 팁(2026-08-18 갱신): 유틸리티(Cauterizing Flame, Sleep Walk, Overawe, Zephyr), 어픽스별 대응. 던전별 팁 칸은 "곧 공개" 상태
- nether.wowhead.com 툴팁 API(영문·한글): 기술 61개
- 특성 판정: 부모가 Wowhead 특성 계산기로 읽은 쐐기 빌드 2개(`_cache/talents-evoker-preservation.json`)

## 기본 영웅
- Flameshaper. 빌드 표에서 쐐기 (Best)는 Flameshaper에만 붙어 있고, 로테이션 가이드도 "모든 콘텐츠에서 현재 추천은 Flameshaper"라고 씀. 델브 (Best)는 두 영웅 모두.
- 다만 쐐기 팁 페이지의 던전별 추천 코드 8개는 모두 빌드 표의 **Chronowarden 쐐기 코드**와 같음. 기본 영웅은 빌드 표 기준으로 두고, 빌드 구획 문단에 이 사실을 적음.

## 검증하며 고친 것
- 두 쐐기 빌드에 Quell(차단)이 없음 → 차단 문장을 쓰지 않고, 시전 끊기는 Tail Swipe·Wing Buffet(Clobbering Sweep·Heavy Wingbeats로 쿨 1분)·Sleep Walk·Landslide로 씀. 공통 탭에는 "Quell을 고르지 않았다"고만 적음.
- Dream Flight는 로테이션 가이드의 주요 쿨기지만 두 쐐기 빌드 모두 선택하지 않음 → 쓰지 않음. Inner Flame, Spatial Paradox, Source of Magic, Terror of the Skies, Emerald Communion도 빌드에 없어 뺌.
- Verdant Embrace: 두 빌드 모두 Dream Simulacrum을 골라 대상에게 날아가지 않음 → Wowhead가 이동기로 꼽지만 이동기로 쓰지 않고, 공통 탭에 그 사실을 적음.
- Spiritbloom은 기본 기술(툴팁에 Talent 없음)이지만 12.1 로테이션 가이드에 쓰임이 없어 카드·문장에서 뺌.
- 해제: Naturalize(기본 기술, 툴팁 "Magic and Poison")와 Cauterizing Flame(두 빌드 모두 선택, "Bleed, Poison, Curse, and Disease"). `kit.dispel`에 bleed 칸도 넣음(해제 담당표의 출혈 줄이 "나"로 표시됨). Expunge(독)도 두 빌드에 찍혀 있지만 Naturalize가 독을 풀어 따로 쓰지 않음.
- 툴팁 손질: Living Flame(황폐·증강 갈래가 섞여 나옴), Fire Breath·Deep Breath(증강 전용 [Sands of Time] 구절)를 보존 기준으로 정리함.
- Rewind: Wowhead 본문은 33%라고 쓰지만 툴팁은 30% → 툴팁 값 사용.
- 보스 문장의 해제는 `_cache/boss-dispel-types.txt`에 있는 종류만 씀(Regurgitate 질병, Spiteful Venom·Toxic Spores·Heartstop Poison·Poison Nova·Poison Spit 독, Glacial Torment·Corroding Spittle·Bloodthorn Roots 마법, Wretched Discharge 질병, Grievous Thrash·Severing Axe·Savage Maul 출혈).
- 영웅별 특성은 문장마다 "(Flameshaper)", "(Chronowarden)", "Chronowarden 쐐기 빌드"로 표시함. Just in Time·Twin Echoes·Lifespark는 전문화 트리지만 한쪽 쐐기 빌드에만 있음.

## 확인 못 한 것
- 보스별 보존 전용 출처가 없어 일반 원칙을 적용함(spec.note).
- Merithra's Blessing이 대상에게 Reversion을 건다는 것, Cauterizing Flame이 지운 것이 없으면 쿨이 돌지 않는다는 것은 Wowhead 본문 기준(툴팁에는 없음).
- Tail Swipe·Wing Buffet·Sleep Walk로 시전을 끊는 것은 Wowhead 설명 기준이고 게임에서 확인하지 않음.
- Bloodthorn Roots를 Naturalize로 푸는 것은 툴팁 분류(Magic)만 근거.
- Avatar of Sethraliss(NPC)에게 Dream Breath·Emerald Blossom 같은 범위 치유가 들어가는지 확인하지 못해, 대상 지정 치유만 안내함.
- Temporal Anomaly 흡수량은 툴팁이 공식만 보여 수치를 쓰지 않음.
- 매크로 동작은 게임에서 확인하지 않음.
- 이름 겹침 위험: 전문화 tips의 "Echo"가 Den of Nalorakk 공용·역할 문장의 "Echo"(Echo of Nalorakk 약칭)에 보존 Echo 툴팁·한글명(메아리)을 붙일 수 있음. 전문화 문장에서는 그 던전에서 Echo를 쓰지 않았음. 엔진·공용 데이터 쪽 판단이 필요함.


## 해제 종류 재확인 (2026-09-27, 머지 뒤 보완)
- 2단계 첫 판에서는 해제 종류를 nether 툴팁 buff 칸으로만 봤다. Wowhead 기술 페이지의 Dispel type 칸과 대조하니 **Mind-Numbing Poison(1263971)·Poison Splash(1226031)는 Poison**, **Cold Claws(적용 디버프 1305234)는 Magic**이었다(툴팁 buff 칸은 비어 있음). 이 전문화가 풀 수 있는 종류에 맞춰 Atroxus·Melidrussa 해제 문장을 넣었다. 앞의 "확인 못 한 것"에 적은 Mind-Numbing Poison·Poison Splash·Cold Claws 항목은 이것으로 해결됐다.
- Stormslam(381512)은 기술 페이지에서도 Dispel type n/a라 여전히 해제 문장을 쓰지 않는다.
