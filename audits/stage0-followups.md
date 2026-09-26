# 0단계 뒤에 남은 일 (2026-09-26)

0단계는 보호 성기사 화면을 한 글자도 바꾸지 않는 것이 목표라서, 아래 항목은 일부러 옮기지 않았습니다. 1단계(혈기 죽음의 기사)를 시작할 때 먼저 처리합니다.

## 탱커 층에 남은 보호 성기사 문구 9줄 (`data/role/tank.json` detail)
다른 탱커가 보면 SotR이 그대로 나옵니다. 메커니즘 키로 바꾸거나 전문화 층으로 옮겨야 합니다.
- altar/Rav'i, altar/The Writhing Coil, altar/Zul'jan
- murder/Kystia Manaheart, murder/Zaen Bladesorrow
- voidscar/Taz'Rah, voidscar/Atroxus, voidscar/Charonus
- kings/The Golden Serpent

## 새 태그(광역 피해·우선 처치·제어)를 아직 붙이지 않음
태그 이름이 바뀌면 보호 성기사 화면 글자가 달라지므로 0단계에서는 붙이지 않았습니다. 예: TRASH `Ritual Chieftain 최우선 처치`는 지금 `위치` 태그입니다. 필터 줄은 데이터에 실제로 있는 태그만 보여 주므로, 태그를 붙이면 자동으로 나타납니다.

## 그 밖
- 메커니즘 키로 바꾼 곳: 렌더링 기준 27곳(문장 끝 25 + 문장 중간 2). 설계 문서의 44곳에는 BRIEF에 덮여 화면에 나오지 않던 옛 D 항목이 섞여 있었습니다.
- 추천 영웅(defaultHero)은 보호 성기사만 채웠습니다(빛의 대장장이, Wowhead 쐐기 ★). 나머지는 첫 번째 영웅으로 시작합니다.
- 역할 기본 대응 문구(`answers`)는 준비 중 전문화용 임시 문구입니다. 예: 탱버 → "생존기".
- 전문화 아이콘 40개는 게임 데이터 ChrSpecialization.SpellIconFileID를 Wowhead 아이콘 페이지로 이름 변환해 확정했습니다. 포식(Devourer)은 `classicon_demonhunter_void`입니다.
