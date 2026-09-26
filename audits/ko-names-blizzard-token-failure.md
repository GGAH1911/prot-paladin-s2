# 블리자드 Game Data API 한글 이름 감사 — 중단

토큰 발급 단계(0단계)에서 실패해서, 이름 확인 요청은 하나도 보내지 못했습니다.

## 원인

- `BLIZZARD_CLIENT_ID`, `BLIZZARD_CLIENT_SECRET` 환경 변수는 **둘 다 있습니다** (각 32자, 공백·따옴표 없음).
- `https://oauth.battle.net/token` 에 연결은 **됩니다** (네트워크 차단 아님).
- 그런데 `grant_type=client_credentials` 요청이 **HTTP 401** 을 받았습니다:
  `{"error":"unauthorized","error_description":"Bad credentials"}`
  - Basic 인증(`-u id:secret`)과 폼 본문(`client_id=…&client_secret=…`) 두 방식 모두 401.
- 그러니까 **클라이언트 ID/시크릿 조합을 Battle.net이 거부한 것**입니다. 흔한 원인:
  시크릿을 재발급해서 옛 값이 남아 있음, ID와 시크릿이 서로 다른 클라이언트 것임, 클라이언트가 삭제됨, 복사하다 글자가 틀림.
- 참고: `https://kr.api.blizzard.com` 은 연결됩니다 (토큰 없이 보내면 404).
  `kr.battle.net` 은 이 환경의 프록시가 막고 있지만, 이 작업에는 필요 없습니다.

## 다음 단계

https://develop.battle.net/access/clients 에서 클라이언트 시크릿을 새로 만들고,
환경의 `BLIZZARD_CLIENT_ID` / `BLIZZARD_CLIENT_SECRET` 값을 바꾼 다음 이 감사를 다시 돌리면 됩니다.

## 결과 표

| 영문 | 현재 표기 | 블리자드 API 한글 | 엔드포인트 | 판정 |
|---|---|---|---|---|
| (전체 항목) | — | — | — | 확인불가 (OAuth 401) |
