# 2단계: 회복 드루이드 (2026-09-27)

## 출처
- Wowhead 회복 드루이드 특성 빌드(2026-08-12 갱신): 코드 6개와 (Best) 표시. 레이드·쐐기·델브 (Best)는 모두 Wildstalker.
- Wowhead 회복 쐐기 팁: 던전별 유틸리티(Nature's Cure "Curse, Poison and Magic", Ursol's Vortex, Incapacitating Roar, Typhoon)와 "It no longer brings a kick". 던전별 팁 칸은 모두 "Check back after the season goes live".
- Wowhead 회복 로테이션: 쐐기 우선순위(Efflorescence·Lifebloom 유지, Swiftmend 쿨마다, Wild Growth 자주, Nature's Swiftness + Regrowth), 큰 피해 5~6초 전 Rejuvenation 깔기, Tranquility는 쐐기에서 위험할 때 바로, Convoke는 치유가 필요하면 캐스터 형태·딜이 필요하면 Cat Form, 전투 전 Mark of the Wild·Symbiotic Relationship.
- Icy Veins Restoration Druid M+ Tips(12.1, 2026-08-10 갱신): 쐐기 추천 Wildstalker, Lifebloom은 기본 탱커(멀면 자신·원거리), 유틸리티(Incapacitating Roar, Typhoon + Ursol's Vortex, Entangling Roots, Soothe, Stampeding Roar), 어픽스 대응(Ascendant, Devour).
- nether.wowhead.com 툴팁 API(영문·한글): 기술 72개. 폴더의 `tt-raw.json`(도구 출력) → `postfix.mjs` → `tt.json`.
- 선택 노드: 부모가 받은 `_cache/talents-druid-restoration.json`(쐐기 빌드 0번 Keeper of the Grove, 2번 Wildstalker).

## 기본 영웅
- Wildstalker. Wowhead 빌드 표에서 (Best)가 레이드·쐐기·델브 모두 Wildstalker에만 붙어 있고, Icy Veins도 쐐기에 Wildstalker를 권함. Wowhead 본문은 "쐐기에서는 영웅 선택의 차이가 작다"고 적음.

## Keeper of the Grove "Delves" 행 확인
- Wowhead 표의 Keeper of the Grove 세 번째 행은 이름이 "Delves", 복사 버튼 이름은 "Mythic+"이다.
- 그 코드는 Wildstalker "Delves (Best)" 행 코드와 **글자까지 똑같고**, talents 파일(1번)을 보면 영웅 트리도 Wildstalker 노드(Thriving Growth 등)다.
- 본문 "Best Restoration Druid Delves Build"도 델브 빌드는 하나이고 "It uses Wildstalker"라고 적는다.
- 결론: 쐐기 빌드가 아니라 **Wildstalker 델브 빌드를 Keeper of the Grove 표에 한 번 더 넣은 것**이다. 복사 버튼 이름 "Mythic+"는 표기 오류로 본다. 그래서 이 빌드(talents 1번)는 쐐기 특성 판정에서 뺐고, Keeper of the Grove 가이드의 델브 칸은 "델브 (Wildstalker 빌드)"로 이름을 붙이고 ★를 달지 않았다(가이드 문단에도 적음).
- 이 때문에 1번에만 있는 특성(Tiger Dash, Maim, Killer Instinct, Improved Swiftmend, Call of the Elder Druid, Dream of Cenarius, Harmonious Blooming, Twin Sprouts)은 쓰지 않았다.

## 해제
- Nature's Cure 툴팁: "removing all Magic [Improved Nature's Cure: Curse, and Poison] effects". Improved Nature's Cure(392378)는 두 쐐기 빌드 모두 골랐다 → kit.dispel = 마법·저주·독. 질병은 불가.
- 보스 해제 문장은 `_cache/boss-dispel-types.txt`로 대조: 마법(Glacial Torment, Corroding Spittle, Bloodthorn Roots), 독(Spiteful Venom, Toxic Spores, Heartstop Poison, Poison Nova, Poison Spit)만 Nature's Cure로 썼다. Regurgitate·Wretched Discharge(질병)는 "맡겨라/CC로 끊어라"로 썼다. Mind-Numbing Poison·Stormslam·Latent Hex는 해제 종류가 없어 해제 문장을 쓰지 않았다.
- 보스 기믹 중 격노(Enrage) 효과는 없다(격노는 일반몹뿐). 그래서 Soothe는 공통 탭·카드에만 둔다.

## 검증하며 고친 것
- 차단 없음: Skull Bash는 두 쐐기 빌드에 없다(Fluid Form 툴팁에 이름만 나옴). 공통 탭·가이드에 "차단 기술 없음"을 적고, 광역 시전 끊기는 Incapacitating Roar·Typhoon, 몹 붙잡기는 Ursol's Vortex로 썼다(보스 면역 배지).
- 쐐기 빌드에 없어서 뺀 것: Incarnation: Tree of Life, Flourish(Tranquility 툴팁 괄호에만 나옴), Innervate, Cyclone, Hibernate, Mass Entanglement, Renewal, Skull Bash, Sunfire, Starfire, Starsurge, Thrash, Tiger Dash, Improved Stampeding Roar.
- 쐐기 빌드 둘 다에 있는 특성만 공통 문장에 썼다. 영웅 특성은 카드 설명에 "Wildstalker."/"Keeper of the Grove."를 붙였다. 한쪽 빌드에만 있는 클래스 특성(Circle of the Heavens=KotG, Circle of the Wild=Wildstalker)은 쓰지 않았다.
- 쿨타임 계산(모두 두 쐐기 빌드 공통 특성): Ironbark 1분 30초 - 20초(Improved Ironbark) = 1분 10초, 12초 + 4초(Regenerative Heartwood) = 16초. Barkskin 8초 + 4초(Improved Barkskin) = 12초, 20% + 10%(Oakskin) = 30%. Convoke the Spirits 2분 × 50%(Cenarius' Guidance) = 1분, 기술 16회·4초 × 75% = 12회·3초.
- 툴팁 정리: 표범·곰 형태 기술(Rake, Rip, Shred, Ferocious Bite, Swipe, Frenzied Regeneration)은 설명 첫머리에 "Requires Cat Form"과 전문화 머리글이 붙어 와서, `postfix.mjs`로 "Requires …"를 meta로 옮기고 머리글 줄을 지웠다. Frenzied Regeneration은 Guardian 문단이 남았지만 회복 문단과 글자가 같다(3초 24%).
- Convoke the Spirits는 특성 계산기 노드(391528, Talent)를 썼다. Wowhead 본문 링크 323764는 옛 서약 기술이다.
- Grove Guardians는 실제 시전 기술 102693(툴팁 "3 Charges")을 tips에 넣었다. 특성 노드는 1226140이다.
- 상세 문장의 "Aspix Frenzy"는 툴팁이 없는 이름이라 "Aspix의 기술 주기가 빨라지는 구간"으로 바꿨다.

## 확인 못 한 것
- 보스별 회복 드루이드 대응은 던전별 전용 출처가 없어 일반 원칙을 적용했다(spec.note).
- Tranquility의 "밀쳐내기를 막는다"는 툴팁 문장("preventing knockbacks")을 근거로 Hearty Bellow·Serpentine Gust·Serpentstorm 문장에 썼다. 보스별 넉백이 이 효과로 막히는지는 게임에서 확인하지 않았다.
- Mchimba 미라, Mirror Images 분신, Wild Imp가 Incapacitating Roar·Typhoon에 걸리는지는 core 문장("차단·CC로 끊는다")에 기대었고 게임에서 확인하지 않았다.
- Avatar of Sethraliss에게 Tranquility·Convoke the Spirits·Wild Growth 같은 광역 치유가 들어가는지 확인하지 못해, Avatar 문장에는 단일 대상 기술만 썼다.
- Grove Guardians 102693의 충전·재충전(3회, 20초)은 툴팁 meta 값이다. 특성 노드 툴팁과 설명이 같아 두 쐐기 빌드에서 실제 충전 수가 같은지는 확인하지 않았다.
- 매크로(`/cast [@mouseover,help,nodead][help][@player] Lifebloom` 등)는 사이트 매크로 형식으로 만든 것이고 게임에서 시험하지 않았다.


## 해제 종류 재확인 (2026-09-27, 머지 뒤 보완)
- 2단계 첫 판에서는 해제 종류를 nether 툴팁 buff 칸으로만 봤다. Wowhead 기술 페이지의 Dispel type 칸과 대조하니 **Mind-Numbing Poison(1263971)·Poison Splash(1226031)는 Poison**, **Cold Claws(적용 디버프 1305234)는 Magic**이었다(툴팁 buff 칸은 비어 있음). 이 전문화가 풀 수 있는 종류에 맞춰 Atroxus·Melidrussa 해제 문장을 넣었다. 앞의 "확인 못 한 것"에 적은 Mind-Numbing Poison·Poison Splash·Cold Claws 항목은 이것으로 해결됐다.
- Stormslam(381512)은 기술 페이지에서도 Dispel type n/a라 여전히 해제 문장을 쓰지 않는다.
