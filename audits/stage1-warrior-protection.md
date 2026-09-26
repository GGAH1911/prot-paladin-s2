# 1단계: 방어 전사 (2026-09-27)

## 출처
- Wowhead 방어 전사 특성 빌드(2026-08-12 갱신): 영웅별 레이드·쐐기·델브 코드 6개. 표의 (Best)는 Colossus 델브, Mountain Thane 레이드·쐐기.
- Wowhead 방어 전사 쐐기 가이드(2026-08-18): 유틸 3종(Disrupting Shout, Shockwave, Spell Reflection), 어픽스별 추천(Ascendant: Disrupting Shout/Shockwave, Pulsar: Heroic Leap, Devour: Avatar/Victory Rush). 던전별 팁 8개는 모두 "Nothing fancy".
- nether.wowhead.com 툴팁 API(영문·한글) 39개 기술.
- Wowhead 특성 계산기에 두 쐐기 빌드 코드를 넣어 실제로 찍힌 노드를 읽음(data-full/data-partial).
- Icy Veins는 Cloudflare 차단으로 읽지 못함.

## 검증하며 고친 것
- 두 쐐기 빌드 모두 고르지 않은 노드: Champion's Spear, Second Wind, Fast Footwork, Fight Through the Flames, Massacre 등 → 쓰지 않음.
- Last Stand(12975)는 기본 기술(툴팁에 Talent 없음, 3분). 트리의 Last Stand 노드(1243659, Shield Wall과 연동)는 두 빌드 모두 미선택이라 문장에 넣지 않음.
- Rallying Cry·Intervene은 Colossus 쐐기 빌드에만 있음 → 문장·카드에 "(Colossus 빌드)" 표시, Mountain Thane 가이드에서는 '아군 보호' 묶음을 뺌.
- Morale Killer 미선택이라 Demoralizing Shout는 "나에게 주는 피해 20% 감소 8초"로 씀.
- Pummel, Berserker Rage, Taunt, Challenging Shout, Heroic Throw, Charge, Battle Shout, Shield Slam, Shield Block, Execute는 기본 기술(특성 트리에 없음, 툴팁에 Talent 없음).
- 기믹 피해 종류는 data/core/spells.en.json으로 대조: Chaos Barrage 혼돈, Hulking Claw 자연, Void Blast·Dark Waves 암흑, Frozen Tempest 냉기 → Shield Block 대신 Ignore Pain·Spell Reflection. Bedrock Slam·Stormslam·Lightning Bite·Thornspike·Tainted Strike는 물리+마법이라 Shield Block+Ignore Pain.
- 방어 전사는 해제 수단 없음(kit.dispel {}). 이동 방해 해제 수단도 없어 freedom은 "해제 가능한 파티원 담당". 전투 부활 없음.
- 넉백 면역 수단은 Colossus Demolish 정신 집중뿐이라, 넉백 기믹 문장은 "벽을 등진다"로 씀.

## 확인 못 한 것
- 보스별 방어 전사 대응은 던전별 전용 출처가 없어 일반 원칙을 적용함(spec.note).
- Spell Reflection이 각 보스 기술(Void Blast 등)을 실제로 반사하는지는 확인하지 않음. 문장은 "마법 피해 20% 감소" 효과 기준.
- Storm Bolt·Shockwave·Piercing Howl의 보스 면역 배지는 일반 규칙으로 붙임(개별 보스 확인 안 함).
- 매크로 5개는 사이트 기존 형식으로 만든 것이고 Wowhead 매크로 페이지 대조는 하지 않음.
- 로테이션 페이지는 읽지 않음. 카드 설명은 툴팁 원문 기준.
