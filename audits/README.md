# Audits

치트시트 작업 중에 만든 검수·조사 보고서 모음. 원래 각자 브랜치에만 있던 것을 여기로 모았다.
사이트(`index.html`, `guides/`)에는 쓰이지 않는다.

## 한글 이름 검수

| 파일 | 내용 | 원래 브랜치 |
|---|---|---|
| [ko-names-wowhead.md](ko-names-wowhead.md) | Wowhead 툴팁 API로 한글 이름 141개 검수 (불일치 1 / 확인불가 8 / 일치 132) | `claude/ko-name-audit` (`59f4b31`) |
| [ko-names-unverified.json](ko-names-unverified.json) | 위 검수의 입력: 공식 데이터로 확인하기 전 이름 목록 | `claude/ko-name-audit` |
| [ko-names-blizzard-token-failure.md](ko-names-blizzard-token-failure.md) | Blizzard Game Data API 1차 시도: 토큰 발급 실패(401)로 중단 | `claude/ko-name-audit-blizzard` (`83d7cb1`) |
| [ko-names-blizzard.md](ko-names-blizzard.md) | Blizzard Game Data API(`static-kr`)로 `KO_NAMES` 대조 | `claude/ko-name-audit-blizzard2` (`649206f`) |
| [ko-names-npc-190206.md](ko-names-npc-190206.md) | NPC 190206 / 주문 385536 한글 이름 확인 | `claude/ko-name-audit-npc` (`a98355e`) |

## 몹 생김새 이미지

| 파일 | 내용 | 원래 브랜치 |
|---|---|---|
| [mob-images-round1.md](mob-images-round1.md) | 이미지 가능성 조사 (MDT displayId, Blizzard media API) | `claude/mob-image-test` (`60850ad`) |
| [mob-images-round2.md](mob-images-round2.md) | 몹별 이미지 URL 확정 (2차) | `claude/mob-image-test2` (`99045f5`) |
| [mob-images.json](mob-images.json) | 2차 결과: 몹 173개의 NPC ID와 이미지 URL | `claude/mob-image-test2` |
