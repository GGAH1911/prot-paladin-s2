# Mob image URL audit (round 2)

Goal: settle on one appearance image URL for every mob (bosses included) named in the cheat sheet.

## Scope
- Source: MythicDungeonTools, commit `7fd7672` (cloned 2026-09-26), `Midnight/` files AltarOfFangs, TheBlindingVale, DenOfNalorakk, MurderRow, VoidscarArena, KingsRest, RubyLifePools, TempleOfSethraliss. Together they list 260 NPC entries.
- In scope: the NPCs whose name matches a key of `KO_NAMES` in `index.html`. That is **182 NPC entries under 172 names**, plus **Flame Channeler** (npc 197985), for **173 names** total.
- `KO_NAMES` has 255 keys. The other 83 are not NPC names in these files (spells, zones and similar) and are out of scope.

## Access check
| Endpoint | Result |
|---|---|
| `https://wow.zamimg.com/modelviewer/live/webthumbs/npc/240/144112.png` | **HTTP 200**, `image/png` (48,574 B) |
| `https://render.worldofwarcraft.com/us/npcs/zoom/creature-display-144110.jpg` | **HTTP 200**, `image/jpeg` (30,977 B) |
| A nonexistent ID on Wowhead (`…/npc/255/999999.png`) | 404 `text/html`, so there is no fallback image and a 200 means the image really exists |
| A nonexistent ID on Blizzard (`creature-display-999999.jpg`) | 403 `application/xml` |
| `nether.wowhead.com/tooltip/npc/{id}` | Reachable, but **has no display ID field** (bosses only carry a journal icon) |
| `www.wowhead.com/npc={id}` page | Reachable. The display ID comes from `WH.Wow.ModelViewer.showLightbox({type:1,typeId,displayId})` |
| Blizzard OAuth + `journal-encounter` (static-us) | Worked (token not printed or stored) |

Neither host is blocked by the network.

## Method
1. For each NPC: MDT displayId, plus the displayId(s) parsed from its Wowhead NPC page. The two **matched for every NPC that had both**, with no mismatches. Flame Channeler's Wowhead displayId is 110969. Eye of Sethraliss and Lifeforce have no model viewer on Wowhead.
2. A: `wow.zamimg.com/modelviewer/live/webthumbs/npc/{d%256}/{d}.png` (fall back to `.jpg` on failure).
3. B: `render.worldofwarcraft.com/us/npcs/zoom/creature-display-{d}.jpg`, for the MDT displayId and, for bosses, `journal-encounter/{encounterID}` `creatures[].creature_display.id`.
4. A check passes on HTTP 200 with `image/*`. Every successful image was then downloaded to check its hash and dimensions: no two URLs returned identical bytes. Requests were spaced 0.15–0.4 s apart.
5. Pick order: Wowhead > Blizzard. When one name maps to several NPCs, the representative is the first in MDT order.

## Coverage
| Item | Count |
|---|---|
| Total (names) | **173** |
| Wowhead thumbnail picked | **171** |
| Blizzard image picked (no Wowhead) | **0** |
| Total with an image | **171** |
| No image | **2** |
| (Reference) Names where Blizzard also succeeded | 70 / 173 |

- Wowhead A: all 183 NPC checks (182 + Flame Channeler) returned `.png` 200. `.jpg` fallback was never needed.
- Blizzard B: 82 of 192 checks returned 200. The other 110 returned 403. Success is **scattered, not tied to a displayId range**: both old (76k) and new (147k) IDs appear among successes and failures. Blizzard is fine as a backup only.
- The Blizzard journal display IDs sometimes differ from MDT: Rav'i and The Writhing Coil → 145435 (the Zul'jan model); all five Murder Row bosses → 75659, because the encounter has a single creature. These are encounter-level representative models, not per-NPC ones, so they are not good for per-mob images.

## Mobs without an image
| Name | npc | MDT displayId | Reason |
|---|---|---|---|
| Eye of Sethraliss | 240681 | 169 | Display 169 is a generic legacy placeholder model (a pile of rocks). Wowhead and Blizzard both return 200, but it is **not the mob's appearance**, so it was rejected and set to `null`. There is no Wowhead model viewer for it either. |
| Lifeforce | 268364 | 169 | Same as above (likely an object or invisible NPC) |

Rejected URL for reference: `https://wow.zamimg.com/modelviewer/live/webthumbs/npc/169/169.png`

## Image size and aspect examples
| Mob | Source | URL | Size | Aspect | Bytes |
|---|---|---|---|---|---|
| Rav'i | Wowhead | `https://wow.zamimg.com/modelviewer/live/webthumbs/npc/238/144110.png` | 300×300 | 1:1 | 44,474 B |
| Nalorakk | Wowhead | `https://wow.zamimg.com/modelviewer/live/webthumbs/npc/197/129989.png` | 300×300 | 1:1 | 76,959 B |
| Savage Shredclaw | Wowhead | `https://wow.zamimg.com/modelviewer/live/webthumbs/npc/242/141810.png` | 300×300 | 1:1 | 10,136 B |
| Minion of Zul | Wowhead | `https://wow.zamimg.com/modelviewer/live/webthumbs/npc/23/76055.png` | 300×300 | 1:1 | 9,851 B |
| Flame Channeler | Wowhead | `https://wow.zamimg.com/modelviewer/live/webthumbs/npc/121/110969.png` | 300×300 | 1:1 | 62,170 B |
| Rav'i | Blizzard | `https://render.worldofwarcraft.com/us/npcs/zoom/creature-display-144110.jpg` | 600×600 | 1:1 | 30,977 B |
| The Golden Serpent | Blizzard | `https://render.worldofwarcraft.com/us/npcs/zoom/creature-display-84202.jpg` | 600×600 | 1:1 | 21,645 B |

- Wowhead thumbnails are **300×300 PNG (1:1)**, almost all RGBA (170 of 171 with alpha; 1 palette PNG). The background is transparent or white.
- Blizzard zoom images are **600×600 JPG (1:1)** with no alpha.
- Framing varies a lot. For example, the Savage Shredclaw model takes up only a small part of the center, and Minion of Zul renders as a gray silhouette. When displaying them, use `object-fit: contain` and consider cropping.

## Output
- `mob-images.json`: `{ "<English name>": {"npc", "img", "src"} }`, 173 entries.
