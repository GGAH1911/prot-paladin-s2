# 1단계 첫 전문화: 혈기 죽음의 기사 (2026-09-26 23:49 ~ 09-27 00:05)

## 걸린 시간 (실측)
- 전체 약 16분. 조사 두 갈래(키트·빌드·가이드 / 보스별 문장)를 동시에 돌렸고, 통합·검증을 합친 시간입니다.
- spec-checklist.md의 추정(사람 기준 15~18시간)과 단위가 다릅니다. 에이전트 작업 기준으로는 조사보다 **검증**(빌드 선택 노드 판별, 기믹 피해 종류 대조)이 시간을 더 썼습니다.

## 출처
- Wowhead 혈기 빌드(2026-09-21 갱신), 로테이션, 개요, 쐐기 팁, 매크로 페이지
- Icy Veins Blood DK Mythic+ tips (12.1)
- nether.wowhead.com 툴팁 API(영문·한글) 42개 기술
- Wowhead 특성 계산기에 빌드 코드를 넣어 실제로 찍힌 노드를 읽음

## 검증하며 고친 것
- 두 쐐기 빌드 모두 **Rune Tap이 트리에 없고**, Death Pact·Consumption·Wraith Walk는 고르지 않음 → 가이드 카드와 보스 문장에서 뺌. 이동 방해 대응은 March of Darkness 빌드라 Wraith Walk 대신 "해제 가능한 파티원 담당".
- 빌드에 Asphyxiate, Blinding Sleet, Gorefiend's Grasp, Anti-Magic Zone, Anti-Magic Barrier(AMS 40초)가 있음을 확인.
- 기믹 피해 종류를 툴팁으로 대조: Hulking Claw는 자연 → AMS로 수정, Chaos Barrage는 혼돈이라 AMS 문장 제거, Lightning Bite·Stormslam은 물리+자연이라 "자연 피해 부분"으로 수정.
- Coagulopathy, Exterminate, Purgatory 카드·문장을 툴팁 원문대로 다시 씀.
- 징벌 성기사도 Cleanse Toxins를 가짐(특성 계산기)을 확인해 해제 담당표 문구 유지.

## 확인 못 한 것
- 보스별 혈기 대응은 던전별 혈기 전용 출처가 없어 일반 원칙을 적용함(치트시트 꼬리말에 표시).
- 기본 영웅 Deathbringer: Wowhead ★는 두 영웅 모두 쐐기 추천이고, 본문 평가("very good choice for Mythic+")로 고름.
- Stormslam 디버프를 AMS로 막을 수 있는지 미확인이라 문장에 넣지 않음.

## 탱커 층 정리
- 탱커 층에 남아 있던 SotR 문장 9줄을 "방어 기술"로 일반화하고, 보호 성기사는 `roleOverride`로 원문을 그대로 보이게 함. 옛 사이트와 본문 비교 36조합 차이 0.
