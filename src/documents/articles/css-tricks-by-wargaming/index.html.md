---
title: Some CSS tricks; or what we do on our Naked Fridays

date: 2014-08-11

source:
  name: Подборка полезных CSS рецептов, или чем мы занимаемся на голых пятницах
  date: 2014-06-27
  url: http://habrahabr.ru/company/wargaming/blog/198138/
  lang: ru

author:
  name: Paul King
  site: http://habrahabr.ru/company/wargaming/

translator:
  name: Varya Stepanova
  github: varya
  twitter: varya_en
  site: http://varya.me/

meta:
  desc: >
    About viewport

---
Our development department has a very nice tradition. Every 2 weeks we hold Naked Friday; this is a little conference
where we share interesting knowledge gotten during our work. As a result, we have a lot of such information by now and
so we decided to publish them.

Thus, let me introduce a set of fascinating CSS and HTML tricks, which we hope are not yet well-known. We will be happy
if everyone learn something new!

<!-- cut -->

## Align a block in center and middle

The often solution to this problem is to put a block into 50% position horizontally and vertically with `top` and `left`
properties and then shift it back with negative margins. However there is more accurate and less known trick.

```css
{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```

![](img/center-middle.jpg)

If you set a position not for an image but for a block, you need to declare its width and hight.

This trick is not working for IE7 but I hope you gave it up long ago :-)

## Cut off long lines with ellipsis

This is quite a mature property (works in IE6!), however it was officially included inly in CSS3 standard. It is not
very often used, so we consider that not everyone is familiar with it.

```css
.text-overflow {
    white-space: nowrap;       /* No line breaks */
    overflow: hidden;          /* Hide text which does not fit the block */
    text-overflow: ellipsis;   /* Cut off with ellipsis */
    display: block;            /* Works only for block elements */
}
```

<p data-height="268" data-theme-id="7780" data-slug-hash="AoFsc" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/varya/pen/AoFsc/'>AoFsc</a> by Varya Stepanova (<a href='http://codepen.io/varya'>@varya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

You can define block width, but by default it is as wide as its parent block. So, ellipsis is shown if the block
is wider than its container. This works only for single lines.

## Blocks with dependant width

Let's say you want to have a sidebar.

```html
&lt;aside class="panel">
    ...
&lt;/aside>
&lt;div class="content">
    ...
&lt;/div>
```

And the main content width depends only on the sidebar width. How do you do this without declaring width? There is the way out!

```css
.content {
    overflow: hidden;
}
.panel {
    float: right;
    width: 20%;
}
```

![](img/block-width.jpg)

As you can see `overflow: hidden` solves the problems.

## Elliptic corners

Only a few know (or at least not may use) that `border-radius` property accepts not 4 but 8 parameters; 2 per corner.
