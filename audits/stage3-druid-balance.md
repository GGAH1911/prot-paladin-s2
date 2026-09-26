# 3단계: 조화 드루이드 (2026-09-27)

## 출처
- Wowhead 조화 특성 빌드(페이지 갱신 2026-08-12): 코드 6개(영웅 2개 × 레이드·쐐기·델브)와 (Recommended) 표시. `dps-work/_cache/builds-druid-balance.json`
- Wowhead 조화 쐐기 팁(2026-08-18 갱신): 던전별 유틸(Remove Corruption, Ursol's Vortex, Typhoon, Incapacitating Roar, Solar Beam)과 던전별 팁, 어픽스 대응
- Wowhead 조화 로테이션(2026-09-03 갱신): 단일·광역 우선순위, Eclipse 사용법, 영웅별 광역 기준(Keeper of the Grove는 3마리 이하 Solar Eclipse, 4마리 이상 Lunar Eclipse), "Current recommendation is Elune's Chosen for both raid and Mythic+"
- nether.wowhead.com 툴팁 API(영문·한글): 기술 57개
- 쐐기 빌드 두 개의 실제 선택 노드: `dps-work/_cache/talents-druid-balance.json`(Wowhead 특성 계산기 data-full/data-partial)
- Wowhead 페이지는 tme-laptop에서 2초 간격으로 2개만 받았다.

## 기본 영웅
- Elune's Chosen. 빌드 표의 레이드·쐐기 ★가 Elune's Chosen에만 있고, 로테이션 가이드도 레이드·쐐기 모두 Elune's Chosen을 추천한다. 델브 ★는 없다.

## 검증하며 고친 것
- 두 쐐기 빌드 모두 고른 유틸: Remove Corruption, Soothe, Solar Beam, Typhoon, Ursol's Vortex, Incapacitating Roar, Stampeding Roar(+Improved), Wild Charge, Improved Barkskin, Oakskin, Heart of the Wild, Aessina's Renewal. 이것만 공통 탭·문장에 썼다.
- 두 쐐기 빌드에 없는 특성은 쓰지 않았다: Mighty Bash, Mass Entanglement, Innervate, Renewal, Skull Bash, Convoke the Spirits, Hibernate. (Convoke는 로테이션 가이드에 나오지만 두 쐐기 빌드 모두 고르지 않았다.)
- 한쪽 영웅 빌드에만 있는 특성은 그 영웅의 공통 탭 칸·영웅 카드·가이드에만 넣고 "(○○ 빌드)"로 표시했다: Elune's Chosen — Fury of Elune, Boundless Moonlight, Lunation, Lunar Calling, Moon Guardian, Astral Insight, Elune's Grace, Sunseeker Mushroom, Orbit Breaker, Rattle the Stars / Keeper of the Grove — Force of Nature, Harmony of the Grove, Dream Surge, Treants of the Moon, Wild Mushroom, Starweaver. 보스 문장(detail)에는 두 빌드 공통 기술만 썼다(스크립트로 확인).
- Celestial Alignment 자리에 두 빌드 모두 Incarnation: Chosen of Elune을 골랐다 → 공통 탭·문장은 Incarnation: Chosen of Elune으로 썼다.
- Remove Corruption 툴팁 "removing all Curse and Poison effects" → kit.dispel에 저주·독. 보스 해제 문장은 `audits/research/dungeon-dispel-types.txt`의 독만 썼다: Spiteful Venom, Toxic Spores, Heartstop Poison, Mind-Numbing Poison(Poison Splash·Poison Pool), Poison Nova, Poison Spit. 보스 기믹에는 저주가 없다(Hex·Hex Volley·Curse of Doom·Starvation Effigy는 일반몹).
- Moonkin Form·Bear Form·Travel Form 툴팁 "The act of shapeshifting frees you from movement impairing effects" → 뿌리·감속 해제는 변신으로 쓴다(Wowhead도 Ikuzz의 Bloodthorn Roots를 변신으로 풀라고 함). freedom 답도 이 기준.
- Wowhead 쐐기 팁의 Writhing Coil(Uncoil 때 Incarnation 충전 남기기), Ikuzz(뿌리는 변신, Bloodthirsty Gaze는 Wild Charge), Lithiel(Infernal은 못 죽이니 단일 딜), Merektha(근접 가까이), Kokia(쫄로 대상 전환)를 보스 문장에 넣고 "(Wowhead)"로 표시했다.
- 툴팁 손질: Moonfire의 Scintillating Moonlight 갈래와 "Generates 0 Astral Power", Sunfire의 "Generates 0 Astral Power", Starfire의 "(80 / Warrior of Elune: 104 / …)" 생성량 갈래, Moonkin Form의 Glyph of Stars 갈래, Regrowth·Wrath의 Tree of Life·Improved Regrowth 갈래(회복 전문화 특성)를 지웠다.
- Wrath는 로테이션 가이드가 쓰는 5176을 썼다(190984는 다른 전문화 버전).
- Ascendant Eclipses는 특성 노드(1261566)와 효과(1261564)의 이름이 같다. 효과 설명(다음 Wrath·Starfire 즉시, Starsurge·Starfall 3번 20% 강화)이 쓰임을 보여 줘서 효과 id를 썼다.
- 어픽스는 Wowhead 조화 쐐기 팁의 affix 번호 순서(148 Ascendant, 158 Voidbound, 162 Pulsar, 160 Devour)대로 옮겼다.
- 이름 충돌: 조화 기술 이름 중 core tips(던전 기술)와 겹치는 것은 없다(스크립트 확인). Ruia의 "Moonkin Form 단계"는 보스 형태 이름이지만 같은 드루이드 형태라 그대로 둔다.

## 확인 못 한 것
- 보스별 조화 전용 대응은 Wowhead 던전별 팁 한두 줄뿐이다. 나머지(쿨기 배치, Barkskin 사용처, Solar Beam 차단 순번)는 일반 원칙을 적용했고 spec.note에 적었다.
- Wowhead 쐐기 팁의 던전별 추천 코드 8개는 빌드 표의 Elune's Chosen **델브** 코드와 같다. 특성 판정은 빌드 표의 쐐기 코드 기준으로 했고, 빌드 구획 문단에 이 사실을 적었다.
- Eclipse 충전: 로테이션 가이드는 "두 번 충전일 때"를 말하지만 Solar/Lunar Eclipse 툴팁은 1회 충전이라 충전 수를 쓰지 않았다.
- Heart of the Wild 툴팁은 변신하지 않은 상태(강화된 광역 치유)만 설명하고 다른 형태의 효과는 나오지 않아, 그것만 적었다.
- 게임 안에서 확인하지 않은 것: Incapacitating Roar·Typhoon·Ursol's Vortex가 분신·Lasher·Wild Imp·Animated Gold·미라·뱀 쫄·Faithless Tormentor에 통하는지(core 층 문장에 기댐), Condensed Mass·Fertile Loam 감속이 변신으로 풀리는지(툴팁 "이동 방해 효과에서 벗어난다"에 기댐), 매크로 동작.
- Shadowmeld(나이트 엘프 종족 기술) 팁(Lightmaw Beams, Void Cascade, Arrow Barrage, Inferno)은 종족 기술이라 넣지 않았다.
