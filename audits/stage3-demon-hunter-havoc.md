# 3단계: 파멸 악마사냥꾼 (2026-09-27)

## 출처
- Wowhead 파멸 특성 빌드(2026-09-24 갱신): 빌드 6개와 (Best) 표시. 가이드 원문에서 쐐기 (Best)가 Fel-Scarred에만, 레이드 (Best)가 Aldrachi Reaver에만 있는 것을 다시 확인함(builds-index.md의 표시와 같음)
- Wowhead 파멸 쐐기 팁(Midnight Season 2): 던전별 유틸 평가(Consume Magic, Imprison, Burn It Out, Soul Cleanse, Vengeful Retreat)와 던전별 팁, 어픽스 대응
- Wowhead 파멸 로테이션(Midnight Season 2): 단일·광역 우선순위, 영웅 특성별 운영, Metamorphosis·Eye Beam·Essence Break·The Hunt 사용법
- nether.wowhead.com 툴팁 API(영문·한글): 기술 57개
- 특성 판정: 부모가 받아 둔 `_cache/talents-demon-hunter-havoc.json`(쐐기 빌드 2개의 실제 선택 노드)

## 기본 영웅
- Fel-Scarred. 빌드 표의 쐐기 (Best)가 Fel-Scarred에만 있고, 로테이션 가이드가 "쐐기 추천은 Fel-Scarred, 레이드는 Aldrachi Reaver"라고 명시함.

## 검증하며 고친 것
- 두 쐐기 빌드의 직업 트리가 같다: Disrupt(기본)·Improved Disrupt·Demon Muzzle·Chaos Nova·Imprison·Sigil of Misery·Consume Magic·Soul Cleanse·Darkness·Vengeful Retreat·Felblade 모두 두 빌드에 있음.
- 빌드에 없어 쓰지 않은 것: Netherwalk, Burn It Out(Wowhead는 던전에 따라 Soul Cleanse와 바꿔 끼우라고 권함), Inertia(툴팁상 Vengeful Retreat 뒤 12% 피해 증가지만 두 쐐기 빌드 모두 고르지 않음).
- 영웅 한쪽 빌드 전용 특성은 카드에 "Fel-Scarred 빌드"/"Aldrachi Reaver 빌드"로 표시: Ragefire·A Fire Inside·Burning Wound·Glaive Tempest(Fel-Scarred), Screaming Brutality(Aldrachi Reaver).
- 해제: 아군 해제 기술이 없다. Soul Cleanse는 "Immolation Aura가 1개의 저주 효과를 제거"로 자신에게만 적용되는 효과라 kit.dispel에 넣지 않고 공통 탭 유틸과 Devour 어픽스 줄에만 썼다. Consume Magic은 적의 이로운 마법 제거라 유틸로 씀.
- 이름 충돌: Murder Row core 툴팁에 적 기술 Blade Dance(1302007)·Eye Beam(1216954)이 있어, Murder Row 문장과 영웅 카드(모든 던전 탭에 나옴)에는 두 이름을 쓰지 않았다.
- 툴팁 손질: Eye Beam·Abyssal Gaze의 원문 조건식 `{?a320415[…]}`를 기본값 `[(40.26% of Attack Power) * 10]`으로 정리, Felblade meta의 "Requires level 15 (Havoc, Vengeance)"와 복수 문단(Fracture·Demonic Wards) 제거, Metamorphosis의 "[and 0% Leech]" 제거, Chaos Strike "[Min(20, 100)]%"를 20%로.
- Spore Spines(Lashers 근접 감속)는 core tips에 없어 전문화 tips에 툴팁을 넣었다.
- 어픽스는 Wowhead affix 번호 기준(148 Ascendant, 158 Voidbound, 162 Pulsar, 160 Devour)으로 옮겼다.

## 확인 못 한 것
- 보스별 파멸 전용 문장은 Wowhead 던전별 팁이 있는 곳(Regurgitate·Toxic Atrophy·Spore Spines·Condensed Mass·Cold Claws 감속 해제, Taz'Rah Nether Dash 중 Vengeful Retreat 금지, Xathuux Demonic Rage 30% 구간, Adderis & Aspix 대상 전환, Merektha A Knot of Snakes)만 옮겼고, 나머지는 로테이션 가이드의 일반 원칙이다(spec.note).
- Vengeful Retreat로 Cold Claws(마법 디버프)가 지워진다는 것은 Wowhead 문장만 근거이고 게임에서 확인하지 않았다.
- Chaos Nova·Sigil of Misery가 분신·Wild Imp·Animated Gold·Faithless Tormentor에 통하는지는 core 층 문장에 기댄 것이다.
- Eye Beam 최종 쿨타임(Cycle of Hatred 중첩)과 Immolation Aura 최종 쿨타임(A Fire Inside 6초 감소)은 합산하지 않고 감소 내용만 적었다.
- 매크로는 게임에서 시험하지 않았다.
