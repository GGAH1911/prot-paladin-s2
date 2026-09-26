# 3단계: 고통 흑마법사 (2026-09-27)

## 출처
- Wowhead 고통 특성 빌드(2026-08-12 갱신): 영웅마다 레이드·레이드 광역·쐐기·델브 4개, (Best) 표시는 Soul Harvester 4개 모두
- Wowhead 고통 쐐기 팁: 던전별 유틸(Healthstone·Soulstone·Demonic Gateway·Shadowfury·Curse of Tongues/Blight of Tongues)과 던전별 팁, 어픽스별 추천 특성
- Wowhead 고통 로테이션: 단일·광역 우선순위(영웅별), 발동 효과(Nightfall·Shard Instability) 처리
- nether.wowhead.com 툴팁 API(영문·한글): 기술 53개
- 부모가 받아 둔 `_cache/talents-warlock-affliction.json`(두 영웅 쐐기 빌드의 실제 선택 노드)으로 특성 판정
- Wowhead affix 페이지 설명으로 어픽스 번호 확인: 148 Ascendant(오브), 158 Voidbound(Voidbound Emissary), 160 Devour(균열), 162 Pulsar(궤도 구슬)

## 기본 영웅
- Soul Harvester. 빌드 표의 (Best)가 레이드·쐐기·델브 모두 Soul Harvester에만 있고, 본문도 "단일·쐐기 모두 더 강하다"고 평가한다.

## 검증하며 고친 것
- **차단**: 고통 흑마법사의 차단은 Felhunter의 Spell Lock(24초, Command Demon)이다. 펫 기술이라 툴팁에 Talent가 없다. Imp를 부르면 차단이 없어진다고 공통 탭·카드에 적었다.
- **해제**: 아군 해제는 Imp의 Singe Magic(마법 1개)뿐이고 펫을 바꿔야 쓸 수 있어 `kit.dispel`은 비웠다. Kystia의 Corroding Spittle(기술 페이지 Dispel type Magic)에만 "Imp로 바꾸면 Singe Magic으로 지울 수 있다(그동안 Spell Lock 없음)"로 썼다(Wowhead 팁 근거).
- **빌드에 없어 뺀 것**: Howl of Terror, Drain Soul, Blight of Weakness, Greater Banish, Grimoire of Sacrifice. Wowhead 쐐기 팁이 Blight of Weakness를 Blight of Tongues와 함께 소개하지만 두 쐐기 빌드는 Blight of Tongues만 골랐다.
- **한쪽 빌드 전용 표시**: Curse of Tongues·Banish·Oppressive Darkness·Friends In Dark Places·Demonic Soul·Shadow of Death·Manifested Avarice(Soul Harvester), Wither·Malevolence·Blackened Soul·Curse of the Satyr·Zevrim's Resilience(Hellcaller). Hellcaller는 Curse of Tongues가 없지만 Curse of the Satyr가 시전 시간 30% 증가를 대신 건다.
- **툴팁 갈래 정리**: Blackened Soul의 "[Unstable Affliction / Chaos Bolt and Shadowburn]"은 고통 갈래만, Shard Instability의 "[Drain Soul / Shadow Bolt]"·"[Drain Soul: 10 / 20]%"는 Shadow Bolt·20%만(Drain Soul은 빌드에 없음), Command Demon의 Felguard 줄(악마 전용), Banish의 Greater Banish 갈래, Demonic Circle의 Kilrogg's Cunning 갈래를 뺐다.
- **이름 충돌**: Temple of Sethraliss core tips에 Corruption(1300877), Murder Row core tips에 Dark Pact·Demonic Gateway·Drain Life(Lithiel 쪽 적 기술)가 있다. 그래서 그 던전 문장과 영웅 카드에 이 이름을 쓰지 않았다(Lithiel의 Malefic Wave는 Demonic Circle: Teleport로만 안내).
- **Wowhead 쐐기 팁 중 다른 시즌 문장**: Degentrius·Saprish·Spark Channelers·Minions of Zul·Healing Breeze 같은 문장은 이번 시즌 보스와 맞지 않아 쓰지 않았다. Axe Toss는 악마 전문화 펫 기술이라 Ascendant 어픽스 줄에서 뺐다.
- 해제 종류는 `audits/research/dungeon-dispel-types.txt`로 대조했다.

## 확인 못 한 것
- 보스별 고통 전용 출처는 Wowhead 던전별 팁 한두 줄뿐이다(Writhing Coil 관문, Ikuzz Soulburn, Ziekket 구슬, Nalorakk·Charonus·Kyrakka·Lithiel·Merektha 마법진, Mchimba 방어 기술). 나머지는 일반 원칙을 적용했고 `spec.note`에 적었다.
- Healthstone 툴팁은 "Empowered Healthstone: 6초에 걸쳐 30% 추가"인데, Empowered Healthstone 특성 툴팁은 "5% 추가"라서 숫자를 쓰지 않았다.
- Soulburn + Demonic Circle: Teleport 매크로, Command Demon 마우스오버 매크로는 게임 안에서 시험하지 않았다.
- Shadowfury·Mortal Coil이 분신·Wild Imp·Animated Gold·Faithless Tormentor에 통하는지는 core 층 문장에 기댔다.
- Demonic Circle: Teleport로 Malefic Wave·Roaring Firebreath를 피하는 것은 Wowhead 문장만 근거다.
