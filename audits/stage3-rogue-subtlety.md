# 3단계: 잠행 도적 (2026-09-27)

## 출처
- Wowhead 잠행 도적 특성 빌드(2026-08-20 갱신): 빌드 6개(영웅 2개 × 레이드·쐐기·델브)와 (Recommended) 표시
- Wowhead 잠행 도적 쐐기 팁(2026-08-18 갱신): 던전별 차단 목록, Cloak of Shadows·Feint·Vanish 사용처, 유틸(Shroud of Concealment, 독 선택, Blind, Tricks of the Trade)
- Wowhead 잠행 도적 로테이션(2026-08-24 갱신): 단일·광역 우선순위, 쿨기 정렬(Secret Technique 기준), Deathstalker·Trickster 운영, 전투 전 준비(은신, 독)
- nether.wowhead.com 툴팁 API(영문·한글): 기술 57개
- 쐐기 빌드 두 개의 실제 선택 노드: 부모가 받아 둔 `_cache/talents-rogue-subtlety.json`

## 기본 영웅
- Deathstalker. Wowhead 빌드 표의 레이드·쐐기·델브 ★가 모두 Deathstalker에만 있고, 로테이션 가이드도 "모든 상황에 Deathstalker"를 권한다. 쐐기 팁의 던전별 추천 코드 8개도 모두 Deathstalker 쐐기 코드와 같다.

## 검증하며 고친 것
- **Shiv**(격노 해제)는 특성인데 두 쐐기 빌드 모두 고르지 않았다(특성 계산기에서 Shiv 노드가 data-full 아님을 직접 확인). Wowhead 쐐기 팁은 Shiv로 격노를 지우라고 하지만 쓰지 않았고, 공통 탭에 "Shiv는 쐐기 빌드에 없다"고 적었다. Gouge·Numbing Poison·Blackjack·Danse Macabre·The First Dance도 빌드에 없어 뺐다.
- **Secret Technique**는 툴팁 meta가 "Talent / Specialization"인데 특성 계산기 트리에 노드가 없다(전문화가 주는 기술). 로테이션 가이드가 모든 쿨기를 이 기술에 맞추므로 기본 기술로 보고 썼다.
- 차단: Kick(15초)은 기본 기술(툴팁에 Talent 없음). 보조 Kidney Shot(30초)·Cheap Shot(은신 중)·Blind에는 보스 면역 배지를 달았다.
- Blind는 두 빌드가 고른 Airborne Irritant로 쿨 50% 감소·지속 70% 감소 대신 주변 모든 적에게 걸린다(툴팁). 쫄 무리 제어 문장은 이것만 근거로 썼다.
- 공용 툴팁 도구가 "Requires Stealth" 요구 조건을 지워서, Cheap Shot·Sap·Shadowstrike meta에 "Requires Stealth / 은신 필요"를 되돌렸다(원문 requirements 칸 확인).
- Unseen Blade 툴팁은 영문·한글 모두 앞 기술 이름이 빠진 채 "and Shadowstrike…"로 시작한다. 이름을 지어내지 않고 "(툴팁 원문에서 앞 기술 이름이 빠져 있음) …"을 붙였다.
- 해제: 아군 해제 기술은 없어 `kit.dispel`을 비웠다. 내 해로운 주문 효과는 Cloak of Shadows("instantly removing all harmful spell effects")로 지운다. 해제 문장에 쓴 종류는 `dungeon-dispel-types.txt`와 대조했다(Toxic Spores·Mind-Numbing Poison 독, Cold Claws 마법).
- 이름 충돌: 이 전문화 tips 이름 중 core 던전 tips와 다른 id로 겹치는 것은 없었다(스크립트 확인).

## 확인 못 한 것
- Cloak of Shadows로 Toxic Spores·Cold Claws를 지우는 것과 Ritual of the Fang·Lightblossom Beam 피해를 줄이는 것은 Wowhead 쐐기 팁 문장이 근거다. Mind-Numbing Poison을 지운다는 문장은 Cloak 툴팁("해로운 주문 효과를 모두 제거")에서 끌어낸 것이고 게임에서 확인하지 않았다.
- Vanish로 Latent Hex를 지우는 것은 Wowhead 문장만 근거다.
- Blind(Airborne Irritant)가 분신·Wild Imp·Animated Gold·뱀 쫄에 통하는지는 core 층의 "CC로 늦춘다" 문장에 기댄 것이다.
- Atrophic Poison 감소 수치는 툴팁에 "(4 *- 1)%"로 깨져 나와 쓰지 않았다.
- 보스별 잠행 전용 문장이 없는 기믹(폭딜 정렬, Feint 사용처 일부)은 로테이션 가이드의 일반 원칙을 적용했다(spec.json note).
- 매크로(특히 Trickster용 Secret Technique + Eviscerate 묶음)는 게임에서 시험하지 않았다.
