---
title: About the @viewport

date: 2014-07-22

source:
  name: Про @viewport
  date: 2014-07-17
  url: http://wd.dizaina.net/internet-maintenance/about-viewport-at-rule/
  lang: ru

author:
  name: Oleg Korsunsky
  site: http://wd.dizaina.net/en/
  github: wilddeer
  twitter: wildir

translator:
  name: Varya Stepanova
  github: varya
  twitter: varya_en
  site: http://varya.me/

meta:
  desc: >
    About viewport

---

Once Opera’s guys proposed to use `@viewport { ... }` in CSS instead of `<meta name="viewport" ...>` tag. Regarding the
reasons
[you’d better watch and listen to @ppk](http://vimeo.com/100523275) and I will explain why you should use this
right now.

<!-- cut -->

## 1. Proper viewport for Windows Phones

I’ve noticed long ago that websites on Windows Phone look bulky in landscape mode but never deeply thought
about the fact.

You might overlook the difference between iOS and Windows Phone views in portrait mode:

![Windows Phone 8.1](p_before-portrait.png) | ![iOS 7](p_ipod-portrait.png)
---------------------------|-------------------------
<div class="article__tip">Windows Phone 8.1</div> | <div class="article__tip">iOS 7</div>

However in the landscape mode the enourmousness of Windows Phone view becomes clear:

![Windows Phone 8.1](p_before-landscape.png) <br/>
<div class='article__tip'>
Windows Phone 8.1
</div>

![iOS 7](p_ipod-landscape.png) <br/>
<div class='article__tip'>
iOS 7
</div>

It turned out that Windows Phone considers usual `<meta name="viewport" content="width=device-width, initial-scale=1">` as a designation to make a viewport 320 logical pixels wide, no matter what real device resolution is (because iPhone).

Instead, fresh and lush `@viewport {width: device-width;}` currently being supported by IE10 and IE11 with prefix
overrides this meta’s value; and moreover – instructs a Windows Phone to use its native viewport resolution.

This is how it should work:

![WP 8.1 before the change](before-landscape.png) <br/>
<div class='article__tip'>
Before
</div>

![WP 8.1 after the change](after-landscape.png) <br/>
<div class='article__tip'>
After
</div>

The portrait mode also undergoes a change. HTC 8x has better resolution then iPod and same pixel density, so its
viewport should be a little bit wider than 320 pixels:

![WP 8.1 in portrait mode before the change](before-portrait.png) | ![WP 8.1 in portrait mode after the change](after-portrait.png)
-------------------------|-------------------------
<div class="article__tip">Before</div> | <div class="article__tip">After</div>

`@-ms-viewport` was buggy in WP 8 before its third update because it operated with real pixels and not with logical
ones. This caused too large viewport size (and so too small website view) in the retinish phones.

Third update came out a while ago, older phones running WP7 are not affected by the bug, so now this bug can be safely ignored.

## 2. Responsiveness on Windows 8 devices

Besides, [as it proved](http://timkadlec.com/2013/01/windows-phone-8-and-device-width/), IE in Windows 8 ignores the meta tag in
metro mode but correctly interprets `@-ms-viewport`. Here there are a couple of explanatory GIFs:

![Windows 8 with meta-tag](win8-before.gif) <br/>
<div class='article__tip'>
The web site is zoomed when using meta tag.
</div>

![Windows 8 with @-ms-viewport](win8-after.gif) <br/>
<div class='article__tip'>
The website adapts when using <code>@-ms-viwport</code>.
</div>

In the first case we get a non-adaptive web site. Bad. The second approach gives a mobile version snapped to the edge of the screen.
Splendid!

## What do we do?

All the real guys are now combining the meta tag:

```html
&lt;head>
  ...
  &lt;meta name="viewport" content="width=device-width, initial-scale=1">
  ...
&lt;/head>
```

with CSS `@viewport` declaration:

```css
@-ms-viewport {
  width: device-width;
}

@viewport {
  width: device-width;
}
```

Advantages:

* Responsiveness in IE on Windows 8
* Native viewport in IE on Windows Phones
* Future-proof!

Drawbacks:

* Viewport is broken on Windows Phone without third update

## Related links

* [CSS Device Adaptation](http://dev.w3.org/csswg/css-device-adapt/), W3C
* [The Mobile Viewports](http://vimeo.com/100523275), Peter Paul Koch
* [IE10 Snap Mode and Responsive Design](http://timkadlec.com/2012/10/ie10-snap-mode-and-responsive-design/), Tim Kadlec
* [Windows Phone 8 and Device-Width](http://timkadlec.com/2013/01/windows-phone-8-and-device-width/), Tim Kadlec
