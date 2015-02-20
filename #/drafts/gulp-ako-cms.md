---
layout: post
description: "Potrebujeme CMS a všade dávať Wordpress kvôli jednoduchým problémom, na ktoré už dnes máme riešenie?"
title: Gulp ako CMS (alebo Ako konečne zabiť PHP)
date: 2015/02/20
thumbnail : tools
---


Problém bol jednoznačný: PHP smrdelo. Front-end developeri by síce radi robili plnohodnotné weby,
ale pretože jQuery nevedelo komunikovať s databázov a nedalo sa použiť na servri - boli stratení.

Po statických iframových weboch spred 15 rokov, niekto prišiel s PHP ktoré sa rozšírilo ako správa,
že kamarátov bratrancov švagrov pes bývajúci na Zápotôčkoch v Prievidzi ma 2 pozvánky do Dribbble.
Vďačíme za to najmä deficitu konkurencie, ktorá by nemala learning krivku ako Haskell.

<br>
![](https://rawgit.com/frontendsk/resources/master/2015_langs1.png?2)
<br>

Všetko by bolo v poriadku, keby sa Wordpress nezačal používať na všetko. Na prezetančné sajty, ktoré
zbúchate za tri hodiny. Odosielanie formulára. Eshopy. Ako base každého blogu… Nakoniec to prerásto
do fanatizmu kde 75 miliónov sájt je závyslých od CMS, ktoré malo viac bugov ako Windows ME.

---

## Riešenie? 3984 frameworkov!

Keďže Javascript komunita je stabilná asi ako 3G sieť v Tatrách - vrhne sa na každú aspoň trošku
fancy ideu ktorá príde. Niektoré z nich vystrelia (ako NPM), niektoré skôr či neskôr začnú
umierať (ako Meteor alebo Angular).

<br>
![](https://rawgit.com/frontendsk/resources/master/2015_langs2.png?2)
<br>

Jedno z riešení problému neschopnosti písať backend bolo geniálne a muselo prísť skoro ráno. Jednoducho
ho celý vymazať a prestať používať. Však načo.

Ako potom ale vyriešiť všetky tie 3 cool veci, kvôli ktorým sme platili 80 eurový hosting, plnili
MySQL reklamou na Viagru a sťahovali 75MB PHP a 3rd party pluginov? Odpoveď bola - 40 riadkovým skriptom.
Prvý s tým vo veľkom prišli Rubisty.

V 2008 začali Jekyll, ktorý zoberie vaších 30 blogov a hodí ho do templatu. Popri tom niekde dohodí
aktuálny čas, pagination a nejaké tagy. A hľa! Blog je na svete.

Ako tradične, keď je niečo sexy, Javascript komunita urobí asi 3984 alternatív. A tak nám vznikli
assemble, blacksmith, broccoli taco, brunch, cabin, go-static, harp. heckle, hexo (zoradené abecedna,
pretože všetky sú rovnako nahovno).







---

Autor [[ondrek](http://twitter.com/ondrek)].