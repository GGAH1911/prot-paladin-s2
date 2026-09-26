# 3단계: 고양 주술사 (2026-09-27)

## 출처
- Wowhead 고양 특성 빌드(2026-08-22 갱신): 빌드 8개(영웅 2개 × 레이드 단일·레이드 광역·쐐기·델브)와 (Recommended) 표시 (`_cache/builds-shaman-enhancement.json`)
- Wowhead 고양 쐐기 팁: 던전별 유틸 표(Poison Cleansing Totem·Cleanse Spirit·Spirit Walk·Jet Stream·Purge), 던전별 팁(Wind Rush Totem·Astral Shift·Feral Lunge·Ascendance 사용처), 어픽스 대응
- Wowhead 고양 로테이션: 두 영웅의 우선순위, Ascendance·Doom Winds·Thorim's Invocation 운영, Voltaic Blaze 우선
- nether.wowhead.com 툴팁 API(영문·한글): 기술 63개 (`work/tt-raw.json`, `work/tt-extra.json`)
- 쐐기 빌드 두 개의 실제 선택 노드: `_cache/talents-shaman-enhancement.json`(부모가 특성 계산기에서 읽은 결과)
- 어픽스 번호: Wowhead affix=148 Ascendant, 158 Voidbound, 160 Devour, 162 Pulsar (tme-laptop에서 페이지 제목으로 확인)

## 기본 영웅
- Stormbringer. 빌드 표의 쐐기 (Recommended)는 Stormbringer에만 있고, 쐐기 팁도 "Stormbringer is the best pick available in Season 2"라고 쓴다. Totemic ★는 델브에만 있다.

## 검증하며 고친 것
- 두 쐐기 빌드 어디에도 없는 특성은 뺐다: Hex, Tremor Totem, Thunderous Paws(Wowhead가 감속 해제로 소개하지만 빌드에 없음), Lightning Rod(Stormbringer는 Conductive Energy로 같은 효과를 얻음), Totemic Projection·Totemic Focus(Totemic 빌드만, 카드 없음).
- 한쪽 빌드에만 있는 기술은 표시했다: Ascendance·Windstrike·Tempest·Descending Skies·Supercharge·Thunder Capacitor(Stormbringer), Surging Totem·Sundering·Primordial Storm·Hot Hand·Totemic Momentum(Totemic). 보스 문장의 Ascendance는 "(Stormbringer)"를 붙였다.
- Earth Elemental은 두 빌드가 고른 Primordial Bond 때문에 도발하지 않고 최대 생명력 15%를 올리는 생존기라, 탱커 대신 쓰는 기술로 안내하지 않았다.
- 쿨타임은 두 빌드 공통 특성을 반영했다: Astral Shift 1분 30초(Planes Traveler), Capacitor Totem 45초(Static Charge), Ascendance 2분(Thorim's Invocation), Doom Winds 지속 10초(Thorim's Invocation).
- 해제: Cleanse Spirit 툴팁 "Removes all Curse effects" → 저주. Poison Cleansing Totem → 독. 질병은 "해제 가능한 파티원 담당". 보스 해제 문장은 `dungeon-dispel-types.txt`의 종류만 썼다(Spiteful Venom·Toxic Spores·Heartstop Poison·Poison Nova·Poison Splash·Mind-Numbing Poison·Poison Spit). 이번 시즌 보스 기믹에는 저주가 없다.
- freedom: Spirit Walk 툴팁 "Removes all movement impairing effects"(자신, 뿌리 포함), Jet Stream "Wind Rush Totem … now removes snares"(아군 감속만). Bloodthorn Roots(뿌리)는 Spirit Walk로만 쓴다(Wowhead도 "Root Breaks: Spirit Walk only").
- 툴팁 손질: Tempest는 안쪽 기술의 meta가 설명에 붙어 와서("Tempest0.2% of base mana40 yd range…Requires Shaman") 괄호로 정리했다. Earth Shield·Lava Lash meta의 "Requires level 30 (…)", "Requires Off-hand/보조 장비 필요"는 뺐다. Storm Unleashed는 id가 둘(1252373 트리 노드, 1262713 부가 효과)이라 tips는 트리 노드로 두었다.
- 이름 충돌: Temple of Sethraliss·Den of Nalorakk core tips에 Lightning Bolt가, Temple에 Flame Shock(Twisted Hexxer)이 있다. 두 던전 문장과 영웅 카드에서 Lightning Bolt·Flame Shock을 내 기술로 쓰지 않았다(Avatar 문장의 Flame Shock은 적 기술이 맞다).

## 부모에게 알릴 것
- **priest/shadow의 어픽스 줄이 어긋난다**: "Voidbound 주간: 디버프 … Purify Disease"라고 썼지만, Wowhead affix=160은 Devour(파티 디버프를 치유하거나 해제), affix=158이 Voidbound(큰 적을 빨리 잡기)다. hunter-beast-mastery는 Voidbound를 "Void Emissary 전환"으로 맞게 썼다.

## 확인 못 한 것
- 보스별 고양 전용 문장은 쐐기 팁의 던전별 유틸·팁이 있는 곳(Altar, Vale, Nalorakk, Murder Row, Voidscar)만 옮겼고, 나머지는 일반 원칙이다(spec.note).
- Capacitor Totem이 분신·Lasher·Wild Imp·Animated Gold·Infused Whelp·Faithless Tormentor에 통하는지는 core 층 문장(제어 가능)에 기댔고 게임에서 확인하지 않았다.
- Devour 주간 디버프를 Poison Cleansing Totem·Cleanse Spirit으로 지운다는 것은 Wowhead 문장만 근거다.
- Totemic Surge(Stormbringer 빌드)가 어느 토템 쿨을 5초 줄이는지("most totems") 확인하지 못해 쿨타임 계산에 넣지 않았다.
- 매크로는 게임 안에서 확인하지 않았다.
