# 3단계: 정기 주술사 (2026-09-27)

## 출처
- Wowhead 정기 주술사 특성 빌드(2026-08-21 갱신): 빌드 6개(영웅 2개 × 레이드·쐐기·델브)와 (Recommended) 표시
- Wowhead 정기 주술사 쐐기 팁(2026-08-18 갱신): 던전별 유틸 평가(Poison Cleansing Totem·Cleanse Spirit·Purge 대상), 어픽스 대응. 던전별 Tips 칸은 비어 있음(FANGS_TIPS 등 자리표시자)
- Wowhead 정기 주술사 로테이션(2026-09-20 갱신): 영웅별 단일·광역 우선순위, 오프너, Stormkeeper→Ascendance 순서, Earthquake 대상 수 기준(Farseer 3명·Stormbringer 4명)
- nether.wowhead.com 툴팁 API(영문·한글): 기술 61개
- 쐐기 빌드 선택 노드: 부모가 받아 둔 `_cache/talents-shaman-elemental.json`

## 기본 영웅
- Farseer. Wowhead 빌드 표에서 레이드·쐐기·델브 ★가 모두 Farseer에만 붙어 있고, 쐐기 팁의 던전별 추천 코드 8개도 Farseer 쐐기 코드와 같음.

## 검증하며 고친 것
- Frost Shock·Storm Elemental은 툴팁에 Talent가 있고 두 쐐기 빌드에 없어 뺐다. Fire Elemental은 기본 기술이지만 두 빌드가 고른 Call of Fire로 Ascendance가 Greater Fire Elemental을 소환하므로 따로 카드를 두지 않았다.
- Wowhead 쐐기 팁이 권하는 Spirit Walk, Thunderstorm, Tremor Totem, Earthbind Totem, Jet Stream, Thunderous Paws는 두 쐐기 빌드 어디에도 없어 쓰지 않았다.
- 영웅 한쪽에만 있는 특성: Poison Cleansing Totem·Flametongue Weapon·Elemental Blast·Purging Flames·Natural Harmony·Call of the Ancestors 계열(Farseer), Earth Shock·Master of the Elements·Herald of the Storms·Earthgrab Totem·Static Charge·Tempest 계열(Stormbringer). 문장·카드에 영웅 이름을 붙였다.
- 해제: Cleanse Spirit(저주, 두 빌드), Poison Cleansing Totem(독, Farseer 빌드만). kit.dispel에는 둘 다 넣고 answers·공통 탭·문장에 "(Farseer 빌드)"를 표시했다. 보스 독은 `audits/research/dungeon-dispel-types.txt`로 대조했다(Spiteful Venom, Toxic Spores, Heartstop Poison, Poison Splash, Mind-Numbing Poison, Poison Nova, Poison Spit).
- 이름 충돌: Earthquake·Lightning Bolt는 Den of Nalorakk, Lightning Bolt·Flame Shock은 Temple of Sethraliss core 툴팁과 이름이 같아 그 던전 문장과 영웅 카드에 쓰지 않았다(Avatar 문장의 Flame Shock은 Twisted Hexxer 기술).
- 툴팁 손질: meta의 "Requires level N (전문화)" 표시를 지웠다. Tempest 툴팁 안에 붙어 온 "Tempest0.2% of base mana40 yd range2 sec cast Requires Shaman"을 "Tempest (2 sec cast):"로 정리했다. Ghost Wolf의 [Winds of Al'Akir: 30 / 30]%는 두 빌드 모두 Winds of Al'Akir를 골라 30%로 적었다.
- 쿨타임: Ascendance 2분(First Ascendant, 두 빌드), Capacitor Totem 1분(Stormbringer는 Static Charge로 45초).

## 확인 못 한 것
- 보스별 정기 전용 문장 출처가 없다(Wowhead 던전별 Tips 칸이 자리표시자). 유틸 평가 외의 쿨기·생존기 배치는 일반 원칙을 적용했고 spec.note에 적었다.
- Stormbringer의 Stormkeeper 최종 쿨타임(Herald of the Storms·Rolling Thunder 각 15초 감소)은 합산해 쓰지 않았다.
- Capacitor Totem 기절이 분신·미라·Wild Imp·Animated Gold·Faithless Tormentor에 통하는지는 core 층 문장에 기댄 것이고 게임에서 확인하지 않았다.
- Interrupting Cloudburst 잠금을 즉시 시전 기술로 피하는 문장은 "시전 중이면 잠긴다"는 core 문장에서 끌어낸 원칙이다.
- 매크로는 게임에서 시험하지 않았다.

- (부모 보완) 어픽스 줄의 이름을 Wowhead affix 툴팁 기준(160 Devour: 균열이 정수를 먹는 파티 디버프, 158 Voidbound: Voidbound Emissary가 주변 적을 강화)으로 바로잡았다.
