# 한글 이름 검수 보고서 (audit/unverified.json, 141개)

결과: **불일치 1** / 확인불가 8 / 일치 132

## 방법
- **접속 확인**
  - `www.wowhead.com/ko/...`: Playwright(Chromium)로 열면 `net::ERR_CERT_AUTHORITY_INVALID`(세션 프록시 인증서를 Chromium이 신뢰하지 않음). curl로 열면 **403** (CloudFront "Request blocked").
  - `https://nether.wowhead.com/tooltip/<type>/<id>?dataEnv=1&locale=1`: **200**. `locale=1`과 `locale=ko`는 한국어를 주고, `locale=9`는 이탈리아어를 줌. 공식 한글 이름은 모두 이 툴팁 API의 `name` 필드에서 읽었고, 출처 열에는 대응하는 `www.wowhead.com/ko/` 링크를 적었음.
  - wago.tools, warcraft.wiki.gg, Blizzard API, zamimg는 세션 네트워크 정책에서 403이라 쓰지 못함.
- **NPC 124개**: [MythicDungeonTools](https://github.com/Nnoggie/MythicDungeonTools) `Midnight/*.lua`에서 이름으로 NPC ID를 찾고 `tooltip/npc/ID`로 확인. 같은 이름이 ID 여러 개에 있으면 모두 확인했고, 전부 같은 한글 이름이었음.
- **던전·보스·종족**: 영어 툴팁(locale=0)으로 업적 ID 범위(12500–13600, 15800–16900, 60500–63999)를 훑어 ID를 찾은 뒤 한글 툴팁을 읽음. 우두머리 이름은 "X 처치 (던전 - 신화)" 통계 업적에서 확인. 다만 이런 통계 업적은 마지막 우두머리에만 있음.
- **확인 불가 이유**
  - 던전 도감 우두머리 이름은 Wowhead 툴팁 API에 해당 타입이 없음(`encounter` 등은 404). 그래서 마지막 우두머리가 아닌 묶음 보스(Lightblossom Trinity, Council of Tribes, Adderis & Aspix)는 우두머리 이름 자체를 확인하지 못했고, 구성 NPC 이름만 적었음.
  - 영웅 특성 트리 이름(Templar/Lightsmith)은 툴팁 API로 볼 수 있는 항목이 없음(`race`, `hero-talent-tree` 등은 "Entity type is invalid").

## 결과
| 영문 | 현재 표기 | 공식 한글 | 출처 URL | 판정 |
|---|---|---|---|---|
| Xal'atath's Guile | 잘아타스의 계략 | 잘아타스의 기만 | [affix=147](https://www.wowhead.com/ko/affix=147) | 불일치 |
| Adderis & Aspix | 애더리스와 아스픽스 | (우두머리 이름 확인 불가) 개별 NPC: 애더리스 / 아스픽스 | [npc=262530](https://www.wowhead.com/ko/npc=262530), [npc=262822](https://www.wowhead.com/ko/npc=262822) | 확인불가 (NPC 이름은 일치) |
| Council of Tribes | 부족 의회 | (우두머리 이름 확인 불가) 위와 같음 | [npc=269810](https://www.wowhead.com/ko/npc=269810) | 확인불가 |
| Curse | 저주 | (Wowhead에 따로 항목 없음) 방증: Remove Curse → 저주 해제 | [spell=475](https://www.wowhead.com/ko/spell=475) | 확인불가 (방증은 일치) |
| Lightblossom Trinity | 빛송이 삼위일체 | (우두머리 이름 확인 불가) 개별 NPC: 메이티크 / 케즈키트 / 레크쉬, 빛송이 | [npc=243028](https://www.wowhead.com/ko/npc=243028), [npc=243029](https://www.wowhead.com/ko/npc=243029), [npc=243030](https://www.wowhead.com/ko/npc=243030), [npc=244528](https://www.wowhead.com/ko/npc=244528) | 확인불가 (빛송이 NPC 이름은 일치) |
| Lightsmith | 빛의 대장장이 | (확인 불가) | — | 확인불가 |
| Primalist Flamedancer | 원시술사 불꽃무용가 | (확인 불가) MDT에 없고, npc 187890–190600 범위에도 없음 | — | 확인불가 |
| Templar | 기사단 | (확인 불가) 방증: Templar's Watch → 기사단의 주시 | [spell=431469](https://www.wowhead.com/ko/spell=431469) | 확인불가 (방증은 일치) |
| The Council of Tribes | 부족 의회 | (우두머리 이름 확인 불가) 개별 NPC: 도살자 쿨라 / 정복자 아카알리 / 현자 자나잘 | [npc=269811](https://www.wowhead.com/ko/npc=269811), [npc=269808](https://www.wowhead.com/ko/npc=269808), [npc=269810](https://www.wowhead.com/ko/npc=269810) | 확인불가 |
| Aegyra the Unyielding | 불굴의 에이기라 | 불굴의 에이기라 | [npc=267545](https://www.wowhead.com/ko/npc=267545) | 일치 |
| Agitated Nimbus | 흥분한 빛구름 | 흥분한 빛구름 | [npc=136076](https://www.wowhead.com/ko/npc=136076) | 일치 |
| Agitated Voidscythe | 동요한 공허낫 | 동요한 공허낫 | [npc=263228](https://www.wowhead.com/ko/npc=263228) | 일치 |
| Aka'ali the Conqueror | 정복자 아카알리 | 정복자 아카알리 | [npc=269808](https://www.wowhead.com/ko/npc=269808) | 일치 |
| Animated Guardian | 살아 움직이는 수호자 | 살아 움직이는 수호자 | [npc=133935](https://www.wowhead.com/ko/npc=133935) | 일치 |
| Ascendant Serpent | 승천한 뱀 | 승천한 뱀 | [npc=261573](https://www.wowhead.com/ko/npc=261573) | 일치 |
| Avatar of Determination | 결의의 화신 | 결의의 화신 | [npc=241869](https://www.wowhead.com/ko/npc=241869) | 일치 |
| Barbed Krolusk | 미늘 크롤러스크 | 미늘 크롤러스크 | [npc=134616](https://www.wowhead.com/ko/npc=134616) | 일치 |
| Blazebound Destroyer | 화염결속 파괴자 | 화염결속 파괴자 | [npc=190034](https://www.wowhead.com/ko/npc=190034) | 일치 |
| Bloodletter | 방혈뱀 | 방혈뱀 | [npc=261552](https://www.wowhead.com/ko/npc=261552) | 일치 |
| Bloodsworn Assassin | 피의 서약 암살자 | 피의 서약 암살자 | [npc=137485](https://www.wowhead.com/ko/npc=137485) | 일치 |
| Bonded Beasttamer | 결속된 야수조련사 | 결속된 야수조련사 | [npc=245145](https://www.wowhead.com/ko/npc=245145) | 일치 |
| Bribed Captain | 매수된 대장 | 매수된 대장 | [npc=252529](https://www.wowhead.com/ko/npc=252529) | 일치 |
| Brutal Overseer | 잔혹한 감독관 | 잔혹한 감독관 | [npc=252053](https://www.wowhead.com/ko/npc=252053) | 일치 |
| Brutok | 브루톡 | 브루톡 | [npc=244309](https://www.wowhead.com/ko/npc=244309) | 일치 |
| Chitigoth | 키티고스 | 키티고스 | [npc=244260](https://www.wowhead.com/ko/npc=244260) | 일치 |
| Corrupted Warlock | 타락한 흑마법사 | 타락한 흑마법사 | [npc=235265](https://www.wowhead.com/ko/npc=235265) | 일치 |
| Dazar, The First King | 초대 왕 다자르 | 초대 왕 다자르 | [achievement=12763](https://www.wowhead.com/ko/achievement=12763) (초대 왕 다자르 처치 (왕들의 안식처 - 신화)) | 일치 |
| Defier Draghar | 반항자 드라가르 | 반항자 드라가르 | [npc=187897](https://www.wowhead.com/ko/npc=187897) | 일치 |
| Defiled Golem | 더럽혀진 골렘 | 더럽혀진 골렘 | [npc=235322](https://www.wowhead.com/ko/npc=235322) | 일치 |
| Den of Nalorakk | 날로라크의 소굴 | 날로라크의 소굴 | [achievement=61643](https://www.wowhead.com/ko/achievement=61643) (신화: 날로라크의 소굴) | 일치 |
| Devouring Brutalizer | 포식하는 학대자 | 포식하는 학대자 | [npc=268184](https://www.wowhead.com/ko/npc=268184) | 일치 |
| Dominated Brawler | 지배당한 싸움꾼 | 지배당한 싸움꾼 | [npc=238883](https://www.wowhead.com/ko/npc=238883) | 일치 |
| Earthwhisper Tender | 대지교감자 뜰지기 | 대지교감자 뜰지기 | [npc=241814](https://www.wowhead.com/ko/npc=241814) | 일치 |
| Embalming Fluid | 불변의 액체 | 불변의 액체 | [npc=137989](https://www.wowhead.com/ko/npc=137989) | 일치 |
| Enthralled Shaman | 마법에 걸린 주술사 | 마법에 걸린 주술사 | [npc=241496](https://www.wowhead.com/ko/npc=241496) | 일치 |
| Explosive Totem | 폭발의 토템 | 폭발의 토템 | [npc=135764](https://www.wowhead.com/ko/npc=135764) | 일치 |
| Eye of Sethraliss | 세스랄리스의 눈 | 세스랄리스의 눈 | [npc=240681](https://www.wowhead.com/ko/npc=240681) | 일치 |
| Faithless Subjugator | 부정한 정복자 | 부정한 정복자 | [npc=134364](https://www.wowhead.com/ko/npc=134364) | 일치 |
| Faithless Tormentor | 부정한 고문관 | 부정한 고문관 | [npc=268317](https://www.wowhead.com/ko/npc=268317), [npc=268729](https://www.wowhead.com/ko/npc=268729) | 일치 |
| Fel Invoker | 지옥 기원사 | 지옥 기원사 | [npc=235268](https://www.wowhead.com/ko/npc=235268) | 일치 |
| Felmaster Lucsei | 지옥지배자 룩세이 | 지옥지배자 룩세이 | [npc=236905](https://www.wowhead.com/ko/npc=236905) | 일치 |
| Felonious Mage | 흉악한 마법사 | 흉악한 마법사 | [npc=236084](https://www.wowhead.com/ko/npc=236084) | 일치 |
| Felwyrm | 지옥지룡 | 지옥지룡 | [npc=236085](https://www.wowhead.com/ko/npc=236085) | 일치 |
| Feral Saberon | 야성 서슬니 | 야성 서슬니 | [npc=243988](https://www.wowhead.com/ko/npc=243988) | 일치 |
| Flashfrost Chillweaver | 섬광서리 한기술사 | 섬광서리 한기술사 | [npc=188067](https://www.wowhead.com/ko/npc=188067) | 일치 |
| Frigid Mauler | 혹한의 싸움꾼 | 혹한의 싸움꾼 | [npc=241872](https://www.wowhead.com/ko/npc=241872) | 일치 |
| Furious Vilefiend | 사나운 썩은마귀 | 사나운 썩은마귀 | [npc=234799](https://www.wowhead.com/ko/npc=234799) | 일치 |
| Ghostly Brute | 유령 투사 | 유령 투사 | [npc=135231](https://www.wowhead.com/ko/npc=135231) | 일치 |
| Glacial Revenant | 빙하의 망령 | 빙하의 망령 | [npc=241876](https://www.wowhead.com/ko/npc=241876) | 일치 |
| Grip | 죽음의 손아귀 | 죽음의 손아귀 (Death Grip) | [spell=49576](https://www.wowhead.com/ko/spell=49576) | 일치 (Death Grip 뜻으로 쓴 경우) |
| Grizzled Warbringer | 성난 전쟁인도자 | 성난 전쟁인도자 | [npc=245146](https://www.wowhead.com/ko/npc=245146), [npc=245148](https://www.wowhead.com/ko/npc=245148) | 일치 |
| Haranir | 하라니르 | 하라니르 | [achievement=61506](https://www.wowhead.com/ko/achievement=61506) (동맹 종족: 하라니르) | 일치 |
| High Channeler Ryvati | 고위 역술사 라이바티 | 고위 역술사 라이바티 | [npc=197535](https://www.wowhead.com/ko/npc=197535) | 일치 |
| High Evolutionist | 고위 진화술사 | 고위 진화술사 | [npc=261557](https://www.wowhead.com/ko/npc=261557) | 일치 |
| Holy Armaments | 신성한 무장 | 신성한 무장 | [spell=1289728](https://www.wowhead.com/ko/spell=1289728) | 일치 |
| Honored Raptor | 명예로운 랩터 | 명예로운 랩터 | [npc=135192](https://www.wowhead.com/ko/npc=135192) | 일치 |
| Ikuzz the Light Hunter | 빛 사냥꾼 이쿠즈 | 빛 사냥꾼 이쿠즈 | [npc=244887](https://www.wowhead.com/ko/npc=244887) | 일치 |
| Imbued Stormcaller | 마력 깃든 폭풍소환사 | 마력 깃든 폭풍소환사 | [npc=134599](https://www.wowhead.com/ko/npc=134599) | 일치 |
| Infernal | 지옥불정령 | 지옥불정령 | [npc=238414](https://www.wowhead.com/ko/npc=238414) | 일치 |
| Infused Whelp | 주입된 새끼용 | 주입된 새끼용 | [npc=187894](https://www.wowhead.com/ko/npc=187894), [npc=189893](https://www.wowhead.com/ko/npc=189893) | 일치 |
| Interment Construct | 매장된 피조물 | 매장된 피조물 | [npc=137969](https://www.wowhead.com/ko/npc=137969) | 일치 |
| Keen Taskmaster | 예리한 작업반장 | 예리한 작업반장 | [npc=236897](https://www.wowhead.com/ko/npc=236897) | 일치 |
| Keen-Eyed Striker | 눈썰미 좋은 격퇴자 | 눈썰미 좋은 격퇴자 | [npc=241816](https://www.wowhead.com/ko/npc=241816), [npc=245752](https://www.wowhead.com/ko/npc=245752) | 일치 |
| Kilivore Screamer | 킬리보어 비명꾼 | 킬리보어 비명꾼 | [npc=243766](https://www.wowhead.com/ko/npc=243766) | 일치 |
| King Rahu'ai | 왕 라후아이 | 왕 라후아이 | [npc=134331](https://www.wowhead.com/ko/npc=134331) | 일치 |
| King Timalji | 왕 티말지 | 왕 티말지 | [npc=137474](https://www.wowhead.com/ko/npc=137474) | 일치 |
| Kokia Blazehoof | 코키아 블레이즈후프 | 코키아 블레이즈후프 | [npc=189232](https://www.wowhead.com/ko/npc=189232) | 일치 |
| Kula the Butcher | 도살자 쿨라 | 도살자 쿨라 | [npc=269811](https://www.wowhead.com/ko/npc=269811) | 일치 |
| Kyrakka & Erkhart | 카이락카와 에크하트 | 카이락카와 에크하트 스톰베인 | [achievement=16085](https://www.wowhead.com/ko/achievement=16085) (카이락카와 에크하트 스톰베인 처치 (루비 생명의 웅덩이 - 신화)) | 일치 (약칭: 전체 이름의 앞부분과 같음) |
| Kystia Manaheart | 키스티아 마나하트 | 키스티아 마나하트 | [npc=234648](https://www.wowhead.com/ko/npc=234648), [npc=255050](https://www.wowhead.com/ko/npc=255050) | 일치 |
| Lasher | 덩굴손 | 덩굴손 | [npc=245410](https://www.wowhead.com/ko/npc=245410) | 일치 |
| Lightfeather Petalwing | 불빛깃털 꽃잎날개 | 불빛깃털 꽃잎날개 | [npc=245484](https://www.wowhead.com/ko/npc=245484) | 일치 |
| Lightgorged Lasher | 빛포식 덩굴손 | 빛포식 덩굴손 | [npc=245345](https://www.wowhead.com/ko/npc=245345) | 일치 |
| Lightning Serpent | 번개 뱀 | 번개 뱀 | [npc=135846](https://www.wowhead.com/ko/npc=135846) | 일치 |
| Lightwarden Ruia | 빛의 감시자 루이아 | 빛의 감시자 루이아 | [npc=245912](https://www.wowhead.com/ko/npc=245912) | 일치 |
| Living Venom | 살아있는 맹독 | 살아있는 맹독 | [npc=263112](https://www.wowhead.com/ko/npc=263112) | 일치 |
| Loa Speaker Nanea | 로아 전령 나네아 | 로아 전령 나네아 | [npc=244889](https://www.wowhead.com/ko/npc=244889) | 일치 |
| Lost Sethrak | 길 잃은 세스락 | 길 잃은 세스락 | [npc=243996](https://www.wowhead.com/ko/npc=243996) | 일치 |
| Luminous Thornmaw | 빛나는 가시아귀 | 빛나는 가시아귀 | [npc=246871](https://www.wowhead.com/ko/npc=246871) | 일치 |
| Massive Felwyrm | 거대한 지옥지룡 | 거대한 지옥지룡 | [npc=236902](https://www.wowhead.com/ko/npc=236902) | 일치 |
| Melidrussa Chillworn | 멜리드루사 칠원 | 멜리드루사 칠원 | [npc=188252](https://www.wowhead.com/ko/npc=188252) | 일치 |
| Minion of Zul | 줄의 수하 | 줄의 수하 | [npc=133943](https://www.wowhead.com/ko/npc=133943), [npc=138493](https://www.wowhead.com/ko/npc=138493) | 일치 |
| Murder Row | 죽음의 골목 | 죽음의 골목 | [achievement=62440](https://www.wowhead.com/ko/achievement=62440) (쐐기돌 영웅: 죽음의 골목) | 일치 |
| Orb Watcher | 보주 감시자 | 보주 감시자 | [npc=135007](https://www.wowhead.com/ko/npc=135007) | 일치 |
| Overgrown Hydra | 비대해진 히드라 | 비대해진 히드라 | [npc=245513](https://www.wowhead.com/ko/npc=245513) | 일치 |
| Phantom Hex Priest | 악령 사술 사제 | 악령 사술 사제 | [npc=135204](https://www.wowhead.com/ko/npc=135204) | 일치 |
| Poisonous Viper | 독성 살무사 | 독성 살무사 | [npc=135562](https://www.wowhead.com/ko/npc=135562) | 일치 |
| Potadpole Egg | 감자올챙이 알 | 감자올챙이 알 | [npc=249783](https://www.wowhead.com/ko/npc=249783) | 일치 |
| Primal Juggernaut | 원시 강력거수 | 원시 강력거수 | [npc=188244](https://www.wowhead.com/ko/npc=188244) | 일치 |
| Primal Serpent | 원시의 독사 | 원시의 독사 | [npc=261560](https://www.wowhead.com/ko/npc=261560) | 일치 |
| Primal Thundercloud | 원시 뇌운 | 원시 뇌운 | [npc=197509](https://www.wowhead.com/ko/npc=197509) | 일치 |
| Primalist Cinderweaver | 원시술사 잿불술사 | 원시술사 잿불술사 | [npc=190207](https://www.wowhead.com/ko/npc=190207) | 일치 |
| Protective Turtle | 보호의 거북 | 보호의 거북 | [npc=249603](https://www.wowhead.com/ko/npc=249603) | 일치 |
| Purification Construct | 정화 피조물 | 정화 피조물 | [npc=134739](https://www.wowhead.com/ko/npc=134739) | 일치 |
| Queen Wasi | 여왕 와시 | 여왕 와시 | [npc=137478](https://www.wowhead.com/ko/npc=137478) | 일치 |
| Radiant Spellsower | 찬란한 주문파종꾼 | 찬란한 주문파종꾼 | [npc=245336](https://www.wowhead.com/ko/npc=245336) | 일치 |
| Raj'kess the Spellstorm | 주문폭풍 라즈케스 | 주문폭풍 라즈케스 | [npc=267546](https://www.wowhead.com/ko/npc=267546) | 일치 |
| Rattling Writhe | 덜거덕거리는 격동뱀 | 덜거덕거리는 격동뱀 | [npc=262011](https://www.wowhead.com/ko/npc=262011) | 일치 |
| Ravenous Descendant | 게걸스러운 후손 | 게걸스러운 후손 | [npc=261553](https://www.wowhead.com/ko/npc=261553) | 일치 |
| Risen Hexer | 되살아난 사술사 | 되살아난 사술사 | [npc=134174](https://www.wowhead.com/ko/npc=134174) | 일치 |
| Row Hooligan | 거리 난동꾼 | 거리 난동꾼 | [npc=236073](https://www.wowhead.com/ko/npc=236073) | 일치 |
| Royal Berserker | 왕실 광전사 | 왕실 광전사 | [npc=135167](https://www.wowhead.com/ko/npc=135167) | 일치 |
| Ruthless Totemcaller | 무자비한 토템소환사 | 무자비한 토템소환사 | [npc=245143](https://www.wowhead.com/ko/npc=245143) | 일치 |
| Sand-Sworn Rider | 모래서약 기수 | 모래서약 기수 | [npc=134629](https://www.wowhead.com/ko/npc=134629) | 일치 |
| Sandswept Hunter | 모래받이 사냥꾼 | 모래받이 사냥꾼 | [npc=134600](https://www.wowhead.com/ko/npc=134600) | 일치 |
| Savage Shredclaw | 야만적인 서슬발톱 | 야만적인 서슬발톱 | [npc=243835](https://www.wowhead.com/ko/npc=243835) | 일치 |
| Seductive Sayaad | 고혹적인 세이야드 | 고혹적인 세이야드 | [npc=236082](https://www.wowhead.com/ko/npc=236082), [npc=255604](https://www.wowhead.com/ko/npc=255604) | 일치 |
| Seneschal M'bara | 사무장 음바라 | 사무장 음바라 | [npc=134251](https://www.wowhead.com/ko/npc=134251) | 일치 |
| Shadow of Zul | 줄의 그림자 | 줄의 그림자 | [npc=138489](https://www.wowhead.com/ko/npc=138489) | 일치 |
| Shadow-Borne Champion | 어둠태생 용사 | 어둠태생 용사 | [npc=134158](https://www.wowhead.com/ko/npc=134158) | 일치 |
| Shivan Punisher | 쉬반 응징자 | 쉬반 응징자 | [npc=235465](https://www.wowhead.com/ko/npc=235465) | 일치 |
| Shrouded Fang | 가려진 송곳니 | 가려진 송곳니 | [npc=134602](https://www.wowhead.com/ko/npc=134602) | 일치 |
| Spectral Shaman | 유령 주술사 | 유령 주술사 | [npc=135239](https://www.wowhead.com/ko/npc=135239) | 일치 |
| Spirit of Hunger | 허기의 영혼 | 허기의 영혼 | [npc=245855](https://www.wowhead.com/ko/npc=245855) | 일치 |
| Sporeblight Belcher | 포자역병 트림꾼 | 포자역병 트림꾼 | [npc=254850](https://www.wowhead.com/ko/npc=254850) | 일치 |
| Static Anomaly | 정전기 변형물 | 정전기 변형물 | [npc=134691](https://www.wowhead.com/ko/npc=134691) | 일치 |
| Storm Adept | 폭풍 숙련병 | 폭풍 숙련병 | [npc=134990](https://www.wowhead.com/ko/npc=134990) | 일치 |
| Storm Warrior | 폭풍 전사 | 폭풍 전사 | [npc=197982](https://www.wowhead.com/ko/npc=197982) | 일치 |
| Stormbound Mystic | 폭풍결속 비술사 | 폭풍결속 비술사 | [npc=245139](https://www.wowhead.com/ko/npc=245139) | 일치 |
| Street Sneak | 길거리 은신자 | 길거리 은신자 | [npc=236091](https://www.wowhead.com/ko/npc=236091) | 일치 |
| Sycophantic Tarasek | 아첨꾼 타라세크 | 아첨꾼 타라세크 | [npc=243983](https://www.wowhead.com/ko/npc=243983) | 일치 |
| Tempest Channeler | 폭풍우의 역술사 | 폭풍우의 역술사 | [npc=198047](https://www.wowhead.com/ko/npc=198047) | 일치 |
| Temple Disruptor | 사원 분열자 | 사원 분열자 | [npc=269227](https://www.wowhead.com/ko/npc=269227) | 일치 |
| Territorial Matriarch | 텃세하는 어미 | 텃세하는 어미 | [npc=241808](https://www.wowhead.com/ko/npc=241808) | 일치 |
| Thornclaw Gatherer | 가시발톱 채집가 | 가시발톱 채집가 | [npc=241813](https://www.wowhead.com/ko/npc=241813) | 일치 |
| Thorny Saptor | 가시 샙터 | 가시 샙터 | [npc=245473](https://www.wowhead.com/ko/npc=245473) | 일치 |
| Thundering Totem | 천둥치는 토템 | 천둥치는 토템 | [npc=135761](https://www.wowhead.com/ko/npc=135761) | 일치 |
| Twinfang Harrower | 쌍송곳니 박해자 | 쌍송곳니 박해자 | [npc=261554](https://www.wowhead.com/ko/npc=261554) | 일치 |
| Twisted Hexxer | 뒤틀린 사술사 | 뒤틀린 사술사 | [npc=136250](https://www.wowhead.com/ko/npc=136250), [npc=268491](https://www.wowhead.com/ko/npc=268491) | 일치 |
| Ula'tek's Chosen | 울라텍의 간택자 | 울라텍의 간택자 | [npc=263109](https://www.wowhead.com/ko/npc=263109) | 일치 |
| Underbrush Stalker | 수풀 추적자 | 수풀 추적자 | [npc=245339](https://www.wowhead.com/ko/npc=245339) | 일치 |
| Unleashed Imp | 해방된 임프 | 해방된 임프 | [npc=234849](https://www.wowhead.com/ko/npc=234849) | 일치 |
| Venom Leech | 맹독 거머리 | 맹독 거머리 | [npc=261550](https://www.wowhead.com/ko/npc=261550) | 일치 |
| Virid Grovekeeper | 신록의 숲감시자 | 신록의 숲감시자 | [npc=245346](https://www.wowhead.com/ko/npc=245346) | 일치 |
| Voidscar Arena | 공허흉터 투기장 | 공허흉터 투기장 | [achievement=61510](https://www.wowhead.com/ko/achievement=61510) (신화: 공허흉터 투기장) | 일치 |
| Voidtouched Magi | 공허에 물든 마법사 | 공허에 물든 마법사 | [npc=252072](https://www.wowhead.com/ko/npc=252072) | 일치 |
| Warehouse Worker | 물류 창고 일꾼 | 물류 창고 일꾼 | [npc=236893](https://www.wowhead.com/ko/npc=236893) | 일치 |
| Watchful Harrower | 감시하는 박해자 | 감시하는 박해자 | [npc=245950](https://www.wowhead.com/ko/npc=245950) | 일치 |
| Wild Imp | 날뛰는 임프 | 날뛰는 임프 | [npc=237626](https://www.wowhead.com/ko/npc=237626) | 일치 |
| Wrathguard Flayer | 격노수호병 약탈자 | 격노수호병 약탈자 | [npc=235267](https://www.wowhead.com/ko/npc=235267) | 일치 |
| Zaen Bladesorrow | 자엔 블레이드소로우 | 자엔 블레이드소로우 | [npc=234649](https://www.wowhead.com/ko/npc=234649) | 일치 |
