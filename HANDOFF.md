# 작업 이어받기 안내 (2026-09-27 2단계 완료 기준)

다른 컴퓨터의 Aside가 이 파일만 읽고 이어서 작업할 수 있게 적었습니다. 사이트 파일은 전부 이 저장소에 있고, 이전 컴퓨터의 임시 폴더에만 있던 것은 없습니다.

## 1. 지금 상태
- **라이브**: https://ggah1911.github.io/prot-paladin-s2/ (main, 2단계 머지 커밋), tme-laptop http://tme-laptop:8431 (같은 내용)
- **끝난 단계**
  - 0단계: 층별 데이터(`data/`), 공용 엔진(`assets/`), 첫 화면(직업/역할 두 갈래), 전환 시트, 404, 옛 주소·저장값 이전
  - 1단계: 탱커 6개 전부 ready (보호 성기사, 혈기, 방어 전사, 수호 드루이드, 복수 악사, 양조 수도사)
  - 2단계: 힐러 역할 층(`data/role/healer.json`)과 힐러 7개 전부 ready (신성 성기사, 수양 사제, 신성 사제, 복원 주술사, 운무 수도사, 회복 드루이드, 보존 기원사). 요약·검증·엔진 변경은 `audits/stage2-healers.md`.
- 동시 작업은 **3개 이하**로 돌린다(2단계는 포크 3개씩 두 배치 + 1개로 끝냈다).

## 2. 다음에 할 일: 3단계 딜러 27개
1. **딜러 역할 층**을 `data/role/dps.json`에 넣는다. 힐러 역할 층(`data/role/healer.json`)과 같은 형식: `detail`(28보스, 보스당 3~4줄, 우선 처치 `[우선 처치]`, 제어 `[제어]`, 차단 담당), `brief`(`prio`·`cc`·`int` 중심 1~2개), `answers`.
2. **딜러 전문화 27개**: 지시문은 `tools/prompts/healer-spec.md`를 딜러용으로 바꿔 쓴다(구획: 딜 순환·광역·쿨기·생존·차단·유틸). 2단계 포크 안내와 도구가 참고가 된다(아래 6절).
3. 각 폴더를 `node tools/add-spec.mjs <폴더> --check`로 검사하고, 통과하면 `node tools/add-spec.mjs <폴더>`로 반영한다. add-spec은 기록을 `audits/stage1-<id>.md`로 복사하니 단계 번호에 맞게 이름을 바꾼다.
4. `node tools/build.mjs`로 페이지 셸을 다시 만든다.
5. 검증(아래 4절) → PR → 머지 → 배포(아래 5절).

### 2단계에서 알게 된 것 (3단계에도 해당)
- 해제 종류는 **Wowhead 기술 페이지의 Dispel type 칸**(효과로 적용되는 하위 디버프 포함)을 먼저 본다. nether 툴팁 `buff` 칸은 비어 있는 경우가 있다(Mind-Numbing Poison·Poison Splash·Cold Claws). 던전 기술 401개 결과는 `audits/research/dungeon-dispel-types.txt`. 어디에도 없으면 해제 종류를 쓰지 않는다.
- Wowhead(CloudFront)는 한 IP에서 연속 요청하면 403으로 막는다. 막히면 tme-laptop(다른 공인 IP)에서 `ssh 100.124.146.14 'curl -s -L -A "Mozilla/5.0" <url>'`로 받는다.
- Wowhead 가이드 페이지와 nether 툴팁은 `curl -A 'Mozilla/5.0'`로 받힌다. Icy Veins는 curl 403이라 WebFetch나 브라우저를 쓴다. Wowhead 특성 계산기는 JS로 그려지므로 브라우저로 열어 `.dragonflight-talent-trees-tree[data-tree-type]`별로 선택 노드를 읽는다.
- 툴팁의 전문화 문단 머리는 아이콘이 없거나 전문화 아이콘이 아닌 경우가 있다(성기사 등). 머리글 줄 글자(전문화 이름 쉼표 목록)로 알아보는 편이 안전하다.
- 전문화 기술 이름이 보스 기술과 같으면(Void Blast, Healing Tide Totem) 그 던전에서는 core 툴팁이 이긴다. 그런 이름은 그 던전 문장에 쓰지 않는다.
- 상세 문장 속 쉼표가 든 이름은 한 덩어리로 못 감싼다. 짧은 별칭을 쓰고 tips에 같은 id를 넣는다.
- 같은 이름의 기술이 시전 id와 디버프 id로 나뉘는 경우가 있다(Stormslam 381512 → 디버프 381515 Magic). 해제 판단 전에 근처 id·같은 이름 id를 확인한다: `audits/research/dungeon-dispel-same-name.txt`.
- core 층에 기술 데이터와 어긋나는 문장 1건(Searing Blows를 출혈로 표기, 툴팁상 Searing Wounds는 화염 도트)을 `audits/stage2-healers.md`에 적어 뒀다. 보호 성기사 화면에도 나오는 문장이라 무변경 규칙 때문에 그대로 둔다.

## 3. 꼭 지킬 규칙 (사용자가 정한 것과 실제로 틀렸던 것)
- 기술·자원·스탯 이름은 **항상 영어**. 설명은 한국어(`AGENTS.md` 한국어 규칙).
- 추정 금지. 수치·쿨타임은 `https://nether.wowhead.com/tooltip/spell/<id>?dataEnv=1&locale=0|1` 툴팁 원문 기준.
- 빌드 코드는 Wowhead talent builds 가이드에서 가져오고, `https://www.wowhead.com/talent-calc/blizzard/<코드>`를 열어 `a.dragonflight-talent-tree-talent[data-full="1"]`(또는 `data-partial="1"`)의 href slug로 **실제 찍힌 특성**을 읽는다. 두 영웅의 쐐기 빌드 어디에도 없는 특성 기술은 쓰지 않는다. (혈기에서 Rune Tap이 12.1 트리에 없었고, Death Pact·Wraith Walk는 빌드에 없었다.)
- 기믹 대응을 피해 종류로 고를 때는 `data/core/spells.en.json` 설명의 "X damage" 학파를 확인한다. (Hulking Claw는 자연, Chaos Barrage는 혼돈이었다.)
- 한글 툴팁의 조사 기호 `|1을;를;`은 받침에 맞게 고른다(`add-spec --check`가 잡는다).
- 보스별 전문화 전용 출처가 없으면 일반 원칙으로 쓰고 `spec.note`에 그 사실을 적는다(치트시트 꼬리말에 나온다).
- 공개 저장소다. 푸시·머지는 사용자가 이미 허용한 범위(이 저장소 사이트 갱신)다.

## 4. 검증 방법
- 로컬 서버: `node tools/dev/pages-sim.mjs <저장소 경로>` → http://localhost:8972/prot-paladin-s2/ (GitHub Pages처럼 폴더 index·404 처리)
- 새 전문화: 치트시트 9개 탭을 한글·영문으로 열어 오류 화면·`{…}`·`|1`·`undefined`가 없는지, 공통 탭·해제 담당표·툴팁이 뜨는지, 가이드 두 개의 카드 아이콘·툴팁·빌드 코드 3개가 있는지 본다.
- **보호 성기사 무변경 확인(매번)**: 옛 사이트를 `git show 14cf529:index.html`, `git show 14cf529:guides/templar.html` 등으로 꺼내 다른 포트에서 띄우고, 옛 저장값 `pp-tiplang`·`pp-hero` / 새 저장값 `wg:lang`·`wg:hero:paladin/protection`을 영문·한글 × 기사단·빛의 대장장이 4조합으로 넣어 9개 탭의 `#main` 텍스트(상세 전부 펼침)를 비교한다. 대소문자 무시 차이 0이어야 한다(지금까지 36조합 차이 0).

## 5. 배포
1. 브랜치 푸시 → `gh pr create` → `gh pr merge --merge`
2. `gh api repos/GGAH1911/prot-paladin-s2/pages/builds/latest`가 새 커밋으로 `built`가 될 때까지 기다린다.
3. tme-laptop: `rsync -a --exclude .git --exclude design --exclude tools --exclude audits ./ tme-laptop:wow-guide/` (Tailscale SSH, 파이썬 http.server가 `~/wow-guide`를 서빙)

## 6. 참고 파일
- 2단계 기록: `audits/stage2-healers.md`(요약), `audits/stage2-<class>-<spec>.md`(전문화별), 조사 폴더 사본 `audits/research/<class>-<spec>/`
- 설계: `design/expansion-ui.md`(10절 결정 사항), `design/flows.md`, `design/spec-checklist.md`
- 전문화 조사 원본: `audits/research/`, 전문화별 기록: `audits/stage1-*.md`, 0단계 남은 일: `audits/stage0-followups.md`
- 데이터 형식 예: `data/spec/monk-brewmaster.json`(해제 가능한 전문화), `data/spec/death-knight-blood.json`
