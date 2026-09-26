# 3단계: 무법 도적 (2026-09-27)

## 출처
- Wowhead 무법 특성 빌드(2026-08-12 갱신): 영웅 2개 × 레이드·쐐기·델브 코드 6개, ★는 Trickster의 세 행에만
- Wowhead 무법 쐐기 팁(Midnight 시즌 2): 던전별 유틸(Tricks of the Trade 필수, Shiv는 King's Rest에서만 유용), 던전별 한두 줄 팁(Kystia 분신에 Kidney Shot, King's Rest 물리 공격에 Evasion 등), 어픽스 대응
- Wowhead 무법 로테이션(단일·광역 우선순위, 개시 순서, Adrenaline Rush·Roll the Bones·Keep It Rolling·Preparation 사용법)
- nether.wowhead.com 툴팁 API(영문·한글): 기술 63개
- 부모가 미리 읽어 둔 쐐기 빌드 2개의 실제 선택 노드(`_cache/talents-rogue-outlaw.json`)

## 기본 영웅
- Trickster. Wowhead 빌드 표에서 레이드·쐐기·델브 ★가 모두 Trickster에만 붙어 있음.

## 검증하며 고친 것
- 두 쐐기 빌드에 없는 특성은 쓰지 않음: Gouge, Shiv(Wowhead가 King's Rest 격노 해제로 권하지만 빌드에 없음). Cheap Shot·Crippling Poison은 기본 기술이지만 쐐기 운영에 필요한 곳이 없어 뺌.
- 영웅 한쪽에만 있는 특성(Unseen Blade·Coup de Grace·Cloud Cover·So Tricky·Hoodwink 등 Trickster, Hand of Fate·Lucky Coin·Tempted Fate 등 Fatebound)은 카드·공통 탭에 영웅 이름을 붙이고 해당 영웅 가이드에만 넣음(스크립트로 두 빌드와 대조).
- 이름 충돌: 무법의 Killing Spree(51690)는 Murder Row 보스 Zaen의 Killing Spree(474478)와 이름이 같아, Murder Row 문장과 영웅 카드(모든 던전 탭에 나옴)에는 쓰지 않음. Zaen 문장은 "Zaen의 광역 물리 공격"으로 씀.
- 해제: 아군 해제 기술이 없어 `kit.dispel`은 비움. Cloak of Shadows 툴팁("해로운 주문 효과를 모두 제거")을 근거로, 기술 페이지 Dispel type이 Magic인 보스 효과(Bloodthorn Roots, Glacial Torment, Corroding Spittle, Cold Claws)에만 "스스로 지울 수 있다"고 씀. 독·질병에는 쓰지 않음.
- freedom 답은 Vanish 툴팁("Also breaks movement impairing effects")을 근거로 "자신은 Vanish".
- Adrenaline Rush 툴팁 끝의 값 0% 조건부 문장은 지움. Ambush의 은신 요구는 툴팁 요구 조건(Requires Stealth)으로 확인.

## 확인 못 한 것
- 보스별 무법 전용 출처는 Wowhead 쐐기 팁의 던전별 한두 줄뿐이라, 나머지 보스 문장은 일반 원칙을 적용함(spec.note).
- Cloak of Shadows가 독·질병 등 마법 외 효과까지 지우는지는 툴팁 문구만으로 확정하지 못해 마법 효과에만 썼음.
- Kidney Shot이 Kystia 분신·Writhe·Animated Gold·Wild Imp에 통하는지는 Wowhead 문장과 core 층 문장에 기댄 것이고 게임 안에서 확인하지 않음.
- Gravitic Orbs 고정 대상이 Vanish를 쓰면 고정이 풀리는지 몰라 Vanish는 권하지 않음.
- 매크로(특히 Tricks of the Trade 주시 대상 매크로)는 게임 안에서 확인하지 않음.

- (부모 보완) 어픽스 줄의 이름을 Wowhead affix 툴팁 기준(160 Devour: 균열이 정수를 먹는 파티 디버프, 158 Voidbound: Voidbound Emissary가 주변 적을 강화)으로 바로잡았다.
