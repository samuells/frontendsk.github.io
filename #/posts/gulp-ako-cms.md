---
layout: post
description: "Potrebujeme CMS a všade dávať Wordpress kvôli jednoduchým problémom, na ktoré už dnes máme riešenie?"
title: O Gulpe ako CMS, smradľavom PHP a geniálnych Rubystoch
date: 2015/02/20
thumbnail : tools
---

Chyby boli dve. Prvou bolo, že front-end developeri by síce radi písali plnohodnotné weby, ale
keďže jQuery nekomunikuje[*][6] s databázou, mali smolu, a museli sa naučiť PHP. Druhou bolo, že PHP síce
smrdí, ale naučiť sa ho zle používať nevyžaduje veľa úsilia - a tak sa uchytilo pomerne rýchlo.

Začalo sa to nahradením funkcionality iframov pomocou PHP Include[*][5]. Následný boom Wordpressu
prakticky spôsobil, že dnes máme 80 miliónov webstránok založených na PHP a väčšina ho vôbec
nepotrebuje[*][4]. Či už hovoríme o prezentačných sajtách, formulároch alebo inteligentných hajzlových
doskách.

<br>
![](https://rawgit.com/frontendsk/resources/master/2015_langs1.png?2)
<br>

## Geniálny nápad Rubystov

Následný geniálny nápad rozšírila najmä Ruby komunita, keď v 2008 prišli s Jekyllom[*][3]. Niekto si
povedal, že kvôli tagom, templatom a pagination asi nepotrebujeme obrovskú MySQL databázu plnú reklamy
na Viagru[*][7], 80-eurový hosting a 75MB Wordpress zdrojákov, ale stačí nám päť skriptov.

Zrazu sa zistilo, že hosting môžeme nahradiť Githubom[*][8]. Že články písané cez wysiwyg a ukladané
cez SQL môžu byť jednoduché markdown súbory. Že na verzionovanie môže slúžiť Git namiesto tabuľky v
DB alebo že na jednoduché poslanie emailu stačí REST[*][9] a nepotrebujeme PHP backend.

Samozrejme pre weby na to vhodné.

## Generátory a 3984 Javascript alternatív

Ako tradične, keď je niečo sexy, Javascript komunita urobí asi 3984 alternatív. A tak nám vznikli
Assemble, Blacksmith, Broccoli Taco, Brunch, Cabin, Go-static, Harp Heckle, Hexo a iné (zoradené abecedne,
pretože všetky sú úplne rovnako nahovno)[*][2].

Nakoniec pokračovanie tejto telenovely prišlo iba minulý rok! Internet zaplavila kopa zlých alternatív
Jekyllu, pretože komunita tých 17 šikovných ľudí sa nesústredila na jednom projekte, ale začali si
hrabať na vlastnom piesočku. A tak nám vzniklo veľa zbytočných Jekyll alternatív, ktoré vlastne nič
inovatívne nepriniesli.

<br>
![](https://rawgit.com/frontendsk/resources/master/2015_langs2.png?2)
<br>

## Gulp ako riešenie a náhrada

Riešením tohto bordelu masy generátorov, ku ktorému si prišli v snahe zbaviť sa back-endu je veľmi
jednoduchý task runner - Gulp[*][10] a obyčajné Node.js pluginy ktoré nájdeme na NPM. Čo vlastne väčšinou
potrebujete na to, aby ste sa zbavili Wordpressu pre váš blog?

 1. prekopírovať súbory do build foldra[*][11]
 2. konvertnúť markdown do templatov a vyprdnúť html[*][12]
 3. minifikovať HTML/CSS/JS a prekopírovať assety[*][13]
 4. streamnuť to na localhost[*][14]

---

Done? Tomu ver. Tak funguje aj táto sajta. Neveríš? Čekni [gulpfile][1] tejto sajty ktorý ju celú
generuje. Chceš vedieť ako na to? Čekni ďalší článok!


---

Autor [[ondrek](http://twitter.com/ondrek)].


 [1]: https://github.com/frontendsk/frontendsk.github.io/blob/master/gulpfile.js
 [2]: https://www.staticgen.com/
 [3]: http://jekyllrb.com/
 [4]: http://www.wpwhitesecurity.com/wordpress-security-news-updates/statistics-70-percent-wordpress-installations-vulnerable/
 [5]: http://www.sitepoint.com/forums/showthread.php?336466-Looking-to-use-php-include-instead-of-iframe
 [6]: https://stackoverflow.com/questions/2716346/accessing-mysql-with-jquery-without-using-php
 [7]: http://blog.sucuri.net/2010/07/understanding-and-cleaning-the-pharma-hack-on-wordpress.html
 [8]: https://pages.github.com/
 [9]: https://mandrillapp.com/api/docs/
 [10]: http://blog.lmorchard.com/2014/10/20/static-blog-generation-with-gulp/
 [11]: https://www.npmjs.com/package/fs-extra
 [12]: https://www.npmjs.com/package/front-matter
 [13]: https://www.npmjs.com/package/marked
 [14]: https://www.npmjs.com/package/connect