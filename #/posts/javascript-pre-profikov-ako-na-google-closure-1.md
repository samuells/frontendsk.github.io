---
layout: post
description: "Tento článok je úvodom o Google Closure v mini-seriály, ktorý bude mať štyri časti (je možné, že …"
title: Javascript pre profíkov - Ako na Google Closure (1/4)
date: 2014/05/08
thumbnail : javascript
category: javascript
---

Tento článok je úvodom o Google Closure v mini-seriály, ktorý bude mať štyri časti <small>(je možné, že ich urobím aj
desať, ale je aj možné, že sa na to úplne vyseriem po prvej časti)</small>. Je určený pre ľudí, ktorí vedia, čo je to
Javascript a robia JS-heavy aplikácie. Nie je určený ľudom, ktorí potrebujú jQuery na jednoduché DOM manipulácie.

[[MORE]]

---

**Problém**

V browrsi pri enterprise aplikáciach sa stretávame najčastejšie s týmito troma problémami: (1) debilita vývojárov
browsrov a ich neochota čítať špeficikácie pre DOM API a ECMA specs, (2) performance, minifikácia a memory leaky a
(3) readability kódu, maintenance, modularita a rozumná organizácia kódu s viacerými developermi.

---

**Google riešenie - Closure**

Päť rokov dozadu Google publikoval ich súkromnú JS library - Google Closure, ktorú používajú v takmer všetkých svojích
projektoch (Search, Gmail, Maps, Docs, Google+, Calendar...).

Jedná sa o zbierku knižníc, fallbackov a užitočných utilities pre tvorbu väčších cross-browser aplikácií (Closure je
perfektná aj na tvorbu maličkých projektov, avšak scope, ktorý potrebujete vedieť je jednoducho priveľký - nebudem
študovať 2 roky C++, ak potrebujem premenovať 10 súborov).

---

Samotná Closure sa delí na 4 standalone časti:

1. **[Closure Library][0]** je obrovská zbierka cross-browser modulov a low-level utilities od všetkého od DOM
manipulácie, komunikácie so servrom, string / date / number utilít, unit testing funkcií až po animácie. Stačí si
requirnút modul, ktorý potrebujete, a použíť ho.

2. **[Closure Compiler][1]** je advanced compiler pre JS (nie interpreter, ale compiler), ktorý, zjednodušene povedané,
na základe anotácií a konvencií a nastavení, nielen odstráni white spaces, ale kompletne transformuje váš kód na
efektívnejší, odstráni fallbacky na nesupportované browsre, pridá fallbacky na supportované, odstráni časti kódu,
ktoré by sa normálne nevykonali a milión ďalších vecí.

3. **[Closure Templates][2]** je len ďalší templatovací jazyk od Google. Mňa osobne nikdy extrémne neoslovil. Môžete
používať vašu obľubenú alternatívu a Google iba ponúka ich alternatívu. Má určité výhody, ako napríklad Java
implementáciu (a tým pádom možnosť použíť rovnaké templaty na server aj client side), XSS escaping, jednoduchú syntax ..

4. **[Closure Linter][3]** je code quality tool, ktorý si môžete pridať do vašeho IDE a dohliada na konvencie, anotácie,
chýbajúce operátory a bodkočiarky, spacing, TODOs pri commitovaní, prítomnosť anotácií pre compiler alebo JsDoc. Je
to jednoducho tool, ktorý vás donúti pred commitovaním si poopravovať chyby vo vašom kóde podľa dohodntých konvencií.
Môže byť veľmi užitočný vo väčších tímoch, ale aj sa môžete na neho úplne vykašlať.

---

**Nezávislosť**

Čo si mnoho začínajúcich developer avšak neuvedomuje, je, že Google vás netlačí do používania všetkých štyroch toolov.
Kľudne môžete používať len jeden súbor z Library. Alebo vašu obľúbenú JS knižnicu a iba Compiler. Toto je veľmi užitočná
výhoda, pretože necháva všetko na vás a môžete si nájsť svoju vlastnú cestu.

---

**Prvý krok s Library - Boilerplate**

Closure je naozaj lightweight a pre najmenšiu možnú aplikáciu potrebujeme len načítať `Base.js`, ktorý nájdeme aj na CDN:

    <!DOCTYPE html><html><head>

	    <script src="//closure-library.googlecode.com/svn/trunk/closure/goog/base.js"></script>

    </head><body></body></html>

Po načítaní stránky sa loadne Closure a ako globálna premenná `goog` a máme k nej access v celej našej aplikácií. Base
obsahuje základné funkcie a pôsobí ako bootstrap aplikácie. Získame access k metódam ako `bind`, `require`, `provide`,
`isArray`, `isDef`, `isObject`, `isNumber`, `debug`, `math`, `now`, `cloneObject` a mnohým ďaľším.

---

**Druhý krok s Library - Require a Modules**

Nakoľko sa knižnica skladá z obrovského množstva subknižníc, modulov, utilities a shims, pre každú časť, ktorú
potrebujeme použíť musíme requirnúť príslušnú časť. Napríklad pre DOM manipuláciu (poznáte z jQuery) musíme requirnúť
`goog.dom` pred váš kód.

Týmto získale prístup ku všetkým DOM API related funkciám ako `appendChild`, `contains`, `classes`, `findNode`,
`isElement`, `getWindow`, `getElementByX`, `replaceNode`, `removeNode`, ktoré môžeme poznať aj z ostatných frameworkov
ako jQuery alebo Zepto.

    <!DOCTYPE html><html><head>

	    <script src="//closure-library.googlecode.com/svn/trunk/closure/goog/base.js"></script>

	    <script>
	    goog.require("goog.dom");
	    </script>

 	    <script>
 	    var section = goog.dom.createElement("section");
 	    var childNote = goog.dom.createElement("div");
 	    goog.dom.appendChild(section, childNote);
	    </script>

    </head><body></body></html>

---

**Iné zaujímavé príklady**

Nakoľko toto je len Úvod do Closure, nebudem tu rozpisovať všetky moduly a ich použítie. Uvediem ešte jeden príklad,
ktorý hashuje string do Sha265, takže raw heslo reálne od uživateľa ani nemusí oddísť (napríklad pri registrácií alebo
prihlasovaní a nemožnosti HTTPS), ale môžete poslať rovno jednoducho hash..

    <!DOCTYPE html><html><head>

	    <script src="//closure-library.googlecode.com/svn/trunk/closure/goog/base.js"></script>

	    <script>
	    goog.require("goog.crypt");
	    goog.require("goog.crypt.Sha256");
	    </script>

	    <script>
	    var sha256 = new goog.crypt.Sha256();
	    sha256.update("secret");

	    var hashed = sha256.digest();
	    console.log("binary", hashed);
	    console.log("hex", goog.crypt.byteArrayToHex(hashed));
	    console.log("string", goog.crypt.byteArrayToString(hashed));
	    </script>

    </head><body></body></html>

---

Ďalšie fancy príklady, článok o Compiler a nejaké zaujmavejšie veci uvediem v pokračovaní. Ak ste našli chybu, niečo
som zle vysvetlil alebo podobne, píšte na twitter.

---

Autor [[ondrek](http://twitter.com/ondrek)].

 [0]: https://developers.google.com/closure/library/
 [1]: https://developers.google.com/closure/compiler/
 [2]: https://developers.google.com/closure/templates/
 [3]: https://developers.google.com/closure/utilities/