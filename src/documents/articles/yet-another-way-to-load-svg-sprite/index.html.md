---
title: Yet another way to load SVG sprite

date: 2016-04-25

source:
  name: Ещё один вариант загрузки набора SVG-изображений
  date: 2014-07-23
  url: https://noteskeeper.ru/1168/
  lang: ru

author:
  name: Vladimir Kuznetsov
  site: https://noteskeeper.ru
  twitter: mista_k
  github: mistakster

translator:
  name: Varya Stepanova
  github: varya
  twitter: varya_en
  site: http://varya.me/

meta:
  desc: >
    Vladimir Kuznetsov suggests a clever way to link SVG sprite to HTML pages so that the sets can be cached as other
    static files. This technique also perfectly works for IE.

---

In our company, we experimented with inlining SVG icons. Then, we discovered that browsers consider the ways
of linking SVG set into a page differently. However, we would like to have a universal and stable method which works the
same way in all the browsers, which support SVG.

Finally, we came up with the following algorithm.

1. Transfer SVG file into a string and store it in a variable in JavaScript.
1. Include the gotten JavaScript file in the bundle of all needed JavaScript files. Then, link this
bundle in `<head>` section.
1. Before the first usage of SVG, create an empty placeholder element and insert SVG-string into it.

This way, we achieved that our SVG set is cacheable as any other static file. Also, this is a workaround for linking
an external SVG file in IE.

<!-- cut -->

Let me explain all the steps in detail.

## Converting SVG into JavaScript

This is a perfect task for Grunt.

```js
grunt.registerTask('elements', 'Transform a SVG sprites to a JS file',
  function () {
    var LINE_LENGTH = 100, svg = [], i, l, content;

    content = grunt.file.read('assets/images/elements.svg');
    content = content.replace(/'/g, "\\'");
    content = content.replace(/>\s+</g, "><").trim();
    l = Math.ceil(content.length / LINE_LENGTH);

    for (i = 0; i < l; i++) {
      svg.push("'" + content.substr(i * LINE_LENGTH, LINE_LENGTH) + "'");
    }

    grunt.file.write('assets/_/js/elements.js',
      'var SVG_SPRITE = ' + svg.join('+\n') + ';');
  }
);
```

This code transforms `assets/images/elements.svg` into `assets/_/js/elements.js` file.

## Concatenation

The gotten `elements.js` file should be linked in the `<head>` section. However, most likely you have some
more JavaScript files to be loaded in the beginning. You can concatenate them and so decrease the amount of HTTP
requests to a server.

### Delivering to the page

It is important that the sprites appear on the page before they are used. Let's add an empty element to the page:

```html
<div id="elements-placeholder"
  style="border: 0; clip: rect(0 0 0 0); overflow: hidden;
    margin: -1px; padding: 0; position: absolute;
    width: 1px; height: 1px;"></div>
```

This placeholder is needed for safe DOM tree modification while the page is loading. It must have a unique id. Also,
I added some more styles to prevent broken image.

Now, you can fulfill the placeholder:

```html
<script>document.getElementById("elements-placeholder").innerHTML = SVG_SPRITE;</script>
```

## Notes
1. The generated JavaScript file saves the SVG string as a global variable. I suggest not to pollute the global context
and use [module approach](https://github.com/mistakster/app-skeleton#defaults).
2. In my Grunt task, the file names are hard coded. It is reasonable to re-write it as a configurable process. Especially
if you have several SVG sets at your project.

## Demo

In our company GitHub, there is a [template project](https://github.com/graph-uk/assemble). From its code, you can learn
how the described idea works in practice.
