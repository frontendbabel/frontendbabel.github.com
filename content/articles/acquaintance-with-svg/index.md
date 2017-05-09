---
title: Acquaintance with SVG images

date: 2014-07-10

source:
  name: Знакомство с SVG
  date: 2014-03-19
  url: http://css.yoksel.ru/svg/
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
    Yulya Buhvalova, a developer for LiveJournal and talented frontend dev blogger shares her
    findings on SVG; vector graphics format which is now becoming more and more popular and is peftectly
    suitable for adaptive web sites. With her introduction into scalable vector graphics for web you can
    smoothly be absorbed in the subject.

---

SVG is quite a mature technology but it began to gain its popularity just recently. Mostly due to the fact that
vector graphics perfectly suit for adaptive web sites. If you have just started to learn SVG,
here is some information you can start with.

<!-- cut -->

SVG is a vector image format that uses XML.

Specification: [w3.org/TR/SVG](http://www.w3.org/TR/SVG/)

SVG has a lot of advantages over raster graphics:

* Vector images are lossless when being scaled and look nicer with retina displays;
* Usually the size of SVG data is less than data size of PNG image with the same picture;
* The image is defined with XML so that you can open it in a text editor and see the code;
* And so you can code an image manually besides drawing it in a vector graphics editor;
* An SVG file is a source in itself. Unlike bitmaps` case you do not need a PSD file to edit the SVG image. Its layers are
  not flattened; you can always open the image source and change it. However this trick is not recommended as you may
  overwrite scripts and styles;
* You can define shadows and gradients in an SVG file; moreover, you can use them not only for this file content but
  apply to the elements from outside (although this is not supported everywhere yet);
* SVG file can contain CSS and JavaScript.

Example of SVG:

<iframe id="cp_embed_vzBxp"
src="//codepen.io/anon/embed/vzBxp?height=263&amp;theme-id=4974&amp;slug-hash=vzBxp&amp;default-tab=result"
scrolling="no" frameborder="0" height="263" allowtransparency="true" class="cp_embed_iframe" style="width: 100%;
overflow: hidden;"></iframe>

All the modern browsers support SVG and so you can already use it providing PNG alternative for previous versions.

The format is nice for adaptive design due to its capability to scale losslessly, small data size and being crisp at
devices with high pixel ratio. The next mobile screenshot demonstrates this:

![](http://img-fotki.yandex.ru/get/9809/5091629.9d/0_7fa35_27e932b6_L.jpg)
<div class="article__tip">
The sign says "Hello! :-)" in Russian
</div>

The picture clearly shows that SVG (below) looks nicer than PNG (above). So if you are to build a website with
astounding view at every device, SVG may come into play.

Nowadays you can already find a lot of websites with ready-to-use SVG images. For instance,

* [iconmelon.com](http://iconmelon.com/)
* [icomoon.io](http://icomoon.io/app/#/select)
* [flaticon.com](http://www.flaticon.com/)
* [iconmonstr.com](http://iconmonstr.com/)

Mostly they provide icon sets.

You can use the images as is or repaint them, join into a stack or sprite, or create a font.

You can paste SVG into a web page in a number of ways. They have different browser support and give various
capabilities.

### Embed/object/iframe
The content is available for external JavaScript.<br/>
It has good browser support (all but IE8 and earlier).

<table style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <td>Embed:</td>
            <td>Object:</td>
            <td>Iframe:</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><embed src="/articles/acquaintance-with-svg/sign.svg" width="199" height="200"/></td>
            <td><object type="image/svg+xml" data="/articles/acquaintance-with-svg/sign.svg" width="199" height="200"></object></td>
            <td><iframe src="/articles/acquaintance-with-svg/sign.svg" width="199px" height="200px"></iframe></td>
        </tr>
    </tbody>
</table>

#### Embed

```xml
&lt;embed src="your.svg"
        width="199" height="200">
```

#### Object

```xml
&lt;object data="your.svg"
        type="image/svg+xml" width="199" height="200"></object>
```

#### Iframe

```xml
&lt;iframe src="your.svg"
        width="199px" height="200px"></iframe>
```

Browser support:

 IE | Opera | Opera Mini | Opera Mobile | Chrome | Firefox | Safari
----|-------|------------|--------------|--------|---------|--------
 9+ |  9+   | 5+         | 10+          | 4+     | 3+      | 3.2+

### IMG

In this case the content is not available for JavaScript.

![](/articles/acquaintance-with-svg/sign.svg)

```xml
&lt;img src="your.svg"/>
```

Browser support:

 IE | Opera | Opera Mini | Opera Mobile | Chrome | Firefox | Safari
----|-------|------------|--------------|--------|---------|-------
 9+ | 9+    | 5+         | 10+          | 4+     | 4+      | 4+

### CSS background

The content is not available for JavaScript; and you can have issues with older Opera versions. Opera Mini does not
support SVG CSS backgrounds with viewBox.

<div style="width: 199px; height: 200px; margin-bottom: 1em; background-image: url(http://css.yoksel.ru/assets/img/svg/sign.svg)"></div>

```css
background-image: url(your.svg);
```

Browser support:

 IE | Opera | Opera Mini | Opera Mobile | Chrome | Firefox | Safari
----|-------|------------|--------------|--------|---------|-------
 9+ | 12+   | 5+         | 16+          | 5+     | 24+     | 5+

### Inline SVG

This is not supported by Opera Mini.

<svg width="199" height="200"><g fill="#7ED321"><path d="M110 10h-20v76.567l-.605-.605-62.933 62.933 14.142 14.142 49.395-49.395v76.358h20v-76.358l49.395 49.395 14.142-14.142-62.933-62.933-.605.605v-76.567z" /><path d="M99.5 0c-54.965 0-99.5 44.784-99.5 100s44.535 100 99.5 100 99.5-44.784 99.5-100-44.535-100-99.5-100zm0 20c43.894 0 79.5 35.805 79.5 80s-35.606 80-79.5 80-79.5-35.805-79.5-80 35.606-80 79.5-80z" /></g></svg>

Browser support:

 IE | Opera | Opera Mini | Opera Mobile | Chrome | Firefox | Safari
----|-------|------------|--------------|--------|---------|-------
 9+ | 11.6+ | -          | 12+          | 7+     | 4+      | 5.1+

The examples above are placed into this article page exactly as described. You can open the very page in another browser
and observe how SVG works there.

## Ways to deal with older browsers

### 1. Background hack

```css
DIV {
    background-image: url(your.png); /* PNG for IE6-8 */
    background-image: url(your.svg), none;
    }
```

The second `background-image` works for browsers supporting CSS3. Others ignore it and so show the PNG background.

### 2. The `image` method

Modern browsers choose `xlink:href` attribute and render SVG image; others show the bitmap.

```xml
&lt;svg width="200px" height="200px">
    &lt;image xlink:href="your.svg"
           src="your.png"
           width="200px" height="200px"/>
&lt;/svg>
```

The image trick was picked up from this post: [http://lynn.ru/examples/svg](http://lynn.ru/examples/svg/en.html). The
method was [investigated by Chris Coyier](http://css-tricks.com/svg-fallbacks/), you can find his review over the trick
and proposal of others.

That works correctly in IE8 and Opera Mini.
However it has a drawback. IE9-11 downloads all the two images although only SVG is used for rendering. Opera sometimes
has problems too. You may get the following instead of your picture:

![](http://img-fotki.yandex.ru/get/9831/5091629.9d/0_7f9f6_9033810_M.png)

### 3. Modernizr

Elements containing SVG are wrapped with `div.svg`. Then, you can detect if a browser supports SVG using
[Modernizr](http://modernizr.com/); browsers which do not understand SVG get `.no-svg` CSS class. With a piece of CSS
you can hide the SVG images for the browsers that do not render them:

```css
/* Define size and PNG background for the wrapper: */
.no-svg .svg {
  width: 200px;
  height: 200px;
  background: url(your.png); /* PNG backdrop */
  }

/* Hide elements inside the wrapper. Otherwise there would be icons of
not loaded images */
.no-svg .svg IFRAME,
.no-svg .svg OBJECT,
.no-svg .svg EMBED,
.no-svg .svg IMG {
  display: none;
}
```

This method works nicely in IE8 (and earlier IE versions). However you might have a problem with Opera Mini.
This browser provides partial SVG support and so does not get `.no-svg` CSS class whereas it cannot render SVG CSS
background and inline SVG inserts.

It is also possible to use [this
method](http://www.paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/) to detect IE.

### 4. :root

The `:root` CSS selector is only supported by browsers that understand CSS3. So it can be used to separate CSS rules
for modern and older browsers.

```css
/* Display PNG by default */
.svg {
  width: 200px;
  height: 200px;
  background: url(your.png);
}

/* Hide elements containing SVG */
.svg IFRAME,
.svg OBJECT,
.svg EMBED,
.svg IMG {
  display: none;
}

/* Show SVG containers for the browsers with CSS3 */
:root IFRAME,
:root OBJECT,
:root EMBED,
:root IMG {
  display: inline-block;
}
```

Like the previous solution this works correctly to weed out IE8 (and the aged) but does not help in Opera Mini's case
since it supports CSS3 and so the SVG containder will be switched on anyway.

### 5. Solution for Opera with Presto (version 12 or Mini)

In Opera 12 SVG backgrounds are weirdly odd. Simple CSS code, harmless at first glance, can cause render issues with
SVG backgrounds when scrolling. I was lucky to get pictures like this:

![](http://img-fotki.yandex.ru/get/9746/5091629.9d/0_7f9f8_dff062ac_L.png)

You can examine the working example here: [http://jsbin.com/winag/2/edit](http://jsbin.com/winag/2/edit)<br/>
*Open this page with Opera 12 and scroll up and down.*

Opera Mini has issues with SVG backgrounds and does not support inlined SVG at all. This is how SVG background looks
like with it:

![](http://img-fotki.yandex.ru/get/9819/5091629.9d/0_7f9f7_19c1f3e9_L.png)

For such a case you can use this *special for Opera* hack:

```css
doesnotexist:-o-prefocus, .selector {
  background-image: url(your.png);
}
```

This method uses specific Opera selector. You can learn details here:
[http://www.opera.com/docs/specs/presto2.12/css/o-vendor/](http://www.opera.com/docs/specs/presto2.12/css/o-vendor/).

### 6. Specific Opera Mini selector

```css
@media all and (-webkit-min-device-pixel-ratio:10000),
       not all and (-webkit-min-device-pixel-ratio:0) {
  .selector {
    background-image: url(your.png);
  }
}
```

## To be continued
Everything written above is just the tip of the iceberg. There is plenty of interesting in the SVG specification.
To be continued! :-)

### Further links
* [Browsers support for SVG](http://caniuse.com/#search=svg)
* [SVG Fallbacks](http://css-tricks.com/svg-fallbacks/)
* [Modernizr](http://modernizr.com/)
* [A Primer to Front-end SVG Hacking](http://dbushell.com/2013/02/04/a-primer-to-front-end-svg-hacking/)
* [SVG and <image> tag tricks](http://lynn.ru/examples/svg/en.html)
