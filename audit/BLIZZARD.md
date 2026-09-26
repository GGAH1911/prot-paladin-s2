# 블리자드 Game Data API 한글 이름 대조

- 조회: `https://kr.api.blizzard.com`, `namespace=static-kr` (응답상 실제 버전 `static-12.1.0_68914-kr`), locale 미지정으로 받아 `name.ko_KR` / `name.en_US` 함께 확인
- 인증: OAuth client_credentials (`https://oauth.battle.net/token`, 200 OK)
- 비교 대상: `index.html` 의 `const KO_NAMES={...}` (키 256개)
- 조회일: 2026-09-26

## 요약

| 판정 | 개수 |
|---|---|
| 불일치 | 0 |
| 확인불가 | 1 |
| 일치 | 39 |

**불일치 항목 없음.** 요청된 3개 우두머리(빛송이 삼위일체 / 부족 의회 / 애더리스와 아스픽스), 8개 던전 이름과 우두머리 전체(28개), 영웅 특성 2개, 쐐기 접두사 1개가 모두 블리자드 API 한글과 동일합니다.

## 대조표 (불일치 → 확인불가 → 일치 순)

| 영문 | 현재 표기 | 블리자드 API 한글 | 엔드포인트 | 판정 |
|---|---|---|---|---|
| Ashseer Flamelasher | 잿빛선견자 화염채찍 | — | /data/wow/creature/190206 → 404, /data/wow/search/creature 결과 없음 | 확인불가 |
| Temple of Sethraliss | 세스랄리스 사원 | 세스랄리스 사원 | /data/wow/journal-instance/1030 | 일치 |
| Adderis and Aspix (KO_NAMES 키: `Adderis & Aspix`) | 애더리스와 아스픽스 | 애더리스와 아스픽스 | /data/wow/journal-encounter/2142 | 일치 |
| Merektha | 메레크타 | 메레크타 | /data/wow/journal-encounter/2143 | 일치 |
| Galvazzt | 갈바즈트 | 갈바즈트 | /data/wow/journal-encounter/2144 | 일치 |
| Avatar of Sethraliss | 세스랄리스의 화신 | 세스랄리스의 화신 | /data/wow/journal-encounter/2145 | 일치 |
| Kings' Rest (KO_NAMES 키: `King's Rest`) | 왕들의 안식처 | 왕들의 안식처 | /data/wow/journal-instance/1041 | 일치 |
| The Golden Serpent | 황금 날뱀 | 황금 날뱀 | /data/wow/journal-encounter/2165 | 일치 |
| Mchimba the Embalmer | 장의사 음침바 | 장의사 음침바 | /data/wow/journal-encounter/2171 | 일치 |
| The Council of Tribes | 부족 의회 | 부족 의회 | /data/wow/journal-encounter/2170 | 일치 |
| Dazar, The First King | 초대 왕 다자르 | 초대 왕 다자르 | /data/wow/journal-encounter/2172 | 일치 |
| Ruby Life Pools | 루비 생명의 웅덩이 | 루비 생명의 웅덩이 | /data/wow/journal-instance/1202 | 일치 |
| Melidrussa Chillworn | 멜리드루사 칠원 | 멜리드루사 칠원 | /data/wow/journal-encounter/2488 | 일치 |
| Kokia Blazehoof | 코키아 블레이즈후프 | 코키아 블레이즈후프 | /data/wow/journal-encounter/2485 | 일치 |
| Kyrakka and Erkhart Stormvein (KO_NAMES 키: `Kyrakka & Erkhart Stormvein`) | 카이락카와 에크하트 스톰베인 | 카이락카와 에크하트 스톰베인 | /data/wow/journal-encounter/2503 | 일치 |
| Den of Nalorakk | 날로라크의 소굴 | 날로라크의 소굴 | /data/wow/journal-instance/1311 | 일치 |
| The Hoardmonger | 비축광 | 비축광 | /data/wow/journal-encounter/2776 | 일치 |
| Sentinel of Winter | 겨울의 파수꾼 | 겨울의 파수꾼 | /data/wow/journal-encounter/2777 | 일치 |
| Nalorakk | 날로라크 | 날로라크 | /data/wow/journal-encounter/2778 | 일치 |
| The Blinding Vale | 눈부신 골짜기 | 눈부신 골짜기 | /data/wow/journal-instance/1309 | 일치 |
| Lightblossom Trinity | 빛송이 삼위일체 | 빛송이 삼위일체 | /data/wow/journal-encounter/2769 | 일치 |
| Ikuzz the Light Hunter | 빛 사냥꾼 이쿠즈 | 빛 사냥꾼 이쿠즈 | /data/wow/journal-encounter/2770 | 일치 |
| Lightwarden Ruia | 빛의 감시자 루이아 | 빛의 감시자 루이아 | /data/wow/journal-encounter/2771 | 일치 |
| Ziekket | 지케트 | 지케트 | /data/wow/journal-encounter/2772 | 일치 |
| Murder Row | 죽음의 골목 | 죽음의 골목 | /data/wow/journal-instance/1304 | 일치 |
| Kystia Manaheart | 키스티아 마나하트 | 키스티아 마나하트 | /data/wow/journal-encounter/2679 | 일치 |
| Zaen Bladesorrow | 자엔 블레이드소로우 | 자엔 블레이드소로우 | /data/wow/journal-encounter/2680 | 일치 |
| Xathuux the Annihilator | 파멸자 자투스 | 파멸자 자투스 | /data/wow/journal-encounter/2681 | 일치 |
| Lithiel Cinderfury | 리시엘 신더퓨리 | 리시엘 신더퓨리 | /data/wow/journal-encounter/2682 | 일치 |
| Voidscar Arena | 공허흉터 투기장 | 공허흉터 투기장 | /data/wow/journal-instance/1313 | 일치 |
| Taz'Rah | 타즈라 | 타즈라 | /data/wow/journal-encounter/2791 | 일치 |
| Atroxus | 아트로서스 | 아트로서스 | /data/wow/journal-encounter/2792 | 일치 |
| Charonus | 차로누스 | 차로누스 | /data/wow/journal-encounter/2793 | 일치 |
| Altar of Fangs | 송곳니의 제단 | 송곳니의 제단 | /data/wow/journal-instance/1322 | 일치 |
| Rav'i | 라비 | 라비 | /data/wow/journal-encounter/2878 | 일치 |
| The Writhing Coil | 격동하는 똬리 | 격동하는 똬리 | /data/wow/journal-encounter/2879 | 일치 |
| Zul'jan | 줄잔 | 줄잔 | /data/wow/journal-encounter/2880 | 일치 |
| Templar | 기사단 | 기사단 | /data/wow/playable-specialization/66 → hero_talent_trees (id 48) | 일치 |
| Lightsmith | 빛의 대장장이 | 빛의 대장장이 | /data/wow/playable-specialization/66 → hero_talent_trees (id 49) | 일치 |
| Xal'atath's Guile | 잘아타스의 기만 | 잘아타스의 기만 | /data/wow/keystone-affix/147 | 일치 |

## 참고

- **Ashseer Flamelasher (190206) 확인불가**: `/data/wow/creature/190206` 이 `static-kr`, `dynamic-kr` 모두 404. `/data/wow/search/creature` 로 `name.en_US=Ashseer`, `name.en_US=Flamelasher`, `id=190206` 검색도 결과 0건. Creature API 는 모든 NPC 를 제공하지 않아(주로 사냥꾼 야수·전투 애완동물 등) 일반 던전 몹은 조회되지 않는 것으로 보임. us/eu 리전 API 는 이 환경의 네트워크 정책상 연결이 차단되어 시도 불가.
- **KO_NAMES 키 표기 차이**: 도감 영문 이름과 KO_NAMES 키가 다른 경우 표에 KO_NAMES 키를 병기함 — `Adderis and Aspix` → `Adderis & Aspix`, `Kyrakka and Erkhart Stormvein` → `Kyrakka & Erkhart Stormvein`, 던전 `Kings' Rest` → 탭 표기 `King's Rest`. 값은 모두 API 한글과 동일.
  - 약칭 키 `Kyrakka & Erkhart` 는 "카이락카와 에크하트"(성 생략)로, API 정식 이름 "카이락카와 에크하트 스톰베인"의 약칭이라 표에는 넣지 않음.
- 영웅 특성 이름은 `playable-specialization/66` 응답의 `hero_talent_trees` 배열에서 확인 (48 Templar=기사단, 49 Lightsmith=빛의 대장장이).
- 쐐기 접두사 147 은 `static-kr` 에서 200, `dynamic-kr` 에서는 404.
