# 전문화 하나를 추가할 때 채울 데이터 (1단계 체크리스트)

**결론**: 전문화 하나는 `data/spec/<class>-<spec>.json` 파일 1개로 끝나야 합니다. 던전 공략(공용 층)과 탱커 운영(역할 층)은 이미 있으므로, 새 탱커 전문화는 아래 13개 항목만 채우면 됩니다. 보호 성기사를 예시로 채웠고, 각 항목을 지금 사이트의 어느 데이터에서 옮겨 오는지 적었습니다.

- 확인 기준: 저장소 `main` 92e4eff(2026-09-26), `index.html` 369,682바이트, `guides/templar.html`·`guides/lightsmith.html`.
- 작업량은 **추정**입니다. 1단계에서 첫 전문화(예: 혈기 죽음의 기사)를 만들며 실제 시간을 재고, 이 표의 "예상" 칸을 실측값으로 바꿉니다.
- 파일 이름은 `design/roster.json`의 slug를 씁니다. 예: `data/spec/paladin-protection.json`, `data/spec/death-knight-blood.json`.

## 한눈에 보기

| # | 항목 | 필수 | 보호 성기사 분량 | 지금 있는 곳 | 자동화 | 예상(새 탱커) |
|---|---|---|---|---|---|---|
| 1 | 식별·상태 | 필수 | 1블록 | 없음(새로 씀) | 로스터에서 생성 | 5분 |
| 2 | 기술 목록(ID) | 필수 | 약 40개 | `TIPMAP.general` 28개 + 가이드 카드 31/34개 | 반자동 | 1시간 |
| 3 | 기술 툴팁 영문·한글 | 필수 | 약 40개 × 2언어 | `SPELLS`/`SPELLS_KO` 일부, 가이드 `G_EN`/`G_KO` | 자동(툴팁 API) | 10분 + 검수 30분 |
| 4 | 대응 키트 | 필수 | 12칸 | 공통 탭 "생존기 쿨타임"·"생존·유틸", 가이드 배지 | 수작업 | 1시간 |
| 5 | 대응 문구 규칙 | 필수 | 6~8개 | `D`·`BRIEF`·`TRASH`의 "→ SotR" 등 44곳 | 수작업 | 30분 |
| 6 | 해제 가능 종류 | 필수 | 2종(독·질병) | 공통 탭 "해제 담당표" html | 수작업 | 10분 |
| 7 | 영웅 특성 2개 | 필수 | 2 × (운영 팁 4~5줄 + 카드 템플릿) | 공통 탭 "Templar/Lightsmith 운영", `heroCard()` | 수작업 | 1시간 |
| 8 | 보스별 전문화 문장 | 필수 | 98줄 / 28보스 | `DETAIL.*.*.prot` | 수작업 | 6~8시간 |
| 9 | 매크로 | 선택 | 10개 | `M` | 수작업 | 30분 |
| 10 | 빌드 코드 | 필수 | 2영웅 × 3콘텐츠 | 가이드 `#builds` | 반자동(Wowhead 복사) | 20분 |
| 11 | 스킬 가이드 구획 | 필수 | 카드 31/34개 + 유지 버프 | 가이드 HTML 5개 구획 | 템플릿 생성 | 3시간 |
| 12 | 유지 버프·발동 효과 | 선택 | 2~4개 | 가이드 `#upkeep` | 수작업 | 20분 |
| 13 | 검수 기록 | 필수 | 1블록 | `audits/` | 스크립트 보조 | 1~2시간 |

> **실측(2026-09-27, 혈기 죽음의 기사)**: 에이전트 작업으로 약 16분이 걸렸습니다. 조사를 두 갈래로 동시에 돌렸고, 시간 대부분은 빌드 선택 노드 판별과 기믹 피해 종류 대조 같은 검증에 들었습니다. 자세한 내용은 `audits/stage1-blood.md`에 있습니다.

새 탱커 하나의 합계 추정(사람 기준)은 **15~18시간**이고, 그중 절반이 8번(보스별 전문화 문장)입니다. 힐러·딜러는 공용 층에 역할 시점 문장을 먼저 채워야 해서 별도로 계산합니다(expansion-ui.md 8번).

---

## 1. 식별·상태

```json
"id": "paladin/protection",
"role": "tank",
"status": "ready",            // ready | partial | soon
"heroes": ["templar", "lightsmith"],
"recommendedHero": { "mplus": "lightsmith", "raid": "lightsmith", "delve": "templar" },
"updated": "2026-09-26", "patch": "12.1.0"
```

- **지금 있는 곳**: 없습니다. 역할·영웅 slug는 `design/roster.json`에서 그대로 가져옵니다.
- **추천 영웅**: 지금 가이드의 특성 코드 표에 붙은 ★(Wowhead 추천)를 옮깁니다. 선택 화면에서 "나중에"를 누르면 이 값으로 시작합니다.
- `status`는 선택 화면(S5)의 "준비 중" 배지와 S7 화면을 결정합니다. 8번이 절반 이상 차면 `partial`, 전부 차면 `ready`로 올립니다.

## 2. 기술 목록 (ID)

- **보호 성기사**: `TIPMAP.general`의 28개(`divine toll` → 375576, `shield of the righteous` → 53600 …)와 가이드 카드의 주문 ID를 합칩니다. 겹치는 것을 빼면 약 40개입니다.
- **형식**: `"spells": { "shield of the righteous": 53600, "rebuke": 96231, … }` — 지금 `TIPMAP`과 같은 "소문자 이름 → ID" 구조를 씁니다. 엔진의 `decorateTips()`가 이 표를 그대로 읽게 하면 코드 변경이 적습니다.
- **주의**: 이름이 같은 다른 주문이 섞이지 않게, ID는 Wowhead 가이드 페이지의 주문 링크에서 가져옵니다. 이 방식은 지금 치트시트 툴팁을 만들 때 쓴 방법과 같습니다.

## 3. 기술 툴팁 (영문·한글)

- **자동으로 받습니다**: `https://nether.wowhead.com/tooltip/spell/<id>?dataEnv=1&locale=0`(영문), `locale=1`(한글).
- **정리 규칙**은 지금 가이드에 쓴 것을 그대로 씁니다.
  - 표·칸 사이에 줄바꿈과 ` · `를 넣습니다.
  - 다른 전문화 설명은 빼고, 해당 전문화 문단만 남깁니다(예: "Protection"/"보호").
  - 한글 조사 기호 `|1을;를;`는 받침에 맞춰 고릅니다.
- **형식**: `{ "53600": { "n": "Shield of the Righteous", "i": "ability_paladin_shieldofvengeance", "m": "…", "d": "…" } }`. 이 형식은 지금 가이드의 `G_EN`/`G_KO`와 같습니다.
- **지금 있는 곳**: 보호 성기사 전용 11개가 `SPELLS`/`SPELLS_KO`에 약 7KB 있고, 가이드 두 개의 `G_EN`/`G_KO`에 나머지가 있습니다. 던전 기술 401개(약 200KB)는 공용 파일로 갑니다.

## 4. 대응 키트 (메커니즘 → 내 기술)

던전 항목에 붙은 메커니즘 키(`m`)를 보고 "내 기술로 대응" 줄을 자동으로 만드는 표입니다. 키 이름은 모든 전문화가 같고, 값만 전문화마다 다릅니다.

| 키 | 뜻 | 보호 성기사 값 | 지금 있는 곳 |
|---|---|---|---|
| `kick` | 단일 차단 | Rebuke (15초) | 공통 탭 "생존·유틸", 매크로 |
| `kick2` | 보조 차단 | Avenger's Shield (차단 포함) | 가이드 카드 배지 |
| `stun` | 단일 기절 | Hammer of Justice (45초, 보스 면역) | 가이드 배지 "보스 면역" |
| `aoeStop` | 광역 시전 끊기 | Blinding Light (1분 30초, 보스 면역) | 가이드 배지 |
| `tankbuster` | 큰 물리 한 방 | Shield of the Righteous 유지 | "→ SotR" 문구 |
| `major` | 큰 생존기 | Ardent Defender (1분 30초, 30%·12초), Guardian of Ancient Kings (3분, 50%·8초) | 공통 탭 "생존기 쿨타임" |
| `panic` | 최후 수단 | Divine Shield (5분, 무적 8초), Lay on Hands (10분) | 같음 |
| `external` | 아군 보호 | Blessing of Sacrifice, Blessing of Protection, Blessing of Spellwarding, Holy Bulwark(빛의 대장장이) | 같음, 매크로 |
| `freedom` | 이동 방해 해제 | Blessing of Freedom | 매크로 |
| `taunt` | 도발 | Hand of Reckoning | 가이드 "차단·도발" |
| `bres` | 전투 부활 | Intercession | 매크로 |
| `move` | 이동기 | Divine Steed (2회 충전) | 가이드 "전투 후" |

- **보스 면역 표시**는 키트 값에 `bossImmune: true`로 둡니다. 그러면 보스 항목에서는 Hammer of Justice·Blinding Light를 추천하지 않습니다(지금 가이드의 빨간 배지와 같은 규칙).
- **없는 칸은 비웁니다.** 예를 들어 혈기 죽음의 기사에는 해제 칸이 없습니다. 그러면 엔진이 "해제 불가 → 힐러·사제·수도사 담당"으로 대신 씁니다.

## 5. 대응 문구 규칙

지금 문장 끝의 "→ SotR" 같은 표현 44곳을 문장에서 떼어 내 메커니즘 키로 바꾸고, 문구는 전문화가 만듭니다.

```json
"answers": {
  "tankbuster": "→ {Shield of the Righteous}",
  "tankbuster.heavy": "→ {Shield of the Righteous} + {Ardent Defender}",
  "freedom": "→ {Blessing of Freedom}",
  "dispel.disease": "→ {Cleanse Toxins}",
  "dispel.poison": "→ {Cleanse Toxins}"
}
```

- **예시**: `BRIEF.altar["Rav'i"]`의 `"Hydrastrike 머리 3연타 → SotR"`는 공용 문장 `"Hydrastrike 머리 3연타"` + 키 `tankbuster`로 나뉩니다. 보호 성기사는 "→ SotR", 혈기 죽음의 기사는 "→ Death Strike, 위험하면 Vampiric Blood"를 붙입니다.
- **지금 있는 곳**: `D`·`TRASH`·`BRIEF`의 화살표 문구 44곳입니다(SotR, Blessing of Freedom, Cleanse Toxins 세 종류). 0단계에서 이 44곳을 키로 바꾸는 작업을 한 번 합니다.

## 6. 해제 가능 종류

```json
"dispel": ["poison", "disease"]
```

- 지금 "해제 담당표" html의 "담당" 칸에 "나"라고 손으로 쓴 두 줄(독, 질병)을 이 값으로 계산합니다.
- 규칙: 내 `dispel`에 있으면 "나", 없으면 역할 기본값(마법 → 힐러, 저주 → 해당 직업이 있는 파티원)을 씁니다.

## 7. 영웅 특성 2개

영웅마다 세 가지를 채웁니다.

1. **운영 팁 4~5줄**: 지금 공통 탭의 "Lightsmith 운영"(5줄)·"Templar 운영"(4줄)을 옮깁니다.
2. **던전별 영웅 카드 템플릿**: 지금 `heroCard()` 안에 코드로 박힌 문구입니다. `{busters}` 자리에는 그 던전 보스들의 탱버 목록이 들어갑니다.
   ```json
   "heroCard": {
     "templar": [["tip","{Divine Toll} → {Hammer of Light}는 큰 일반몹 풀과 쫄 단계에 맞추기"],
                 ["tb","폭딜 중에도 SotR 유지. 주요 탱버: {busters}"]],
     "lightsmith": [["tb","{Holy Bulwark} 자신에게 쓸 타이밍: {busters}"], …]
   }
   ```
3. **비교 화면(S4) 행**: 폭딜 주기, 생존 보조, 운영 난이도, 추천 콘텐츠, 쐐기 상위권 사용 비율(출처·날짜 포함). 새로 씁니다.

## 8. 보스별 전문화 문장 (가장 큰 일)

- **분량**: 지금 `DETAIL`의 `prot` 층이 28보스 98줄입니다. 접두 태그 분포는 `[탱버]` 36, `[차단]` 19, `[위치]` 15, `[참고]` 13, `[해제]` 11 등입니다.
- **새 탱커가 쓸 것**: 같은 28보스에 "내 기술로 이렇게"를 3~4줄씩 씁니다. 공용 층(개요·단계·파티 공통)과 탱커 층(`tank`, 103줄)은 그대로 씁니다.
- **자동으로 줄일 수 있는 부분**: 4·5번 키트가 차단·해제·탱버 문구를 자동으로 만들면, 수작업은 `[참고]`·`[위치]`처럼 전문화 고유의 판단이 필요한 줄만 남습니다. 목표는 보스당 1~2줄입니다.
- **형식**:
  ```json
  "bosses": {
    "altar/Rav'i": [
      "[탱버] Hydrastrike에 SotR을 유지하고, 체력이 낮으면 Ardent Defender나 Guardian of Ancient Kings를 써라",
      "[해제] Regurgitate에 맞은 파티원의 질병 디버프를 Cleanse Toxins로 해제하라"
    ]
  }
  ```

## 9. 매크로

- 지금 `M`의 10개(Cleanse Toxins, Word of Glory, Blessing of Protection, Blessing of Spellwarding, Blessing of Sacrifice, Blessing of Freedom, Holy Armaments, Intercession, Hammer of Justice, Rebuke)를 옮깁니다.
- 매크로 문구 안의 기술 이름은 게임 언어 토글에 맞춰 한글로 바뀌어야 하므로, 이름을 `{Rebuke}`처럼 표시해 둡니다.

## 10. 빌드 코드

- 영웅 2개 × 레이드·쐐기·델브 = 최대 6개입니다. 지금 가이드 `#builds` 표의 값과 출처(Wowhead, 갱신일)를 옮깁니다.
- Wowhead 특성 계산기의 선택형 노드는 `aria-label`이 아니라 링크 주소로 판별해야 합니다(2026-09-26에 확인한 함정).

## 11. 스킬 가이드 구획

- 탱커 구획은 지금과 같습니다. 1. 전투 중 항시 사용 → 2. 전투 중 필요시 사용(자기 생존, 군중 제어, 아군 보호, 회복·해제, 차단·도발, 부활) → 3. 전투 전 준비 → 4. 전투 후 → 5. 유지 버프 → 특성 빌드 코드.
- 카드 하나는 `{ "id": 53600, "desc": "…", "badges": ["bossImmune"] }`만 쓰면 됩니다. 이름·아이콘·툴팁은 3번 데이터에서 채웁니다.
- 지금 가이드의 카드 설명(기사단 31장, 빛의 대장장이 34장)을 그대로 옮깁니다. 두 영웅에서 겹치는 카드는 한 번만 쓰고 영웅 전용 카드만 따로 둡니다.

## 12. 유지 버프·발동 효과

- 지금 가이드 `#upkeep`: 기사단은 Shield of the Righteous·Consecration, 빛의 대장장이는 여기에 Sacred Weapon·Divine Guidance가 더해집니다.
- 발동 효과 목록(Grand Crusader, Vanguard, Divine Purpose, Shining Light)은 선택 항목입니다.

## 13. 검수 기록

- **한글 이름**: 3번에서 받은 툴팁의 한글명으로 자동 대조합니다. 대조가 안 되는 이름만 `audits/ko-names-<spec>.md`에 남깁니다(지금 `audits/ko-names-wowhead.md`와 같은 방식).
- **"예시 초안" 표시 제거**: 사람이 한 번 읽은 문장에서만 표시를 지웁니다.
- **기록할 것**: 패치 번호, 확인 날짜, 출처 URL, 확인하지 못한 항목 목록.

---

## 참고: 새 탱커 혈기 죽음의 기사를 채운다면 (예시)

기술 존재와 한글명은 툴팁 API로 확인했습니다(2026-09-26): Mind Freeze 47528 정신 얼리기, Death Strike 49998 죽음의 일격, Vampiric Blood 55233 흡혈, Icebound Fortitude 48792 얼음같은 인내력, Gorefiend's Grasp 108199 고어핀드의 손아귀, Bone Shield 195181 뼈의 보호막, Asphyxiate 221562 어둠의 질식, Anti-Magic Shell 48707 대마법 보호막. 어떤 상황에 어떤 기술을 쓰라는 운영 문장은 아직 검수 전입니다.

| 항목 | 값(초안, 검수 전) |
|---|---|
| kick | Mind Freeze |
| stun | Asphyxiate (보스 면역) |
| tankbuster | Death Strike로 회복 + Bone Shield 유지 |
| major | Vampiric Blood, Icebound Fortitude |
| 광역 끌어오기 | Gorefiend's Grasp |
| 마법 피해 | Anti-Magic Shell |
| dispel | 없음 → 질병·독은 "힐러·사제·수도사 담당"으로 자동 표시 |
| 영웅 | San'layn(산레인), Deathbringer(죽음의 인도자) — roster.json 기준 |
