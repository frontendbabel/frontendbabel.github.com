---
title: Developing Cross-browser Extensions

source:
  name: Разработка кросс-браузерных расширений
  url: http://habrahabr.ru/company/likeastore/blog/227881/
  lang: ru

author:
  name: Alexander Beletsky
  site: https://likeastore.com/
  twitter: alexbeletsky
  github: alexanderbeletsky

translator:
  name: Varya Stepanova
  github: varya
  twitter: toivonens
  site: http://varya.me/

---

What do we do if needed to search something? Indeed, we go to our favorite search engine web site. This is quite hard to
push yourself to use another search rather than your usual one even if you know that its result would be better. To
change this UX pattern I developed [Likeastore Chrome
Extension](https://chrome.google.com/webstore/detail/likeastore/einhadilfmpdfmmjnnppomcccmlohjad). It provides social
part into your search flow showing relevant information from the article you liked. Besides Chrome we support Firefox
and Safari. Despite the platform difference all these extentions are built from the same codebase.

<!-- cut -->

## At the first set-out
This began with me developing a simple Chrome extention. By the way, developing for Chrome was the most comfortable. I
didn't go through the hassle of automatization just packing code into zip after some local testing and then uploaded
this into the Web Store.

The Chrome extenstion was very welcomed by our customers which was proved my metrics and feedback and meant that we
should continue. The next was Firefox as it has 15% or our traffic.

The matter of browser extentions is the same. They are HTML/CSS/JavaScript applications with a manifest file where the
content and the properties are described. So my initial idea was to copy the Chrome extention's repository and adapt
code for Firefox.

While developing I had feeling of guilt for copy-paste familiar to many developers. Obviously 99% of code was the same
for both extentions and it might bring problems with application support as functional was growing.

By a lucky chance I bumped into [octotree](https://github.com/buunguyen/octotree) extention (which I recommend to all
active GitHub users) and met the need to fix a bag in it. When I cloned their repository and began to explore the code,
I realized that all the octotree extentions a built from this repo code. Octotree is content injection application
similar to Likeastore, so this pattern could be borrowed.

I [fixed the bug](https://github.com/buunguyen/octotree/pull/60) and adapted and improved the compilation proccess
according to the Likeastore needs. And, look what that resulted in.

## Application structure

I propose the application structure which I believe is suitable for any extention.

```bash
browser-extention/
  build/
    chrome/
    firefox/
    safari/
  css/
  dist/
    chrome/
    firefox/
    safari/
  img/
  js/
  libs/
  node_modules/
  tools/
  vendor/
  gulpfile.js
  package.json
  README.md
```

`build` and `dist` folders are generic and correspondingly contain source code and application for distribution.

`css`, `img`, and `js` hold source code of the application.

`vendor` has platform-depending code in a separate directory for every browser.

`tools` is a place for building utils.

The build runs with [gulp](http://gulpjs.com/), a "reconsidered" build system under NodeJS. I recommend to intall node
if you are not using it yet, you will be able to enjoy a all the profiets of npm world.

### Platform-dependent code

To begin with the most improrant, if you are staring a new project or want to adapt another one, you should clearly
understand what are the needed platform-dependent calls and place them into a dedicated module.

In my case there was only one such a call - getting our resourse URL from inside the app (here they are images). So I
had a separate `browser.js` file.

```js
;(function (window) {
    var app = window.app = window.app || {};

    app.browser = {
        name: 'Chrome',

        getUrl: function (url) {
            return chrome.extension.getURL(url);
        }
    };
})(window);
```

The differ variants of this module are used for [Firefox](https://github.com/likeastore/browser-extension/blob/master/vendor/firefox/browser.js)
and [Safari](https://github.com/likeastore/browser-extension/blob/master/vendor/safari/browser.js).

The `browser.js` file can be extended with all the necessary calls for more complex cases and so be a facade between
specific code and browser.

```
vendor/
  chrome/
    browser.js
    manifest.json
  firefox/
    browser.js
    main.js
    package.json
  safari/
    browser.js
    Info.plist
    Settings.plist
    Update.plist
```

Besides the facade platform-dependent code means also manifests and extention settings. They are `manifest.json` for
Chrome, `main.js` and `package.json` for Firefox and `.plist` files for Safari such as `Info.plist`, `Settings.plist`,
and `Update.plist`.
