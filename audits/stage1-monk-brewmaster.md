# 1단계: 양조 수도사 (2026-09-27)

## 출처
- Wowhead 양조 특성 빌드(2026-08-13 갱신): 코드 6개와 Current Recommendations의 (Best) 표시
- Wowhead 양조 쐐기 팁(2026-08-24 갱신): 쐐기 유틸리티(Paralysis, Detox, Leg Sweep, Ring of Peace), 어픽스별 추천 특성
- Icy Veins Brewmaster M+ Tips (12.1): Spear Hand Strike 차단, Leg Sweep, Ring of Peace, Black Ox Statue로 어그로 모으기, Detox를 권하는 던전 7개(Altar of Fangs, Den of Nalorakk, King's Rest, Murder Row, Temple of Sethraliss, The Blinding Vale, Voidscar Arena)
- nether.wowhead.com 툴팁 API(영문·한글): 기술 37개
- Wowhead 특성 계산기에 쐐기 빌드 코드 두 개를 넣고, 실제로 선택된 노드(data-full/data-partial)를 읽음

## 기본 영웅
- Shado-Pan. Wowhead 빌드 표에서 쐐기 (Best)는 Shado-Pan에만 붙어 있음. Master of Harmony는 레이드·델브 (Best).

## 검증하며 고친 것
- 두 쐐기 빌드에 Diffuse Magic, Dampen Harm, Zen Meditation, Healing Elixir, Rushing Jade Wind가 없음 → 쓰지 않음. 12.1에서는 Celestial Brew 대신 **Celestial Infusion**(1241059)을 씀.
- Rising Sun Kick은 툴팁에 Talent가 있지만 양조 트리에 없어 뺌. Leg Sweep·Touch of Death·Vivify·Provoke·Roll·Expel Harm은 기본 기술(툴팁에 Talent 없음).
- 툴팁이 전문화별 문단으로 나뉜 기술(Fortifying Brew, Flurry Strikes, Tiger Palm)은 양조 문단만 남김. Flurry Strikes는 양조에서 Keg Smash로 터짐.
- Detox 툴팁: "Removes all Poison and Disease effects" → 독·질병 해제 담당을 "나"로 표시.
- Tiger's Lust 툴팁: "removes all roots and snares" → 보호 성기사가 Blessing of Freedom을 쓰던 Bloodthorn Roots, Condensed Mass, Cold Claws 문장을 Tiger's Lust로 씀. freedom 답도 Tiger's Lust.
- 기믹 피해 종류를 core 툴팁으로 대조: Void Blast·Dark Waves(암흑), Hulking Claw(자연)는 Stagger가 58% 효율이라 Celestial Infusion·Fortifying Brew로 받게 씀. Stormslam·Lightning Bite는 물리+자연.
- 양조는 전투 부활이 없어(Resuscitate는 전투 중 사용 불가) Galvazzt 문장을 "전투 부활이 있는 파티원에게 알린다"로 씀.

## 확인 못 한 것
- 보스별 양조 대응은 던전별 양조 전용 출처가 없어 일반 원칙을 적용함(spec.json note).
- Fortifying Brew 쿨타임은 툴팁 기본 6분. 쐐기 빌드의 Expeditious Fortification 적용 값은 툴팁 주석에 여러 개가 있어 숫자를 확정하지 않음.
- Celestial Infusion 흡수량은 툴팁에 "up to 0 total"로 나와 수치를 쓰지 않음.
- Provoke를 Black Ox Statue에 쓰는 매크로(/target Black Ox Statue)는 사이트 매크로 형식으로 만든 것이고 게임 안에서 확인하지 않음.
- Master of Harmony 운영 문장은 Wowhead 빌드 페이지 설명 문단 기준이고, 활력 사용 방법(Aspect of Harmony 방출 조건)은 툴팁 일부만 확인함.
