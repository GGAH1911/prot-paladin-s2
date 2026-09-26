# 3단계: 생존 사냥꾼 (2026-09-27)

## 출처
- Wowhead 생존 특성 빌드(2026-08-27 갱신): 영웅별 레이드·쐐기·델브 빌드와 ★ 표시(부모가 받아 둔 `_cache/builds-hunter-survival.json`)
- Wowhead 생존 쐐기 팁(Midnight Season 2): 던전별 유틸 평가(Feign Death·Emergency Salve·Master's Call·Mortal Wounds·Tranquilizing Shot)와 던전별 팁(Aspect of the Turtle·Binding Shot·Disengage 사용처), 어픽스 팁
- Wowhead 생존 로테이션: Kill Command·Tip of the Spear 순환, Takedown·Boomstick·Wildfire Bomb 운영, Sentinel·Pack Leader 차이
- nether.wowhead.com 툴팁 API(영문·한글): 기술 68개
- Wowhead 특성 계산기의 쐐기 빌드 3개(Pack Leader Mythic+, Sentinel Mythic+, Sentinel Mythic+ Pre Tier-set) 실제 선택 노드(`_cache/talents-hunter-survival.json`)

## 기본 영웅
- Sentinel. Wowhead 빌드 표에서 쐐기 ★는 Sentinel의 두 쐐기 빌드(Mythic+, Pre Tier-set)에만 붙어 있고, 쐐기 팁 본문도 "Sentinel 시즌"으로 평가함. Pack Leader는 어느 행에도 ★가 없음.

## 검증하며 고친 것
- 차단 **Muzzle**(15초)은 특성이며 세 쐐기 빌드 모두에 있음 → 차단 순번 문장에 넣음. Wowhead 쐐기 팁의 Kystia 문단에 Counter Shot(사격·야수용)이 적혀 있으나 생존 차단은 Muzzle이라 Muzzle로 씀.
- **Binding Shot**은 Sentinel 빌드에만 있음 → 문장마다 "(Sentinel 빌드)" 표시. **Tar Trap**, **Kodo Tranquilizer**, **Aspect of the Eagle**은 쐐기 빌드에 없어 쓰지 않음(Wowhead 팁의 Kodo Tranquilizer 문단은 뺌).
- **Twin Fangs**는 Pack Leader·Sentinel 쐐기 빌드에만 있고 Sentinel Pre Tier-set 빌드에는 없음 → 카드에 표시. **Savagery**(Takedown 쿨 15초 감소)는 Pack Leader 빌드에만 있어 Takedown 쿨을 "1분 30초(Pack Leader 1분 15초)"로 씀.
- 쿨타임 계산(모든 쐐기 빌드 공통 특성): Aspect of the Turtle 3분 − Born To Be Wild 15초 − Improved Aspect of the Turtle 30초 = 2분 15초, Exhilaration 2분 − Natural Mending 30초 = 1분 30초, Aspect of the Cheetah 3분 − 15초 = 2분 45초.
- 아군 해제 기술이 없어 `kit.dispel`은 비움. Emergency Salve(세 빌드 모두)로 Feign Death·Aspect of the Turtle이 **내** 독·질병을 지우므로 answers와 보스 문장에 "스스로 지워라"로 씀. 해제 종류는 `dungeon-dispel-types.txt` 기준: Toxic Spores·Poison Splash·Mind-Numbing Poison·Poison Nova·Poison Spit(독), Wretched Discharge(질병).
- Tranquilizing Shot은 적의 격노·마법 효과 제거라 해제 담당표가 아니라 공통 탭 "생존·유틸"에 씀.
- 툴팁 손질: Sentinel's Mark(1253601)는 사격·생존 갈래가 섞여 와서 Sentinel(1253599) 툴팁 원문 기준으로 생존 문장만 남김. Raptor Swipe 특성 노드(1259019)는 피해 문장이 25% 판(1259003)에만 있어 두 툴팁을 합쳐 보여 줌. Moonlight Chakram은 특성 노드(1264902)를 씀.
- 이름 함정: "Stampede!"는 느낌표 때문에 상세 문장 자동 감싸기에 걸리지 않아 공통 탭·영웅 카드에만 씀. 보스 기술과 이름이 겹치는 기술은 없음(스크립트로 core tips 대조).

## 확인 못 한 것
- Wowhead Xathuux 팁의 "Bestial Wrath를 Demonic Rage에 맞춰라"는 야수 사냥꾼 문장이 섞인 것으로 보고, 생존의 큰 쿨기 Takedown으로 바꿔 씀.
- Feign Death로 빔·시전을 취소하는 문장(Ritual of the Fang, Bloodthirsty Gaze, Pulverizing Strikes, Void Cascade, Drain Fluids, Barrel Through, Inferno)과 Aspect of the Turtle로 혼자 소화하는 문장(Thunder and Lightning, Corrupted Lifeforce, Murder in a Row, Echo of Nalorakk)은 Wowhead 쐐기 팁만 근거이고 게임 안에서 확인하지 않음.
- Primal Rage·Master's Call은 펫 계열(Ferocity·Cunning) 기술이라 펫 선택에 따라 없을 수 있음. 공통 탭에 그렇게 적음. Mortal Wounds 펫 추천은 넣지 않음.
- 보스별 생존 전용 문장이 없는 기믹(차단 순번, 광역 생존기 시점)은 일반 원칙을 적용함(spec.note).
- 매크로는 게임 안에서 시험하지 않음.
