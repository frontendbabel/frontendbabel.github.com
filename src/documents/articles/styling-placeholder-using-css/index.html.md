---
title: Styling placeholder using CSS. Syntax, tricks, supported styles in HTML5

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
    How style placeholder using CSS.

scripts:
  - examples.js
---

Placeholder attribute is used to call an action inside empty elements such as input and textarea. In this article, we consider the possibility of style text of placeholder, as well as some tricks that will make it more convenient and functional.

Let's begin with an example for those who don't know what the placeholder is.

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

Style of placeholder can be modified with the following css rules:

```css
  ::-webkit-input-placeholder {color:#c0392b;}
  ::-moz-placeholder          {color:#c0392b;} /* Firefox 19+ */
  :-moz-placeholder           {color:#c0392b;} /* Firefox 18- */
  :-ms-input-placeholder      {color:#c0392b;}
```

Looks scary, doesn't it ? The fact that this is still not in the standards. Each browser does it own way to implement support for styling placeholder.

In IE and old firefox (until the 18th version) placeholder is considered pseudo-class and in new firefox, webkit and blink, it is a pseudo-element.

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

We should say that not all possible fully supported css properties. Most modern browsers allow you to change:

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

Sometimes width text input is reduced взаимости of layout, especially for mobile devices. In this case, if the text of placeholder is long it will be cut and look ugly. To prevent it you can use `text-overflow: ellipsis`. This syntax will work in all modern browsers.

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
<input type="text" placeholder="Leave message here"><br><br>
<span style="color:#2ecc71">With text-overflow: ellipsis;</span><br>
<input class="ell" type="text" placeholder="Leave message here">
</div>

<div id="example3"></div>

### How to hide the placehoder in focus?

Hiding the placeholder is not consistent across browsers.

  1. in some browsers when it focused input
  2. in other browsers in the presence of at least one character entered

I like the first option. To specify this behavior in all browsers supporting placeholder, define the following css rules:

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

Placeholder скрывается при фoкусе<br>
<input type="text" placeholder="Leave message here">
</div>

<div id="example4"></div>

## Hiding the placeholder nicely

You can also add a transition for appearance and hiding placeholder:

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

Fadeouts of placeholder in focus
<input class="input1" type="text" placeholder="Leave message here"><br>

Shift right placeholder in focus
<input class="input2" type="text" placeholder="Leave message here"><br>

Shift down placeholder in focus
<input class="input3" type="text" placeholder="Leave message here"><br>
</div>

<div id="example5"></div>

Here css:

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

I hope it will be useful for you. Write remarks and suggestion in comments.
