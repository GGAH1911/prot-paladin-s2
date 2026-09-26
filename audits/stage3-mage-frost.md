# 3단계: 냉기 마법사 (2026-09-27)

## 출처
- Wowhead 냉기 특성 빌드(2026-08-21 갱신): 빌드 8개(영웅 2개 × 레이드 단일·레이드 광역·쐐기·델브)와 ★ 표시. 부모가 받아 둔 `_cache/builds-mage-frost.json`.
- Wowhead 특성 계산기의 쐐기 빌드 2개 실제 선택 노드(`_cache/talents-mage-frost.json`).
- Icy Veins Frost Mage M+ Tips(12.1, 2026-08-10 갱신): Counterspell 주시 대상 매크로, Dragon's Breath가 가장 믿을 만한 광역 시전 끊기, Polymorph는 최후 수단, Greater Invisibility·Spellsteal·Remove Curse·Energized Barriers 쓰임, 어픽스 대응(Ascendant·Pulsar·Devour·Voidbound).
- Icy Veins Frost Mage Rotation(12.1): Frostfire·Spellslinger 단일·광역 우선순위, Ray of Frost 주 쿨기·Frozen Orb 보조 쿨기, Hand of Frost 충전 2회로 한 번을 취약 구간에 남기기.
- Wowhead 비전 마법사 쐐기 팁(비전 포크가 받은 원문)의 **마법사 공용 유틸**: Greater Invisibility로 Zul'jan의 Boneslicer 피하기·Bloodthorn Roots 벗어나기·Void Cascade 피하기, Blink/Shimmer로 Malefic Wave 넘기. 문장에 "(Wowhead 마법사 공용 유틸)"로 표시.
- nether.wowhead.com 툴팁 API(영문·한글): 기술 104개.

## 기본 영웅
- Frostfire. Wowhead 빌드 표의 쐐기 ★는 Frostfire에만 있다(Spellslinger ★는 레이드 단일·레이드 광역·델브). Icy Veins 쐐기 팁도 광역 순간 피해를 이유로 Frostfire 빌드를 먼저 소개한다.

## 검증하며 고친 것
- 냉기 죽음의 기사와 전문화 이름(Frost/냉기)이 같아 문단 필터를 확인했다. 툴팁 점검(lint-tt) 0건, 죽음의 기사 문단은 섞이지 않았다.
- 비전과 달리 냉기 쐐기 빌드 둘 다 **Dragon's Breath**를 골랐다. 그래서 광역 제어·Ascendant 대응을 Supernova 대신 Dragon's Breath로 썼다(Supernova는 두 빌드에 없음).
- 쐐기 빌드에 없어 쓰지 않은 것: Supernova, Ring of Frost, Mass Polymorph, Ice Nova, Cone of Frost, Improved Conjuration(그래서 Mirror Image는 2분).
- 한쪽 빌드에만 있는 특성은 표시: Comet Storm·Frostfire Empowerment·Isothermic Core·Duality·Flash Freezeburn·Piercing Cold(Frostfire), Hand of Frost·Splintering Ray·Crystalline Refraction·쇄편 계열(Spellslinger).
- 쿨타임은 두 빌드 공통 특성을 반영해 계산: Counterspell 20초(Quick Witted), Ice Block 2분 30초·충전 2회(Winter's Protection·Glacial Bulwark·Permafrost Bauble 각 30초), Greater Invisibility 1분(Master of Escape), Alter Time 55초(Master of Time), Shimmer 27초·충전 2회(Flow of Time·Spatial Manipulation), Ice Barrier 충전 2회·물리 피해 10% 감소(Improved Ice Barrier).
- 이름 충돌: Frostbolt가 Ruby Life Pools core 툴팁(371984)과 이름이 같아 Ruby 문장과 영웅 카드에는 쓰지 않았다.
- Spellsteal 툴팁의 Kleptomania 갈래는 쐐기 빌드에 없어 기본 갈래만 남겼다.

## 확인 못 한 것
- Wowhead 냉기 쐐기 팁·로테이션 페이지는 작업 중 Wowhead(CloudFront)가 이 Mac과 tme-laptop 모두 403으로 막아 받지 못했다. 던전별 냉기 전용 유틸 평가 대신 Icy Veins와 비전 페이지의 마법사 공용 유틸을 썼다.
- 보스별 쿨기·생존기 배치는 일반 원칙이다(spec.note).
- Dragon's Breath가 분신·Lashers·미라·Faithless Tormentor에 통하는지는 core 층 문장에 기댔고 게임에서 확인하지 않았다.
- Time Manipulation이 Dragon's Breath·Frost Nova 쿨에 적용된다는 것은 툴팁 "loss of control spells" 문구로 판단했다.
- 매크로(특히 Icy Veins 주시 대상 Counterspell 매크로)는 게임에서 시험하지 않았다.
