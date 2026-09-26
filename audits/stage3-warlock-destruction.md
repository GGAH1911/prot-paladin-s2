# 3단계: 파괴 흑마법사 (2026-09-27)

## 출처
- Wowhead 파괴 특성 빌드(2026-08-29 갱신): 영웅마다 레이드 단일·레이드 광역·쐐기(Mythic+/AoE)·Raid Council·델브 행과 (Recommended) 표시. Council 행 코드는 Diabolist는 쐐기, Hellcaller는 쐐기·델브 코드와 같아 가이드에는 넣지 않음.
- Wowhead 파괴 쐐기 팁(tme-laptop에서 받음): 던전별 유틸(Singe Magic, Devour Magic, Demonic Circle·Demonic Gateway, Blight of Tongues, Curse of Tongues) 팁과 어픽스 대응(affix=148 Ascendant, 158 Voidbound, 162 Pulsar, 160 Devour 순서로 대조).
- Wowhead 파괴 로테이션: Diabolist·Hellcaller 우선순위, 영혼의 조각 소모 규칙(Hellcaller는 3마리 이상 Rain of Fire, Diabolist는 늘 Chaos Bolt), Diabolic Ritual 악마 순서.
- nether.wowhead.com 툴팁(영문·한글): 기술 59개. 공용 `_tools/tooltip.mjs` 사용, `lint-tt` 0건.
- 특성 판정: `_cache/talents-warlock-destruction.json`(두 영웅 쐐기 빌드의 실제 선택 노드).

## 기본 영웅
- Diabolist. 쐐기 ★는 Diabolist Mythic+/AoE에만 있고, 쐐기 팁의 던전별 추천 코드 8개가 모두 Diabolist 쐐기 코드와 같다. Hellcaller ★는 레이드 단일·레이드 광역·Council·델브.

## 검증하며 고친 것
- **빌드에 없는 특성 제외:** Soul Fire, Channel Demonfire, Havoc은 로테이션 가이드에 나오지만 두 쐐기 빌드 어디에도 없다. Havoc 자리는 Mayhem(두 빌드 모두)이 골라져 있어, 카드는 Mayhem(35% 확률로 5초 Havoc 효과)으로 쓰고 Havoc을 직접 쓰라는 문장은 넣지 않았다.
- **한쪽 빌드 전용 표시:** Shadowfury·Banish·Inferno·Abyssal Dominion·Improved Mortal Coil·Diabolic Ritual 계열(Diabolist), Howl of Terror·Curse of Tongues·Wither·Malevolence·Blackened Soul(Hellcaller). 문장마다 "(Diabolist)"/"(Hellcaller)"를 붙였다.
- **쿨타임 계산(두 빌드 공통 특성 반영):** Shadowfury 1분 → 45초, Howl of Terror 40초 → 35초(Oppressive Darkness). Summon Infernal은 Diabolist만 Inferno로 1분 30초.
- **차단:** 흑마법사 자체 차단은 없고 Felhunter의 Spell Lock(24초, Command Demon)이다. Summon Felhunter는 기본 기술이라 모든 차단 순번 문장에 넣었다. Imp을 쓰는 동안에는 차단이 없다고 공통 탭에 적었다.
- **해제:** 아군 마법 해제는 Imp의 Singe Magic(15초, 1개)뿐이라 펫을 바꿔야 한다. 해제 담당표가 영웅·펫에 따라 달라질 수 없어 `kit.dispel`은 비우고, 보스 문장에는 "Imp을 꺼냈다면"을 붙였다. 적용한 보스 해제(모두 Magic, `dungeon-dispel-types.txt`와 기술 페이지 확인): Bloodthorn Roots, Glacial Torment, Corroding Spittle, Cold Claws, Stormslam(디버프 381515).
- **이름 충돌:** Chaos Bolt·Dark Pact·Demonic Gateway(Murder Row), Inferno(Ruby Life Pools)가 core 툴팁 이름과 같다. heroCards에는 이 넷을 쓰지 않았고, Murder Row·Ruby 문장에서는 내 기술로 쓰지 않았다(Lithiel의 Chaos Bolt 차단 문장은 보스 기술이라 core 툴팁이 맞다).
- **툴팁 손질:** Demonic Art 3종의 "Modifies … 0%" 꼬리 제거, Infernal Bolt·Ruination·Blackened Soul의 다른 전문화 갈래 제거, Demonic Circle의 Kilrogg's Cunning 갈래 제거(빌드에 없음), Healthstone은 두 빌드의 Empowered Healthstone 갈래만 남김.
- **수치:** Infernal Bolt는 툴팁 기준 영혼의 조각 3개 생성(Wowhead 본문은 2개라고 씀).

## 확인 못 한 것
- 보스별 파괴 전용 운영은 Wowhead 던전별 팁이 던전당 두세 줄이라, 나머지는 로테이션 가이드의 일반 원칙을 적용했다(spec.note).
- 게임 안에서 확인하지 않은 것: Demonic Circle: Teleport가 Regurgitate·Bonespike Slam·Condensed Mass의 이동 속도 감소를 지우는지(툴팁 "모든 이동 속도 감소 효과 제거"에서 끌어냄), Shadowfury·Howl of Terror가 분신·Writhe·Wild Imp·Animated Gold·뱀에 통하는지(core 문장에 기댐), 매크로 동작(특히 Command Demon으로 Singe Magic을 마우스오버로 쓰는 매크로).
- Frozen Tempest·Murder in a Row 전에 Demonic Circle을 미리 깔아 두라는 문장은 툴팁 기능에서 끌어낸 운영 팁이고 출처 문장은 없다.
