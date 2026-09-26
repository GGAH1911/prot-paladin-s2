# 3단계: 야수 사냥꾼 (2026-09-27)

## 출처
- Wowhead 야수 특성 빌드(2026-08-12 갱신): 영웅 2개 × 레이드·쐐기·델브 코드 6개와 (Recommended) 표시
- Wowhead 야수 쐐기 팁(2026-08-30 갱신): 던전 8개 각각의 유틸 평가(Feign Death·Kodo Tranquilizer·Emergency Salve·Master's Call·Mortal Wounds)와 보스별 팁, 어픽스 대응
- Wowhead 야수 로테이션(2026-08-23 갱신): 영웅별 단일·광역 우선순위, Bestial Wrath 운영, 펫 관리, 전투 전 점검
- nether.wowhead.com 툴팁 API(영문·한글): 기술 54개
- Wowhead 특성 계산기에 쐐기 빌드 2개를 넣고 실제로 선택된 노드(data-full/data-partial)를 읽음(`_cache/talents-hunter-beast-mastery.json`)
- Wowhead 페이지는 tme-laptop에서 받음(이 Mac IP의 CloudFront 403 회피)

## 기본 영웅
- Pack Leader. Wowhead 빌드 표에서 레이드·쐐기·델브 ★가 모두 Pack Leader에만 붙어 있음.

## 검증하며 고친 것
- 두 쐐기 빌드의 직업 트리는 같다. Counter Shot·Tranquilizing Shot·Kodo Tranquilizer·Intimidation·Guttural Roar·Binding Shot·Survival of the Fittest·Posthaste·Emergency Salve·Natural Mending·Rejuvenating Wind가 둘 다에 있음 → 공통으로 씀.
- **Misdirection**은 툴팁에 Talent가 있고 두 쐐기 빌드 어디에도 없음 → Wowhead 로테이션의 전투 전 점검(탱커에게 Misdirection)에 나오지만 쓰지 않음. Concussive Shot·Tar Trap도 같은 이유로 뺌.
- 기본 기술(툴팁에 Talent 없음): Aspect of the Turtle, Aspect of the Cheetah, Exhilaration, Feign Death, Freezing Trap, Disengage, Hunter's Mark, Mend Pet, Revive Pet. 펫 계열 기술: Master's Call, Mortal Wounds, Primal Rage, Dash.
- 한쪽 영웅 빌드에만 있는 특성은 표시: Kill Cleave·Thrill of the Hunt(Pack Leader 빌드), Dire Beast·Dire Cleave·Huntmaster's Call(Dark Ranger 빌드). 영웅 트리 기술은 해당 영웅 카드·운영 칸에만 씀.
- Bestial Wrath 쿨은 툴팁 1분 30초에서 The Beast Within(두 빌드 모두)의 1분 감소를 반영해 30초. Exhilaration은 Natural Mending의 30초 감소를 반영해 1분 30초.
- **이름 충돌**: Den of Nalorakk core tips에 적 기술 Bestial Wrath(1246865, 격노), Temple of Sethraliss에 Frenzy(1292035)가 있음. 영웅 카드는 모든 던전 탭에 나오므로 두 이름을 영웅 카드에 쓰지 않았고, 두 던전 문장에도 쓰지 않음.
- 해제: 아군 해제 기술 없음(`kit.dispel` 비움). Emergency Salve는 Feign Death·Aspect of the Turtle을 쓸 때 **나에게 걸린** 독·질병만 지우므로 answers에 "자신은 …, 아군은 해제 가능한 파티원 담당"으로 씀. 문장에 쓴 해제 종류는 `audits/research/dungeon-dispel-types.txt`와 대조함: Regurgitate·Wretched Discharge(질병), Toxic Spores·Poison Splash·Mind-Numbing Poison·Poison Spit(독).
- Tranquilizing Shot은 적의 격노·마법 효과를 지우는 기술이라 kit.dispel이 아닌 공통 탭 "생존·유틸"에 씀.
- 보스별 문장은 Wowhead 쐐기 팁 보스 항목을 우선 옮기고 (Wowhead)로 표시. 출처가 없는 보스(Rav'i, Zul'jan, Sentinel of Winter, Taz'Rah 등)는 로테이션 가이드의 일반 원칙을 적용.

## 확인 못 한 것
- Wowhead 쐐기 팁의 Feign Death 취소 효과(Thornblade, Pulverizing Strikes, Barrel Through, Inferno 등)와 Aspect of the Turtle로 막는 효과(Murder in a Row, Infernal Crush 도트, Cosmic Crash 도트, Thunder and Lightning 혼자 받기)는 Wowhead 문장만 근거이고 게임 안에서 확인하지 않음.
- Mortal Wounds가 Cunning 펫 기술이라는 것은 Wowhead 본문 근거. Master's Call·Primal Rage의 펫 계열은 툴팁에 없어 "펫 기술"로만 적음.
- Pack Leader의 Wyvern·Boar 외 짐승(Bear 등) 효과는 Howl of the Pack Leader 툴팁 앞부분만 확인함.
- Howl of the Pack Leader의 Wyvern 피해 증가(10%·12초), Fury of the Wyvern 연장(최대 5초)은 툴팁 값이며 겹친 최종값은 계산하지 않음.
- 매크로(펫 기술 Intimidation·Master's Call 포함)는 게임 안에서 확인하지 않음.
