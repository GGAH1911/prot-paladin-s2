# 3단계: 악마 흑마법사 (2026-09-27)

## 출처
- Wowhead 악마 특성 빌드(2026-08-12 갱신): 코드 8개와 ★ 표시(부모가 받아 둔 `_cache/builds-warlock-demonology.json`)
- Wowhead 악마 쐐기 팁(2026-08-21 갱신): 던전별 유틸(Healthstone·Soulstone·Demonic Gateway·Shadowfury·Curse of Tongues), 던전별 팁, 어픽스 대응 표
- Wowhead 악마 로테이션(2026-08-12 갱신): 단일·광역 우선순위, Summon Demonic Tyrant·Grimoire·Implosion·Doomguard 사용법, Demonic Core 관리
- nether.wowhead.com 툴팁 API(영문·한글): 기술 66개
- 특성 계산기의 쐐기 빌드 2개 실제 선택 노드(`_cache/talents-warlock-demonology.json`)

## 기본 영웅
- Diabolist. Wowhead 빌드 표에서 레이드·쐐기·델브 ★가 모두 Diabolist에만 있다. 쐐기 팁의 던전별 추천 코드 8개도 모두 Diabolist 쐐기 코드와 같다.

## 검증하며 고친 것
- **차단**: 흑마법사 본인의 차단 기술은 두 빌드에 없다. 차단은 Felguard의 Axe Toss(89766, 30초, 4초 기절+차단)로 썼다. Wowhead 쐐기 팁은 "Grimoire: Fel Ravager로 차단을 하나 더 얻고 쿨 동안 Spell Lock이 된다"고 쓰지만, Grimoire: Fel Ravager 툴팁(1276467)은 "적 이로운 마법 효과 1개 제거, 쿨 동안 Devour Magic으로 바뀜"이다. 툴팁을 따라 차단으로 쓰지 않았다.
- **해제**: Grimoire: Imp Lord(Diabolist 빌드) 툴팁이 "쿨 동안 Singe Magic으로 바뀜"이고 Singe Magic(132411)은 아군의 해로운 마법 효과 1개를 지운다. 기본 영웅이 Diabolist라 `kit.dispel`에 마법(Singe Magic)을 넣고, 문장마다 "(Diabolist 빌드)"를 붙였다. 적용한 보스 기믹은 `dungeon-dispel-types.txt`의 Magic만: Bloodthorn Roots, Glacial Torment, Corroding Spittle, Cold Claws, Stormslam(디버프 381515).
- **빌드에 없어 뺀 것**: Power Siphon(Implosion과 같은 선택 노드에서 두 빌드 모두 Implosion 선택), Banish, Blight of Weakness, Howl of Terror.
- **한쪽 영웅 빌드 전용**: Diabolist — Inner Demons, Reign of Tyranny, Grimoire: Imp Lord, Summon Vilefiend와 영웅 특성. Soul Harvester — Doom, Summon Doomguard, Grimoire: Fel Ravager, Empowered Felstorm와 영웅 특성. 카드와 문장에 빌드 이름을 표시했다.
- **쿨타임 계산**(두 빌드 공통 특성): Shadowfury 45초(Oppressive Darkness), Dark Pact 45초(Frequent Donor), Unending Resolve 피해 감소 40%(Strength of Will), Call Dreadstalkers Soul Shard 1개(Demonic Calling).
- **이름 충돌**: Axe Toss, Dark Pact, Demonic Gateway, Felstorm, Summon Vilefiend, Legion Strike가 Murder Row core 툴팁(적 기술)과 이름이 같다. Murder Row 문장과 영웅 카드에는 이 이름을 쓰지 않았다(Lithiel 문장은 "Felguard 펫 차단"으로 씀). Legion Strike는 카드에서도 뺐다.
- **툴팁 손질**: Infernal Bolt(433891) 툴팁은 "[Demonology: Shadow Bolt / Destruction …" 갈래가 잘려 있어, 설명이 온전한 영웅 노드 Secrets of the Coven(428518)에 연결했다. Ruination도 영웅 노드(428522)로 연결했다. Axe Toss는 명령 버전(119914)에 쿨타임이 없어 펫 기술 버전(89766)을 썼다.
- Wowhead 쐐기 팁 가운데 이번 시즌 던전과 맞지 않는 문장(Degentrius, Saprish, Tenders 등 다른 던전 이름)은 옮기지 않았다.

## 확인 못 한 것
- Wowhead가 말한 "Soulburn + Demonic Circle: Teleport로 Bloodthorn Roots에 면역이 되고 다른 뿌리도 잠시 풀린다"는 Wowhead 문장만 근거다. 툴팁은 "6초 동안 감속·이동 불가 면역"까지만 말한다.
- Singe Magic이 전투 중 실제로 어느 디버프를 먼저 지우는지(1개만 지움), Axe Toss가 보스 시전을 끊는지(보스는 기절 면역)는 게임에서 확인하지 않았다.
- Shadowfury·Mortal Coil이 분신·Wild Imp·Animated Gold·뱀 쫄·Faithless Tormentor에 통하는지는 core 층 문장에 기댄 것이다.
- Blight of Tongues가 채널 기술(예: 분신의 Felstorm)에는 효과가 없을 수 있어, 분신에는 Shadowfury만 권했다.
- 보스별 딜 쿨기 배치는 일반 원칙을 적용했다(spec.json note).
- 매크로는 게임 안에서 시험하지 않았다.

- (부모 보완) Infernal Bolt 툴팁을 Secrets of the Coven(428518)에 연결해 두어 한글 모드에서 "지옥불정령 Bolt"로 반쯤 번역됐다. names에 "Infernal Bolt": "지옥불 화살"(434506 한글 툴팁 이름)을 넣었다.
