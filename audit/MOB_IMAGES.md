# 몹 생김새 이미지 조사 (MOB_IMAGES)

조사일: 2026-09-26 · 조사만 수행 (index.html / guides/* 변경 없음) · API 키/토큰 값은 기록하지 않음.

## 결론 요약

- **MDT displayId 매칭**: index.html 의 몹 이름(`MOB("…")` 111개 + KO_NAMES 키 255개, 합집합 255) 중 **172개 이름**이 MDT Midnight 8개 던전 NPC 와 매칭되고, **172개 전부 displayId 보유**. (`MOB("…")` 111개 중 110개 매칭, 미매칭은 `Flame Channeler` 1개.)
- **Blizzard creature-display media 는 대부분 404**: 매칭 NPC 182행 / 고유 displayId 170개 중 **200 = 56개, 404 = 114개**. 이름 기준으로는 172개 중 **59개만** 이미지 URL 확보.
- **원인**: media/creature-display 는 사실상 *던전 도감(Encounter Journal)에 등장하는 displayId* 만 제공. 8개 던전의 journal-encounter 전 creature(58개 항목)의 creature_display.id 는 **58/58 모두 200**. 일반몹 중 200 이 나온 것도 대부분 도감에 쫄로 실린 몹(Infused Whelp, Toxic Viper, Nibbles 등)이거나 도감 모델을 재사용하는 경우.
- **보스는 journal 경로로 사실상 100%**: MDT 가 보스로 표시한 38개 이름 중 MDT displayId 로 31개, 나머지 중 5개(Charonus, Taz'Rah, Xathuux, The Writhing Coil, Galvazzt)는 journal display id 로 해결 → 36/38. 남은 2개(High Channeler Ryvati, Defier Draghar)는 도감에 없는 준보스. journal 경로를 합치면 이름 기준 **69/172** (59 + 10).
- **이미지 호스트**: `render.worldofwarcraft.com` (URL 형식 `https://render.worldofwarcraft.com/us/npcs/zoom/creature-display-{displayId}.jpg`). 이 세션에서는 **네트워크 정책에 막혀** (프록시 CONNECT 403) 이미지 자체의 HTTP 코드·content-type·크기는 확인 불가.
- **Wowhead 대안** (`wow.zamimg.com/modelviewer/live/webthumbs/npc/{displayId%256}/{displayId}.png`): **네트워크 정책에 막힘** (CONNECT 403), 확인 불가.
- **페이지에서 키 없이 쓸 수 있나?** → **이미지 URL 자체는 가능, API 조회는 불가.**
  - media API 호출에는 OAuth 토큰(client secret)이 필요하므로 페이지에서 런타임 조회하면 안 됨.
  - 그러나 응답의 이미지 URL 은 `creature-display-{displayId}.jpg` 라는 **결정적 패턴**이고 토큰/서명 쿼리가 없는 정적 CDN 경로라서, 빌드 시점에 (키로) 존재 여부만 확인해 두고 페이지에는 `<img src="https://render.worldofwarcraft.com/us/npcs/zoom/creature-display-{id}.jpg">` 를 **키 없이 직접 박아 넣는 방식**이 가능해 보임. (단 이 환경에서 호스트가 막혀 있어 실제 브라우저 핫링크 허용 여부·CORS·Referer 제한은 **미검증** — 사용자 브라우저에서 1회 확인 필요.)
  - 커버리지가 이름 기준 약 40%(journal 포함)라서, 일반몹 툴팁 이미지는 절반 이상 비게 됨 → 보스/도감 쫄 중심으로만 붙이거나, 없는 몹은 이미지 생략하는 폴백 필요.

## 1. MDT 추출 / 매칭

- 소스: `Nnoggie/MythicDungeonTools` (depth 1 clone), `Midnight/{AltarOfFangs,TheBlindingVale,DenOfNalorakk,MurderRow,VoidscarArena,KingsRest,RubyLifePools,TempleOfSethraliss}.lua`
- 추출 NPC: 260개 (고유 이름 246), 260개 모두 `displayId` 필드 있음.
- index.html 이름 집합: `MOB("…")` 111 + KO_NAMES 키 255 → 합집합 255 (MOB 이름은 모두 KO_NAMES 에도 있음).
- 매칭: **172 이름 (NPC 행 182, 고유 displayId 170)**, displayId 보유 172/172.
- KO_NAMES 중 미매칭은 던전명·용어·약칭(예: `Kula`, `Dazar`, `Holy Power`, `Flame Channeler`, `Carrion Pile` 등)으로 몹 이미지 대상 아님.

## 2. 표본 10개 (보스 3 + 일반몹 7, 7개 던전)

토큰: `POST https://oauth.battle.net/token` → 200 (expires_in 86399). 이미지 URL `curl -I` 는 전부 프록시 CONNECT 거부(curl exit 56, HTTP 000)라 `blocked` 로 표기.

| 구분 | 던전 | 몹 | npc id | MDT displayId | media HTTP | assets (zoom) | 이미지 curl -I |
|---|---|---|---|---|---|---|---|
| 보스 | Altar of Fangs | Rav'i | 259445 | 144110 | 200 | `…/us/npcs/zoom/creature-display-144110.jpg` | blocked |
| 보스 | Den of Nalorakk | Nalorakk | 246404 | 129989 | 200 | `…/us/npcs/zoom/creature-display-129989.jpg` | blocked |
| 보스 | Voidscar Arena | Charonus | 239167 | 138269 | **404** | – | – |
| 일반 | Altar of Fangs | Bloodletter | 261552 | 146661 | 404 | – | – |
| 일반 | The Blinding Vale | Radiant Spellsower | 245336 | 127945 | 200 | `…/us/npcs/zoom/creature-display-127945.jpg` | blocked |
| 일반 | Den of Nalorakk | Keen-Eyed Striker | 241816 | 124212 | 200 | `…/us/npcs/zoom/creature-display-124212.jpg` | blocked |
| 일반 | Murder Row | Row Hooligan | 236073 | 136939 | 404 | – | – |
| 일반 | Voidscar Arena | Brutal Overseer | 252053 | 137329 | 404 | – | – |
| 일반 | King's Rest | Royal Berserker | 135167 | 84112 | 404 | – | – |
| 일반 | Ruby Life Pools | Flashfrost Chillweaver | 188067 | 107397 | 404 | – | – |

(`…` = `https://render.worldofwarcraft.com`) · assets 는 모든 200 응답에서 `key: "zoom"` 1개뿐.

### 보스 journal-encounter 경로

| journal id | 보스 | creatures[].creature_display.id | media HTTP |
|---|---|---|---|
| 2878 | Rav'i | 144110 (MDT 와 동일) | 200 |
| 2778 | Nalorakk | 129989 (MDT 와 동일), Zul'jarra 125149 | 200 / 200 |
| 2793 | Charonus | **128554** (MDT 138269 과 다름) | **200** |

→ Charonus 처럼 MDT displayId 가 404 인 보스도 journal 의 display id 로는 이미지가 나옴.

8개 던전 전체 journal 스윕(journal-instance → encounters → creatures): 58개 creature 항목, **media 58/58 = 200**. MDT 와 display id 가 다른 보스: Charonus 128554, Taz'Rah 124085, Xathuux 75659, The Writhing Coil 147556, Galvazzt 81654.

## 3. 전수 확인 (매칭 몹 전체)

| 기준 | 전체 | 200 | 404 |
|---|---|---|---|
| 고유 MDT displayId | 170 | 56 | 114 |
| 이름 (MDT displayId 중 하나라도 200) | 172 | 59 | 113 |
| 이름 (+ journal display id 폴백) | 172 | 69 | 103 |
| MDT 보스 표시 이름 (+ journal) | 38 | 36 | 2 |

기타: 404 외 다른 에러(429/5xx) 없음. `/data/wow/creature/{npcId}` 도 Midnight 몹은 404 (예: 261552, 239167, 246404). `static-kr` 네임스페이스를 us 호스트로 부르면 403.

### 실패 목록 (journal 폴백까지 해도 이미지 없는 103개 이름 + journal 로만 해결된 10개)

journal 열이 채워진 행은 MDT displayId 는 404 이지만 journal display id 로 200 인 몹.

| 던전 | 이름 | npc id | MDT displayId | 저널 displayId (200) |
|---|---|---|---|---|
| AltarOfFangs | Ascendant Serpent | 261573 | 146299 |  |
| AltarOfFangs | Bloodletter | 261552 | 146661 |  |
| AltarOfFangs | High Evolutionist | 261557 | 146663 |  |
| AltarOfFangs | Living Venom | 263112 | 146677 |  |
| AltarOfFangs | Primal Serpent | 261560 | 146653 |  |
| AltarOfFangs | Rattling Writhe | 262011 | 146664 |  |
| AltarOfFangs | Ravenous Descendant | 261553 | 146654 |  |
| AltarOfFangs | Ritual Chieftain | 270306 | 146680 |  |
| AltarOfFangs | The Writhing Coil | 259446 | 144156 | 147556 |
| AltarOfFangs | Ula'tek's Chosen | 263109 | 147578 |  |
| AltarOfFangs | Uncoiled Writhe | 262398 | 142361 |  |
| AltarOfFangs | Uncoiled Writhe | 270417 | 142361 |  |
| AltarOfFangs | Venom Leech | 261550 | 146598 |  |
| DenOfNalorakk | Avatar of Determination | 241869 | 128095 |  |
| DenOfNalorakk | Bonded Beasttamer | 245145 | 129581 |  |
| DenOfNalorakk | Earthwhisper Tender | 241814 | 128080 |  |
| DenOfNalorakk | Frigid Mauler | 241872 | 141288 |  |
| DenOfNalorakk | Glacial Revenant | 241876 | 103213 |  |
| DenOfNalorakk | Grizzled Warbringer | 245146 | 131630 |  |
| DenOfNalorakk | Grizzled Warbringer | 245148 | 129564 |  |
| DenOfNalorakk | Loa Speaker Nanea | 244889 | 138584 |  |
| DenOfNalorakk | Ruthless Totemcaller | 245143 | 129563 |  |
| DenOfNalorakk | Spirit of Hunger | 245855 | 26857 |  |
| DenOfNalorakk | Stormbound Mystic | 245139 | 129562 |  |
| DenOfNalorakk | The Winter Squall | 250478 | 138885 |  |
| DenOfNalorakk | Thornclaw Gatherer | 241813 | 141213 |  |
| KingsRest | Animated Gold | 135406 | 88651 |  |
| KingsRest | Animated Guardian | 133935 | 83252 |  |
| KingsRest | Bloodsworn Assassin | 137485 | 85285 |  |
| KingsRest | Explosive Totem | 135764 | 84933 |  |
| KingsRest | Ghostly Brute | 135231 | 85125 |  |
| KingsRest | Honored Raptor | 135192 | 84133 |  |
| KingsRest | Interment Construct | 137969 | 85677 |  |
| KingsRest | King Rahu'ai | 134331 | 83544 |  |
| KingsRest | King Timalji | 137474 | 85272 |  |
| KingsRest | Phantom Hex Priest | 135204 | 84140 |  |
| KingsRest | Purification Construct | 134739 | 83836 |  |
| KingsRest | Queen Patlaa | 137486 | 85287 |  |
| KingsRest | Queen Wasi | 137478 | 85274 |  |
| KingsRest | Risen Hexer | 134174 | 83371 |  |
| KingsRest | Royal Berserker | 135167 | 84112 |  |
| KingsRest | Seneschal M'bara | 134251 | 83517 |  |
| KingsRest | Shadow of Zul | 138489 | 85860 |  |
| KingsRest | Shadow-Borne Champion | 134158 | 83364 |  |
| KingsRest | Spectral Shaman | 135239 | 84163 |  |
| KingsRest | Thundering Totem | 135761 | 84680 |  |
| MurderRow | Bribed Captain | 252529 | 137450 |  |
| MurderRow | Corrupted Warlock | 235265 | 124763 |  |
| MurderRow | Defiled Golem | 235322 | 137564 |  |
| MurderRow | Fel Invoker | 235268 | 124770 |  |
| MurderRow | Felmaster Lucsei | 236905 | 138787 |  |
| MurderRow | Felonious Mage | 236084 | 129784 |  |
| MurderRow | Felwyrm | 236085 | 139997 |  |
| MurderRow | Keen Taskmaster | 236897 | 136657 |  |
| MurderRow | Massive Felwyrm | 236902 | 139996 |  |
| MurderRow | Row Hooligan | 236073 | 136939 |  |
| MurderRow | Seductive Sayaad | 236082 | 77400 |  |
| MurderRow | Seductive Sayaad | 255604 | 138981 |  |
| MurderRow | Shivan Punisher | 235465 | 76712 |  |
| MurderRow | Street Sneak | 236091 | 137441 |  |
| MurderRow | Unleashed Imp | 234849 | 65901 |  |
| MurderRow | Warehouse Worker | 236893 | 136834 |  |
| MurderRow | Wild Imp | 237626 | 77406 | 77407 |
| MurderRow | Wrathguard Flayer | 235267 | 63968 |  |
| MurderRow | Xathuux the Annihilator | 234647 | 140268 | 75659 |
| RubyLifePools | Ashseer Flamelasher | 190206 | 102969 |  |
| RubyLifePools | Blazebound Destroyer | 190034 | 102505 |  |
| RubyLifePools | Blazebound Firestorm | 189886 | 102505 | 102552 |
| RubyLifePools | Defier Draghar | 187897 | 107106 |  |
| RubyLifePools | Flashfrost Chillweaver | 188067 | 107397 |  |
| RubyLifePools | High Channeler Ryvati | 197535 | 110966 |  |
| RubyLifePools | Primal Juggernaut | 188244 | 101209 |  |
| RubyLifePools | Primalist Cinderweaver | 190207 | 102886 |  |
| RubyLifePools | Storm Warrior | 197982 | 110964 |  |
| RubyLifePools | Tempest Channeler | 198047 | 110967 |  |
| TempleOfSethraliss | Barbed Krolusk | 134616 | 83787 |  |
| TempleOfSethraliss | Corrupted Guardian | 268344 | 84761 | 145816 |
| TempleOfSethraliss | Eye of Sethraliss | 240681 | 169 |  |
| TempleOfSethraliss | Faithless Subjugator | 134364 | 86510 |  |
| TempleOfSethraliss | Faithless Tormentor | 268317 | 147718 | 80960 |
| TempleOfSethraliss | Faithless Tormentor | 268729 | 147085 | 80960 |
| TempleOfSethraliss | Galvazzt | 263658 | 147355 | 81654 |
| TempleOfSethraliss | Imbued Stormcaller | 134599 | 83779 |  |
| TempleOfSethraliss | Lifeforce | 268364 | 169 |  |
| TempleOfSethraliss | Orb Watcher | 135007 | 84503 |  |
| TempleOfSethraliss | Sand-Sworn Rider | 134629 | 84761 |  |
| TempleOfSethraliss | Sandswept Hunter | 134600 | 83780 |  |
| TempleOfSethraliss | Shrouded Fang | 134602 | 83782 |  |
| TempleOfSethraliss | Static Anomaly | 134691 | 81655 |  |
| TempleOfSethraliss | Storm Serpent | 134390 | 147087 | 78247 |
| TempleOfSethraliss | Temple Disruptor | 269227 | 80961 |  |
| TheBlindingVale | Lasher | 245410 | 104473 |  |
| TheBlindingVale | Lightfeather Petalwing | 245484 | 136758 |  |
| TheBlindingVale | Lightgorged Lasher | 245345 | 125875 |  |
| TheBlindingVale | Overgrown Hydra | 245513 | 142839 |  |
| TheBlindingVale | Potadpole Egg | 249783 | 83115 |  |
| TheBlindingVale | Potatoad Matriarch | 249756 | 136026 |  |
| TheBlindingVale | Sporeblight Belcher | 254850 | 126462 |  |
| VoidscarArena | Aegyra the Unyielding | 267545 | 147378 |  |
| VoidscarArena | Agitated Voidscythe | 263228 | 138723 |  |
| VoidscarArena | Brutal Overseer | 252053 | 137329 |  |
| VoidscarArena | Brutok | 244309 | 140264 |  |
| VoidscarArena | Charonus | 239167 | 138269 | 128554 |
| VoidscarArena | Chitigoth | 244260 | 140256 |  |
| VoidscarArena | Devouring Brutalizer | 268184 | 147459 |  |
| VoidscarArena | Dominated Brawler | 238883 | 130200 |  |
| VoidscarArena | Enthralled Shaman | 241496 | 130201 |  |
| VoidscarArena | Feral Saberon | 243988 | 140041 |  |
| VoidscarArena | Kilivore Screamer | 243766 | 141196 |  |
| VoidscarArena | Lost Sethrak | 243996 | 140045 |  |
| VoidscarArena | Protective Turtle | 249603 | 140295 |  |
| VoidscarArena | Raj'kess the Spellstorm | 267546 | 147363 |  |
| VoidscarArena | Savage Shredclaw | 243835 | 141810 |  |
| VoidscarArena | Sycophantic Tarasek | 243983 | 140037 |  |
| VoidscarArena | Taz'Rah | 238887 | 140300 | 124085 |
| VoidscarArena | Voidtouched Magi | 252072 | 137330 |  |
| VoidscarArena | Watchful Harrower | 245950 | 141286 |  |

## 4. 대안: Wowhead 썸네일

`https://wow.zamimg.com/modelviewer/live/webthumbs/npc/{displayId % 256}/{displayId}.png` — 예: 129989 → `…/npc/197/129989.png`, 146661 → `…/npc/37/146661.png`. **네트워크 정책에 막힘** (`wow.zamimg.com:443` CONNECT 403). 존재 여부·핫링크 허용 여부 미확인.

## 5. 막힌 호스트

- `render.worldofwarcraft.com` (Blizzard 이미지 CDN)
- `wow.zamimg.com` (Wowhead)

(`oauth.battle.net`, `us.api.blizzard.com` 은 접근 가능)
