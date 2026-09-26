# 3단계: 증강 기원사 (2026-09-27)

## 출처
- Wowhead 증강 특성 빌드(2026-08-12 갱신): 코드 6개, Current Recommendations 표시(행의 추천 아이콘과 "(Best)")
- Wowhead 증강 쐐기 팁: 던전별 유틸 평가(Quell 전 던전 Must, Cauterizing Flame Must/Good, Zephyr Good, Sleep Walk·Overawe 선택), 어픽스 대응, Kokia Inferno에 Zephyr 예시
- Wowhead 증강 로테이션: 우선순위(Prescience 유지 → Ebon Might → Breath of Eons → Tip the Scales → Fire Breath → Upheaval → Time Skip → Eruption → Living Flame/Azure Strike), Ebon Might 재시전 시점, Breath of Eons 경로, Chronowarden Tip the Scales 취소 매크로
- nether.wowhead.com 툴팁 API(영문·한글): 기술 51개 (`dps-work/_tools/tooltip.mjs --spec Augmentation --ko 증강`)
- 쐐기 빌드 두 개의 실제 선택 노드: `dps-work/_cache/talents-evoker-augmentation.json`

## 기본 영웅
- Scalecommander. 빌드 표의 쐐기 (Best)와 델브 (Best)가 Scalecommander에만 있다. 레이드 (Best)는 Chronowarden. 본문: "쐐기는 Scalecommander가 가장 무난, Chronowarden은 손발이 맞는 파티에서 더 높을 수 있다".
- 가이드 ★: Chronowarden 레이드, Scalecommander 쐐기·델브(가이드 원문 행의 추천 아이콘 기준).

## 검증하며 고친 것
- **Blistering Scales**: 로테이션 가이드는 "탱커에게 유지"라고 하지만 두 쐐기 빌드의 선택 노드에 없다(툴팁 meta에 Talent). 규칙대로 카드·문장에서 뺐고 빌드 구획 문단에 적었다.
- **Oppressing Roar·Overawe·Time Spiral**은 두 쐐기 빌드에 없어 쓰지 않았다. Tail Swipe·Wing Buffet은 기본 기술(툴팁에 Talent 없음)이고, 두 빌드가 고른 Clobbering Sweep·Heavy Wingbeats로 각 1분(3분 − 2분).
- 두 쐐기 빌드는 직업·전문화 트리가 같고(Scalecommander만 Interwoven Threads 추가), 영웅 트리만 다르다. 한쪽 영웅 전용 특성(Mass Eruption·Bombardments·Wingleader·Maneuverability·Might of the Black Dragonflight·Interwoven Threads / Temporal Burst·Double-time·Chrono Flame·Warp)은 그 영웅의 공통 탭 칸·영웅 카드·가이드에만 넣었다.
- **Melt Armor**(Scalecommander)는 Voidscar Arena core tips의 적 기술과 이름이 같아 쓰지 않았다(영웅 카드는 모든 던전 탭에 나온다).
- 툴팁 손질: Living Flame의 보존 갈래 제거. Upheaval은 특성 노드 id 396286(2.5초 채널) 기준, 옛 id 408092 제외. Duplicate는 설명이 있는 1259173에 연결(선택 노드는 1259175). Essence Burst는 증강 문구인 396187.
- 해제 종류는 `dungeon-dispel-types.txt` 기준: 독(Spiteful Venom·Toxic Spores·Heartstop Poison·Poison Splash·Mind-Numbing Poison·Poison Nova·Poison Spit)은 Expunge, 질병(Regurgitate·Wretched Discharge)과 출혈(Grievous Thrash·Severing Axe·Savage Maul)은 Cauterizing Flame. 증강은 마법을 풀 수 없어 Stormslam·Glacial Torment·Corroding Spittle·Cold Claws·Bloodthorn Roots 해제 문장은 쓰지 않았다(Bloodthorn Roots는 Rescue로 이동 방해 해제).
- 어픽스: Wowhead 쐐기 팁 문단 기준(148 Ascendant, 158 Voidbound, 162 Pulsar, 160 Devour).

## 확인 못 한 것
- 보스별 증강 전용 대응은 Wowhead 던전별 칸이 모든 던전에 같은 일반 문단이라, 로테이션 가이드의 원칙을 각 기믹에 적용했다(`spec.note`). Zephyr가 줄이는 "광역 공격"에 각 보스 기술이 해당하는지는 Kokia Inferno(Wowhead 예시) 외에는 확인하지 않았다.
- Rescue로 Bloodthorn Roots·Condensed Mass가 풀리는지, Tail Swipe·Landslide가 분신·Lasher·Wild Imp·Animated Gold·Faithless Tormentor에 통하는지는 게임 안에서 확인하지 않았다.
- Improved Defy Fate(두 빌드 모두 선택)가 Defy Fate 재발동 간격을 얼마나 줄이는지는 계산하지 않고 툴팁 기본값(6분)만 적었다. Interwoven Threads(Scalecommander) 10% 쿨 감소도 쿨타임 숫자에 반영하지 않았다.
- 매크로(특히 Tip the Scales 취소 매크로)는 게임 안에서 시험하지 않았다.
