# 3단계: 분노 전사 (2026-09-27)

## 출처
- Wowhead 분노 특성 빌드(2026-08-12 갱신): 영웅마다 4행(레이드 단일·레이드 광역·쐐기·델브/필드)과 (Best) 표시. 쐐기 (Best)는 두 영웅 모두에 붙어 있음.
- Wowhead 분노 로테이션(2026-08-12 갱신): 단일·광역 우선순위, 오프너, 주요 쿨기 설명, Recklessness·Avatar 매크로 권장.
- Wowhead 분노 쐐기 팁(2026-08-18 갱신): 던전 8곳 모두 같은 유틸 평가(Spell Reflection 항상, Rallying Cry, Shockwave 필수, Piercing Howl·Berserker Rage 상황용)와 어픽스별 특성(Ascendant: Shockwave, Voidbound: Wrecking Throw, Pulsar: 없음, Devour: Fearless). 던전별 추천 코드는 8곳 모두 Slayer 쐐기 코드.
- 어픽스 id는 nether 툴팁 API로 확인: 148 Ascendant, 158 Voidbound, 160 Devour, 162 Pulsar.
- nether.wowhead.com 툴팁 API(영문·한글): 기술 59개.
- 쐐기 빌드 두 개의 실제 선택 노드: `_cache/talents-warrior-fury.json`(부모가 특성 계산기로 읽음).

## 기본 영웅
- Mountain Thane. 쐐기 ★가 두 영웅 모두에 있어 본문으로 정함. 빌드 페이지는 "Mountain Thane instead excels in high-target environments such as dungeons and delves"라고 쓰고, 쐐기 절에서 Mountain Thane을 먼저 소개하며 "very strong AoE… excellent in big or extended pulls", Slayer는 "Slightly stronger boss damage / Weaker sustained multitarget"로 평가함.

## 검증하며 고친 것
- 두 쐐기 빌드에 없는 특성은 쓰지 않음: Enraged Regeneration(Wowhead가 광역 빌드에서 Improved Whirlwind와 바꾼다고 명시), Intimidating Shout, Piercing Howl, Intervene, Champion's Spear, Thunderous Roar. Wowhead 유틸 목록의 Piercing Howl은 빌드에 없어 뺐음.
- 한쪽 빌드에만 있는 것은 표시: Thunder Clap·Avatar·Wrecking Throw·Javelineer·Storm Bolts·Thunder Blast·Avatar of the Storm·Capacitance·Lightning Strikes(Mountain Thane), Bladestorm·Odyn's Fury·Unhinged·Slayer's Dominance·Imminent Demise·Reap the Storm·Interpose·Stance Mastery(Slayer).
- 기본 기술(툴팁에 Talent 없음): Pummel, Charge, Execute, Whirlwind, Berserker Rage, Battle Shout, Heroic Throw, Taunt, Hamstring. 차단기는 Pummel(15초, Honed Reflexes로 10% 감소)이 기본이라 모든 차단 순번에 넣음.
- 보스는 기절에 면역이라 Storm Bolt·Shockwave는 쫄(Writhe, Lashers, Fractured Shivercore, 미라, 분신, Wild Imp, Animated Gold, Faithless Tormentor, 뱀)에만 씀. 보스 시전(Toxic Atrophy 본체 등)은 Pummel만.
- 피해 학파를 core 툴팁으로 대조해, 마법 피해(Nature·Holy·Shadow·Fire·Frost·Chaos)에는 Spell Reflection, 물리 피해(Ravenous Bellow, Overwhelming Onslaught, Killing Spree, Monstrous Roar, Severing Axe)에는 Defensive Stance를 씀. Spell Reflection은 마법 피해만 줄인다고 문장에 적음.
- 이름 충돌: core tips에 Murder Row의 "Whirlwind"(1297691), King's Rest의 "Bladestorm"(270927)이 있음. 영웅 카드(모든 던전 탭에 나옴)에는 두 이름을 쓰지 않았고, 두 던전 상세 문장에도 쓰지 않음.
- Berserker Rage는 툴팁상 공포·혼절·일부 행동 불가만 풀고, Fearless(두 빌드 모두)가 있어야 감속을 없앰. 감속 기믹(Fertile Loam, Bonespike Slam, Snowdrift, Condensed Mass)에만 "Berserker Rage(Fearless)"로 씀. 뿌리(Bloodthorn Roots)와 Hailbombs(가속 감소)에는 쓰지 않음.
- 한글 툴팁 오류 보정: Defensive Stance 한글 설명이 "모든 공격력이 10%만큼 증가"로 나오지만 영문 원문은 "all damage you deal by 10%"(감소)라 한글을 "감소"로 고침.
- 전사는 아군 해제 기술이 없어 kit.dispel은 비움. answers는 독·질병 "해제 가능한 파티원 담당", freedom은 "자신은 Berserker Rage(Fearless)".

## 확인 못 한 것
- 보스별 분노 전용 출처가 없음(Wowhead 던전별 칸이 모두 같은 일반 조언). 일반 원칙을 적용했고 spec.note에 적음.
- Bladestorm 한글 툴팁은 "6초 동안 7회"로, 영문 "4초 동안 5회"와 다름. 문장은 영문 기준(4초)으로 썼고 한글 툴팁은 원문 그대로 둠.
- Execute는 Wowhead 로테이션 링크(5308)를 따름. 5308 툴팁은 쿨 6초·생명력 20% 미만, 280735는 4.5초·35% 미만으로 서로 달라, 카드에는 20% 미만 조건만 적고 쿨타임은 쓰지 않음.
- Storm Bolt 최종 쿨타임(Storm Bolts +10초와 Honed Reflexes -10%가 겹칠 때)은 적용 순서를 몰라 숫자로 합치지 않음.
- Spell Reflection이 어떤 보스 주문(Chaos Bolt 등)을 실제로 반사하는지는 게임에서 확인하지 않음. Wowhead도 "반사되는 주문, 막히는 주문, 영향 없는 주문이 있다"고만 씀.
- Heroic Leap으로 Vine Grip 줄을 끊는 것과 매크로는 게임에서 시험하지 않음. 태세 전환 매크로는 stance 번호 순서를 확인할 수 없어 넣지 않음.

- (부모 보완) 공용 툴팁 도구가 "Requires Melee Weapon" 표시를 설명 앞에 붙이던 문제를 고친 뒤 툴팁 13개 설명을 다시 받았다. Executioner의 "[Arms: 25 / 15]%" 갈래는 분노 값 15%만 남겼다.
