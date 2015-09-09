---
title: Styling placeholders with CSS. Syntax, tips & tricks, supported HTML5 styles

date: 2015-09-09

source:
  name: Стилизуем placeholder при помощи CSS. Синтаксис, трюки, поддерживаемые стили в html5
  url: http://html5.by/blog/placeholder/
  lang: RU

author:
  name: Dudin Dmitriy
  site: http://html5.by/
  twitter: nedudi
  github: nedudi

translator:
  name: Talgautb
  site: http://www.gtalk.kz/
  twitter: talgautb
  github: talgautb

meta:
  desc: >
    CSS tricks for styling input and textarea placeholders. Things like hiding a placeholder with an animation or
    cutting off exceedingly long placeholder texts in a nice way can be done in pure CSS!

scripts:
  - examples.js
---

Placeholder attribute is used to provide an action hint inside empty elements such as input or textarea. In this article, we consider the possibility of styling the placeholder text as well as some tricks to make it more usable and functional.

Let's begin with an example for those who don't know what a placeholder is.

<!-- cut -->

```html
&lt;input type="text" placeholder="Leave message here">
```


<div id="example1source">
<style>
  #example1source {
    display: none;
  }
  input{
    border: 2px solid rgba(220,220,220,1);
    color: #2980b9;
    font-size: 16px;
    box-shadow: 1px 1px 3px 1px rgba(200,200,200, 0.2) inset;
    padding: 1em;
    width: 17em;
    outline: none;
    margin: 0;
    -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  }

  input:hover{
    border: 2px solid rgba(52, 152, 219, 1);
    box-shadow: 1px 1px 3px 1px rgba(52, 152, 219, 0.2) inset;
    -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  }

  input:focus{
    border: 2px solid rgba(52, 152, 219, 1);
    box-shadow: 0px 0px 0px 0px rgba(52, 152, 219, 1);
    background-color: rgba(255,255,255, 0.5);
    -webkit-transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1);
    -moz-transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1);
    -o-transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1);
    transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1);
  }

</style>

<input type="text" placeholder="Leave message here">
</div>

<div id="example1"></div>

Placeholder styles can be modified with the following CSS rules:

```css
  ::-webkit-input-placeholder {color:#c0392b;}
  ::-moz-placeholder          {color:#c0392b;} /* Firefox 19+ */
  :-moz-placeholder           {color:#c0392b;} /* Firefox 18- */
  :-ms-input-placeholder      {color:#c0392b;}
```

Looks scary, doesn't it? In fact, it's not standartized yet. Each browser implements placeholder styling in its own way.

In IE and old Firefox (till ver. 18) placeholder is considered a pseudo-class whereas in the new Firefox, Webkit, and Blink, it is a pseudo-element.

Let's see what happens:

<div id="example2source">
<style>
  #example2source {
    display: none;
  }
  ::-webkit-input-placeholder {
    color: #c0392b;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #c0392b;
  }
  :-ms-input-placeholder {
    color: #c0392b;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #c0392b;
  }
</style>

<input type="text" placeholder="Leave message here">
</div>

<div id="example2"></div>

Not all CSS properties are fully supported. Most modern browsers would allow you to change:

```
  font (and related properties)
  background (and related properties)
  color
  word-spacing
  letter-spacing
  text-decoration
  vertical-align
  text-transform
  line-height
  text-indent
  text-overflow
  opacity
```

## If placeholder does not fit

Sometimes the width of a text input gets reduced (depending on the layout), especially on mobile devices. In this case, the placeholder text will be cut off if it's too long. It looks ugly :) To prevent this, one can use `text-overflow: ellipsis`. This syntax works in all modern browsers.

```css
  input[placeholder]          {text-overflow:ellipsis;}
  input::-moz-placeholder     {text-overflow:ellipsis;}
  input:-moz-placeholder      {text-overflow:ellipsis;}
  input:-ms-input-placeholder {text-overflow:ellipsis;}
```

<div id="example3source">
<style>
  #example3source {
    display: none;
  }
  input {
    width: 130px;
    margin-top: 3px;
  }
  input.ell[placeholder] {text-overflow: ellipsis;}
  input.ell::-moz-placeholder { text-overflow: ellipsis; } /* firefox 19+ */
  input.ell:-moz-placeholder { text-overflow: ellipsis; }
</style>

<span style="color:#e74c3c">Without text-overflow: ellipsis;</span><br>
<input type="text" placeholder="Leave your long long message here"><br><br>
<span style="color:#2ecc71">With text-overflow: ellipsis;</span><br>
<input class="ell" type="text" placeholder="Leave your long long message here">
</div>

<div id="example3"></div>

### How to hide a placehoder on focus?

Hiding the placeholder is not consistent across browsers.

  1. In some browsers, it happens when input field is focused
  2. In other browsers, it only happens after at least one character is entered

I like the first option. To implement this behavior in all browsers that support placeholders, define the following CSS rules:

```css
  :focus::-webkit-input-placeholder {color: transparent}
  :focus::-moz-placeholder          {color: transparent}
  :focus:-moz-placeholder           {color: transparent}
  :focus:-ms-input-placeholder      {color: transparent}
```

<div id="example4source">
<style>
  #example4source {
    display: none;
  }
  input{
    margin-top: 3px;
  }
  :focus::-webkit-input-placeholder {color: transparent}
  :focus::-moz-placeholder          {color: transparent}
  :focus:-moz-placeholder           {color: transparent}
  :focus:-ms-input-placeholder      {color: transparent}
</style>

Placeholder hides itself on focus<br>
<input type="text" placeholder="Leave message here">
</div>

<div id="example4"></div>

## Hiding the placeholder in a nice way

You can add a transition for showing and hiding a placeholder:

<div id="example5source">
<style>
  #example5source {
    display: none;
  }
  input{
    margin-top: 3px;
  }
  .input1::-webkit-input-placeholder     {opacity: 1; transition: opacity 0.3s ease;}
  .input1::-moz-placeholder                {opacity: 1; transition: opacity 0.3s ease;}
  .input1:-moz-placeholder                 {opacity: 1; transition: opacity 0.3s ease;}
  .input1:-ms-input-placeholder            {opacity: 1; transition: opacity 0.3s ease;}
  .input1:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}
  .input1:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}
  .input1:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}
  .input1:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}

  .input2::-webkit-input-placeholder       {text-indent: 0px;   transition: text-indent 0.3s ease;}
  .input2::-moz-placeholder                {text-indent: 0px;   transition: text-indent 0.3s ease;}
  .input2:-moz-placeholder                 {text-indent: 0px;   transition: text-indent 0.3s ease;}
  .input2:-ms-input-placeholder            {text-indent: 0px;   transition: text-indent 0.3s ease;}
  .input2:focus::-webkit-input-placeholder {text-indent: 500px; transition: text-indent 0.3s ease;}
  .input2:focus::-moz-placeholder          {text-indent: 500px; transition: text-indent 0.3s ease;}
  .input2:focus:-moz-placeholder           {text-indent: 500px; transition: text-indent 0.3s ease;}
  .input2:focus:-ms-input-placeholder      {text-indent: 500px; transition: text-indent 0.3s ease;}

  .input3::-webkit-input-placeholder       {line-height: 20px;  transition: line-height 0.5s ease;}
  .input3::-moz-placeholder                {line-height: 20px;  transition: line-height 0.5s ease;}
  .input3:-moz-placeholder                 {line-height: 20px;  transition: line-height 0.5s ease;}
  .input3:-ms-input-placeholder            {line-height: 20px;  transition: line-height 0.5s ease;}
  .input3:focus::-webkit-input-placeholder {line-height: 100px; transition: line-height 0.5s ease;}
  .input3:focus::-moz-placeholder          {line-height: 100px; transition: line-height 0.5s ease;}
  .input3:focus:-moz-placeholder           {line-height: 100px; transition: line-height 0.5s ease;}
  .input3:focus:-ms-input-placeholder      {line-height: 100px; transition: line-height 0.5s ease;}
</style>

Fadeouts of a placeholder in focus
<input class="input1" type="text" placeholder="Leave message here"><br>

Shift a placeholder in focus right 
<input class="input2" type="text" placeholder="Leave message here"><br>

Shift a placeholder in focus down
<input class="input3" type="text" placeholder="Leave message here"><br>
</div>

<div id="example5"></div>

Here is the CSS:

```css
  /* fadeouts of placeholder in focus */
  .input1::-webkit-input-placeholder       {opacity: 1; transition: opacity 0.3s ease;}
  .input1::-moz-placeholder                {opacity: 1; transition: opacity 0.3s ease;}
  .input1:-moz-placeholder                 {opacity: 1; transition: opacity 0.3s ease;}
  .input1:-ms-input-placeholder            {opacity: 1; transition: opacity 0.3s ease;}
  .input1:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}
  .input1:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}
  .input1:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}
  .input1:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}

  /* shift right placeholder in focus */
  .input2::-webkit-input-placeholder       {text-indent: 0px;   transition: text-indent 0.3s ease;}
  .input2::-moz-placeholder                {text-indent: 0px;   transition: text-indent 0.3s ease;}
  .input2:-moz-placeholder                 {text-indent: 0px;   transition: text-indent 0.3s ease;}
  .input2:-ms-input-placeholder            {text-indent: 0px;   transition: text-indent 0.3s ease;}
  .input2:focus::-webkit-input-placeholder {text-indent: 500px; transition: text-indent 0.3s ease;}
  .input2:focus::-moz-placeholder          {text-indent: 500px; transition: text-indent 0.3s ease;}
  .input2:focus:-moz-placeholder           {text-indent: 500px; transition: text-indent 0.3s ease;}
  .input2:focus:-ms-input-placeholder      {text-indent: 500px; transition: text-indent 0.3s ease;}

  /* shift down placeholder in focus */
  .input3::-webkit-input-placeholder       {line-height: 20px;  transition: line-height 0.5s ease;}
  .input3::-moz-placeholder                {line-height: 20px;  transition: line-height 0.5s ease;}
  .input3:-moz-placeholder                 {line-height: 20px;  transition: line-height 0.5s ease;}
  .input3:-ms-input-placeholder            {line-height: 20px;  transition: line-height 0.5s ease;}
  .input3:focus::-webkit-input-placeholder {line-height: 100px; transition: line-height 0.5s ease;}
  .input3:focus::-moz-placeholder          {line-height: 100px; transition: line-height 0.5s ease;}
  .input3:focus:-moz-placeholder           {line-height: 100px; transition: line-height 0.5s ease;}
  .input3:focus:-ms-input-placeholder      {line-height: 100px; transition: line-height 0.5s ease;}
```

I hope you find it useful. Please leave your comments and suggestions below.
