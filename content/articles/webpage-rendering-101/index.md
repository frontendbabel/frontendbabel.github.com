---
title: What Every Frontend Developer Should Know About Webpage Rendering

date: 2014-06-30

source:
  name: Рендеринг WEB-страницы: что об этом должен знать front-end разработчик
  date: 2014-05-26
  url: http://habrahabr.ru/post/224187/
  lang: ru

author:
  name: Alexander Skutin
  site: http://skutin.ru/

translator:
  name: Max Shirshin
  github: ingdir
  twitter: ingdir

---

Today I'd like to focus on the subject of web page rendering and why it is important in web development. A lot of articles are available covering the subject, but the information is scattered and somehow fragmented. To wrap my head around the subject, for example, I had to study a lot of sources. That's why I decided I should write this article. I believe the article will be useful for beginners as well as for more advanced developers who want to refresh and structure what they already know.

<!-- cut -->

Rendering has to be optimized from the very beginning, when the page layout is being defined, as styles and scripts play the crucial role in page rendering. Professionals have to know certain tricks to avoid performance problems.

This article does not study the inner browser mechanics in detail, but rather offers some common principles. Different browser engines work differently, this would make a browser-specific study even more complicated.

## How do browsers render a web page

We start with an overview of browser actions when rendering a page:

1. The DOM (Document Object Model) is formed from the HTML that is received from a server.
1. Styles are loaded and parsed, forming the CSSOM (CSS Object Model).
1. On top of DOM and CSSOM, a rendering tree is created, which is a set of objects to be rendered (Webkit calls each of those a "renderer" or "render object", while in Gecko it's a "frame"). Render tree reflects the DOM structure except for invisible elements (like the &lt;head&gt; tag or elements that have `display:none;` set). Each text string is represented in the rendering tree as a separate renderer. Each of the rendering objects contains its corresponding DOM object (or a text block) plus the calculated styles. In other words, the render tree describes the visual representation of a DOM.
1. For each render tree element, its coordinates are calculated, which is called "layout". Browsers use a flow method which only required one pass to layout all the elements (tables require more than one pass).
1. Finally, this gets actually displayed in a browser window, a process called "painting".

When users interact with a page, or scripts modify it, some of the aforementioned operations have to be repeated, as the underlying page structure changes.

### Repaint

When changing element styles which don't affect the element's position on a page (such as `background-color`, `border-color`, `visibility`), the browser just repaints the element again with the new styles applied (that means a "repaint" or "restyle" is happening).

### Reflow

When the changes affect document contents or structure, or element position, a reflow (or relayout) happens. These changes are usually triggered by:

* DOM manipulation (element addition, deletion, altering, or changing element order);
* Contents changes, including text changes in form fields;
* Calculation or altering of CSS properties;
* Adding or removing style sheets;
* Changing the "class" attribute;
* Browser window manipulation (resizing, scrolling);
* Pseudo-class activation (:hover).

## How browsers optimize rendering

Browsers are doing their best to restrict repaint/reflow to the area that covers the changed elements only. For example, a size change in an absolute/fixed positioned element only affects the element itself and its descendants, whereas a similar change in a statically positioned element triggers reflow for all the subsequent elements.

Another optimization technique is that while running pieces of JavaScript code, browsers cache the changes, and apply them in a single pass after the code was run. For example, this piece of code will only trigger one reflow and repaint:

```js
var $body = $('body');
$body.css('padding', '1px'); // reflow, repaint
$body.css('color', 'red'); // repaint
$body.css('margin', '2px'); // reflow, repaint
// only 1 reflow and repaint will actually happen 
```

However, as mentioned above, accessing an element property triggers a forced reflow. This will happen if we add an extra line that reads an element property to the previous block:

```js
var $body = $('body');
$body.css('padding', '1px');
$body.css('padding'); // reading a property, a forced reflow
$body.css('color', 'red');
$body.css('margin', '2px');
```

As a result, we get 2 reflows instead of one. Because of this, you should group reading element properties together to optimize performance (<a href="http://jsbin.com/duhah/2/edit">see a more detailed example on JSBin</a>).

There are situations when you have to trigger a forced reflow. Example: we have to apply the same property ("margin-left" for example) to the same element twice. Initially, it should be set to `100px` without animation, and then it has to be animated with `transition` to a value of `50px`. You can study this example <a href="http://jsbin.com/qutev/1/edit">on JSBin</a> right now, but I'll describe it here in more detail.

We start by creating a CSS class with a transition:

```css
.has-transition {
   -webkit-transition: margin-left 1s ease-out;
      -moz-transition: margin-left 1s ease-out;
        -o-transition: margin-left 1s ease-out;
           transition: margin-left 1s ease-out;
}
```

Then proceed with the implementation:

```js
// our element that has a "has-transition" class by default
var $targetElem = $('#targetElemId');

// remove the transition class
$targetElem.removeClass('has-transition');

// change the property expecting the transition to be off, as the class is not there
// anymore
$targetElem.css('margin-left', 100);

// put the transition class back
$targetElem.addClass('has-transition');

// change the property
$targetElem.css('margin-left', 50);
```

This implementation, however, does not work as expected. The changes are cached and applied only at the end of the code block. What we need is a forced reflow, which we can achieve by making the following changes:

```js
// remove the transition class
$(this).removeClass('has-transition');

// change the property
$(this).css('margin-left', 100);

// trigger a forced reflow, so that changes in a class/property get applied immediately
$(this)[0].offsetHeight; // an example, other properties would work, too

// put the transition class back
$(this).addClass('has-transition');

// change the property
$(this).css('margin-left', 50);
```

Now this works as expected.

## Practical advice on optimization

Summarizing the available information, I could recommend the following:

* Create valid HTML and CSS, do not forget to specify the document encoding. Styles should be included into &lt;head&gt;, and scripts appended to the end of the &lt;body&gt; tag.
* Try to simplify and optimize CSS selectors (this optimization is almost universally ignored by developers who mostly use CSS preprocessors). Keep nesting levels at a minimum. This is how CSS selectors rank according to their performance (starting from the fastest ones):
  1. Identificator: `#id`
  1. Class: `.class`
  1. Tag: `div`
  1. Adjacent sibling selector: `a + i`
  1. Parent selector: `ul > li`
  1. Universal selector: `*`
  1. Attribute selector: `input[type="text"]`
  1. Pseudoclasses and pseudoelements: `a:hover`
You should remember that browsers process selectors from right to left, that's why the rightmost selector should be the fastest one — either `#id` or `.class`:

```css
div * {...} // bad
.list li {...} // bad
.list-item {...} // good
#list .list-item {...} // good
```
1. In your scripts, minimize DOM manipulation whenever possible. Cache everything, including properties and objects (if they are to be reused). It's better to work with an "offline" element when performing complicated manipulations (an "offline" element is one that is disconnected from DOM and only stored in memory), and append it to DOM afterwards.
1. If you use jQuery to select elements, follow <a href="http://learn.jquery.com/performance/optimize-selectors/">jQuery selectors best practices</a>.
1. To change element's styles, modifying the "class" attribute is one of the most performant ways. The deeper in the DOM tree you perform this change, the better (also because this helps decouple logic from presentation).
1. Animate only absolute/fixed positioned elements if you can.
1. It is a good idea to disable complicated `:hover` animations while scrolling (e.g. by adding an extra "no-hover" class to &lt;body&gt;). <a href="http://habrahabr.ru/post/204238/">Read an article on the subject</a>.

For a more detailed overview, have a look at these articles:

1. [How browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm)
1. [Rendering: repaint, reflow/relayout, restyle](http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/)

I hope you find this article useful!


