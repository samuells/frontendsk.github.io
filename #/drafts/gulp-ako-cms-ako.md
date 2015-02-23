---
layout: post
description: "Ako vytvoriť jednoduchý blog bez CMS a len s jedným toolom? Gulp nám prináča odpoveď!"
title: Ako vytvoriť jednoduchý blog s Gulpom
date: 2015/02/20
thumbnail : tools
---

V predošlom [článku][1] sme si povedali krátku bájku o tom, ako sme v priebehu 15 rokov nahradili
iframe za 3984 Javascript builderov statických sájt. Keďže prehlasujem že v súčastnosti je Gulp to
najlepšie čo môžeme použiť na generovanie statického blogu, poďme si ukázať aj "ako".

## Akú štruktúru má mať náš blog

To samozrejme záleži od samotného blogu. Pre zjednodušenie si poďme urobiť stránku rovnakú ako táto.
Potrebujeme teda dve miesta. Prvé, kde budeme mať "raw" súbory - teda markdown file, templaty a ostatné,
z ktorých bude generované. Druhé, kde budeme mať vygenerované súbory. Potrebujem taktiež folder
pre CSS v builde a ak chceme použiť preprocesor (ktorý mi nevyužívame tu, ale v príklade bude) taktieť
tento folder.

```
raw/posts/my_article_1.md
raw/posts/my_article_2.md
raw/posts/my_article_3.md
raw/pages/contact.md
raw/pages/about.md
raw/templates/index.html
raw/templates/page.html
raw/templates/post.html
```

akú štruktúru bude mať náš vygenerovaný blog?

```
raw/…
post/my_article_1/index.html
post/my_article_2/index.html
post/my_article_3/index.html
about/index.html
contact/index.html
index.html
```

Autor [[ondrek](http://twitter.com/ondrek)].


 [1]: https://frontend.sk/b/gulp-ako-cms/