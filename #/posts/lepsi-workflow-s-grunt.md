---
layout: post
description: "Lorem Ipsum"
title: Lepší workflow s Grunt
date: 2014/7/14 17:04:25
category: tooling
thumbnail : tools
---

Ak sa pohybuješ vo svete front-endu, tak si už pravdepodobne počul niečo o Grunte. Ale ako
to celé dostať do svojho toolsetu? A prečo vlastne? Toto je intro pre Grunt.

<!-- more -->

Či už robíš ďalší malý web alebo makáš na dlhodobejšom projekte, sú veci, ktoré sa v
dnešnej dobe oplatí robiť. Napríklad nevyvolať kvôli každej ikonke HTTP request. Neposielať
každú jednu medzeru v Javascriptoch. Používať CSS preprocesor a na webe načítavať už len
jeden skompilovaný minifikovaný file. Požiadavky narastajú, ale **kto to bude robiť**?
Grunt to bude robiť. Nižšie nájdeš krátky postup ako ho rozbehať a vytvoríš si svoj prvý
gruntfile.

---
**Ja to nepotrebujem...**

Robím iba malé weby... Aj tak to spravím niekedy na konci naraz... Je to príliš
komplikované... Nie, nie a ešte raz nie.

Grunt (tak ako aj Gulp) je synonymom pre automatizáciu. Jeden príkaz v command line za teba
spraví veľa roboty. Odporúčam vyskúšať si na prvom možnom projekte ako takú výzvu. Alebo
kľudne aj nanečisto ako v tomto článku.

---
**Chcem to!**

Na nainštalovanie Gruntu budeš potrebovať nainštalovaný Node.js a s ním node package manager
(npm). Na to slúži veľké zelné tlačidlo [tu][node]. Máš? **Super**. Môžme ísť na Grunt.

Aby si mohol používať Grunt z príkazového riadku, nainštaluješ Grunt Command Line Interface
s prepínačom -g (globálne, pre celý systém), takto:

    > npm install -g grunt-cli

---
**Vzorový projekt: minifikácia CSS**

Skúsme si zautomatizovať niečo jednoduché - ak sa v projekte zmení nejaký CSS súbor, vytvoríme
minifikované CSS.

Ako základ si vezmime napríklad html5bp a stiahnime si ho do projektového adresára:

    > git clone https://github.com/h5bp/html5-boilerplate.git gruntproject

OK, 13 MB pre náš miniprojekt máme u seba :) Čo ďalej? Grunt vyžaduje, aby sa v projekte
nachádzal package.json manifest, ktorý skrátka identifikuje náš nový projekt. Viac si o
package.json prečítaš [tu][packagejson].

    > cd gruntproject
    > npm init

NPM (node package manager) si od teba vypýta pár detailov. Vyplníš a v roote sa ti objaví
súbor package.json. Super. **Konečne môžme ísť na Grunt** :) Ten potrebuje v root adresári
ďalší súbor, tentokrát Gruntfile.js. Píšeme ručne. Je dobré sa inšpirovať na stránkach tohto
šikovného [toolu][gruntfile]. Náš nový gruntfile zatiaľ vyzerá nejak takto:

    module.exports = function(grunt) {
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
      });
    };

Než niečo začneme robiť, musíme pridať do projektu lokálny Grunt modul príkazom:

    > npm install grunt --save-dev

Náš package.json je bohatší o riadok s novou dependenciou - grunt. Overíme:

    > grunt --help

Ak sa ti z toho začína točiť hlava, tak vedz, že teraz to začne byť zaujímavé:)

---
**Pridávame do projektu Grunt moduly**

Dostali sme sa po nainštalovanie grunt modulu do nášho nového projektu. Povedali sme si,
že nám teraz pôjde o minifikáciu CSS. Sofistikovaným googlením "grunt minify css" zistíme,
že na tento task slúži modul grunt-contrib-cssmin. Neváhame a do konzoly búšime (našli sme
to v časti "Getting started" v repozitári modulu):

    > npm install grunt-contrib-cssmin --save-dev

Ak máme všetko dobre nastavené, zbehne nám inštalácia a... zatial prd z toho. Treba nám
upraviť Gruntfile! Čítame usage examples v grunt-contrib-cssmin repozitári. Ahá! Potrebujeme
definovať konfiguráciu pre tasky, ktoré chceme použiť. A loadnuť cssmin modul. Rozširujeme
náš gruntfile nasledovne:

	module.exports = function(grunt) {
	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    cssmin: { // konfig pre modul grunt-contrib-cssmin
	      minify: { // konfiguracia minify tasku
	        expand: true,
	        cwd: 'css/',
	        src: ['*.css', '!*.min.css'],
	        dest: 'css/',
	        ext: '.min.css'
	      }
	    }

	  });

	  grunt.loadNpmTasks('grunt-contrib-cssmin'); // loadneme nas modul

	};

Neohrozene testujeme náš výtvor:

    > grunt cssmin

A veru! Grunt zobral všetko s príponou .css čo našiel v css/ adresári a zminifikoval. Ešte
nám aj napísal, koľko cenných kB sme ušetrili. Paráda.

Možno si to predstavujeme trochu inak a pre našu stránku by sme chceli iba jeden výstupný
.min.css súbor - treba pozrieť usage example cssmin tasku combine.

---
**Striehneme na zmeny - watch**

Nebudem to predlžovať, dajme tomu, že .min.css chceme updatovať automaticky po zmene
niektorého z .css súborov. Na to nám slúži šikovný modul grunt-contrib-watch:

    > npm install grunt-contrib-watch --save-dev

Upravíme gruntfile:

	module.exports = function(grunt) {
	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    watch: {
          css: {
            files: ['css/*.css', '!*.min.css'],
            tasks: ['cssmin']
          }
        },

	    cssmin: { // konfig pre modul grunt-contrib-cssmin
	      minify: { // konfiguracia minify tasku
	        expand: true,
	        cwd: 'css/',
	        src: ['*.css', '!*.min.css'],
	        dest: 'css/',
	        ext: '.min.css'
	      }
	    }

	  });

	  grunt.loadNpmTasks('grunt-contrib-cssmin'); // loadneme nas modul
	  grunt.loadNpmTasks('grunt-contrib-watch');

	};

A spustíme task:

    > grunt watch

Ľahko si overíme, že po zmene v .css súbore sa nám pregenerujú minifikované verzie. Hurá!

---
***Rekapitulácia***

nainštaluj Grunt - vytvor projekt - pridaj package.json - pridaj Gruntfile (alebo skopíruj
zo starého projektu) - nainštaluj lokálne grunt modul - nainštaluj ďalšie moduly a uprav
Gruntfile - spusti task a voilá!

Nabudúce môžme skúsiť kompilovanie SASSu, css sprites či livereload. Alebo také source maps.

---
**Záverom**

Je teraz z teba lepší web developer? Ťažko. Zbavil si sa ďalšej repetitívnej činnosti,
ktorá ťa nebavila a púšťaš z pod rúk kvalitnejší výsledok? Hopefully yes.

Poznámky a pripomienky, návrhy, zdrby - [porozprávajme sa][andrzej] :)

Autor: [@andrejminarik][andrzej]


[node]: http://nodejs.org/
[packagejson]: https://www.npmjs.org/doc/json.html
[gruntfile]: http://gruntjs.com/sample-gruntfile
[andrzej]: http://twitter.com/andrejminarik