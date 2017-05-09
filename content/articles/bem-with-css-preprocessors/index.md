---
title: Generating BEM selectors with CSS preprocessors

date: 2014-07-29

source:
  name: Генерация названий селекторов в стиле БЭМ с помощью препроцессоров
  date: 2014-06-11
  url: http://noteskeeper.ru/1139/
  lang: ru

author:
  name: Vladimir Kuznetsov
  site: http://noteskeeper.ru/about/
  github: mistakster
  twitter: mistakster

translator:
  name: Varya Stepanova
  github: varya
  twitter: varya_en
  site: http://varya.me/

meta:
  desc: >
    Vladimir Kuznetsov explains how to benefit from CSS preprocessors (such as SASS and LESS) when using BEM
    methodology.

---

The [BEM methodology](http://bem.info/) never assumed that its long CSS classes such as `.block__element_modifier` to
be written manually. At Yandex they use special tools to produce HTML markup and styles. If you are using CSS
preprocessors to generate your styles, you also do not have to repeat block names again and again. Here I'm going to
demonstrate how to do this.

<!-- cut -->

All the CSS preprocessors enable to include one selector into another. This is how cascades are built.

```css
.header {
  .title {
    font: bold 24px/1 sans-serif;
  }
}
```

After the transformation it gives:

```css
.header .title {
  font: bold 24px/1 sans-serif;
}
```

It is possible to use `&` symbol instead of container name, which is convenient if describing inner elements and pseudo
selectors.

```css
.header {
  a {
    &, &:hover, &:focus {
      color: white;
      text-decoration: none;
    }
  }
}
```

CSS:

```css
.header a,
.header a:hover,
.header a:focus {
  color: white;
  text-decoration: none;
}
```

**LESS** (and now **SASS** as well) allow to use `&` within a single class name. There is no strict requirements on what
should be the symbols before and after `&`. Thus, you can produce simple selectors instead of cascades.

```css
.header {
  &__link {
    &, &:hover, &:focus {
      color: white;
      text-decoration: none;
    }
  }
}
```

CSS:

```css
.header__link,
.header__link:hover,
.header__link:focus {
  color: white;
  text-decoration: none;
}
```

The same goes for selectors of elements and modifiers.

```css
.header {
  background: white;
  &__title {
    font: bold 24px/1 sans-serif;
    &_featured {
      font-size: 30px;
    }
  }
}
```

CSS:

```css
.header {
  background: white;
}
.header__title {
  font: bold 24px/1 sans-serif;
}
.header__title_featured {
  font-size: 30px;
}
```

As you can see, nested selectors were flattened.

## Best to know

Now, a few simple rules to warn you of shooting your own foot.

### Use a block name just once

A block name should be mentioned at the first level only and never repeated again. There might be exceptions in
case of complex modifier name. However if you met the need to do such a thing, you should reconsider the whole structure
of this block elements and modifiers. I am sure you will find a way to decompose the block and simplify it.

```css
.block {
  // block styles
}
```

### Elements are 2nd level selectors

```css
.block {
  // block styles
  &__element {
    // element styles
  }
  &__title {
  }
}
```

Sometime you may have elements with similar names and this would induce you to include one element into another. I
suggest not to yield to temptation in spite of you get correct resultant CSS.

```css
.block {
  &__element {
    &-wrapper {
      // This is a bad example of declaring an element.
      // This element is hard to be found in the code.
    }
  }
}
```

Never do such a thing. Selectors like this are very hard to found in the code. And the name of the element
(`element-wrapper`) is divided into 2 parts. You should write the whole element name even if it is partly similar to the
others.

### Pseudo-classes, pseudo-elements and element modifiers can fit the 3rd level

```css
.block {
  &__element {
    &_modifier {
      // styles for a modifier of an element
    }
    &_modifier_value {
      // do not split modifier key and value
    }
    &:hover {
      // pseudo-class is also a kind of a modifier
    }
  }
}
```

Here you group styles for the element and its supplements in a very natural way; this will make it easier to find them
across the source code.

As is the convention, the element modifier must not influence inner elements. Placing it at the 3rd level of selectors
you provide error protection. But I can imagine cases when it is handy to place a modifier into the 2nd level and so to
repeat the element name.

```css
.block {
  &__element_active {
    // element modifier at the 2nd level
  }
  &__element_modifier_good {
    // example of key-value modifier
  }
}
```

I personally prefer to place element modifiers at the 2nd level.
Also, I believe that it is a bad practice to divide a modifier name into parts or separate its key and value parts.
Excessive structure would make code less readable and so you can easily loose context.

### Modifiers fit the 2nd level and can cause cascade

Block modifiers are to use for changing their block appearance and the inner elements (not the inner blocks).

```css
.block {
  background: white;
  &__title {
    color: black;
    font: bold 24px/1 sans-serif;
  }
  &_featured {
    background: black;
  }
  &_featured &__title {
    color: white;
    font-size: 30px;
  }
}
```

The code is not that structured because we need to save the value of `&`. Once we come down to the 3rd level, it is
redefined and this makes us to write full block name in selectors which is recommended to avoid.

```css
.block {
  background: white;
}
.block__title {
  color: black;
  font: bold 24px/1 sans-serif;
}
.block_featured {
  background: black;
}
.block_featured .block__title {
  color: white;
  font-size: 30px;
}
```

## Wrapping up
* CSS preprocessors prevent repeating block names in selectors.
* The source code shows cascade but in the resultant CSS it all transforms into simple selectors.
* This method cut down errors and structural bugs.
