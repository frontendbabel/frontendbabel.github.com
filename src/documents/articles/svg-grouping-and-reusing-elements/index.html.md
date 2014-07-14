---
title: SVG: Grouping and Re-using Elements

date: 2014-07-14

source:
  name: SVG: группировка и переиспользование элементов
  date: 2014-03-22
  url: http://css.yoksel.ru/svg-groups-use/
  lang: ru

author:
  name: Yulya Buhvalova
  site: http://css.yoksel.ru/
  twitter: yoksel_en
  github: yoksel

translator:
  name: George Gritsouk
  github: gggritso
  twitter: gggritso
  site: http://gggritso.com/

meta:
  desc: >
    Yulya Buhvalova, talks about using SVG features like `<g>`, `<def>` and `<symbol>` to make SVG elements
    more organized and easy to re-use.

---

SVG-figures can be grouped to structure a file in more convenient manner. There are several tags for this purpose:
`<g>`, `<defs>` and `<symbol>`. Elements, element groups and symbols can be used repeatedly.

<!-- cut -->

## g

The `<g>` tag serves for grouping figures semantically, for maintaining a transparent document structure.
Groups of elements can be used repeatedly.

<svg width="275" height="100">
  <!-- Group 1  -->
  <g id="to-sun">
    <circle fill="purple" r="20" cx="25" cy="25"/>
    <circle fill="crimson" r="20" cx="70" cy="25"/>
    <circle fill="red" r="20" cx="115" cy="25"/>
    <circle fill="orange" r="20" cx="160" cy="25"/>
    <circle fill="gold" r="20" cx="205" cy="25"/>
    <circle fill="yellow" r="20" cx="250" cy="25"/>
  </g>
  <!-- Group 2 -->
  <g id="to-night">
    <circle fill="greenyellow" r="20" cx="25" cy="70"/>
    <circle fill="yellowgreen" r="20" cx="70" cy="70"/>
    <circle fill="green" r="20" cx="115" cy="70"/>
    <circle fill="steelblue" r="20" cx="160" cy="70"/>
    <circle fill="darkviolet" r="20" cx="205" cy="70"/>
    <circle fill="purple" r="20" cx="250" cy="70"/>
  </g>
</svg>

```xml
&lt;svg width="275" height="100">
  &lt;!-- Group 1  -->
  &lt;g id="to-sun">
    &lt;circle fill="purple" r="20" cx="25" cy="25"/>
    &lt;circle fill="crimson" r="20" cx="70" cy="25"/>
    &lt;circle fill="red" r="20" cx="115" cy="25"/>
    &lt;circle fill="orange" r="20" cx="160" cy="25"/>
    &lt;circle fill="gold" r="20" cx="205" cy="25"/>
    &lt;circle fill="yellow" r="20" cx="250" cy="25"/>
  &lt;/g>
  &lt;!-- Group 2 -->
  &lt;g id="to-night">
    &lt;circle fill="greenyellow" r="20" cx="25" cy="70"/>
    &lt;circle fill="yellowgreen" r="20" cx="70" cy="70"/>
    &lt;circle fill="green" r="20" cx="115" cy="70"/>
    &lt;circle fill="steelblue" r="20" cx="160" cy="70"/>
    &lt;circle fill="darkviolet" r="20" cx="205" cy="70"/>
    &lt;circle fill="purple" r="20" cx="250" cy="70"/>
  &lt;/g>
&lt;/svg>
```

Groups, like figures, can be given fills and strokes. The style will work for figures inside groups, which
don't have their own style:

<svg width="170" height="50">
  <!-- Red Figures -->
  <g id="to-sun" fill="tomato">
    <ellipse rx="30" ry="10" cx="25" cy="25"
             transform="rotate(-45 25 25)"/>
    <ellipse rx="30" ry="10" cx="105" cy="25"
             transform="rotate(-45 105 25)"/>
  </g>
  <!-- Blue Figures -->
  <g id="to-sun" fill="skyblue">
    <ellipse rx="30" ry="10" cx="65" cy="25"
             transform="rotate(45 65 25)"/>
    <ellipse rx="30" ry="10" cx="145" cy="25"
             transform="rotate(45 145 25)"/>
  </g>
</svg>

```xml
&lt;svg width="170" height="50">
  &lt;!-- Red Figures -->
  &lt;g id="to-sun" fill="tomato">
    &lt;ellipse rx="30" ry="10" cx="25" cy="25"
             transform="rotate(-45 25 25)"/>
    &lt;ellipse rx="30" ry="10" cx="105" cy="25"
             transform="rotate(-45 105 25)"/>
  &lt;/g>
  &lt;!-- Blue Figures -->
  &lt;g id="to-sun" fill="skyblue">
    &lt;ellipse rx="30" ry="10" cx="65" cy="25"
             transform="rotate(45 65 25)"/>
    &lt;ellipse rx="30" ry="10" cx="145" cy="25"
             transform="rotate(45 145 25)"/>
  &lt;/g>
&lt;/svg>
```

Groups don't work like included elements in HTML, but more like groups of elements in visual editors.

Groups don't show themselves visually, but can be used for grouping operations on their contents: it's possible
to apply transformations for a group of elements, with no need to move each one, it's possible to set a visual
theme to the whole group at once; all the elements inside the group inherit the given style. Additionally, properties
of the group are added to the inner elements, without overwriting their own ones. For example, if an element has a red
fill, but the group has a green one — the fill of the element remains red.

For an element to inherit the visual properties of the group, it can't have properties of its own.

## defs

The `<defs>` tag acts as a library of elements and effects, which can be used later. The contents of the tag
are not shown on the page.

<svg width="200" height="200">
  <!-- Hidden container for effects and figures -->
  <defs>
    <!-- Group of gradients -->
    <g>
      <linearGradient id="g1" x1="0%" y1="0%" x2="90%" y2="90%">
        <stop stop-color="crimson" offset="0%"/>
        <stop stop-color="gold" offset="100%"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="90%" y2="90%">
        <stop stop-color="yellowgreen" offset="0%"/>
        <stop stop-color="green" offset="100%"/>
      </linearGradient>
    </g>
    <!-- Group of figures, not shown on the page -->
    <g>
      <circle fill="url(#g1)" r="50" id="sun"/>
      <rect width="200" height="70" id="rect" fill="url(#g2)"/>
    </g>
  </defs>

  <!-- Usage of the figures -->
  <use xlink:href="#sun" x="120" y="60"/>
  <use xlink:href="#rect" x="0" y="110" transform="rotate(10 100 110)"/>
</svg>

```xml
&lt;svg width="200" height="200">
  &lt;!-- Hidden container for effects and figures -->
  &lt;defs>
    &lt;!-- Group of gradients -->
    &lt;g>
      &lt;linearGradient id="g1" x1="0%" y1="0%" x2="90%" y2="90%">
        &lt;stop stop-color="crimson" offset="0%"/>
        &lt;stop stop-color="gold" offset="100%"/>
      &lt;/linearGradient>
      &lt;linearGradient id="g2" x1="0%" y1="0%" x2="90%" y2="90%">
        &lt;stop stop-color="yellowgreen" offset="0%"/>
        &lt;stop stop-color="green" offset="100%"/>
      &lt;/linearGradient>
    &lt;/g>
    &lt;!-- Group of figures, not shown on the page -->
    &lt;g>
      &lt;circle fill="url(#g1)" r="50" id="sun"/>
      &lt;rect width="200" height="70" id="rect" fill="url(#g2)"/>
    &lt;/g>
  &lt;/defs>

  &lt;!-- Usage of the figures -->
  &lt;use xlink:href="#sun" x="120" y="60"/>
  &lt;use xlink:href="#rect" x="0" y="110" transform="rotate(10 100 110)"/>
&lt;/svg>
```

## symbol

A symbol is a group of figures, all part of a single whole. Like a `<def>`, not shown on the page, and like
the `<g>`, can be used again. Inside a symbol is a new coordinate system.

<svg width="240" height="170">
  <defs>
    <g>
      <circle fill="gold" r="30" id="yellowball"/>
    </g>
    <!-- Symbol Description -->
    <symbol id="mouth">
      <polyline points="15 15 5 10 15 5" stroke="crimson" fill="none" stroke-width="3"/>
    </symbol>
    <!-- Symbol Description -->
    <symbol id="bird">
      <g stroke="brown">
        <polyline points="0 0 0 25" stroke-width="3" transform="translate(25 100)"/>
        <polyline points="0 0 0 25" stroke-width="3" transform="translate(45 100)"/>
        <polyline points="0 0 12 0" stroke-width="3" transform="translate(19 125)"/>
        <polyline points="0 0 12 0" stroke-width="3" transform="translate(40 125)"/>
      </g>
      <use xlink:href="#mouth" x="83" y="35"/>
      <use xlink:href="#yellowball" x="90" y="55" transform="scale(.75)"/>
      <use xlink:href="#yellowball" x="35" y="75" width="100"/>
      <polyline points="55 70 45 90 20 80" stroke="orange" stroke-width="3" fill="none"/>
      <circle fill="black" r="5" cx="75" cy="35"/>
      <circle fill="gray" r="1" cx="77" cy="35"/>
    </symbol>
  </defs>

  <!-- Symbol Usage -->
  <use xlink:href="#bird" x="15" y="15"/>
  <!-- Using the symbol again, flipping horizontally -->
  <use xlink:href="#bird" x="0" y="35" transform="translate(225 -20) scale(-1,1)"/>
</svg>

```xml
&lt;svg width="240" height="170">
  &lt;defs>
    &lt;g>
      &lt;circle fill="gold" r="30" id="yellowball"/>
    &lt;/g>
    &lt;!-- Symbol Description -->
    &lt;symbol id="mouth">
      &lt;polyline points="15 15 5 10 15 5" stroke="crimson" fill="none" stroke-width="3"/>
    &lt;/symbol>
    &lt;!-- Symbol Description -->
    &lt;symbol id="bird">
      &lt;g stroke="brown">
        &lt;polyline points="0 0 0 25" stroke-width="3" transform="translate(25 100)"/>
        &lt;polyline points="0 0 0 25" stroke-width="3" transform="translate(45 100)"/>
        &lt;polyline points="0 0 12 0" stroke-width="3" transform="translate(19 125)"/>
        &lt;polyline points="0 0 12 0" stroke-width="3" transform="translate(40 125)"/>
      &lt;/g>
      &lt;use xlink:href="#mouth" x="83" y="35"/>
      &lt;use xlink:href="#yellowball" x="90" y="55" transform="scale(.75)"/>
      &lt;use xlink:href="#yellowball" x="35" y="75" width="100"/>
      &lt;polyline points="55 70 45 90 20 80" stroke="orange" stroke-width="3" fill="none"/>
      &lt;circle fill="black" r="5" cx="75" cy="35"/>
      &lt;circle fill="gray" r="1" cx="77" cy="35"/>
    &lt;/symbol>
  &lt;/defs>

  &lt;!-- Symbol Usage -->
  &lt;use xlink:href="#bird" x="15" y="15"/>
  &lt;!-- Using the symbol again, flipping horizontally -->
  &lt;use xlink:href="#bird" x="0" y="35" transform="translate(225 -20) scale(-1,1)"/>
&lt;/svg>
```

## use

This is a tag allowing re-use SVG-elements. It's possible to copy any element inside a single HTML page. It's
also possible to include a library of elements at the beginning of a page and later use them in the necessary places.

The copies can be given positions, widths and heights:

<svg width="260" height="140">
  <defs>
    <!-- Symbol Creation -->
    <symbol id="color-wheel">
      <circle r="50" fill="gold" cx="50" cy="50"/>
      <circle r="35" fill="orangered" cx="50" cy="50"/>
      <circle r="20" fill="crimson" cx="50" cy="50"/>
      <circle r="5" fill="maroon" cx="50" cy="50"/>
     </symbol>
  </defs>

  <!-- Symbol copy with coordinates -->
  <use xlink:href="#color-wheel" x="20" y="20"/>
  <!-- Symbol copy with coordinates and height -->
  <use xlink:href="#color-wheel" x="140" y="20" height="50"/>
</svg>

```xml
&lt;svg width="260" height="140">
  &lt;defs>
    &lt;!-- Symbol Creation -->
    &lt;symbol id="color-wheel">
      &lt;circle r="50" fill="gold" cx="50" cy="50"/>
      &lt;circle r="35" fill="orangered" cx="50" cy="50"/>
      &lt;circle r="20" fill="crimson" cx="50" cy="50"/>
      &lt;circle r="5" fill="maroon" cx="50" cy="50"/>
     &lt;/symbol>
  &lt;/defs>

  &lt;!-- Symbol copy with coordinates -->
  &lt;use xlink:href="#color-wheel" x="20" y="20"/>
  &lt;!-- Symbol copy with coordinates and height -->
  &lt;use xlink:href="#color-wheel" x="140" y="20" height="50"/>
&lt;/svg>
```

The position of the copy is determined with respect to the top left corner of the figure in the existing
coordinate system. However, the coordinate system within the symbol is its own.

On insertion of a symbol, the `width` and `height` determine not the size of the figure, but the visible area of
the copy (like in the figure on the right), however when copying a group (`<g>`) the height and width don't affect
anything. Use transformations to change the sizes of copies.

It's also possible to give strokes, fills and transformations:

<svg width="260" height="140">
  <defs>
    <!-- Original symbol, not shown -->
    <symbol id="s-rect">
      <rect width="100" height="25" x="2" y="2"/>
     </symbol>
  </defs>

  <!-- Simple copy, the background is black by default -->
  <use xlink:href="#s-rect" x="20" y="20"/>
  <!-- Adding width and fill -->
  <use xlink:href="#s-rect" x="140" y="20"
       width="50" fill="yellowgreen"/>
  <!-- Adding fill and stroke -->
  <use xlink:href="#s-rect" x="20" y="80"
       fill="gold" stroke="orange" stroke-width="4"/>
  <!-- Adding fill, stroke and transform -->
  <use xlink:href="#s-rect" x="140" y="80"
       fill="skyblue" stroke="steelblue" stroke-width="2"
       transform="rotate(-25 190 92)"/>
</svg>

```xml
&lt;svg width="260" height="140">
  &lt;defs>
    &lt;!-- Original symbol, not shown -->
    &lt;symbol id="s-rect">
      &lt;rect width="100" height="25" x="2" y="2"/>
     &lt;/symbol>
  &lt;/defs>

  &lt;!-- Simple copy, the background is black by default -->
  &lt;use xlink:href="#s-rect" x="20" y="20"/>
  &lt;!-- Adding width and fill -->
  &lt;use xlink:href="#s-rect" x="140" y="20"
       width="50" fill="yellowgreen"/>
  &lt;!-- Adding fill and stroke -->
  &lt;use xlink:href="#s-rect" x="20" y="80"
       fill="gold" stroke="orange" stroke-width="4"/>
  &lt;!-- Adding fill, stroke and transform -->
  &lt;use xlink:href="#s-rect" x="140" y="80"
       fill="skyblue" stroke="steelblue" stroke-width="2"
       transform="rotate(-25 190 92)"/>
&lt;/svg>
```

Different CSS classes can be applied for the copies:

<svg width="260" height="50">
  <style>
 .col-1 {
    fill: #F35C78;
    }
  .col-2 {
    fill: #E77D6D;
    }
  .col-3 {
    fill: #D99B64;
    }
  .col-4 {
    fill: #C8B357;
    }
  .col-5 {
    fill: #B2CC49;
    }
  </style>

  <defs>
    <!-- House -->
    <path id="house" d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"/>
  </defs>

  <!-- House copy -->
  <use xlink:href="#house"
       class="col-1" x="20" y="10"
       transform="rotate(35 36 26)"/>
  <use xlink:href="#house"
       class="col-2" x="67" y="10"
       transform="rotate(100 83 26)"/>
  <use xlink:href="#house"
       class="col-3" x="114" y="10"
       transform="rotate(140 130 26)"/>
  <use xlink:href="#house"
       class="col-4" x="161" y="10"
       transform="rotate(30 177 26)"/>
  <use xlink:href="#house"
       class="col-5" x="208" y="10"
       transform="rotate(100 224 26)"/>
</svg>

House is from [icomoon.io](http://icomoon.io)

```xml
&lt;svg width="260" height="50">
  &lt;style>
 .col-1 {
    fill: #F35C78;
    }
  .col-2 {
    fill: #E77D6D;
    }
  .col-3 {
    fill: #D99B64;
    }
  .col-4 {
    fill: #C8B357;
    }
  .col-5 {
    fill: #B2CC49;
    }
  &lt;/style>

  &lt;defs>
    &lt;!-- House -->
    &lt;path id="house"
          d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"/>
  &lt;/defs>

  &lt;!-- House copy -->
  &lt;use xlink:href="#house"
       class="col-1" x="20" y="10"
       transform="rotate(35 36 26)"/>
  &lt;use xlink:href="#house"
       class="col-2" x="67" y="10"
       transform="rotate(100 83 26)"/>
  &lt;use xlink:href="#house"
       class="col-3" x="114" y="10"
       transform="rotate(140 130 26)"/>
  &lt;use xlink:href="#house"
       class="col-4" x="161" y="10"
       transform="rotate(30 177 26)"/>
  &lt;use xlink:href="#house"
       class="col-5" x="208" y="10"
       transform="rotate(100 224 26)"/>
&lt;/svg>
```

A well-structured file makes development faster and more comfortable, and copying symbols can make
code significantly shorter.

### Links on the Same Topic

- [W3C Document Structre](http://www.w3.org/TR/SVG/struct.html)
- [Structuring, Grouping, and Referencing in SVG – The &lt;g>, <use>, <defs> and <symbol> Elements](http://sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/)
