---
layout: post
description: "Lorem Ipsum"
title: Scrum a Developer - Pred (prvým) Sprintom (2/5)
date: 2014/7/18 12:59:25
category: javascript
thumbnail : strategy
---

V pokračovaní seriálu si ukážeme, čo treba spraviť pred každým Sprintom. Ako urobiť estimation
jednotlivých User Stories, čo je povinnosťou Product Ownera a čo developerov..

<!-- more -->

---

**User Stories**

Ako prvý krok musíme celý projekt (alebo aspoň subčasť, ktorú chceme robiť najbližší mesiac)
rozbiť na malé User Stories. Každá z nich musí mať jasný popis a prípadne prílohy či screenshoty.

Každá User Story musí byť v časovom rozmedzí od pár hodín do jedného dňa (samozrejme, vytvoriť
takéto striktné pravidlo je nezmysel a neskôr si poupravujete Scrum do podoby ktorá vám sedí
najviac). Ak však trvajú User Stories dlhšie ako dva dni, niečo robíte zle.

![](http://bit.ly/1pHYW2D)

V User Story <small>(zjednodušme tento pojem a nazvime teraz User Stories všetko od bugov, features
až po changes vo funkcionalite systému)</small> musíme jasne popísať problém, aby každý developer
mohol pracovať samostatne bez ďalšej komunikácie.

Napríklad v prípade bugu musíme popísať browser, OS, device, priložiť screenshot a postup ako
zreprodukovať znova bug. V prípade nového tasku musíme priložiť design, funkcionalitu a čo považujeme
za hotový task.

---

**Priority Backlog a Product Owner**

Následnou úlohou Product Ownera je usporiadať všetky User Stories podľa priority. Keď prijíme nový
task alebo bug od zákazníka, musí sa rozhodnúť kam ho zaradiť. Možno je to vážny bug a mal by ísť dopredu.
Možno je to low priority feature a mala by ísť na koniec.

Product Owner popíše podrobne problém a vytvorí task, aby bol nutný čo najmenší zásah developera do
akejkoľvek administrácie či komunikácie. Ak sa zákazník rozhodne, že už nechce skákajúce korytnačky
[[*]](http://bit.ly/1pHZmWG) na webstránke, môže rovnako z Priority Backlog odstrániť jednotlivé User
Stories.

![](http://bit.ly/1pHYmSp)

Zjednodušene povedané. Úloha Product Ownera je prijímať všetky podnety na development, aby netravovali
developerov, a usporiadavať ich v Priority Backlogu. Product Owner nevie povedať, kedy budú hotové
jednotlivé tasky. Vie len povedať, v akom poradí sa vykonajú.

---

**Effort Estimation a Story Points**

Pred začiakom každého Sprintu musia relevatní developeri odhadnúť pracnosť jednotlivých User Stories.
Pre najobjektívnejší odhad je najlepšie použiť Planning Poker [[*]](http://bit.ly/1pfsl0g), aby sme
zabránili "odpisovaniu".

Pokiaľ nemáte Planning Poker, proste vytlačte kartičky s hodnotami "1", "2", "3", "5", "8", "13", "20",
">20" a nechajte developerov odhadnúť pracnosť. S každým novým Sprintom budú developeri vedieť odhadnúť
svoje odhady presnejšie a presnejšie.

Výsledkom tohto Estimation Meetingu by mal byť Priority Backlog s tými istými taskami, v tom istom
poradí, akurát s vyplnenou kolónkou Story Points. Túto činnosť netreba robiť pre všetky User Stories.
Stačí jeden Sprint dopredu, nakoľko tasky sa môžu pomeniť, priority tiež alebo môžu úplne zmiznúť z
Priority Backlogu.

---

**Rekapitulácia**

Čo máme teda hotové? Zákazník, marketingové oddelenie a užívatelia hovoria priamo k Product Ownerovi.
On na základe ich podnetov vytvorí User Stories a prehľadne do nich popíše problém. Nakoniec ich podľa
priority usporiada, prípadne preusporiada. Nestará sa, koľko a kedy dokončia developeri. Nestará sa kedy
budú hotové. Nedáva nikomu žiadny deadline.

Developeri sa stretnú pred každým Sprintom, zoberú najprioritnejšiu časť taskov a s pomocou čo
najobjektívnejšej metódy (napríklad s pomocou Planning Poker) sa snažia odhadnúť náročnosť taskou. Každému
tasku pridelia určitý počet Story Points po vzájomnej zhode a diskusií.

Každá User Story musí byť v rozmedzí pár hodín až dňa. Pokiaľ je dlhšia, mali by sme ju rozbiť na viaceré
menšie. Z každej User Story musí byť presne jasné, čo má developer urobiť a kedy sa považuje task za
hotový a otestovateľný.

---

**Čo v ďalšom pokračovaní seriálu?**

V ďalšom pokračovaní si ukážeme, ako odhadnúť koľko User Stories sa zmestí do jedného Sprintu. Čo je
Burndown Chart. Konečne začneme prvý Spring!

---

Autor: [[ondrek](https://twitter.com/ondrek)].