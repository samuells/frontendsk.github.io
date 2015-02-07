---
layout: post
description: "Lorem Ipsum"
title: NOOP a Javascript
date: 2014/9/20 12:49:12
category: javascript
thumbnail : javascript
---

NOOP (alebo No Operation) znamená v programovaní inštrukciu, ktorá robí absolútne nič.
A práve preto je zaujímavá. Prečo by niekto využíval také inštrukcie a načo je dobré ich poznať?

<!-- more -->

---

**Swollorexic sample**

NOOP sa zvyčajne odstráni kompilátorom alebo minifierom v nejakom stepe, ešte pred vykonávaním
programu. Používa sa v teoretickej informatike a v zložitejších algoritmoch.

Može to byť napríklad semicolon, ktorý nič neukončuje, volanie prázdnej funkcie alebo setovanie
properties na JS primitívy ako string, number alebo boolean:

    ; // alebo {} alebo "" alebo veľa iných
    emptyFn(); // definovaná ako emptyFn = function(){}

    false["foo"] = "hello"; // lebo primitíva nemôže mať property
    "abc"["foo"] = "hello";
    12345["foo"] = "hello";

.. aj keď existuje samozrejme mnoho iných príkladov.

---

**jQuery.noop()**

Aj samotné jQuery má funkciu `noop`, ktorú môžete použiť, keď potrebujete "pohodiť okolo funkciu,
ktorá nič nerobí", ako hovorí oficiálna dokumentácia ([*][1]).

Predstavili ju kvôli memory leaku pri používaní XMLHttpRequest v starších IEčkach ([*][2]) a neskôr
sa začala používať interne aj pri `ajax`, `offset` alebo `modules`.

---

**Na čo sa to používa?**

Používa sa napríklad pri meraní času alebo rôznych performance issues, kedy potrebujeme presne jednu
inštrukciu, ktorá trvá čo najmenší časový úsek. Napríklad dvojbodka `;` v prázdnom riadku sa vykoná
približne **jeden a pol miliardy krát za sekundu**. Okolo 90 miliárd krát za minútu. Následne teda
vieme porovnávať voči niečomu, čo je naozaj takmer tik procesora.

NOOP sa používa napríklad aj v polyfille na defaultný `bind`, ktorý môžete nájsť na stránke MDN ([*][4])
o `Function.prototype.bind` .. je nazvaná v terajšej implementácií ako `fNOP` a implementovaná ako
`fNOP = function () {}` ..

---

Autor článku je [[Samuel Ondrek](https://twitter.com/ondrek)].


 [1] : https://api.jquery.com/jquery.noop/
 [2] : http://www.ilinsky.com/articles/XMLHttpRequest/#bugs-ie-leak
 [3] : http://bit.ly/1qTKPYH
 [4] : http://mzl.la/1v2VZZr