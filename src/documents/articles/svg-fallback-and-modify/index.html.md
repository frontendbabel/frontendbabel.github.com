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

Obviously this would be too time-consuming to do it manually and so this process should be automated, especially keeping
in mind the need of future changes.

If leave the need to synchronize changes out of account, a simple version can be built with existing grunt plugins. The
result looks wierd, but it works.

First intergration looked like this:

1. [grunt-grunticon](https://www.npmjs.org/package/grunt-grunticon) paints icons and creates their PNG versions;
1. [grunt-spritesmith](https://www.npmjs.org/package/grunt-spritesmith) generates a sprite and CSS.

It gave an interlocutory result but I was not happy with the generated CSS. It did not include colors for filling in SVG
so that I had to define them manually. Moreover, I would need to duplicate SVG source if also wanted icons of different
colors and sizes to be included into the sprite. Then, they would be renamed in a special way to make *grunticon* paint
them, and renamed again before the sprite generating.

Thus, I came up with my own grunt plug-in which main responsibility is to paint the images and create several vertions
of different colors and sizes; and to generate a library of SVG symbols + sprite + CSS while I'm at it.

This is my plugin: [svg_fallback](https://www.npmjs.org/package/svg_fallback).

*(Yes, I know that "-" would be better than "_". And I should have prefixed it with "grunt-". But this is my first
plugin. :-)*

It does the following:

1. Takes a directory with SVG images and forms a library of symbols.
1. Takes the directory again and builds the images into a sprite accomplished with CSS with filling colors, sizes and
   a background image for older browsers.

The folder name is used as a prefix for the resultant CSS classes and file names. It prevents conflicts between
different icon sets if they meet in the same page.

At the end it opens a demo page which demonstrates SVG and PNG working.

This is the simpliest scenario when no files were being modified. But the most interesting thing happens if you have
`config.json` file to initiate the transformations.
