---
title: Why I wrote a plugin for Grunt to work with SVG

date: 2014-10-30

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
    The task: paint over 30 colorless SVG icons and generate their PNG+CSS fallbacks for the older
    browsers. This could take ages manually and is significantly fast with 'svg_fallback' grunt plugin
    by @yoksel_en.

---
Once upon a time my colleagues and I met a need to work up a lot of SVG icons. The prerequisites: over 30
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

First integration looked like this:

1. [grunt-grunticon](https://www.npmjs.org/package/grunt-grunticon) paints icons and creates their PNG versions;
1. [grunt-spritesmith](https://www.npmjs.org/package/grunt-spritesmith) generates a sprite and CSS.

It gave an interlocutory result but I was not happy with the generated CSS. It did not include colors for filling in SVG
so that I had to define them manually. Moreover, I would need to duplicate SVG source if also wanted icons of different
colors and sizes to be included into the sprite. Then, they would be renamed in a special way to make *grunticon* paint
them, and renamed again before the sprite generating.

Thus, I came up with my own grunt plugin which main responsibility is to paint the images and create several versions
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

This is the simplest scenario when no files were being modified. But the most interesting thing happens if you have
`config.json` file to initiate the transformations.

For example, you can define a default color to paint the icons:

```js
{
    "color": "orangered"
}
```

Currently the plugin can paint transparent icons only.

Another case: you need icons of different size than is used for the source SVG. The resultant sizes can also be defined
in the config:

```js
{
    "default-sizes": {
        "heart": {
            "width": "182"
            },
        "home": {
            "height": "42"
        }
    }
}
```

The SVG images are size agnostic but this setting is needed to generate corresponding PNG icons and CSS for them.

This is how you can make several versions of the same icon:

```js
{
    "icons": {
        "heart": [{
            "width": "50"
        }, {
            "color": "green"
        }, {
            "width": "150",
            "color": "steelblue"
        }],
        "home": [{
            "width": "150"
        }, {
            "width": "170",
            "color": "teal"
        }, {
            "height": "62",
            "color": "yellowgreen"
        }]
    }
}
```

As a result you will get `heart.svg` file and its modifications: `heart--w50.svg`, `heart--green.svg` and `heart--w150--steelblue.svg`.

The configuration can be also defined at once:

```js
{
    "color": "orangered",
    "default-sizes": {
        // default sizes
    },
    "icons": {
        // icon versions
    }
}
```

The result would be 3 files named as the parent directory. For example, the content of `myicons/` folder turns into:

* `myicons.svg` — library of symbols;
* `myicons.png` — sprite;
*  `myicons.css` — CSS with icons sizes and colors for SVG.

Then, to use these icons in you page, you need:

1. Link `myicons.css` file to the HTML.
1. Place `myicons.svg` icon library in the beginning of the document (right after the `<body>` tag).
1. Insert icons with code like this:
```xml
&lt;svg xmlns="http://www.w3.org/2000/svg" class="myicons myicons--heart">
    &lt;use xlink:href="#myicons--heart">&lt;/use>
&lt;/svg>
```
*If you will use a single `<use/>` tag instead of pair `<use ...></use>`, you risk to loose HTML5 markup in older
browsers. Thanks to [@mista_k](https://twitter.com/mista_k) for this information.*

Older browsers show a PNG fallback according to this CSS:

```css
.ie8 .myicons {
    background-image: url(noconfig.png);
    }
```

This assumes that your page is marked with `.ie8` CSS class which detects the current IE version.

For better understanding on how it all works, install the package and have a look into `svg_fallback/test/` folder.

While developing this plugin I decided to wrap code for modifying the files into a separate [svg-modify](https://www.npmjs.org/package/svg-modify)
package. It can be used in grunt with [grunt-svg-modify](https://www.npmjs.org/package/grunt-svg-modify).

Now I have even 2 plugins :-) They are very specific and cannot become extremely popular, but if you need to modify
SVG icons, they will help you to save time.

If you want to use them, keep in mind that [svg-modify](https://www.npmjs.org/package/svg-modify) is going to be
developed (I want it to be more smart about colors). I sometimes find and fix bugs in the plugins, so they are not very
stable yet but I try to support.

Moreover, [svg_fallback](https://www.npmjs.org/package/svg_fallback) was written for a particular task. You probably would
like to change the file naming or CSS syntax. This plugin does not allow such tuning but you can fork it and modify.

Also, I should say that my JS skills could be better; so my code can look strangely to some of you. I will appreciate
a piece of advice on how to improve it.

Great thanks to [@mista_k](https://twitter.com/mista_k) and [@alexeyten](https://twitter.com/alexeyten) for their help
and advice.
