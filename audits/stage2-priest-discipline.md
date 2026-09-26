# 2단계: 수양 사제 (2026-09-27)

## 출처
- Wowhead 수양 특성 빌드(2026-09-22 갱신): 코드 5개와 (Recommended) 표시. 쐐기·레이드 추천은 Voidweaver.
- Wowhead 수양 쐐기 팁(2026-08-18 갱신): 던전별 유틸리티(Mass Dispel, Phantasm, Mind Soothe, Improved Purify, Shackle Horror)와 어픽스 대응. 던전별 보스 팁은 "Coming Soon".
- Wowhead 수양 로테이션(2026-08-12 갱신): Oracle·Voidweaver 쐐기 우선순위, Ultimate Penitence 예약 시전, Atonement 상호작용(면역 대상은 Atonement 치유 0, 대상의 피해 증감 효과는 무관), Smite 매크로.
- Icy Veins Discipline Priest M+ Tips(12.1, 2026-08-10 갱신): 두 쐐기 빌드 설명, Penance 쿨마다, Shadow Mend 남발 시 마나 부족, 유틸리티. 던전별 팁은 "to be added soon".
- nether.wowhead.com 툴팁 API(영문·한글): 기술 62개.
- Wowhead 특성 계산기에서 두 쐐기 빌드의 선택 노드(data-full/data-partial)를 읽음(부모가 받은 `_cache/talents-priest-discipline.json`), 트리 전체 노드 목록도 확인.

## 기본 영웅
- Voidweaver. Wowhead 빌드 표의 쐐기 (Recommended)가 Voidweaver에만 붙어 있음(레이드도 Voidweaver).

## 검증하며 고친 것
- **Improved Purify는 두 쐐기 빌드 모두 고르지 않음** → Purify는 마법만 해제(툴팁: "removing all Magic [Improved Purify: and Disease]"). kit.dispel은 magic만. Regurgitate·Wretched Discharge 질병은 "질병 해제가 가능한 파티원에게 맡겨라"로 씀. Wowhead·Icy Veins는 Altar of Fangs·Kings' Rest에서 Improved Purify로 바꿔 찍기를 권하지만 규칙(쐐기 빌드에 없는 특성은 쓰지 않음)에 따라 사이트 문장에는 넣지 않음.
- Power Word: Barrier, Rapture, Power Word: Life, Vampiric Embrace, Shadowfiend/Mindbender, Shackle Horror, Holy Nova, Body and Soul은 12.1 수양 트리 노드가 아니거나 두 쐐기 빌드에서 고르지 않아 쓰지 않음(Wowhead 강점 목록에 Power Word: Barrier가 있지만 트리에 노드가 없음).
- Flash Heal은 두 빌드 모두 Shadow Mend 특성(1252217)으로 바뀌므로 카드·문장은 Shadow Mend(186263)로 씀. Mind Blast 뒤 Power Word: Shield는 Void Shield(1253593, 3명)로 바뀜(Master the Darkness, 두 빌드 공통).
- Voidweaver 전용: Entropic Rift, Void Blast, Voidheart, Void Infusion, Void Leech, Devour Matter, Divine Procession·Greater Smite·Shadow Tap·Occultist·Blaze of Light. Oracle 전용: Guiding Light, Assured Safety, Twinsight, Foreseen Circumstances, Save the Day, Weal and Woe·Borrowed Time·Searing Light·Shield Discipline·Revel in Darkness. 카드 설명에 영웅 표시를 붙임.
- 툴팁 정리 도구가 아이콘 없는 전문화 머리글("Discipline, Holy" 등 글자만 있는 줄)을 못 거르는 경우가 있어, 머리글 줄 기준으로 수양 문단만 남기는 후처리를 폴더 안 `postfilter.mjs`로 추가함(Shadow Word: Pain, Mind Blast, Shadow Word: Death, Protective Light, 영웅 특성들). Petrifying Scream의 편집기 잡음 줄, Assured Safety의 Prayer of Mending 원문 반복은 손으로 뺌.
- Desperate Prayer는 Light's Inspiration을 고르지 않아 25%로 씀.
- 해제 종류는 `_cache/boss-dispel-types.txt`(툴팁 buff 칸)로 대조: Glacial Torment·Corroding Spittle·Bloodthorn Roots·Paralyzing Shots는 Magic → Purify/Mass Dispel. Toxic Spores·Heartstop Poison·Poison Spit·Poison Nova는 Poison → 수양 불가. Stormslam·Mind-Numbing Poison·Cold Claws는 해제 종류 없음 → 해제 문장 안 씀.
- Taz'Rah 보스 기술 이름도 Void Blast라서(core 툴팁이 우선), Voidscar 문장과 Voidweaver 영웅 카드에는 Void Blast를 쓰지 않음.

## 빌드 코드 처리
- Oracle: Wowhead 표에 레이드·쐐기만 있고 델브 빌드가 없음(2026-09-22 갱신본 재확인). add-spec이 빌드 코드 3개를 요구하므로 Oracle 가이드 델브 칸에 **Voidweaver 델브 빌드를 "델브 (Voidweaver 빌드)"라고 이름 붙여** 두고, 아래 설명 문단에도 적음.
- Voidweaver 델브 빌드는 쐐기 빌드와 코드가 같음(Wowhead 표 그대로).

## 확인 못 한 것
- 보스별 수양 대응은 던전별 수양 전용 출처가 없어 일반 원칙을 적용함(spec.note).
- Ruby Life Pools Melidrussa의 Cold Claws: Wowhead는 Mass Dispel로 탱커 중첩을 지우라고 하지만 Cold Claws 툴팁에 해제 종류가 없어 문장에 넣지 않음.
- Avatar of Sethraliss 2페이즈: Atonement나 Ultimate Penitence가 Avatar(NPC)를 치유하는지 확인 못 해 직접 치유(Shadow Mend·아군 대상 Penance)만 씀.
- Power Word: Shield·Void Shield 흡수량은 툴팁에 "absorbing 0 damage"로 나와 수치를 쓰지 않음. Fade 쿨타임은 Improved Fade 툴팁 값이 "(5))"로 깨져 있어 숫자를 쓰지 않음.
- Smite 매크로는 Wowhead 매크로에서 PvP 전용 Dark Reprimand 조건만 뺀 것이고 게임 안에서 확인하지 않음.
- **엔진 한계(부모 확인 필요)**: 상세 공략 문장의 이름 감싸기(`abWrap`)가 콜론을 넘지 못해 Power Word: Shield·Power Word: Radiance·Shadow Word: Pain·Shadow Word: Death가 "Power Word"와 "Shield"로 나뉘어 감싸짐 → 이 문장들에서 툴팁이 안 뜨고 한글 게임 언어에서도 영어로 남음. 데이터로는 피할 수 없음.
