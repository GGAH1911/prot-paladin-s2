# 2단계: 신성 성기사 (2026-09-27)

## 출처
- Wowhead 신성 성기사 특성 빌드(2026-09-20 갱신): 빌드 10개(영웅 2개 × 레이드·쐐기 Virtue/Faith 4개 + 델브 1개)와 (Recommended) 표시
- Wowhead 신성 성기사 쐐기 팁(2026-08-18 갱신): 던전별 해제·Blessing of Freedom·Blessing of Protection 권장, 어픽스 대응
- Wowhead 신성 성기사 로테이션(2026-09-20 갱신): 치유 우선순위, Holy Power 소비 기술 선택, Lightsmith 운영 차이, Avenging Wrath·Aura Mastery·Divine Shield·Blessing 사용법, 봉화 대상 선택
- nether.wowhead.com 툴팁 API(영문·한글): 기술 57개
- Wowhead 특성 계산기에 쐐기 빌드 코드 4개를 넣고, 실제로 선택된 노드(data-full/data-partial)를 읽음(부모가 미리 받아 둔 `_cache/talents-paladin-holy.json`)

## 기본 영웅
- Herald of the Sun. Wowhead 빌드 표의 쐐기 (Recommended)는 Herald of the Sun의 M+ - Virtue에만 붙어 있음. Lightsmith는 델브 (Recommended).

## 검증하며 고친 것
- **Rebuke**는 툴팁에 Talent가 있고 네 쐐기 빌드 어디에도 없음 → 차단기로 쓰지 않음. 공통 탭·카드에 "Rebuke가 없다"고 명시하고, 시전 끊기는 Hammer of Justice·Blinding Light(둘 다 보스 면역 배지)로 씀. Frigid Shard 차단 순번 문장도 "신성 성기사는 들어가지 못한다"로 씀.
- 한쪽 빌드에만 있는 특성은 표시: Beacon of Virtue·Pillars of Light(Virtue 빌드), Beacon of Faith(Faith 빌드), Eternal Flame·Dawnlight·Sun's Avatar·Aurora·Ringing of the Heavens·Light of the Martyr(Herald 빌드), Protection of Tyr·Tirion's Devotion·Holy Bulwark·Solidarity·Laying Down Arms·Authoritative Rebuke·Rite of Sanctification(Lightsmith 빌드), Call of the Righteous(Herald Virtue 빌드에는 없음 → "Call of the Righteous 빌드"라고 씀).
- Cleanse 툴팁: 기본 Magic, "[Improved Cleanse: Poison, Disease, and]" → Improved Cleanse가 네 쐐기 빌드 모두에 있어 kit.dispel을 마법·독·질병 모두 Cleanse로 둠.
- 공유 툴팁 도구가 성기사 전문화 아이콘(spell_holy_holybolt 등)을 전문화 문단 머리로 알아보지 못해, 로컬 사본(`work/tooltip-pal.mjs`)에 아이콘 세 개를 추가해 다시 받음. 그래도 남은 것은 손으로 고침: Word of Glory(Protection 꼬리 문단), Unbreakable Spirit(Shield of Vengeance·Ardent Defender 갈래), Echoing Blessings(Blessing of Spellwarding 갈래).
- Divine Toll 45초·Holy Armaments 충전 단축은 Quickened Invocation(네 빌드 모두) 툴팁 기준. Avenging Wrath 지속 50% 증가는 Sanctified Wrath 툴팁 기준.
- Hulking Claw는 core 툴팁상 자연 피해라 Blessing of Protection 대신 Blessing of Sacrifice로 씀. Bedrock Slam은 Nature+Physical이라 BoP로 다 막지 못한다고 씀.
- 해제 종류는 `_cache/boss-dispel-types.txt`(툴팁 buff 칸)만 씀: Regurgitate(질병), Spiteful Venom·Toxic Spores·Heartstop Poison·Poison Nova·Poison Spit(독), Glacial Torment·Corroding Spittle·Bloodthorn Roots(마법), Wretched Discharge(질병).
- Light of the Martyr가 봉화 자기 치유를 막는다는 문장은 Herald 빌드 가이드에만 넣음(Lightsmith 빌드에는 그 특성이 없음).

## 확인 못 한 것
- Wowhead 쐐기 팁은 Mind-Numbing Poison·Poison Splash(Voidscar)를 해제하라고 하지만, 툴팁 buff 칸에 해제 종류가 없어 보스 문장에 쓰지 않음.
- Wowhead가 Blessing of Freedom으로 지울 수 있다고 한 Regurgitate·Toxic Atrophy·Rime Detonation·Condensed Mass는 Wowhead 문장만 근거이고, 게임 안에서 확인하지 않음.
- Avenging Wrath의 정확한 지속 시간(Sanctified Wrath + Call of the Righteous를 함께 쓸 때)은 툴팁 주석이 여러 값이라 숫자를 쓰지 않음. Lay on Hands·Divine Shield·Divine Protection도 Unbreakable Spirit·Tirion's Devotion을 겹친 최종 쿨타임은 계산하지 않고 감소율만 적음.
- Beacon of the Savior 흡수량은 툴팁에 "0 damage"로 나와 수치를 쓰지 않음.
- 보스별 신성 성기사 쿨기 배치는 전용 출처가 없어 로테이션 가이드의 일반 원칙을 적용함(spec.json note).
- Holy Armaments 매크로(/cast Holy Armaments)는 보호 성기사 매크로와 같은 형식이고 게임 안에서 확인하지 않음.
