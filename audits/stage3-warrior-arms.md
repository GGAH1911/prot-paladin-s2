# 3단계: 무기 전사 (2026-09-27)

## 출처
- Wowhead 무기 특성 빌드(2026-08-12 갱신): 빌드 8개(영웅 2개 × 레이드 단일·레이드 광역·쐐기·델브)와 (Recommended) 표시
- Wowhead 무기 쐐기 팁(2026-08-18 갱신): 유틸리티 평가(Spell Reflection 상시, Rallying Cry, Shockwave 필수, Piercing Howl·Berserker Rage 상황용), 던전별 추천 빌드 8곳(모두 Slayer 쐐기 코드)
- Wowhead 무기 로테이션(2026-08-20 갱신): 단일·광역·처형 구간 우선순위, 쿨기 운용(쿨마다, 10~15% 넘게 늦추지 않기), 딜 공백 줄이기(Charge·Heroic Leap)
- nether.wowhead.com 툴팁 API(영문·한글): 기술 58개
- 부모가 읽어 둔 쐐기 빌드 2개의 실제 선택 노드(`_cache/talents-warrior-arms.json`)

## 기본 영웅
- Slayer. Wowhead 빌드 표에서 쐐기 ★는 Slayer에만 붙어 있음. Colossus의 ★는 델브에만 있음.

## 검증하며 고친 것
- 두 쐐기 빌드에 Intimidating Shout, Piercing Howl, Intervene, Champion's Spear, Thunderous Roar가 없음 → 쓰지 않음(Wowhead 쐐기 팁은 Piercing Howl을 유틸로 소개하지만 빌드에 없음).
- Pummel, Berserker Rage, Sweeping Strikes, Execute, Slam, Heroic Strike, Charge, Hamstring, Heroic Throw, Battle Shout는 툴팁에 Talent가 없는 기본 기술.
- 한 영웅 빌드에만 있는 특성은 문장에 표시: Bladestorm·Unhinged·Tactical Edge·Violent Euphoria·Unrelenting Onslaught(Slayer), Ravager·Demolish·Colossal Might·Crushing Combo·Decimator·Earthquaker(Colossus).
- Unrelenting Onslaught 툴팁 "You can use Pummel and Storm Bolt while Bladestorming" → Slayer 차단 문장에 반영.
- Fearless 툴팁 "Berserker Rage removes all movement speed-impairing effects", Berserker Rage 툴팁 "removing and granting immunity to Fear" → Regurgitate 이동 속도 감소, Condensed Mass 이동 속도 감소, Reban의 Deathly Roar 공포 문장에 사용. 뿌리(Bloodthorn Roots)는 이동 속도 감소가 아니라서 쓰지 않음.
- 생존기 선택은 core 툴팁 피해 학파로 대조: Ravenous Bellow·Killing Spree·Overwhelming Onslaught·Monstrous Roar(Physical) → Die by the Sword, Thorncaller Roar·Echoing Fury·Thunder and Lightning(Nature), Frozen Tempest(Frost), Infernal Crush·Gilded Destruction(Fire), Dark Bloom·Cosmic Crash(Shadow), Chaos Bolt(Chaos) → Spell Reflection(받는 마법 피해 20% 감소).
- 보스(Kezkitt 등)에는 기절이 통하지 않아 보스 시전 차단은 Pummel만 씀. Storm Bolt·Shockwave·Hamstring 카드에 보스 면역 배지.
- 공용 툴팁 도구가 설명 앞 "Requires Melee Weapon"을 전문화 머리글에 붙여 다른 전문화 문단(Bladestorm의 Fury 문단 등)을 거르지 못해, 폴더 안 사본(`work/tooltip.mjs`)에서 requirements span을 먼저 지우도록 고쳐 다시 받음.
- Impending Victory 한글 meta의 "연전연승을(를)"을 "연전연승을"로 고침.

## 확인 못 한 것
- 보스별 무기 전용 출처가 없음. Wowhead 쐐기 팁의 던전별 팁 8개가 모두 같은 일반 문단이라 일반 원칙을 적용함(spec.note).
- Spell Reflection이 각 보스 주문을 실제로 반사하는지는 확인하지 않음. 문장은 툴팁의 "받는 마법 피해 20% 감소"만 근거로 씀.
- Fractured Shivercore, Mirror Images 분신, Twisted Hexxer에 Storm Bolt 기절이 통하는지는 core 문장("차단하거나 CC")에 기댄 것.
- 쿨 감소 특성(Honed Reflexes 10%, Bounding Stride, Double Time)을 겹친 최종 쿨타임은 Heroic Leap 30초 외에는 계산하지 않고 감소율만 적음.
- 매크로는 게임 안에서 확인하지 않음.
