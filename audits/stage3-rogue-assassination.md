# 3단계: 암살 도적 (2026-09-27)

## 출처
- Wowhead 암살 도적 특성 빌드(2026-09-06 갱신): 빌드 8개(영웅 2개 × 레이드 단일·레이드·쐐기·델브)와 (Recommended) 표시
- Wowhead 암살 도적 쐐기 가이드(2026-09-21 갱신): 던전별 유틸(Shiv·Blind·Atrophic Poison·Tricks of the Trade), 던전별 팁(차단 대상, Cloak of Shadows·Feint·Vanish 사용처), 어픽스 대응
- Wowhead 암살 도적 로테이션(2026-09-06 갱신): 단일·광역 우선순위, 영웅별 차이(Darkest Night 때 Rupture 금지, Deathstalker의 Shiv 쿨마다, Fatebound의 Deal Fate), 오프너
- nether.wowhead.com 툴팁 API(영문·한글): 기술 49개
- 쐐기 빌드 두 개(Fatebound·Deathstalker)의 실제 선택 노드: 부모가 받아 둔 `_cache/talents-rogue-assassination.json`

## 기본 영웅
- Fatebound. Wowhead 빌드 표의 쐐기 ★는 Fatebound에만 있고(레이드 두 행도 Fatebound ★), Deathstalker ★는 델브에만 있다. 쐐기 가이드의 던전별 추천 코드 8개도 모두 Fatebound 쐐기 코드와 같다.

## 검증하며 고친 것
- 스크립트로 spells의 Talent 기술 전부를 두 쐐기 빌드 선택 노드와 대조: 빌드 밖 특성 0. 한 영웅에만 있는 것(Hand of Fate·Deal Fate·Lucky Coin·Fate Intertwined / Deathstalker's Mark·Darkest Night·Clear the Witnesses·Momentum of Despair·Toxic Stiletto)은 그 영웅의 공통 탭 운영 칸·영웅 카드·가이드 구획에만 넣었다.
- Kick·Kidney Shot·Cheap Shot·Vanish·Feint·Crimson Vial·Sprint·Shroud of Concealment·Sap·Crippling Poison·Poisoned Knife·Ambush는 툴팁 meta에 Talent가 없는 기본 기술. Blind·Cloak of Shadows·Evasion·Tricks of the Trade·Thistle Tea·Atrophic Poison·Leeching Poison·Cheat Death·Shiv는 두 빌드 모두 골랐다.
- Numbing Poison(Atrophic Poison과 선택 노드)·Blackjack(Tricks와 선택 노드)·Shadowstep·Gouge는 두 빌드에 없어 쓰지 않았다.
- 차단기: Kick(15초, 기본). 기절·제어(Kidney Shot·Cheap Shot·Blind·Sap)에는 보스 면역 배지를 달았다.
- 해제: 아군 해제 기술이 없어 `kit.dispel`을 비웠다. Cloak of Shadows 툴팁("instantly removing all harmful spell effects")과 Wowhead 팁(Toxic Spores·Cold Claws 제거)을 근거로 자기 해제 문장만 썼고, 종류는 `audits/research/dungeon-dispel-types.txt`(Glacial Torment·Corroding Spittle·Bloodthorn Roots 마법, Toxic Spores·Mind-Numbing Poison 독, Cold Claws 마법)로 확인했다.
- 이름 충돌: rogue Envenom은 Altar of Fangs·Murder Row core 툴팁(적 기술 Envenom)과 이름이 같다. 그래서 상세 문장과 영웅 카드(모든 던전 탭에 나옴)에는 Envenom을 쓰지 않고 "마무리 일격"으로 풀어 썼다. 공통 탭·가이드에는 그대로 쓴다.
- 툴팁 손질: Stealth에 붙어 온 잠행 특성 갈래(Shadow Focus·Master of Subtlety)를 지웠다.
- Kyrakka & Erkhart: Interrupting Cloudburst는 시전 중인 사람을 잠그므로, 즉시 시전 위주인 도적은 딜을 이어 갈 수 있다고 썼다(독 바르기 1.5초 시전만 피함).

## 확인 못 한 것
- Atrophic Poison의 피해 감소 수치는 툴팁에 "(4 *- 1)%"로 깨져 나와 숫자를 쓰지 않았다.
- Cloak of Shadows로 독(Toxic Spores·Mind-Numbing Poison)을 지우는 것은 Wowhead 팁(Toxic Spores)과 툴팁 문구에 기댄 것이고, Mind-Numbing Poison·Bloodthorn Roots·Glacial Torment·Corroding Spittle 제거는 게임 안에서 확인하지 않았다.
- Vanish로 Latent Hex·Condensed Mass를 푸는 것은 Wowhead 팁과 툴팁("breaks movement impairing effects")이 근거이고 게임 안에서 확인하지 않았다.
- 보스별 딜 쿨기 배치(Deathmark·Kingsbane)는 일반 원칙을 적용했다(spec.note).
- 매크로(특히 Tricks of the Trade 주시 대상 매크로)는 게임 안에서 확인하지 않았다.
