---
title: About @viewport

date: 2014-07-22

source:
  name: Про @viewport
  date: 2014-07-17
  url: http://wd.dizaina.net/internet-maintenance/about-viewport-at-rule/
  lang: ru

author:
  name: Oleg Korsunsky
  site: http://wd.dizaina.net/en/
  github: wilddeer
  twitter: wildir

translator:
  name: Varya Stepanova
  github: varya
  twitter: varya_en
  site: http://varya.me/

meta:
  desc: >
    About viewport

---

Once Opera`s guys proposed to use `@viewport { ... }` in CSS istead of `<meta name="viewport" ...>`. Regarding the
reasons
[you'd better watch and listen to @ppk](http://vimeo.com/100523275) and I will explain why you should use this
right now.

<!-- cut -->

## Proper `viewport` for Windows Phones

I've noticed long ago that websites on Windows Phones look bulky if using landscape more but never deeply thought
about the fact.

You might overlook the difference between iOS and Windows Phone views in portraite mode:

![Windows Phone 8.1](p_before-portrait.png) | ![iOS 7](p_ipod-portrait.png)
---------------------------|-------------------------
Windows Phone 8.1          | iOS 7

However in the landscape mode the enourmousness of Windows Phone view becames clear:

![Windows Phone 8.1 ](p_before-landscape.png) <br/>
Windows Phone 8.1 

![iOS 7](p_ipod-landscape.png) <br/>
iOS 7
