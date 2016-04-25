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

During our experiments with inlining SVG icons at our company, we discovered that browsers responded to linking SVG set into a page differently. However, we would like to have a universal and stable method, which works in all the browsers with support SVG.

Trials and errors led us to this scenario:
to some variable in a variable in JavaScript.
1. Add the JavaScript file in the bundle of all JavaScript files. Then, link this
bundle in `<head>` section.
1. Before the first usage of SVG add an empty element (placeholder) and insert  the content of SVG-string here.

Thus, we achieved the caching of SVG pictograms similar to how it happens to other static files. Also, we overcame a problem of linking
an external SVG file in IE.

<!-- cut -->

I'll describe our steps in details.

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

The `elements.js` file should be linked in `<head>` section. Sure, you've got few more scripts to be loaded at the beginning of the page. You can bundle them to decrease the amount of HTTP requests to the server.

### Adding on page

It is important for sprites to be inserted on the page before their first usage. So, let's add an empty placeholder element.

```html
&lt;div id="elements-placeholder"
  style="border: 0; clip: rect(0 0 0 0); overflow: hidden;
    margin: -1px; padding: 0; position: absolute;
    width: 1px; height: 1px;">&lt;/div>
```

You need a placeholder to safely modify DOM tree in the loading process. It has to have a unique id. I included some inline styles to prevent broken image effect in case if countors accidentally turn up outside of `<defs>`.

Fill the placeholder:

```html
&lt;script>document.getElementById("elements-placeholder").innerHTML = SVG_SPRITE;</script>
```

## Notes
1. In my case, to ease the building a JS file, I assume the creation of a global variable `SVG_SPRITE`. However, to espace the pollution of global context, I suggest saving the SVG string into the application namespace. See more at [module approach](https://github.com/mistakster/app-skeleton#defaults) page.
2. File names are hard coded in my Grunt task. It makes sense to re-write it as a configurable process, especially
if you have a range of SVG sets in your project.

## Demo

We've got a [template project](https://github.com/graph-uk/assemble) at our company's GitHub. You can check it out to get detailed overview of this method.
