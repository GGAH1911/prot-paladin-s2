# 1단계 탱커: 복수 악마사냥꾼 (2026-09-27)

## 출처 (모두 2026-09-27 확인)
- Wowhead 복수 특성 빌드(2026-08-12 갱신): https://www.wowhead.com/guide/classes/demon-hunter/vengeance/talent-builds-pve-tank
  - 표 구성: Aldrachi Reaver(레이드·쐐기·델브, (Best) 없음) → Annihilator(모두 (Best)). 코드는 `builds-research.json`.
  - 본문: "Annihilator has much better overall damage and defensive uptime, but Aldrachi Reaver ... has better priority damage with funnel as well as better self-healing." → 기본 영웅 Annihilator.
- Wowhead 복수 로테이션(2026-08-12): 우선순위, 방어 쿨기 표(Metamorphosis 2분, Fel Devastation 40초, Fiery Brand 1분·최대 10초 보류, Demon Spikes 20초, Darkness 5분), Mass Acceleration 버그 메모.
- Wowhead 복수 쐐기 팁(2026-08-18): 던전 8개 팁(Darkness 활용, Vengeful Retreat로 감속 제거: Lashers·곰·Violent Sand·Kings' Rest 감속·Ruby 새끼용 20중첩 전), Temple 둘째 보스 뱀은 침묵 불가 → Sigil of Misery, 어픽스 표(Ascendant: Chaos Nova/Sigil of Misery/Sigil of Silence/Consume Magic, Devour: Vengeful Retreat), Imprison으로 풀 건너뛰기.
- nether.wowhead.com 툴팁 API(영문·한글) 33개 기술.
- Wowhead 특성 계산기에 두 영웅의 쐐기 빌드 코드를 넣고 `data-full`/`data-partial` 노드를 읽음(각 71개).

## 검증하며 고친 것
- **두 쐐기 빌드 모두 고르지 않은 특성**을 카드·보스 문장·공통 탭에서 뺌: Soul Carver, Demonic Resilience(Demon Spikes 2회 충전), Cycle of Binding, Retaliation, Feast of Souls 등. **Sigil of Chains와 The Hunt는 12.1 복수 트리에 노드가 아예 없음**(Wowhead 쐐기 팁 어픽스 표에는 Sigil of Chains가 남아 있지만 쓰지 않음).
- 빌드에 있는 것을 확인하고 문구에 반영: Improved Disrupt(Disrupt 10미터), Calcified Spikes(Demon Spikes 중 받는 피해 5% 감소), Vengeful Beast(Metamorphosis 20초), First In, Last Out(Infernal Strike 보호막 6%), Soul Barrier, Last Resort, Darkness(Pitch Black 없음 → 5분).
- Fracture는 트리 노드가 아니지만 툴팁이 "Talent / Specialization"(레벨 35 복수 기본)이고 로테이션 가이드가 두 영웅 모두 Fracture를 씀 → 기본 빌더로 사용.
- 기믹 피해 종류를 `data/core/spells.en.json` 툴팁으로 대조: Demon Spikes는 방어도 버프라 **물리 전용**으로 보고, 마법·혼돈·자연 피해(Void Blast·Dark Waves 암흑, Chaos Barrage 혼돈, Hulking Claw 자연, Frozen Tempest 냉기, Shadow Bite 암흑)는 Fiery Brand·Metamorphosis로 씀. 물리+마법 혼합(Stormslam·Lightning Bite·Bedrock Slam·Tainted Strike)은 Demon Spikes + Fiery Brand. 방어도 무시(Ravenous/Hearty Bellow, Overwhelming Onslaught)는 Demon Spikes 대신 Fiery Brand·Metamorphosis.
- 넉백 면역 기술이 없어(혈기의 Death's Advance 대응) 넉백 기믹은 "밀려난 뒤 Infernal Strike로 복귀"로 씀.
- 영웅 특성 툴팁은 파멸·포식 문단이 섞여 있어(Art of the Glaive, Voidfall, Meteoric Rise, Reaver's Glaive, Reaver's Mark) 복수 문단만 손으로 남김. 한글 조사 오류(영혼 베어내기을/이)도 고침.

## 해제
- 복수는 아군 해제 기술이 없음 → `kit.dispel = {}`. Consume Magic은 적 마법 버프 제거라 해제 담당표 대상 아님(공통 탭에 설명).
- `freedom`: "해제 가능한 파티원 담당 (내 감속은 {Vengeful Retreat})". Vengeful Retreat 툴팁: "Remove all snares and vault away" — 자기 감속만, 뿌리(root)는 원문에 없음.

## 확인 못 한 것
- 보스별 복수 대응은 던전별 복수 전용 공략이 짧아 일반 원칙을 적용함(spec.note에 표시).
- Reaver's Glaive/Art of the Glaive 툴팁에서 강화 대상 기술 이름이 빈칸(Reaver's Glaive 단독 툴팁은 "Shear")으로 나옴. 복수는 Fracture를 쓰므로 "Fracture"로 채웠으나 게임 내 확인은 안 함.
- Fiery Brand 받는 피해 감소의 지속시간이 툴팁에 없어 적지 않음.
- Infernal Strike 충전 수: 툴팁은 1회인데 로테이션 가이드는 "2 charges"를 언급(빌드 특성 영향으로 보이나 어떤 노드인지 미확인). 공통 탭에는 충전 수를 적지 않음.
- 매크로 7개는 사이트 기존 패턴(마우스오버·커서)으로 만든 것이며 Wowhead 매크로 페이지와 대조하지 않음.
- Temple 보스 문장의 "둘째 보스 = Merektha"는 dungeons.json 보스 순서(Adderis & Aspix → Merektha)로 판단함.
- 모든 문장은 검수 전 예시 초안.
