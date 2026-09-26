# 3단계: 암흑 사제 (2026-09-27)

## 출처
- Wowhead 암흑 사제 특성 빌드(2026-08-12 갱신): 영웅별 레이드 단일·레이드 광역·쐐기·델브 4개, ★는 Archon 행에만 있음. 쐐기와 델브 코드는 영웅마다 같음.
- Wowhead 암흑 사제 로테이션(Midnight Season 2): 단일·광역 우선순위, 개시 순서, 주요 쿨기(Power Infusion, Voidform, Halo), 전투 전 점검(Shadowform, Power Word: Fortitude).
- Wowhead 암흑 사제 쐐기 팁: 던전별 유틸 평가(Purify Disease, Mass Dispel, Dominate Mind, Mind Soothe), 던전별 팁(Vampiric Embrace, Dispersion, Desperate Prayer, Protective Light), 어픽스 대응, 차단이 30초라는 평가.
- nether.wowhead.com 툴팁 API(영문·한글): 기술 65개(참고용 특성 포함).
- 특성 판정: 부모가 받아 둔 `_cache/talents-priest-shadow.json`(두 영웅 쐐기 빌드의 선택 노드).
- 가이드 HTML은 tme-laptop에서 받음.

## 기본 영웅
- Archon. Wowhead 빌드 표에서 레이드·쐐기·델브 ★가 모두 Archon에만 붙어 있음. (로테이션 페이지의 영웅 스위치 기본값은 Voidweaver지만 추천 표시는 아님.)

## 검증하며 고친 것
- **차단:** Silence(15487)는 툴팁 meta에 Talent가 없는 기본 기술이고 쿨 30초·침묵 5초. 모든 차단 순번 문장에 넣되 "한 번만 맡는다"고 적음. Psychic Horror(64044)는 특성인데 두 쐐기 빌드에 없어 뺌.
- **생존기:** Dispersion(47585)·Vampiric Embrace(15286)는 Talent 표시가 없는 기본 기술이라 사용. Desperate Prayer 최대 생명력 35%는 Light's Inspiration(두 빌드 모두) 25%+10% 기준. Fade 25초는 Improved Fade(-5초), Psychic Scream 30초는 Psychic Voice(-10초) 반영.
- **해제:** kit.dispel은 질병만(Purify Disease, 두 빌드 모두). Mass Dispel은 아군 5명의 해로운 마법을 지우지만 2분 쿨이라 해제 담당표의 "나"로 두지 않고, 공통 탭과 보스 문장에 "힐러가 못 풀 때"로만 씀(Wowhead 평가와 같음).
- **보스 해제 종류:** `audits/research/dungeon-dispel-types.txt` 기준. Regurgitate·Wretched Discharge(질병), Bloodthorn Roots·Glacial Torment·Corroding Spittle·Cold Claws(마법).
- **Stormslam:** 표에는 381512가 n/a인데, Wowhead 쐐기 팁이 Mass Dispel 대상으로 든 **381515(Stormslam 디버프)는 Wowhead 기술 페이지 Dispel type이 Magic**이다(tme-laptop에서 기술 페이지 확인). 그래서 Kyrakka & Erkhart 문장에 "탱커의 Stormslam 디버프(381515)는 마법 효과"로 씀. → 부모 참고: core 층의 "힐러가 Stormslam 디버프를 해제한다"는 이 id 기준으로 맞다. 표(`dungeon-dispel-types.txt`)에 381515를 추가하는 편이 좋다.
- **빌드 표시:** Halo·Power Surge·Manifested Power·Sustained Potency·Perfected Form·Divine Halo·Dominate Mind는 Archon 빌드에만, Void Torrent·Entropic Rift·Void Blast·Collapsing Void·Voidheart·Voidwraith·Dark Energy·Shadowy Insight는 Voidweaver 빌드에만 있어 카드와 영웅 칸에 영웅 이름을 붙이고 해당 영웅 가이드에만 넣음. Entropic Rift는 계산기 노드가 아니라 Void Torrent(263165) 효과로 열리는 것(툴팁 "tearing open an Entropic Rift")이라 Voidweaver 전용으로 둠.
- **빌드에 없어 뺀 것:** Psychic Horror, Invoked Nightmare(로테이션 선택지에 있지만 쐐기 빌드에 없음).
- **이름 충돌:** Void Blast가 Voidscar Arena core 툴팁(Taz'Rah의 Void Blast)과 이름이 같아, Voidscar 문장과 영웅 카드에 쓰지 않음. 공통 탭 Voidweaver 운영 줄에서는 감싸지 않은 글자로만 씀.
- **툴팁 손질:** Voidwraith 끝의 잘린 "[Shadow: … /" 갈래에서 암흑 문장만 남김. Petrifying Scream 등 "Modifies Effect" 주석 줄 제거.

## 확인 못 한 것
- 보스별 암흑 전용 문장은 Wowhead 쐐기 팁의 던전별 한두 줄뿐이라, 나머지는 로테이션 가이드의 일반 원칙을 적용함(spec.note).
- Dispersion으로 Bloodthorn Roots를 벗어나는 것, Mass Dispel로 Cold Claws·Stormslam을 지우는 것은 Wowhead 문장 근거이고 게임 안에서 확인하지 않음.
- Power Word: Shield 흡수량은 툴팁에 0으로 나와 숫자를 쓰지 않음. Dispersion 회복량도 계산식만 있어 쓰지 않음.
- Petrifying Scream으로 바뀐 Psychic Scream 지속 시간은 툴팁 주석(-4)만 있어 숫자를 쓰지 않음.
- 어픽스 줄은 Wowhead 어픽스 팁 4개 중 어느 어픽스인지 문맥으로 확실한 3개(Ascendant, Pulsar, Voidbound)만 옮김.
- 매크로는 게임 안에서 확인하지 않음.

- (부모 보완) 어픽스 줄의 "Voidbound 주간: 디버프 … Purify Disease"는 Wowhead affix=160(Xal'atath's Bargain: Devour)의 내용이라 "Devour 주간"으로 바로잡았다. affix=158은 Voidbound(Voidbound Emissary)다.
