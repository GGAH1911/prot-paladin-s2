# 2단계: 복원 주술사 (2026-09-27)

## 출처
- Wowhead 복원 특성 빌드(2026-09-05 갱신): 영웅별 레이드·쐐기·델브 코드와 (Recommended) 표시. 페이지에 같은 표가 두 번 들어 있고, 두 표의 코드 12개는 완전히 같음(중복). 앞 6개만 씀.
- Wowhead 복원 쐐기 팁: 던전별 유틸리티 평가(Improved Purify Spirit, Tremor Totem, Poison Cleansing Totem, Purge, Spirit Walk), 어픽스별 팁(Capacitor Totem, Ghost Wolf, Poison Cleansing Totem).
- Wowhead 복원 로테이션(쿨기·Stormstream Totem·Ascendance 설명, 전투 전 점검).
- nether.wowhead.com 툴팁 API(영문·한글): 기술 62개 (`work/tt.json`, 생성 `work/make.mjs`).
- 부모가 받은 특성 계산기 결과 `_cache/talents-shaman-restoration.json`(쐐기 빌드 2개의 data-full/partial 노드).

## 기본 영웅
- Totemic. 빌드 표에서 레이드·쐐기·델브 (Recommended)가 모두 Totemic에만 붙어 있음.

## 해제
- Purify Spirit: 툴팁 "Removes all Magic [Improved Purify Spirit: and Curse] effects". Improved Purify Spirit(383016)이 두 쐐기 빌드에 모두 있어 마법·저주 담당 "나".
- 독: Poison Cleansing Totem(383013, 두 빌드 모두) "removes all Poison effects … every 1.5 sec for 6 sec". kit.dispel.poison 과 dispel.poison 답에 씀.
- 질병: 수단 없음 → "질병 해제 가능한 파티원 담당".

## 검증하며 고친 것
- 두 쐐기 빌드에 없는 특성은 쓰지 않음: Spirit Walk, Tremor Totem, Hex, Earth Elemental, Frost Shock, Earthen Wall Totem, Ancestral Protection Totem 등. Wowhead 쐐기 팁이 Spirit Walk(Regurgitate 등)와 Tremor Totem을 권하는 던전이 있지만 빌드에 없어서 뺌.
- 영웅별로 갈리는 특성은 "(Totemic)", "(Farseer)", "(○○ 빌드)"로 표시: Healing Tide Totem·First Ascendant·Surging Totem·Lively Totems·Splitstream·Wind Barrier·Tidecaller's Guard(Totemic), Ascendance·Preeminence·Unleash Life·Ancestral Swiftness·Call of the Ancestors·Elemental Reverb(Farseer). Healing Tide Totem과 Ascendance는 같은 선택 노드라 한쪽만 찍힘.
- Unleash Life는 툴팁 meta에 Talent가 없지만 Farseer 빌드에서만 선택 노드로 찍혀 있어 Farseer 빌드 기술로 다룸.
- 이름 충돌: King's Rest core 툴팁에 NPC의 "Healing Tide Totem"(270497)이 있어, King's Rest 문장과 영웅 카드(모든 던전 탭에 나옴)에서 Healing Tide Totem을 빼고 Surging Totem·Stormstream Totem·Spirit Link Totem으로 바꿈. Lightning Bolt·Flame Shock도 일부 던전 core와 이름이 같지만 던전 문장에는 쓰지 않음(가이드 카드만).
- Stormstream Totem은 같은 이름 특성(1267093)과 토템 기술(1267068)이 있어 토템(1267068)만 씀.
- "Nature's Swiftness Healing Wave"처럼 이름이 붙어 한 덩어리로 감싸지는 문장을 "Nature's Swiftness와 Healing Wave"로 고침.
- 해제 종류는 `_cache/boss-dispel-types.txt` 기준. Wowhead가 Poison Cleansing Totem으로 지우라는 Mind-Numbing Poison·Poison Splash(Voidscar)는 툴팁에 해제 종류가 없어 문장에 넣지 않음. Heartstop Poison(Zaen, 474515)은 툴팁 buff가 Poison이라 넣음.

## 확인 못 한 것
- 보스별 복원 전용 출처가 없음(Wowhead 던전별 팁은 유틸리티 평가만). 쿨기 배치 문장은 일반 원칙 적용(spec.note).
- Wowhead 던전별 추천 코드 8개는 모두 Totemic **레이드** 코드와 같고, 빌드 표의 쐐기 코드와 다름. 특성 판정은 부모 지시대로 빌드 표의 쐐기 코드 기준으로 했고, 가이드 빌드 문단에 이 사실을 적음.
- Healing Stream Totem 최종 쿨타임(Water Totem Mastery·Totemic Momentum·Totemic Surge 중복 적용 값)은 확정하지 않고 "30초 (특성으로 감소)"로만 씀.
- Spirit Link Totem 재분배가 치유 감소(Legion Strike) 중에도 체력을 올린다는 것은 Wowhead의 "재분배는 치유가 아니다" 설명에서 끌어낸 것이고 게임에서 확인하지 않음.
- Bloodthorn Roots를 Purify Spirit로 푸는 것은 툴팁 buff 분류(Magic) 기준이며 게임에서 확인하지 않음.
- Avatar of Sethraliss: Healing Tide Totem은 툴팁상 "party or raid members"만 치유해 Avatar 치유에서 제외. Healing Wave·Riptide가 Avatar를 치유하는지는 게임에서 확인하지 않음(직접 대상 치유라 가능하다고 봄).
- 매크로(Capacitor Totem의 [mod:ctrl,@player], Totemic에서 Healing Rain 매크로가 Surging Totem으로 바뀌는지)는 게임에서 시험하지 않음.


## 해제 종류 재확인 (2026-09-27, 머지 뒤 보완)
- 2단계 첫 판에서는 해제 종류를 nether 툴팁 buff 칸으로만 봤다. Wowhead 기술 페이지의 Dispel type 칸과 대조하니 **Mind-Numbing Poison(1263971)·Poison Splash(1226031)는 Poison**, **Cold Claws(적용 디버프 1305234)는 Magic**이었다(툴팁 buff 칸은 비어 있음). 이 전문화가 풀 수 있는 종류에 맞춰 Atroxus·Melidrussa 해제 문장을 넣었다. 앞의 "확인 못 한 것"에 적은 Mind-Numbing Poison·Poison Splash·Cold Claws 항목은 이것으로 해결됐다.
- Stormslam(381512)은 기술 페이지에서도 Dispel type n/a라 여전히 해제 문장을 쓰지 않는다.

- (부모 보완) Stormslam은 시전 기술 381512와 디버프 381515의 id가 따로 있고, 디버프는 Wowhead 기술 페이지·nether 툴팁 모두 **Magic**이다. 첫 판에서 381512만 보고 "해제 종류 없음"으로 판단한 것을 바로잡아 해제 문장을 넣었다(core 층의 "힐러가 해제한다"가 맞았다).

- (부모 보완) 어픽스 줄의 이름을 Wowhead affix 툴팁 기준(160 Devour: 균열이 정수를 먹는 파티 디버프, 158 Voidbound: Voidbound Emissary가 주변 적을 강화)으로 바로잡았다.
