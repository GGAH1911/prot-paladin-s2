# 3단계: 징벌 성기사 (2026-09-27)

## 출처
- Wowhead 징벌 특성 빌드(2026-08-25 갱신): 빌드 6개(영웅 2개 × 레이드·쐐기·델브)와 (Best) 표시, 영웅 비교 문단
- Wowhead 징벌 쐐기 팁: 던전별 유틸 평가(Blessing of Protection·Blessing of Freedom·Blessing of Sacrifice·Cleanse Toxins·Blinding Light), 던전별 추천 빌드 8개, 어픽스 대응
- Wowhead 징벌 로테이션: 단일·광역 우선순위(영웅별), 오프너, 주요 쿨기 사용법(Execution Sentence·Avenging Wrath·Hammer of Light)
- nether.wowhead.com 툴팁 API(영문·한글): 기술 54개
- Wowhead NPC 툴팁(tme-laptop에서 받음): Wake of Ashes 기절 대상 종족 확인
- 특성 계산기 선택 노드: 부모가 받아 둔 `_cache/talents-paladin-retribution.json`(쐐기 빌드 2개)

## 기본 영웅
- Herald of the Sun. 빌드 표는 레이드·쐐기 (Best)를 두 영웅 모두에 준다. 기준으로 삼은 근거는 두 가지다.
  - 쐐기 팁의 던전별 추천 빌드 8곳이 모두 Herald of the Sun 쐐기 코드다.
  - 빌드 본문이 "Templar는 빨리 죽는 적과 한 방 생존, Herald of the Sun은 긴 풀"에 강하다고 평가한다.
- 델브 (Best)는 Templar에만 붙어 있다. 가이드 빌드 칸에도 그대로 표시했다.

## 검증하며 고친 것
- 두 쐐기 빌드는 직업·전문화 트리가 거의 같다. Templar는 Quickened Invocation, Herald는 Divine Resonance를 골랐고 둘 다 문장에 쓰지 않았다. 영웅 특성(Light's Guidance·Hammer of Light·Light's Deliverance·Undisputed Ruling·Shake the Heavens·Hammerfall·Sacrosanct Crusade·Divine Hammer / Dawnlight·Aurora·Sun's Avatar·Second Sunrise·Endless Gleam·Eternal Flame)은 해당 영웅 카드·영웅 운영 칸에만 썼다. 스크립트로 확인했다.
- Rebuke는 특성이며 두 쐐기 빌드 모두 골랐다. 그래서 차단 순번 문장에 넣었다. Hammer of Justice는 Fist of Justice(두 빌드)로 30초, Divine Steed는 Cavalier(두 빌드)로 2회 충전이다.
- Crusading Strikes(두 빌드)가 Crusader Strike를 자동 공격으로 바꾸므로 Crusader Strike는 누르는 기술로 쓰지 않았다.
- Divine Protection(498)은 툴팁에 Talent가 없는 기본 기술이다. Shield of Vengeance 특성(1261562)이 피해 감소 10%와 흡수 보호막을 더한다. Unbreakable Spirit(두 빌드)는 Divine Shield·Divine Protection·Lay on Hands 쿨을 30% 줄인다. 최종 초는 적지 않고 감소율만 썼다.
- Hammerfall 툴팁은 "Final Verdict"가 주석으로 빠져 "and Divine Storm…"으로 시작했다. 영문·한글 모두 손으로 앞을 채웠다.
- Light's Deliverance 무료 Hammer of Light 조건은 툴팁 값 60중첩을 따랐다. Wowhead 로테이션 본문은 50이라고 쓴다.
- Wake of Ashes의 "악마·언데드 5초 기절"을 쓰려고 NPC 종족을 Wowhead NPC 툴팁으로 확인했다. Wild Imp·Furious Vilefiend·Infernal은 Demon, Half-Finished Mummy는 Undead다. Lithiel(Wild Imp)과 Mchimba(Half-Finished Mummy) 문장에만 썼다.
- 해제는 `audits/research/dungeon-dispel-types.txt` 기준으로만 넣었다. Cleanse Toxins(독·질병): Regurgitate(질병), Spiteful Venom·Toxic Spores·Heartstop Poison·Mind-Numbing Poison·Poison Nova·Poison Spit(독), Wretched Discharge(질병).
- Blessing of Protection 사용처(Grievous Thrash 제거, Bloodthirsty Gaze, Killing Spree, Barrel Through, Savage Maul, A Knot of Snakes 사전 면역)는 Wowhead 쐐기 팁을 따랐고 문장에 "(Wowhead)"를 붙였다. 탱커에게 쓰지 말라는 주의는 core 해제 담당표의 출혈 줄과 같게 썼다.
- 문장·카드 속 자원 이름은 영어(Holy Power)로 썼다.

## 확인 못 한 것
- 보스별 징벌 전용 딜 쿨기·생존기 배치 출처는 없다. Wowhead 쐐기 팁의 던전별 "Tips" 칸이 비어 있다(FANGS_TIPS 같은 자리 표시만 있음). 그래서 로테이션 가이드의 일반 원칙을 적용했고 spec.note에 적었다.
- Avenging Wrath 툴팁 끝 줄 "Each Holy Power spent increases Haste by an additional 3%, up to 15%"는 Crusade 툴팁(2%, 최대 20%)과 값이 다르다. 공통 탭에는 Crusade 툴팁 값(최대 20%)을 썼다.
- Shield of Vengeance 흡수량은 툴팁 공식(최대 생명력 30% × 유연성)만 있어 "최대 생명력 30%"로 썼다.
- Mirror Images 분신에 Hammer of Justice·Blinding Light가 통하는지는 core 문장("차단하거나 CC")에 기댔다.
- Blessing of Protection이 Barrel Through·A Knot of Snakes를 막는지는 Wowhead 문장만 근거이고 게임에서 확인하지 않았다.
- Divine Arbiter는 티어 세트 효과라 세트가 없으면 쓰이지 않는다. 유지 버프 카드에만 두었다.
- 매크로는 게임에서 시험하지 않았다.
