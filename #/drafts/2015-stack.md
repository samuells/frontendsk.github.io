---
layout: post
description: "Máme na Slovensku šikovných designérov? Kde ich nájsť? Kto sú to? Pripravili sme pre vás zoznam …"
title: 5 vecí, ktoré ste doteraz v Developer tools neobjavili
date: 2014/4/27
category: design a ux
thumbnail : design
---

Takmer každý týždeň sa mi podarí v Chrome Developer tools nájsť fičúru, na ktorú pozerám s otvorenými ústami a vravím
si "… aj toto devtools dokážu?!" Dnes to bude developerský výber zopár mojich obľúbených.

1. Všímaj si aj šedý text

Pri ladení performance stránok poskytujú devtools zaujímavú a pomerne skrytú informáciu. Na Network tabe je v záhlaví
tabuľky v tĺpci s veľkosťou a časom aj druhá informácia - o skutočnej veľkosti obsahu a latency - oneskorení.

image

Prvá info nám hovorí o tom, ako dobre je nastavená kompresia na serveri. Čím väčší je rozdiel medzi Size (stiahnutá
veľkosť) a Content (skutočná veľkosť obsahu), tým viac by naša pozornosť mala smerovať k nastaveniu gzipovania.

Šedý čas v Time stĺpci zasa označuje, koľko z celkového času tvorilo iba čakanie. Odstránenie takýchto problémov chce
už naštudovať viac o HTTP.

2. Nie každý console je .log()

Nasledovné sa vysvetlí samo - stačí copy&paste do konzoly ;)

console.info('Pri informacii sa zobrazi ikonka s i');
console.error('Cerveny error');
console.warn('Warning oznacuje zlta farba');
console.table([['a','b','c','d','e'],['f','g','h','i','j','k']]); //moj momentalny favorit :)
Pomocou console.table() sa dajú krásne vypisovať aj objekty. Priceless.

image

3. Formát farieb podľa chuti

Pri inspectovaní elementu sa v tabe Styles zobrazujú farby v takom formáte, v akom sa nachádzajú v stylesheete -
napríklad #222, #28ADE6 či rgb(40, 173, 230).

Nielenže môžeš shift-clickom priamo na farebný štvorček prepínať formáty (HEX / RGB / HSL), dokonca si v nastaveniach
devtools môžeš zadať tvoj preferovaný formát. Odteraz sa ti farby budú zobrazovať v ňom.



4. Pretty print, please!

Minifikované súbory skriptov a stylesheetov sú bez ďalších úprav nečitateľné. Pretty print - nenápadná ikonka zložených
zátvoriek v tabe Sources - je odpoveďou na tento problém.




5. Stovky zariadení v jednom

Poznáte ten obrázok I heard you want to be a web developer? Nové verzie Chrome pekne vylepšili emuláciu mobilných
zariadení:

voľba zariadenia (od iPhone po Kindle)
simulácia rýchlosti siete - ako sa váš web načítava na GPRS? Skvelá vec!
resoution aj pixel ratio
emulácia touch screen
emulácia geolocation koordinátov


(Už dnes vo vašom Chrome - ak nie, stiahni Chrome Canary)

Bonus

A ešte chuťovka - poznáš spôsob ako najjednoduchšie vypísať do konzoly nejaký element? Zoznám sa, dolár_nula:

na tabe Elements vyznač myšou napr <div class=​"row page js_page"></div>​
prepni sa do konzoly a napíš $0
voilá


To je nateraz všetko, no určite nie všetko, čo Developer tools ponúkajú. Máš ďalšie tipy? Tweetni s hashtagom
#frontendsk a mention @andrejminarik

---

Autor [[ondrek](http://twitter.com/ondrek)].