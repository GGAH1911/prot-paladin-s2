# 3단계: 화염 마법사 (2026-09-27)

## 출처
- Wowhead 화염 특성 빌드(2026-08-13 갱신): 빌드 6개(영웅 2개 × 레이드·쐐기·델브), (Best) 표시와 본문 영웅 평가
- Icy Veins Fire Mage M+ Tips (12.1, 2026-08-10 갱신): Counterspell 차단, Supernova·Dragon's Breath 광역 끊기, Remove Curse·Spellsteal·Greater Invisibility·Energized Barriers 유틸, 우선 처치 대상은 Hot Streak을 Pyroblast에·쫄이 많으면 Flamestrike에, 어픽스 대응
- nether.wowhead.com 툴팁 API(영문·한글): 기술 49개
- Wowhead 특성 계산기에서 두 쐐기 빌드의 실제 선택 노드(부모가 미리 받은 `_cache/talents-mage-fire.json`)
- Wowhead 로테이션·쐐기 팁 페이지는 이 작업 중 CloudFront 403으로 막혀 읽지 못함(이 Mac·tme-laptop·WebFetch 모두)

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

## 확인 못 한 것
- 보스별 화염 전용 출처가 없다. Icy Veins 원칙을 각 기믹에 적용했고 spec.note에 적었다.
- Energized Barriers로 Regurgitate·Condensed Mass 감속을 지우는 것은 Icy Veins의 "감속을 주는 디버프를 통째로 지울 수 있다"는 설명에서 끌어낸 것이고 게임 안에서 확인하지 않았다.
- Supernova·Frost Nova가 분신·Wild Imp·Lashers·Animated Gold·Faithless Tormentor에 통하는지는 core 층 문장에 기댄 것이다.
- Interrupting Cloudburst를 즉시 시전 기술로 피하는 것은 core 문장("시전을 멈춰 잠금을 피한다")에서 끌어낸 원칙이다.
- Wowhead 로테이션·쐐기 팁 페이지를 읽지 못해(403) 던전별 Wowhead 유틸 평가는 반영하지 못했다.
- 매크로는 게임 안에서 확인하지 않았다.
