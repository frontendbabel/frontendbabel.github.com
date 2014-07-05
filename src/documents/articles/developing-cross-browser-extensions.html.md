---
title: Developing Cross-browser Extensions

source:
  name: Разработка кросс-браузерных расширений
  url: http://habrahabr.ru/company/likeastore/blog/227881/
  lang: ru
  date: 2014-06-27

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

### Automating build process with gulp

The purpose of build process is to copy core code and platform-dependent code into folders tree expexted by browsers.

Let's define 3 taska for that:

```js
var gulp     = require('gulp');
var clean    = require('gulp-clean');
var es       = require('event-stream');
var rseq     = require('gulp-run-sequence');
var zip      = require('gulp-zip');
var shell    = require('gulp-shell');
var chrome   = require('./vendor/chrome/manifest');
var firefox  = require('./vendor/firefox/package');

function pipe(src, transforms, dest) {
    if (typeof transforms === 'string') {
        dest = transforms;
        transforms = null;
    }

    var stream = gulp.src(src);
    transforms && transforms.forEach(function(transform) {
        stream = stream.pipe(transform);
    });

    if (dest) {
        stream = stream.pipe(gulp.dest(dest));
    }

    return stream;
}

gulp.task('clean', function() {
    return pipe('./build', [clean()]);
});

gulp.task('chrome', function() {
    return es.merge(
        pipe('./libs/**/*', './build/chrome/libs'),
        pipe('./img/**/*', './build/chrome/img'),
        pipe('./js/**/*', './build/chrome/js'),
        pipe('./css/**/*', './build/chrome/css'),
        pipe('./vendor/chrome/browser.js', './build/chrome/js'),
        pipe('./vendor/chrome/manifest.json', './build/chrome/')
    );
});

gulp.task('firefox', function() {
    return es.merge(
        pipe('./libs/**/*', './build/firefox/data/libs'),
        pipe('./img/**/*', './build/firefox/data/img'),
        pipe('./js/**/*', './build/firefox/data/js'),
        pipe('./css/**/*', './build/firefox/data/css'),
        pipe('./vendor/firefox/browser.js', './build/firefox/data/js'),
        pipe('./vendor/firefox/main.js', './build/firefox/data'),
        pipe('./vendor/firefox/package.json', './build/firefox/')
    );
});

gulp.task('safari', function() {
    return es.merge(
        pipe('./libs/**/*', './build/safari/likeastore.safariextension/libs'),
        pipe('./img/**/*', './build/safari/likeastore.safariextension/img'),
        pipe('./js/**/*', './build/safari/likeastore.safariextension/js'),
        pipe('./css/**/*', './build/safari/likeastore.safariextension/css'),
        pipe('./vendor/safari/browser.js', './build/safari/likeastore.safariextension/js'),
        pipe('./vendor/safari/Info.plist', './build/safari/likeastore.safariextension'),
        pipe('./vendor/safari/Settings.plist', './build/safari/likeastore.safariextension')
    );
});
```

The default task builds all the three extensions:

```js
gulp.task('default', function(cb) {
    return rseq('clean', ['chrome', 'firefox', 'safari'], cb);
});
```

Besides, for comfortable developing process it's good to watch over file changes and run background built:

```js
gulp.task('watch', function() {
    gulp.watch(['./js/**/*', './css/**/*', './vendor/**/*', './img/**/*'], ['default']);
});
```

### Ready to distribution

Having the build finished, you will need to pack the extension into the format requested by browser extension storage. I
have to note that in the Safari's case there is no such a store but they can show your extension is their gallery and
link to where you host it if you match their requirements.

For Chrome you only need to pack into `.zip`. It is signed and verified in the Chrome Web Store.

```js
gulp.task('chrome-dist', function () {
    gulp.src('./build/chrome/**/*')
        .pipe(zip('chrome-extension-' + chrome.version + '.zip'))
        .pipe(gulp.dest('./dist/chrome'));
});
```

Firefox procedure is a little bit more complex as you need to use SDK including `cfx` which can wrap your extention
into an `.xpi` file.

```js
gulp.task('firefox-dist', shell.task([
    'mkdir -p dist/firefox',
    'cd ./build/firefox && ../../tools/addon-sdk-1.16/bin/cfx xpi --output-file=../../dist/firefox/firefox-extension-' + firefox.version + '.xpi > /dev/null',
]));
```

As for Safari, that was a bummer. That turned out that to get `.safariextz` package you need to run Safari. I've spent a
few hours to make work according to [the manual](http://stackoverflow.com/questions/3423522/how-can-i-build-a-safari-extension-package-from-the-command-line)
but have not succeeded. The point is that it is not possible to convert your developer certificate into `.p12` and so
you are not able to create the keys needed to sign a package. I still have to you Safari manually to pack the extention
but so the disctibution task is as simple as copying of the `Update.plist` file.

```js
gulp.task('safari-dist', function () {
    pipe('./vendor/safari/Update.plist', './dist/safari');
});
```

### Summing up

This is joy and pleasure to develop with a single repository. As I mentioned, I find Chrome as the most comfortable
developing environment, so I provide all the changes for it first and test with it.

```
$ gulp watch
```

The next goes Firefox

```
$ gulp firefox-run
```

And then manual tampering with Safari.

Once I need to release a new version, I update the manifests and so run

```
$ gulp dist
```

```
dist/
  chrome/
    chrome-extention-1.0.10.zip
    chrome-extention-1.0.6.zip
    chrome-extention-1.0.8.zip
    chrome-extention-1.0.9.zip
  firefox/
    firefox-extention-1.0.10.xpi
    firefox-extention-1.0.6.xpi
    firefox-extention-1.0.7.xpi
    firefox-extention-1.0.8.xpi
    firefox-extention-1.0.9.xpi
  safari/
    likeastore.safariextz
    Update.plist
```

Finally there are ready-to-distribution files in the `dist` folder. This would be perfect if extention stores would have
an API for uploading a new version, but they don't. This is done manually.

Fore more details in code please proceed into [the repository](https://github.com/likeastore/browser-extension).
