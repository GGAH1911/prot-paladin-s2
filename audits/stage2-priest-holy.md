# 2단계: 신성 사제 (2026-09-27)

## 출처
- Wowhead 신성 사제 특성 빌드 (2026-08-24 갱신): 코드 5개. (Best)는 Oracle 레이드·쐐기에만 붙음. Archon은 레이드·쐐기·델브, Oracle은 레이드·쐐기만 있음.
- Wowhead 신성 사제 쐐기 팁: 8개 던전 모두 추천 빌드가 Oracle 쐐기 코드. 던전별 유틸 평가(Mass Dispel, Phantasm, Mind Soothe, Improved Purify, Shackle Horror). 던전별 "Tips" 칸은 모두 "Coming Soon!".
- Wowhead 신성 사제 로테이션·쿨기: 쐐기 우선순위, Divine Hymn(12.1에서 채널 중 Guardian Spirit, 시야 밖에서도 시전 가능), Apotheosis, Guardian Spirit, Oracle의 Prayer of Mending 운영.
- Icy Veins Holy Priest M+ Tips (12.1): Oracle 추천, Archon 대안, 차단 없음(Psychic Scream·Holy Word: Chastise), 어픽스 대응.
- nether.wowhead.com 툴팁 API(영문·한글): 기술 52개.
- 특성 계산기: 부모가 쐐기 빌드 두 개(Archon·Oracle)의 선택 노드(data-full/data-partial)를 읽어 둔 `_cache/talents-priest-holy.json`.

## 기본 영웅
- Oracle. Wowhead 빌드 표의 쐐기 (Best)가 Oracle에만 붙고, 던전별 추천 빌드 8곳과 Icy Veins 쐐기 추천도 Oracle.

## Oracle 델브 빌드가 없는 문제
- Wowhead 빌드 표와 본문 모두 델브 빌드는 Archon 하나뿐(본문 "Best Holy Priest Delve Talent Build"도 Archon 탭만 있음).
- add-spec이 영웅마다 빌드 코드 3개를 요구해서, Oracle 가이드의 세 번째 행을 **"델브 (Archon 빌드)"**로 이름 붙여 Archon 델브 코드를 넣었다. 행 아래 설명에 "Oracle 델브 빌드는 Wowhead 표에 없어 Archon 빌드를 대신 넣었다"고 적었다. ★는 원본 rec 값을 그대로 따라 붙이지 않았다.

## 검증하며 고친 것
- 해제: Purify 툴팁은 "removing all Magic [Improved Purify: and Disease]". Improved Purify는 **Archon 쐐기 빌드에만** 선택되고 Oracle 빌드엔 없다. 그래서 `kit.dispel`은 `magic: Purify`만 넣고(기본 영웅 Oracle 기준), 질병은 문장·답변에 "Archon 빌드는 Purify"로 표시했다. 독·저주는 해제 수단이 없다.
- 두 쐐기 빌드 어디에도 없는 특성은 쓰지 않았다: Mind Soothe, Shackle Horror, Shadow Word: Death, Censure, Light's Inspiration, Psychic Voice, Holy Word: Sanctify 운영(노드는 선택돼 있지만 Ultimate Serenity가 Sanctify 관련 특성을 Serenity로 돌리고, Wowhead 쐐기 우선순위에 Sanctify가 없어 카드로 만들지 않음).
- 한쪽 빌드에만 있는 것은 표시했다: Halo·Power Surge·Divine Halo·Perfected Form·Prayer of Healing·Divinity·Improved Purify(Archon), Guiding Light·Prompt Prognosis·Piety·Unfolding Vision·Prophet's Will·Preemptive Care·Petrifying Scream·Epiphany(Oracle). Petrifying Scream과 Dominate Mind는 Oracle 쐐기 빌드에만 있다(Dominate Mind는 쓰지 않음).
- 툴팁 조건 괄호 정리: Holy Word: Chastise는 Censure를 안 찍어 "4초 무력화"만 남김. Apotheosis는 Miracle Worker를 찍어 "Holy Word 1회 충전". Desperate Prayer는 Light's Inspiration을 안 찍어 25%. 한글 Apotheosis·Chastise의 조건 괄호도 같은 기준으로 고침.
- 툴팁에 "Holy / Discipline / Shadow" 전문화 문단이 아이콘 없이 붙은 기술(Preventive Measures, Piety, Guiding Light, Prophet's Will, Protective Light 등)은 신성 문단만 남김.
- 던전 해제 종류는 `_cache/boss-dispel-types.txt` 기준으로만 씀: Regurgitate·Wretched Discharge(질병), Glacial Torment·Corroding Spittle·Bloodthorn Roots(마법), Toxic Spores·Heartstop Poison·Poison Nova·Poison Spit(독 → "사제는 풀 수 없다"). Cold Claws는 Wowhead가 Mass Dispel을 권하지만 툴팁에 해제 종류가 없어 쓰지 않음.
- 기술·자원·스탯 이름은 영어로 통일(Mana, Haste, Stamina). `names`에 한글 클라이언트 명칭(마나·가속·체력·집정관·예언자)을 넣음.

## 확인 못 한 것
- 보스별 신성 사제 운영은 Wowhead 던전 팁 칸이 비어 있어 일반 원칙을 적용함(spec.note).
- Wowhead 로테이션 글의 "Binding Heals와 함께면 아군에게 Flash Heal을 써도 Protective Light가 켜진다"는 툴팁("on yourself")과 달라 쓰지 않음.
- Divine Hymn이 NPC(Avatar of Sethraliss)를 치유하는지는 확인하지 못해 Avatar 문장에서 뺌.
- Power Word: Shield(17) 툴팁 흡수량이 "0"으로 나와 쓰지 않음.
- **엔진 한계(부모 판단 필요)**: 상세 공략의 `abWrap` 정규식이 콜론을 잇지 않아 "Holy Word: Serenity", "Holy Word: Chastise" 같은 이름이 "Holy Word"와 "Serenity" 두 조각으로 감싸진다. 그래서 상세 공략 문장에서는 이 두 기술의 툴팁·한글 변환이 안 된다(공통 탭·카드·답변은 명시 span이라 정상). 엔진 정규식에 `(?::\s[A-Z][A-Za-z'’\-]*)` 같은 이음을 허용하면 해결되지만, 보호 성기사 무변경 비교가 필요한 공용 엔진 변경이라 건드리지 않았다.


## 해제 종류 재확인 (2026-09-27, 머지 뒤 보완)
- 2단계 첫 판에서는 해제 종류를 nether 툴팁 buff 칸으로만 봤다. Wowhead 기술 페이지의 Dispel type 칸과 대조하니 **Mind-Numbing Poison(1263971)·Poison Splash(1226031)는 Poison**, **Cold Claws(적용 디버프 1305234)는 Magic**이었다(툴팁 buff 칸은 비어 있음). 이 전문화가 풀 수 있는 종류에 맞춰 Atroxus·Melidrussa 해제 문장을 넣었다. 앞의 "확인 못 한 것"에 적은 Mind-Numbing Poison·Poison Splash·Cold Claws 항목은 이것으로 해결됐다.
- Stormslam(381512)은 기술 페이지에서도 Dispel type n/a라 여전히 해제 문장을 쓰지 않는다.

- 한글 모드에서 통칭 "Holy Word"가 "신성 Word"로 반쯤 번역돼, 통칭을 모두 정확한 기술 이름(Holy Word: Serenity·Holy Word: Chastise)으로 바꿨다.
