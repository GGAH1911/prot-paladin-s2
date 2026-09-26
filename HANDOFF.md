# 작업 이어받기 안내 (2026-09-27 00:40 기준)

다른 컴퓨터의 Aside가 이 파일만 읽고 이어서 작업할 수 있게 적었습니다. 사이트 파일은 전부 이 저장소에 있고, 이전 컴퓨터의 임시 폴더에만 있던 것은 없습니다.

## 1. 지금 상태
- **라이브**: https://ggah1911.github.io/prot-paladin-s2/ (main `8772e7c`), tme-laptop http://tme-laptop:8431 (같은 내용)
- **끝난 단계**
  - 0단계: 층별 데이터(`data/`), 공용 엔진(`assets/`), 첫 화면(직업/역할 두 갈래), 전환 시트, 404, 옛 주소·저장값 이전
  - 1단계: 탱커 6개 전부 ready (보호 성기사, 혈기, 방어 전사, 수호 드루이드, 복수 악사, 양조 수도사)
- **진행 중: 2단계 힐러 7개** — 브랜치 `stage2/healers`
  - 커밋된 것: 엔진이 보스 카드에 역할 층·전문화 층 요약 항목(`role.brief`, `spec.brief`)을 덧붙이도록 바뀜, `tools/add-spec.mjs`가 새 태그(광역 피해·우선 처치·제어) 허용
  - 아직 없는 것: 힐러 역할 층 문장, 힐러 전문화 7개 데이터
  - 이전 컴퓨터에서 8개 작업을 동시에 돌리다 전부 중단됐습니다. **동시 작업은 3~4개 이하로** 돌리세요.

## 2. 다음에 할 일 (순서대로)
1. **힐러 역할 층**을 만들어 `data/role/healer.json`에 넣는다.
   - `detail`: 28보스, 보스당 3~4줄, 힐러 공통 시점(광역 피해 시점, 해제 종류, 탱버 때 탱커 관리, 위치). 특정 힐러 기술 이름은 쓰지 않는다.
   - `brief`: `{던전id: {보스명: [["aoe", "html"]]}}`, 보스 요약 카드에 덧붙는 1~2개. html 안 기술 이름은 `data/core/spells.en.json`의 이름과 정확히 같게 `<span class="ab">…</span>`로 감싼다.
   - `answers`: 전문화가 준비되기 전에 보일 일반 문구.
   - 해제 종류(독·질병·마법·저주)는 `spells.en.json` 툴팁으로 확인한 것만 쓴다.
2. **힐러 전문화 7개**: 지시문은 `tools/prompts/healer-spec.md`. 전문화마다 폴더 하나에 `spec.json`, `guide.json`, `roster-patch.json`, `report.md`를 만든다.
   - 대상: paladin/holy, priest/discipline, priest/holy, shaman/restoration, monk/mistweaver, druid/restoration, evoker/preservation
3. 각 폴더를 `node tools/add-spec.mjs <폴더> --check`로 검사하고, 통과하면 `node tools/add-spec.mjs <폴더>`로 반영한다.
4. `node tools/build.mjs`로 페이지 셸을 다시 만든다.
5. 검증(아래 4절) → PR → 머지 → 배포(아래 5절).
6. 그다음 3단계 딜러 27개: 딜러 역할 층(우선 처치 `prio`, 제어 `cc`, 차단 담당) 먼저, 그다음 전문화.

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
- 설계: `design/expansion-ui.md`(10절 결정 사항), `design/flows.md`, `design/spec-checklist.md`
- 전문화 조사 원본: `audits/research/`, 전문화별 기록: `audits/stage1-*.md`, 0단계 남은 일: `audits/stage0-followups.md`
- 데이터 형식 예: `data/spec/monk-brewmaster.json`(해제 가능한 전문화), `data/spec/death-knight-blood.json`
