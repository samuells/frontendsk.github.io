---
layout: post
description: "Ako vytvoriť jednoduchý blog bez CMS a len s jedným toolom? Gulp nám prináša odpoveď!"
title: Ako vytvoriť jednoduchý blog s Gulpom
date: 2015/03/03
---

V predošlej [bájke][1] sme si porozprávali o tom, ako sme sa dostali za posledných pätnásť rokov od
iframov až po 3984 Javascript builderov static sájt. Keďže prehlasujem, že v súčasnosti je Gulp ten
top tool, ktorý môžeme použiť - poďme si ukázať ako na to!

## Akú štruktúru má mať náš blog?

To samozrejme záleží od samotného blogu. Pre zjednodušenie ale budeme robiť sajtu rovnakú ako táto.
Potrebujeme dve veci. Miesto na "raw" súbory ako markdowny, templaty a iné z ktorých bude generované …


```
raw/blogs/my_article_1.md   « blogy
raw/blogs/my_article_2.md
raw/blogs/my_article_3.md
raw/pages/contact.md   « pages
raw/pages/about.md
raw/templates/index.html   « templaty
raw/templates/blog.html
raw/templates/page.html
raw/index.md
```

… a potom druhé miesto kam budeme generovať. Plus samozrejme miesto na bordel ako package.json,
humans.txt, robots.txt, readme.md, CNAME pre Github alebo .gitignore …

```
gulpfile.js   « tu skryjeme tasky a spustíme ako "gulp"
package.json   « tu definujeme packages pre generovanie
README.md
raw/…   « odtiaľto budeme generovať
```

A akú štruktúru bude mať náš vygenerovaný blog?

```
about/index.html   « tu sa nám vygenerovala page
contact/index.html
gulpfile.js
package.json
blog/my_article_1/index.html   « tu máme blogy
blog/my_article_2/index.html
blog/my_article_3/index.html
README.md
raw/…
index.html  « tu je index, ktorý zbehol cez template
```

Nakoľko si browser sám doplní cestu k defaultnému menu indexu, nemusíme ho explicitne referencovat,
a v blogu môžeme ako linky použiť iba nasledujúce URI:

```
site.com/blog/my_article_1/
site.com/blog/my_article_2/
site.com/blog/my_article_3/
site.com/about/
site.com/contact/
```

## Aké Gulp tasky potrebujeme?

Budeme potrebovať pluginy na markdown, kopírovanie, samotný Gulp, vami preferovaný templatovací
jazyk, prípadne CSS preprocesor. Ak chceme aj streamovať na localhost, prípadne nejaký Connect.

```
{
  "devDependencies": {
    "gulp": "^3.8.10",
    "gulp-front-matter": "^1.2.1",
    "gulp-marked": "^1.0.0",
    "gulp-rename": "^1.2.0",
    "gulp-util": "^3.0.3",
    "path": "^0.11.14",
    "swig": "^1.4.2",
    "through2": "^0.6.3",
    "rimraf": "*",
    "run-sequence": "^1.0.2"
  }
}
```

Plus samotné tasky pre Gulp, ktoré postupne píšeme do gulpfile. Pre poradie môžeme použíť node
plugin runSequence, aby sme sa vyhli callbackom, promisom a eventom …

```
gulp.task("default", function(cb){

	runSequence(
		[ "clean_build" ],
		[ "parse_pages", "parse_blogs", "parse_index" ],
		[ "minify_html", "minify_css" ],
		[ "github_deploy", "commit_git", "send_email ]
	cb);

});
```

Prvý z nich bude odstraňovať staré súbory po poslednom builde, ktoré ideme nahradiť novými …

```
gulp.task("clean_build", function(cb){
	var rmrf = require("rimraf");
	rmrf.sync("./blog");
	rmrf.sync("./about");
	rmrf.sync("./contact");
	cb();
});
```

Teraz potrebujeme tu naozaj dôležitú časť nášho blogu - a to samotný obsah. Nemusí byť striktne
písaný v markdowne, ale pre tento príklad je najjednoduchší.

```
---
description: "Toto je krátky description, ktorý môžeme použíť"
layout: post
title: Môj super blog title
date: 2015/02/28   « toto môžeme použíť neskôr vnútri blogu
thumbnail : design   « thumbnail môžeme použíť pre open graph
---

Toto je text prvého *super* blog postu!
```

… a ešte jeden pre nejakú page …

```
---
layout: page   « na základe tohto použijeme príslušný template
title: O nás
description: "Tento text nájdete v meta tagu na podstránke O Nás"
---

# Ahoj **ľudia**! Toto je page O Nás!
```

… kde ako template môžeme použiť napríklad Swig, čo je Jinja-like templatovací engine pre node.js a
funguje úplne rovnako ako všetky ostatné templatovacie enginy.


```
<!DOCTYPE html><html><head>

    <meta charset="utf-8" />
    <title>{{ page.title }}</title>
	<meta name="description" content="{{ page.description }}" />

</head><body>

	<img src="thumbnails/{{ page.thumbnail }}.png" />
    {% block content %}{% endblock %}

</body></html>
```

Pre takéto krásne templaty a markdown súbory prebehneme custom Gulp task, ktorý nám zoberie všetky
markdown súbory, vyparsuje nám z nich hlavičku, ktorú voláme Front Matter, potom ich stemplatuje do
HTML a nakoniec ich vloží do layoutu v Swigu.

```
gulp.task("parse_blogs", function(){

	return gulp.src("./#/posts/*.md")   « nájdi všetky markdown súbory blog
		.pipe(frontMatter({property: "page", remove: true}))   « vyparsuj hlavičky a odstráň ich
		.pipe(marked())   « zbehni zvyšok cez markdown parser
		.pipe(applySwigTemplate("./#/templates/blog.html"))   « aplikuj template pre blogy
		.pipe(rename(function(path){   « premenuj z "blog_1.md" na "blog_1/index.html"
			path.extname = ".html";
			path.dirname = path.basename;
			path.basename = "index";
		}))
		.pipe(gulp.dest("/blog/"));   « ulož do build foldra

});

var applySwigTemplate = function(templateFile){

	var tpl = swig.compileFile(path.join(__dirname, templateFile));

	return require("through2").obj(function(file, enc, cb){
		var data = { content: file.contents.toString(), page: file.page};
		file.contents = new Buffer(tpl(data), "utf8");
		this.push(file);
		cb();
	});

};
```

Rovnakým štýlom zbehneme aj parser pre posty, nielen blogy.

## Kde môžem vidieť naozajstný blog alebo príklad?

Napríklad si môžem pozrieť [túto][2] prezentáciu, po ktorej bol napísaný tento článok (slidy boli
použité ako podklad). Alebo si môžete pozrieť Github [repo][3] github/frontendsk na ktorom sídli aj
táto stránka, ktorá je generovaná cez Gulp. Je však marec 2015, takže ak sem prídete o rok neskôr,
je veľmi pravdepodobné, že sa proces zmení a už nebude aktuálny. Bol by som teda opatrný.

---

Autor [[ondrek](http://twitter.com/ondrek)].


 [1]: /b/gulp-ako-cms/
 [2]: https://www.youtube.com/watch?v=v18asVwyJpg
 [3]: https://github.com/frontendsk/frontendsk.github.io