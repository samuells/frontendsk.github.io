---
layout: post
description: "Lorem Ipsum"
title: Javascript pre profíkov - Ako na Google Closure (2/4)
date: 2014/7/4 15:24:25
thumbnail : javascript
category: javascript
---


A je tu pokračovanie najčítanejšieho (a teda jediného) seriálu v slovenčine o Closure! Tento
diel bude stručným vysvetlením prototype štruktúry a jedhoduchého introduction do architektúry.


<!-- more -->

---

**OOP prístup a DOM manipulácia**

Vytvorme si pomocnú classu pre DOM manipuláciu, ktorú budeme používať vždy, keď potrebujeme pracovať
s akýmkoľvek elementom skrz celou aplikáciou a zazvyme tento boilerplate Sprite v našom objekte `lib`
v ktorom máme viacero užitočných utilít.

Sprite bude mať ako prvý parameter element: čo môže byť string ako "div", "section" alebo iný validný
názov tagu, avšak bude akceptovať aj samotné Element, Node a Window... alebo bude prázdny a vráti tým
pádom DIV:

    goog.provide("lib.Sprite");
    goog.require("goog.events.EventTarget");
    goog.require("goog.dom");

    lib.Sprite = function(element, properties, content){

        properties = properties || {};

        if (!element || goog.typeOf(element)==="string"){
            element = element || "div";
            element = goog.dom.createDom(element, properties);
        } else {
            goog.dom.setProperties(element, properties);
        }

        // môžeme potrebovať neskôr
        this.element = element;

        goog.base(this);

    };

    // vysvetlené neskôr v texte
    goog.inherits(lib.Sprite, goog.events.EventTarget);

Tento začiatok classy ma viacero výhod. Nielen že môžeme pridávať na prototype v budúcnosti mutator
methods (rozšíriť o custom settre a gettre pre špecifické funkcionality), podedili sme funkcinalitu
`EventTarget` z Closure knižnice, ale aj jednoducho vytvoríme nový DOM element s custom properties
a contentom.

    new lib.Sprite();
    // vytvorí DIV classu obohatenú o EventTarget

    new lib.Sprite("span", {}, "hello world");
    // vytvorí SPAN element s custom textom

    new lib.Sprite("h1", { id : "title" });
    // vytvorí nadpis s custom IDčkom, id

Do druhého parametra properties môžeme vložiť style, class, for, id, alebo aj zastaralé html tagy ako
cellpadding, width a mnohé iné. Tretí parameter samozrejme akceptuje obsah, ktorý môžeme urobiť aj
ako innerHTML nad elementom.

---

**WTF je EventTarget**

Táto classa nám pridá kompletný support pre capture/bubble funcionalitu, stop event propagation
a prevent default. Rovnako aj metódy ako `listenOnce`, `unlistenByKey `, `getListeners` a ďalšie,
ktoré si môžete nájsť v Closure dokumentácií, takže môžete z fleku použíť:

    var mojDiv = new lib.Sprite();

    mojDiv.listenOnce("click", function(){
        console.log("skús kliknúť druhýkráť");
    });

Samozrejme, toto nie je povinné. Je to len skvelý príklad zdedenia funkcionality eventov na DOM elementy,
tam kde je potrebná a bude naozaj všade kompatibilná.

---

**Rozšírenie prototypu našej lib.Sprite**

Pravdepodobne budeme chcieť aj nejaké custom metódy ako `setContent`, `getAttributes`, `setAttributes`,
`setPrefixedStyle`, `addChildren`, `addClasses` a podobné, ktoré budeme mať ako funcie na prototype,
takže v budúcnosť ich môžeme rozšíriť bez toho aby sme si rozbili už existujúcu funkcionalitu ;)

Ak sme však dostatočne kreatívni, môžeme si vytvoriť napríklad classy na validáciu, maximálne počty inputov,
analytics uživateľského správania, hashovanie pri vytvorení type=password inputu a podobne..

    // podobne samozrejme môžeme vytvoriť getContent, hasContent, ..
    lib.Sprite.prototype.setContent = function(content){
        this.element.innerHTML = content;
    };

    // podobne môžeme vytvoriť setA, hasA, alebo takzvané data-atribúty
    lib.Sprite.prototype.getAttribute = function(attributeName){
        return this.element.getAttribute(attributeName);
    };

    // kde ako styleRule môže isť object viacerých atribútov vďaka Closure
    lib.Sprite.prototype.setStyle = function(styleRule, value){
        goog.style.setStyle(this.element, styleRule, value);
    };

---

**Používanie Sprite v praxi**

Vytvorme si nový file ktorý bude requirovať:

    // provide name nemusí byť totožné s menom funkcie
    // je však dobré mať minimálne hierarchické mená, ktoré si pamätáme
    goog.require("lib.Sprite");

Povedzme, že sme si implementovali všetky metódy, ktoré sme potrebovali a ktoré súvisia priamo
s našou appkou. Použitie môže vyzerať nasledovne:

    var buttonGroup = new lib.Sprite("form");
    var saveButton = new lib.Sprite("button", {}, "Save form");
    buttonGroup.addChild(saveButton);


    saveButton.addClass("active");

    saveButton.on("clicked", function(){
        saveButton.removeClass("active");
        saveButton.removeFromDom();
    });

Alebo že chceme vytvoriť špeciálny typ inputov, ktorý bude mať vlastné validácie, odosielať sa priebežne
na server a ukladať do cookies:

    goog.provide("lib.FormInputs");
    goog.require("lib.Sprite");

    lib.FormInputs = function(...){};

    // pridá validácie pre menu
    lib.prototype.currencyValidation = function(...){};

    // zväčší každé prvé písmeno slova na Capital
    lib.prototype.capitalize = function(...){};

    // vrátí true, iba ak input text je končí špecifickým slovom
    lib.prototype.endsWith = function(...){};

    goog.inherits(lib.FormInputs, lib.Sprite);

...

---

Všetok tento kód je písaný vrámci ľahšieho pochopenia, takže samozrejme nefunguje na prvýkrát a nemôžete
ho len pastnúť do konzoly. Je naozaj jednoduchšie napísať tri bodky namiesto parametrov, pretože to šetrí
čas a rozšíri predstavivosť..