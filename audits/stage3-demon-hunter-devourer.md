# 3단계: 포식 악마사냥꾼 (2026-09-27)

## 출처
- Wowhead 포식 특성 빌드(2026-09-18 갱신): 빌드 8개(영웅 2개 × 레이드 단일·레이드 광역·쐐기·델브)와 추천 표시. 추천은 "(Best)" 글자와 추천 아이콘(legendary-available)이 같은 행에 있는 것으로 확인했다.
- Wowhead 포식 쐐기 팁: 던전별 유틸 평가(Void Nova, Consume Magic, Burn It Out, Soul Cleanse, Imprison), Vengeful Retreat로 지우는 감속(Regurgitate, Toxic Atrophy, Condensed Mass), 어픽스 대응(148 Ascendant, 158 Voidbound, 162 Pulsar, 160 Devour).
- Wowhead 포식 로테이션: Void Metamorphosis 안팎 우선순위, 영웅별 운영 차이(Void-Scarred는 짧게 여러 번, Annihilator는 한 번을 길게).
- nether.wowhead.com 툴팁 API(영문·한글): 기술 56개. Wowhead 가이드 HTML은 tme-laptop에서 2초 간격으로 받았다.
- 부모가 받아 둔 특성 계산기 결과(`_cache/talents-demon-hunter-devourer.json`)로 두 쐐기 빌드의 실제 선택 노드를 확인했다.

## 기본 영웅
- Annihilator. 빌드 표의 쐐기 추천(★, Best)은 Annihilator에만 있다. 레이드 단일·레이드 광역·델브 ★는 Void-Scarred.
- 다만 쐐기 팁 페이지의 던전별 추천 코드 8개는 모두 Void-Scarred 쐐기 코드이고, 본문도 쐐기에서 Void-Scarred를 높이 평가한다. 빌드 구획 문단과 공통 탭에 이 사실을 적었다.

## 검증하며 고친 것
- 해제: 아군 해제 기술이 없다(`kit.dispel` 비움). Soul Immolation이 자신의 질병 1개(Burn It Out, Void-Scarred 빌드만)나 저주 1개(Soul Cleanse, Annihilator 빌드만)를 지운다. 질병 답은 "자신은 Soul Immolation(Burn It Out, Void-Scarred 빌드), 아군은 해제 가능한 파티원 담당".
- 차단: Disrupt(15초)는 기본 기술이다. 두 빌드 모두 Improved Disrupt(10야드)와 Guile(+20야드)을 골라 사거리 30미터로 썼고, Demon Muzzle(차단 성공 시 받는 마법 피해 15% 감소 12초)도 두 빌드에 있다.
- 빌드에만 있는 기술 표시: The Hunt·Hungering Slash·Second Helping·Soul Glutton·Focused Ire·Burn It Out·Demonsurge 계열은 Void-Scarred, Midnight·Voidfall 계열·State of Matter·Soul Cleanse는 Annihilator 빌드에만 있다. 문장과 카드에 영웅을 표시했고 해당 영웅 가이드에만 넣었다. 두 빌드 어디에도 없는 특성은 0(스크립트 확인).
- 쿨타임은 두 빌드 공통 특성을 반영했다: Soul Immolation 30초·2회(Tempered Soul), Blur 2회(Demonic Resilience), Darkness 3분(Pitch Black), Shift 2회(Blazing Path, Annihilator는 State of Matter로 3회).
- 이름 충돌: 강화된 Consume인 Devour는 Voidscar Arena core 툴팁(적 기술 Devour)과 이름이 같아 싣지 않았다. Void Metamorphosis 중 강화 기술은 Cull만 카드로 두었다.
- 툴팁 손질: Void Ray·Void Metamorphosis 설명 첫 줄의 "Requires 100 Fury / 50 Soul Fragments"(한글 "…가 필요합니다.")를 meta 끝으로 옮겼다.
- ★ 표시는 가이드 HTML 행에서 직접 확인했다(부모 builds json의 rec 값과 같음).

## 확인 못 한 것
- 보스별 쿨기·생존기 배치는 포식 전용 출처가 없어 로테이션 가이드의 일반 원칙을 적용했다(spec.note).
- Void Metamorphosis가 Fury가 다 떨어지면 끝난다는 것은 Wowhead 로테이션 문장("drop out of Void Meta")에 기댄 것이고, 툴팁은 "Fury will slowly drain"까지만 말한다.
- Wretched Discharge를 Vengeful Retreat로 지우는 것은 Wowhead 문장만 근거이고 게임에서 확인하지 않았다.
- Void Nova·Sigil of Misery가 분신·Wild Imp·Animated Gold·뱀 쫄에 통하는지는 core 문장에 기댔다.
- 매크로는 게임에서 시험하지 않았다.
