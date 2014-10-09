---
title: Generating CSS sprites with Gulp

date: 2014-10-09

source:
  name: Генерация CSS-спрайтов с Gulp
  date: 2014-07-07
  url: http://habrahabr.ru/post/227945/
  lang: ru

author:
  name: Alexey Krekotun
  site: http://krekotun.ru
  twitter: akrekotun
  github: krekotun

translator:
  name: Varya Stepanova
  github: varya
  twitter: varya_en
  site: http://varya.me/

meta:
  desc: >
    Alexey Krekotun presents working and proved solution for automated css sprite build with Gulp.

---
While working with one large project, my colleague and I were thinking about how to automate building the CSS sprites.
Before, we used to build them manually or with different online services which anyway took a lot of time. Also, by that
time we already used Gulp to build the project and so were looking for a gulp-friendly solution for sprites.

Initially we were choosing from different variants:

 * [css-sprite](https://www.npmjs.org/package/css-sprite)
 * [gulp-sprite-generator](https://www.npmjs.org/package/gulp-sprite-generator)
 * [gulp-spritesmith](https://github.com/Otouto/gulp-spritesmith)
 * [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith)

<!-- cut -->

The first one is too complex to install; it has a few dependencies which require additional package managers. Once
gotten a new developer into our team, we would need to explain this complex process. This did not look as an option for
us. Also, it does not enable to tune image positions in the sprite.

The other three modules are based on the same [spritesmith](https://github.com/Ensighten/spritesmith) generator.
Eventually we chose [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith) as an official port of it.

## Installation
The first think to do is to install Gulp. Its [official
documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) will help you a
lot.<br/>
Then install `gulp.spritesmith`. If your project is empty yet (as mine is), take supplement packages as well:

```
npm i gulp gulp-stylus gulp.spritesmith --save
```

Now you can move to tuning the generator.

## Tuning

Before you start declaring the task, let's introduce all the possible
[parameters](https://github.com/twolfson/gulp.spritesmith#spritesmithparams) to the function.

- imgName `String` - Filename to save image as
    - Supported image extensions are `.png` and `.jpg/jpeg` (limited to specfic engines)
    - Image format can be overridden via `imgOpts.format`
- cssName `String` - Filename to save CSS as
    - Supported CSS extensions are `.css` (CSS), `.sass` ([SASS][]), `.scss` ([SCSS][]), `.less` ([LESS][]), `.styl/.stylus` ([Stylus][]), and `.json` ([JSON][])
    - CSS format can be overridden via `cssFormat`
- imgPath `String` - Optional path to use in CSS referring to image location
- engine `String` - Optional image generating engine to use
    - By default, `auto` will be used which detects the best supported engine for your system
    - Supported options are `phantomjs`, `canvas`, `gm`, and `pngsmith`
    - More information can be found in the [engine][] section
- algorithm `String` - Optional method for how to pack images
    - Supported options are `top-down` (default), `left-right`, `diagonal`, `alt-diagonal`, and `binary-tree`
    - More information can be found in the [algorithm][] section
- padding `Number` - Optional amount of pixels to include between images
    - By default, there will be no padding
- imgOpts `Object` - Options for image output
    - format `String` - Override for format of output image
        - Supported values are `png` and `jpg` (limited to specific engines)
    - quality `Number` - Quality of image (only supported by `gm` engine)
    - timeout `Number` - Milliseconds to wait before terminating render (limited to `phantomjs` engine)
- algorithmOpts `Object` - Options for algorithm configuration
    - sort `Boolean` - Enable/disable image sorting by `algorithm`
        - By default, sorting is enabled (`true`)
- engineOpts `Object` - Options for engine configuration
    - imagemagick `Boolean` - Force usage of `imagemagick` over `graphicsmagick` (limited to `gm`)
- cssFormat `String` - Override for format of CSS output
    - Supported values are `css` (CSS), `sass` ([SASS][]), `scss` ([SCSS][]), `scss_maps` ([SCSS][] using [map notation][sass-maps]), `less` ([LESS][]), `stylus` ([Stylus][]), and `json` ([JSON][])
- cssVarMap `Function` - Iterator to customize CSS variable names
    - An example can be found [here][cssvarmap-example]
- cssTemplate `Function|String` - CSS templating function or path to alternative [mustache][] template
    - More information can be found in the [cssTemplate][] section
- cssOpts `Object` - Container for CSS templates
    - functions `Boolean` - Skip output of mixins
    - cssClass `Function` - Iterator to override default CSS selectors
        - An example can be found [here][cssclass-example]

Assuming this, the simpliest task would look like the following:

```
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./src/assets/images/sprite/*.*') // source path of the sprite images
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
            }));

    spriteData.img.pipe(gulp.dest('./built/images/')); // output path for the sprite
    spriteData.css.pipe(gulp.dest('./built/styles/')); // output path for the CSS
});
```

With that we can generate this sprite:

![](long-sprite.png)

It is served with the following CSS code:

```css
/*
Icon classes can be used entirely standalone. They are named after their original file names.

~```html
&lt;i class="icon-home">&lt;/i>
```~
*/
.icon-home {
  background-image: url(sprite.png);
  background-position: 0px 0px;
  width: 16px;
  height: 16px;
}
.icon-home_hover {
  background-image: url(sprite.png);
  background-position: 0px -16px;
  width: 16px;
  height: 16px;
}
.icon-instagram {
  background-image: url(sprite.png);
  background-position: 0px -32px;
  width: 16px;
  height: 16px;
}
.icon-instagram_hover {
  background-image: url(sprite.png);
  background-position: 0px -48px;
  width: 16px;
  height: 16px;
}
.icon-pin {
  background-image: url(sprite.png);
  background-position: 0px -64px;
  width: 12px;
  height: 16px;
}
.icon-pin_hover {
  background-image: url(sprite.png);
  background-position: 0px -80px;
  width: 12px;
  height: 16px;
}
.icon-tras_hover {
  background-image: url(sprite.png);
  background-position: 0px -96px;
  width: 16px;
  height: 16px;
}
.icon-trash {
  background-image: url(sprite.png);
  background-position: 0px -112px;
  width: 16px;
  height: 16px;
}
.icon-user {
  background-image: url(sprite.png);
  background-position: 0px -128px;
  width: 16px;
  height: 16px;
}
.icon-user_hover {
  background-image: url(sprite.png);
  background-position: 0px -144px;
  width: 16px;
  height: 16px;
}
```

### Tweaking

In our project we use [Stylus](http://learnboost.github.io/stylus/) for processing CSS, so it is much more handy to get
a `.styl` file with the variables.<br/>
I use `binary-tree` algorythm to make it more compact. All the variables are prefixed with `s-`, this makes them
recognizable. I switched off generating the mixings and now have them in a separate file. I have created my own CSS
template because the generic variant has too much of redundant code making the file heavier; and I don't use it anyway.

As a result, I get such a sprite:

![](sprite.png)

There are the JavaScript and Stylus code for it:

```js
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./src/assets/images/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                cssTemplate: 'stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('./built/images/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./src/styles/')); // путь, куда сохраняем стили
});
```

```php
$s-book = 16px 0px -16px 0px 16px 16px 80px 64px 'sprite.png';
$s-book_hover = 48px 16px -48px -16px 16px 16px 80px 64px 'sprite.png';
$s-comments = 0px 16px 0px -16px 16px 16px 80px 64px 'sprite.png';
$s-comments_hover = 16px 16px -16px -16px 16px 16px 80px 64px 'sprite.png';
$s-compose = 32px 0px -32px 0px 16px 16px 80px 64px 'sprite.png';
$s-compose_hover = 32px 16px -32px -16px 16px 16px 80px 64px 'sprite.png';
$s-faceboo_hover = 0px 32px 0px -32px 16px 16px 80px 64px 'sprite.png';
$s-facebook = 16px 32px -16px -32px 16px 16px 80px 64px 'sprite.png';
$s-globe = 32px 32px -32px -32px 16px 16px 80px 64px 'sprite.png';
$s-globe_hover = 48px 0px -48px 0px 16px 16px 80px 64px 'sprite.png';
$s-home = 0px 0px 0px 0px 16px 16px 80px 64px 'sprite.png';
$s-home_hover = 48px 32px -48px -32px 16px 16px 80px 64px 'sprite.png';
$s-instagram = 0px 48px 0px -48px 16px 16px 80px 64px 'sprite.png';
$s-instagram_hover = 16px 48px -16px -48px 16px 16px 80px 64px 'sprite.png';
$s-pin = 32px 48px -32px -48px 12px 16px 80px 64px 'sprite.png';
$s-pin_hover = 44px 48px -44px -48px 12px 16px 80px 64px 'sprite.png';
$s-tras_hover = 64px 0px -64px 0px 16px 16px 80px 64px 'sprite.png';
$s-trash = 64px 16px -64px -16px 16px 16px 80px 64px 'sprite.png';
$s-user = 64px 32px -64px -32px 16px 16px 80px 64px 'sprite.png';
$s-user_hover = 64px 48px -64px -48px 16px 16px 80px 64px 'sprite.png';
```

## Usage

Ok, the sprite image has been generated and there is a stylys file of variables, what is next?

The next are mixins which I am not generating. I manually created a separate file for them which is `mixins.styl`. Here
is its content:

```css
spriteWidth($sprite) {
  width: $sprite[4];
}

spriteHeight($sprite) {
  height: $sprite[5];
}

spritePosition($sprite) {
  background-position: $sprite[2] $sprite[3];
}

spriteImage($sprite) {
  background-image: url(../images/$sprite[8]);
}

sprite($sprite) {
  spriteImage($sprite)
  spritePosition($sprite)
  spriteWidth($sprite)
  spriteHeight($sprite)
}
```

The main mixin is `sprite($sprite)`. As `$sprite` I use the needed variable, for example `sprite($s-home)`. It gives
such a result:

```css
background-image:url("../images/sprite.png");
background-position:0 0;
width:16px;
height:16px
```

The mixin enables to define the image sizes which is very useful when using pseudo elements.

Here is the [working example](http://krekotun.github.io/gulp-sprite-generation/).

## Cons

I noticed only one problem since the time I've started to use the solution.<br/>
An icon is blinking when using `:hover` or `:active`. This happens because the `sprite` mixin generates
`background-image` for every case and changes the picture on hover.

After thinking for a while and reading the Stylys' documentation, I have found the solution. We just need to check if a
selector has these pseudo classes. And if they are, we can skip the `spriteImage($sprite)` output.

This is the final version of the mixin:

```js
sprite($sprite)
    if !match('hover', selector()) && !match('active', selector())
        spriteImage($sprite)
    spritePosition($sprite)
    spriteWidth($sprite)
    spriteHeight($sprite)
```

Unfortunately this is not possible to foresee all the cases. Probably there would be some JavaScript code changing a CSS
class. So, we can use `spritePosition($sprite)` if an image was already in use.

## Wrap up

I've been working with this solution for a few months and happy to say that it saves a lot of time. Aim to automate any
routine and use your time the most effectively.

I created a [sample repository](https://github.com/Krekotun/gulp-sprite-generation) for you, you can use it as a dummy
for your project or just explore how it work.

##Links

* [working example](http://krekotun.github.io/gulp-sprite-generation/)
* [sample repository](https://github.com/Krekotun/gulp-sprite-generation)
* [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith)
* [Gulp](http://gulpjs.com/)
