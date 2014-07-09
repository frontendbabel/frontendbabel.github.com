---
title: Developing Cross-Browser Extensions

date: 2014-07-07

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
  twitter: varya_en
  site: http://varya.me/

meta:
  desc: >
    A piece of experience in building browser extensions for Chrome, Firefox and Safari shared with code examples.
    Alexander Beletsky, the author of Likeastore extension and tried different development practices from shameful
    copy-paste to reputable unified-code-base principle and so came up with some recommendations on extension architecture
    and building process."

---

What do we do if we have to search for something? Of course, we fire up our favorite search engine web site. It is quite hard to push yourself to use another a different search engine rather than the usual one, even if you know that the result would be better. To change this UX pattern I developed [Likeastore Chrome
Extension](https://chrome.google.com/webstore/detail/likeastore/einhadilfmpdfmmjnnppomcccmlohjad). It adds social
part to your search flow by showing relevant information from the article you liked. Besides Chrome we support Firefox
and Safari. Despite the platform difference all these extensions are built from the same codebase.

<!-- cut -->

## At the first set-out
This began with me developing a simple Chrome extension. By the way, developing for Chrome was very comfortable. I
didn't go through the hassle of automation, just packed code into a zip after some local testing and then uploaded
this to the Web Store.

The Chrome extension was very welcomed by our customers which had been proved by metrics and feedback and meant that we
should continue. The next was Firefox as it has 15% of our traffic.

The basis of all browser extensions is the same: they are HTML/CSS/JavaScript applications with a manifest file where the
content and the properties are described. So my initial idea was to copy the Chrome extension's repository and adjust
the code for Firefox.

While developing I had that guilty feeling for doing copy-paste; many developers must be familiar with it. Obviously, 99% of code was the same for both extensions and it could bring problems with application support as more and more functionallity was being added.

By a lucky chance I bumped into [octotree](https://github.com/buunguyen/octotree) extension (which I recommend to all
active GitHub users) and met the need to fix a bug in it. When I cloned their repository and began to explore the code,
I realized that all the octotree extensions are built from this repo code. Octotree is a content injection application
similar to Likeastore, so this pattern could be borrowed.

I [fixed the bug](https://github.com/buunguyen/octotree/pull/60) and adapted and improved the compilation process
to fit Likeastore needs. Let's have a look at what it turned out to be.

## Application structure

I propose the application structure which I believe is suitable for any extension.

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

`build` and `dist` folders are generic and contain source code and application for distribution, respectively.

`css`, `img`, and `js` hold the source code of the application.

`vendor` has platform-depending code in a separate directory for every browser.

`tools` is a place for building utils.

The build runs with [gulp](http://gulpjs.com/), a "reconsidered" build system under NodeJS. I recommend to install node
if you are not using it yet, you will be able to enjoy all the profits of the npm world.

### Platform-dependent code

To begin with the most important: if you are staring a new project or want to adapt another one, you should clearly
understand what are the needed platform-dependent calls and place them into a dedicated module.

In my case there was only one such call: getting our resource URL from inside the app (where there are images). So I
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

The different variants of this module are used for [Firefox](https://github.com/likeastore/browser-extension/blob/master/vendor/firefox/browser.js)
and [Safari](https://github.com/likeastore/browser-extension/blob/master/vendor/safari/browser.js).

The `browser.js` file can be extended with all the necessary calls for more complex cases and so be a facade between
the specific code and the browser.

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

Besides the facade, platform-dependent code also means manifests and extension settings. They are `manifest.json` for
Chrome, `main.js` and `package.json` for Firefox and `.plist` files for Safari such as `Info.plist`, `Settings.plist`,
and `Update.plist`.

### Automating build process with gulp

The purpose of a build process is to copy the core code and platform-dependent code into folders tree expected by the browsers.

Let's define 3 tasks for that:

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

In addition, a good idea that ensures comfortable development is to watch the file changes and run a background build:

```js
gulp.task('watch', function() {
  gulp.watch(['./js/**/*', './css/**/*', './vendor/**/*', './img/**/*'], ['default']);
});
```

### Ready to distribute

Having the build finished, you need to pack the extension into a format requested by the browser extension storage. I
have to note that in Safari's case there is no such store but they can show your extension in their gallery and
link to where you host it if you match their requirements.

For Chrome, you only need to pack into a `.zip`. It is signed and verified in the Chrome Web Store.

```js
gulp.task('chrome-dist', function () {
  gulp.src('./build/chrome/**/*')
    .pipe(zip('chrome-extension-' + chrome.version + '.zip'))
    .pipe(gulp.dest('./dist/chrome'));
});
```

Firefox procedure is a little bit more complex as you need to use the SDK including `cfx` which can wrap your extension
into an `.xpi` file.

```js
gulp.task('firefox-dist', shell.task([
  'mkdir -p dist/firefox',
  'cd ./build/firefox && ../../tools/addon-sdk-1.16/bin/cfx xpi ' +
  '--output-file=../../dist/firefox/firefox-extension-' + firefox.version +
  '.xpi > /dev/null',
]));
```

As for Safari, that was a bummer. That turned out that to get `.safariextz` package you need to run Safari. I've spent a
few hours to make it work according to [the manual](http://stackoverflow.com/questions/3423522/how-can-i-build-a-safari-extension-package-from-the-command-line)
but did not succeed. The point is that it is not possible to convert your developer certificate into `.p12` and so
you are not able to create the keys needed to sign a package. I still have to run Safari manually to pack the extension yet the release is now as simple as copying the `Update.plist` file.

```js
gulp.task('safari-dist', function () {
  pipe('./vendor/safari/Update.plist', './dist/safari');
});
```

### Summing up

This is joy and pleasure to develop with a single repository. As I mentioned, I found Chrome to be the most comfortable
development environment, so I provide all the changes for it first and test with it.

```
$ gulp watch
```

Firefox goes next

```
$ gulp firefox-run
```

And then the manual tampering with Safari.

Once I need to release a new version, I update the manifests and run

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

As a result, there are ready-to-distribute files in the `dist` folder. This would be perfect if extension stores
would have an API for uploading a new version, but they don't. This is done manually.

For more details and code please proceed to [the repository](https://github.com/likeastore/browser-extension).
