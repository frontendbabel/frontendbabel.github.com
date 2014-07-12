---
title: SVG: Grouping and Re-use of Elements

date: 2014-07-12

source:
  name: SVG: группировка и переиспользование элементов
  date: 2014-03-22
  url: http://css.yoksel.ru/svg-groups-use/
  lang: ru

author:
  name: Yulya Buhvalova
  site: http://css.yoksel.ru/
  twitter: yoksel
  github: yoksel

translator:
  name: George Gritsouk
  github: gggritso
  twitter: gggritso
  site: http://varya.me/

meta:
  desc: >
    Yulya Buhvalova, talks about using SVG features like `<g>`, `<def>` and `<symbol>` to make SVG elements more organized and easy to re-use.

---

SVG-figures can be grouped to comfortably structure a file. Several tags exist for this purpose: `<g>`, `<defs>` and `<symbol>`. Elements, element groups and symbols can be used repeatedly.

<!-- cut -->

## g

The `<g>` tag serves for grouping figures semantically, for maintaining a transparent document structure. Groups of elements can be used repeatedly.

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
```

Groups, like figures, can be given fills and strokes. The style will work for figures inside groups, which don't have their own style:

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
```

Groups don't work like included elements in HTML, but more like groups of elements in visual editors.

Groups don't show themselves visually, but can be used for grouping operations on their contents: it's possible to apply transformations for a group of elements, without having to move each one, it's possible to set a visual theme to the whole group at once, and it will be inherited by all the elements inside the group. Additionally, properties of the group are added to the inner elements, without overwriting existing ones. For example, if an element has a red fill, but the group has a green one — the fill of the element remains red.

For an element to inherit the visual properties of the group, it can't have properties of its own.

## defs

The `<defs>` tag acts as a library of elements and effects, which can be used lated. The contents of a tag are not shown on the page.

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
```

## symbol

A symbol is a group of figures, all part of a single whole. Like a `<def>`, not shown on the page, and like a `<g>`, can be used again. Inside a symbol is a new coordinate system.

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
```

## use

Tag, allowing re-use of SVG-elements. It's possible to copy any element inside a single HTML page. It's also possible to include a library of elements at the beginning of a page and later use them in the necessary places.

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
```

The position of the copy is determined with respect to the top left corner of the figure in the existing coordinate system. However, the coordinate system within the symbol is its own.

On insertion of a symbol, the `width` and `height` determine not the size of the figure, but the visible area of the copy (like in the figure on the right), however when copying a group (`<g>`) the height and width don't affect anything. Use transformations to change the sizes of copies.

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
```

The copies can be given different classes:

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

House from [icomoon.io](http://icomoon.io)

```xml
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
```

A well-structured file makes development faster and more comfortable, and copying symbols can make code significantly shorter.

### Links on the Same Topic

- [W3C Document Structre](http://www.w3.org/TR/SVG/struct.html)
- [Structuring, Grouping, and Referencing in SVG – The &lt;g>, <use>, <defs> and <symbol> Elements](http://sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/)
