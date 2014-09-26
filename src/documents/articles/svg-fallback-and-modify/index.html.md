---
title: Why I wrote a plugin for Grunt to work with SVG

date: 2014-10-25

source:
  name: Зачем я написала плагин для Grunt
  date: 2014-08-25
  url: http://css.yoksel.ru/grunt-plugin/
  lang: ru

author:
  name: Yulya Buhvalova
  site: http://css.yoksel.ru/
  twitter: yoksel_en
  github: yoksel

translator:
  name: Varya Stepanova
  github: varya
  twitter: varya_en
  site: http://varya.me/

meta:
  desc: >

---
Once upona a time my colleagues and I met a need to work up a lot of SVG icons. The prerequisites: over 30
colorless SVG images (the color are defined with CSS later). The task: generate their PNG+CSS fallbacks for
the older browsers.

<!-- cut -->

These are the steps of this process:

1. Paint every icon with a color needed
1. For some icons we need more than one variant of different colors and sizes
1. Create a PNG sprite
1. Write CSS

Finally we should have 2 icon set representations: the one is the colorless PNGs, and the other one is the sprite.
The changes to these representations have to be synchronized. Ideally they should share the CSS defining their sizes
and color fillings.
