# 3단계: 화염 마법사 (2026-09-27)

## 출처
- Wowhead 화염 특성 빌드(2026-08-13 갱신): 빌드 6개(영웅 2개 × 레이드·쐐기·델브), (Best) 표시와 본문 영웅 평가
- Icy Veins Fire Mage M+ Tips (12.1, 2026-08-10 갱신): Counterspell 차단, Supernova·Dragon's Breath 광역 끊기, Remove Curse·Spellsteal·Greater Invisibility·Energized Barriers 유틸, 우선 처치 대상은 Hot Streak을 Pyroblast에·쫄이 많으면 Flamestrike에, 어픽스 대응
- nether.wowhead.com 툴팁 API(영문·한글): 기술 49개
- Wowhead 특성 계산기에서 두 쐐기 빌드의 실제 선택 노드(부모가 미리 받은 `_cache/talents-mage-fire.json`)
- Wowhead 화염 쐐기 팁(던전별 유틸 평가·보스 팁·어픽스 표)과 로테이션 가이드(Combustion은 시전 끝에 켜기, Double Pyroblast): 처음엔 CloudFront 403으로 막혔다가, 막힘이 풀린 뒤 tme-laptop에서 받아 보강함

## 기본 영웅
- Sunfury. 빌드 표의 쐐기 행에는 ★가 없다. 본문이 "Sunfury is ahead of Frostfire in most metrics… Sunfury is the recommended version, but both are viable"이라고 평가한다. 레이드 ★는 Sunfury, 델브 ★는 Frostfire.

## 검증하며 고친 것
- 두 쐐기 빌드에 없는 특성은 쓰지 않았다: Dragon's Breath, Ring of Frost, Mass Polymorph, Mass Invisibility, Blast Wave, Improved Spellsteal. Icy Veins가 Dragon's Breath를 Supernova의 대안으로 소개하지만 Wowhead 쐐기 빌드는 Supernova를 골랐다.
- 두 빌드 모두 **Ice Cold**를 골라 Ice Block이 무적이 아니라 "6초 동안 받는 피해 70% 감소, 움직이며 시전 가능"이다. 보스 문장의 Ice Block은 이 효과 기준으로 썼다(무적으로 기믹 무시 문장은 쓰지 않음).
- Scorch·Heat Shimmer는 Sunfury 빌드에만 있어 이동 중 딜 문장에 "Sunfury는"을 붙였다. Frostfire 가이드 카드에는 Scorch를 넣지 않았다.
- Counterspell(25초)·Phoenix Flames·Frost Nova·Polymorph·Time Warp·Arcane Intellect는 툴팁에 Talent가 없는 기본 기술.
- Combustion 쿨 1분은 두 빌드가 고른 Kindling(60초 감소) 반영, Ice Block 3분 30초는 Winter's Protection(30초 감소) 반영.
- Combustion 툴팁의 "increases your spell damage by 0%" 괄호 문장은 수치가 비어 있어 뺐다.
- 이름 충돌: Frostfire 특성 Burnout이 Ruby Life Pools core 툴팁(Blazebound Firestorm의 Burnout)과 이름이 같아, 그 던전 문장과 영웅 카드에 쓰지 않았다.
- 상세 문장에서 "Hot Streak Pyroblast"처럼 영어 이름이 붙으면 한 덩어리로 감싸져 툴팁이 안 떠서, 조사로 떼어 썼다. "Hot Streak"·"Ignite"는 tips 별칭으로 Hot Streak!(48108)·Mastery: Ignite(12846)에 연결했다.

## Wowhead 보강 (막힘 해제 뒤)
- 보스 문장에 넣은 것(모두 두 쐐기 빌드에 있는 기술, "(Wowhead)" 표시): Zul'jan Boneslicer를 Greater Invisibility로 건너뛰게 하기(Ritual Venom을 지울 사람이 남아 있으면 쓰지 말라는 조건 추가), Ikuzz Bloodthorn Roots를 Greater Invisibility로 끊기, Sentinel of Winter 빙판에서 Alter Time 두 번 눌러 멈추기, Lithiel Malefic Wave를 Shimmer로 넘기, Charonus Void Cascade를 Greater Invisibility로 멈추기, Adderis & Aspix Gust를 Greater Invisibility로 끊기.
- 공통 탭: Combustion은 다른 시전이 끝나기 직전에 켠다(로테이션), Greater Invisibility 사용처, Alter Time 빙판 팁, 어픽스 4개를 Wowhead 표 기준으로 고침(Ascendant는 오브가 다 나온 뒤 Supernova, Devour는 자신에게 Remove Curse 또는 Blazing Barrier(Energized Barriers)로 지운 뒤 다른 파티원, Voidbound는 "Voidbound Emissary가 주변 적을 강화"로 이름·효과를 affix=158 툴팁에 맞춤, Pulsar 추가). 어픽스 이름은 affix 툴팁(158 Voidbound, 160 Devour, 162 Pulsar, 148 Ascendant)으로 확인.
- 넣지 않은 것: Dragon's Breath·Ring of Frost·Blink 권장(쐐기 빌드에 없거나 Shimmer로 바뀜), 일반몹 대상 팁(Paralyzing Shot, Insatiable Hunger, Curse of Doom, Drain Life, 거북이 Polymorph, Temple Disruptors, Accumulate Charge, Captain's Bulwark, Cinderbolt 등), Serpentine Gust 시야 숨기(전문화 기술이 아닌 공통 요령), Ruby의 "빨간 원 넉업에 Alter Time"(어느 보스 기술인지 확인 못 함).
- ★는 가이드 원문 행(Raid (Best) Sunfury, Delves (Best) Frostfire)과 대조해 맞음을 확인했다. Stormslam 디버프(381515, Magic)는 화염이 풀 수 없어(마법 해제 없음, Spellsteal은 적 대상) 해당 없음.

## 확인 못 한 것
- Wowhead 던전별 팁이 없는 보스 기믹은 Icy Veins 원칙을 적용했고 spec.note에 적었다.
- Energized Barriers로 Regurgitate·Condensed Mass 감속을 지우는 것은 Icy Veins의 "감속을 주는 디버프를 통째로 지울 수 있다"는 설명에서 끌어낸 것이고 게임 안에서 확인하지 않았다.
- Supernova·Frost Nova가 분신·Wild Imp·Lashers·Animated Gold·Faithless Tormentor에 통하는지는 core 층 문장에 기댄 것이다.
- Interrupting Cloudburst를 즉시 시전 기술로 피하는 것은 core 문장("시전을 멈춰 잠금을 피한다")에서 끌어낸 원칙이다.
- Wowhead Ruby Life Pools 팁의 "빨간 원에 띄워질 때 Alter Time"은 해당 보스 기술을 특정하지 못해 넣지 않았다.
- Greater Invisibility로 Boneslicer·Void Cascade·Gust·Bloodthorn Roots를 끊는 것은 Wowhead 문장만 근거이고 게임 안에서 확인하지 않았다.
- 매크로는 게임 안에서 확인하지 않았다.
