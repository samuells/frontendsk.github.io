---
layout: post
description: "Hashovanie vzniklo už v 90tych rokoch a články z týchto časov existujú dokonca aj v slovenčine. Aj tak …"
title: Ako správne na Security a Hashing
date: 2014/07/13
category: security
thumbnail : security

---

Hashovanie vzniklo už v 90tych rokoch a články z týchto časov existujú dokonca aj v slovenčine.
Aj tak sa však často stáva že z veľkých či malých webov leaknu plain-text hesla. Ako na to?

<!-- more -->

---

**Pre koho je tento článok a kto sú Tí Zlí**

Tento článok je venovaný ľuďom, ktorí majú prehľad v základnej terminológií, avšak nepracujú
ako full-time security analytici alebo developeri.

Na security netreba dávať pozor len kvôli teenagerom, ktorí si stiahli exploit na neupdatovaný
Wordpress, ale aj na bububu NSA-like agentúry, ktoré serú na vaše súkromie, zvedavé vlády,
konkurenčné podniky a škaredých crackerov, ktorí sa snažia predávať informácie o vašich uživateľoch
ďalej. Security nie je sranda o ktorej sa len číta v novinách.

---

**Každá jedna Hash má kolíziu - z princípu**

Na Wikipedií nájdete [(*)](https://en.wikipedia.org/wiki/Cryptographic_hash_function#Cryptographic_hash_algorithms)
informáciu **Collision = NO** čo neznamená, že niektoré Hashe nemajú kolízie, ale že neboli
zatiaľ nájdené. Na internete je mnoho článkov a blogov, ktoré opisujú hashovacie funkcie bez
kolízií. Toto je samozrejme úplny bullshit. Každá má kolíziu z princípu.

Ak vstup do hashovacej funkcie MD5 môže byť hocijaký dlhý string, ale výstup môže byť 32 miestny
HEX string - možno tušíte problém. Počet kombinácií 32 HEX stringu je len (no.. nie práve - "len")
16^32. To je obmedzené a presné a určite nie-nekonečné číslo. Relevatná otázka sa týka časovej
náročnosti a nie možnosti "či má"..

---

**Na cracknutie hashe potrebujete dlhý čas**

Toto je veľký omyl. Predpoklad pri mnohých security best practices je, že matematicky je číslo
neuveriteľne veľké a preto je to nemožné. Toto je samozrejme pravda, ale netreba ju podceňovať
a predstavovať si niekoho so svojím 2 roky starým procesorom. Často sa uvádza že "superpočítač"
by hash lámal 30 rokov, alebo aj kľudne 2000 rokov.

Najväčší známy Botnet [(*)](https://en.wikipedia.org/wiki/Zombie_(computer_science)) mal 30
miliónov Zombies. Treba podotknúť, že teoreticky môže mať najvačší neznámy kľudne 20x viac - viď
Heartbleed - nie vždy všetko vieme. Pokiaľ sa do crackovania netušiac pustí 30 miliónov ľudí a
teoreticky by skúšali kombinácie 30M krát rýchlejšie .. bola by to pravdepodobne otázka pár dní.

Čo ak by našli kolíziu skôr? Facebook má miliardu uživateľov, čo ak by sa namiesto "iba" 30
miliónov pustila do crackovania nevedomky celá miliarda? Samozrejme sa jedná o teoretické,
zatiaľ nepravdepodobné a stašideľné sci-fi.

---

**Rainbow Tables a Lookup Tables cracking**

Pokiaľ máte systém zabezpečený proti brute-force [(*)](https://en.wikipedia.org/wiki/Brute-force_attack)
a rovnako aj proti dictionary attack [(*)](https://en.wikipedia.org/wiki/Dictionary_attack)
ALEBO pokiaľ je heslo uživateľa dostatočne dlhé a komplikované:  najjednoduchším riešením
ostáva použít svoju alebo nejakú online dostupnú predgenerovanú tabuľku s hashami
[(*)](https://en.wikipedia.org/wiki/Dictionary_attack#Pre-computed_dictionary_attack.2FRainbow_table_attack).

Samozrejme ak vôbec hashujete niektoré údaje.

Je dôležité si uvedomiť, že pri crackovaní hashu nepotrebujeme nájsť heslo. Musíme hľadať
iba string, ktorý (vďaka hash kolízií) má rovnaký hash, ako vaše heslo. Čo je vďaka Birthday
paradox [(*)](https://en.wikipedia.org/wiki/Birthday_problem) oveľa jednoduchšie, ako by sa
to mohlo zdať. Špeciálne, pokiaľ ukladáte Hash bez použitia nejakej Salt
[(*)](https://en.wikipedia.org/wiki/Salt_(cryptography)).

Pokiaľ však Salt používate a je to konštanta (čo vo väčšine prípadov býva - viď Wordpress),
neuchráni vás to od predgenerovania custom Lookup table. Jednoducho si namiesto MD5 tabuľky
predgenerujeme MD5+Salt tabuľku.

Celá táto pseudo ochrana spočíva v domnení: (1) že niekto, kto vám vie hacknúť databázu nemá
prístup aj k Salt; (2) že niekomu aspoň zabránite použiť už existujúce predgenerované tabuľky
a (3) že pre dlhší string je ťažšie nájsť kolíziu (táto časť je naozaj pravda). Stále však nie
cool riešenie.

---

**Custom nekonštantná Salt**

Trošku lepšia Salt je popritom celý čas prítomná - samotné raw heslo. Pokiaľ zahashujeme
`MD5( MD5("heslo")+"heslo" )` docielime zaujímavý fakt:

Nakoľko je každé jedno heslo najprv hashované v MD5 a potom je k tejto hash pridané ešte raz
toto heslo, v druhom kroku vlastne hashujeme string dlhý 32 hex znakov plus dĺžka hesla.

     myPassword = "secret"
     MD5(myPassword) // 52cff4dcc2cf38939833903882cf99
     MD5("52cff4dcc2cf38939833903882cf99"+myPassword)

Útočník musí prísť na kolíziu veľmi dlhého stringu a zároveň musí riešiť oveľa komplexnejší
problém: nájsť kolízny string, ktorého MD5 hash spolu znovu s týmto stringom má opäť kolíziu
(dvakrát kolízia po sebe).

---

**Nepoužívajte MD5 a iné already cracknuté hashe**

Pokiaľ viete, že konkrétna hash má známych priveľa kolízií, najjednoduchší spôsob ako vylepšíť
tento nedostatok je použíť inú. Nie sme odsúdení na jednu hashovaciu funkciu. Všetky MD4, MD5,
SHA 0/1/2 majú už dokázané praktické alebo teoretické kolízie
[(*)](https://en.wikipedia.org/wiki/Cryptographic_hash_function#Cryptographic_hash_algorithms).

Výborným riešením je hociktorá hash zo SHA-3 alebo (moja obľúbená) RIPEMD-160. Alebo najlepšie
ich kombinácia. Použitie SHA3-512 produkuje 128 znakov (v HEX) znakov dlhý reťazec. RIPEMD-160
len 40 znakov dlhý reťazec.

    hashed = SHA3-512("a")
    // 9c46dbec5d...f73ba01c7c

    hashed = RIPEMD160(hashed)
    // e97bf7a17fe0c6367642946a5aa8e824be0e5f7d

Aj keby v budúcnosti niekto našiel aj kolízie SHA3 aj kolízie RIPEMD vykonateľné v reálnom čase,
stále ich musí skombinovať pre nájdenie vašej kolízie.

---

**Príklad princípu spomenutého hashovania**

     myPassword = "secret"
     mySalt = "30933903903"
     hashed = SHA512(myPassword+mySalt)
     hashed = SHA512(hashed+myPassword)

---

**Nikdy netrimujte string!**

Mnohokrát sa stáva, že developera, ktorý navrhuje security napadne orezať výslednú hash na
menej znakov. Napríklad, ak máme výslednú hash 32 znakovú, môžeme ju orezať len na 10 znakov
a "nikto nikdy nepríde na to aká bola pôvodne, pretože tie znaky sú nenávratne stratené".

Toto je síce veľmi pravdivý výrok, problém je, že ak orežete hash na 10 znakov, zvýšite
možnosť nájsť kolízny string tak drasticky, že to bude trvať pravdepodobne pár minút. Prečo?

      string1st = "3983398";
      string2nd = "0202922";

      MD5(string1st); // 2deb000b57bfac9d72c14d4ed967b572
      MD5(string1st); // 2deb000b574eac9d7296c1d7b572bf4d

      // v tomto kroku nemajú žiadnu kolíziu
      // ale je relatívne veľká šanca nájsť pôvodné heslo

      MD5(string1st).substr(0, 10); // 2deb000b57
      MD5(string1st).substr(0, 10); // 2deb000b57

     // v tomto kroku sa môžeme prihlásiť s druhým heslom
     // avšak áno, šanca nájsť pôvodne heslo je nižšia
     // pretože máme mrte stringov, ktoré by to mohli byť

Nerobte to.

---

**Client-side hashing**

Ak nemáte na stránke HTTPS a nehashnujete heslo už client-side, ohrozujete tým užívateľa.
Pritom do veľmi veľa aplikácií sa dnes ani len neprihlásite bez Javascriptu. Knižnica CryptoJS
[(*)](https://code.google.com/p/crypto-js/) rovnako ako aj stovka ďalších implementácií ponúka
možnosť zašifrovať password už vo formulári.

Potrebujete podporovať aj užívateľov s vypnutým Javascriptom? Potom podporujte obe možnosti
a vložte do svojho FORM napríklad hidden input, ktorý sa prepne iba ak užívateľ má JS alebo
dostatočne supportovaný browser.

---

**Zlaté pravidlo security = Nemajte tajomstvá**

Pokúste sa robiť architektúru vašich aplikácií tak, ako keby boli dostupné na Githube. Nestavajte
svoje riešenia na heslách, Salts, tajomstvách alebo záhadných postupoch a poradiach jednotlivých
funkcií, ale snažte sa pochopiť security a robiť ju tak, aby ste ju kľudne mohli celú publikovať
na firemnom blogu a stále bola neprekonateľná.

Samozrejme, hovoríme o best practices a nie pravidle, že teraz máte svoje heslo k vašej DB a
S3 publikovať na nete ;)

---

Autor: [[ondrek](https://twitter.com/ondrek)].