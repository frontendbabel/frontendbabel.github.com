---
title: Tidying Up Your CSS: A Case Study From Yandex

date: 2014-08-10

source:
  name: Приводим в порядок css-код. Опыт Яндекса
  date: 2014-07-09
  url: http://habrahabr.ru/company/yandex/blog/223503/
  lang: ru

author:
  name: Denis Payase
  site: http://habrahabr.ru/company/yandex/blog/223503/
  github: L0stSoul
  linkedin: http://ru.linkedin.com/pub/denis-payase/70/633/169

translator:
  name: Max Shirshin
  github: ingdir
  twitter: ingdir

meta:
  desc: >
    Denis "Beyondtheclouds" Payase describes a tool that keeps CSS codestyle and codebase aligned, based
    on his experience at Yandex, one of the largest Russian IT companies.

---

I work on a huge project — in fact, on nothing else than the Yandex SERP (Search Engine Results Page).
As in any other large project, people here work with enourmously huge chunks of CSS code; a separate developer team does the maintenance.

When different people create and edit CSS using different tools and approaches, the resulting code becomes complicated, messy and inconsistent. For example, different developers apply different order for vendor prefixes, some of them omit quotes around urls while others don't. I could even imagine that in a hotfix rush, one could add something like `position: relative` to a rule set which already has `position: absolute` buried deep inside between other definitions... a happy debugging session guaranteed!

Regarldess of the aforementioned problems, our CSS repository shines with consistent code style and looks perfect, all of it.

How do we do it?

<!-- cut -->

## The first steps

When you want your code to follow some code style, the most obvious solution would be to find a Big Boss who would say: "do this and that, follow the rules, effective immediately", and punish everyone who deviates from it in the code review process. This sounds promising but does not really work:

  * We are all humans prone to errors, and memorizing the exact order of CSS rules is really difficult;
  * Code review process turns into a codestyle discussion, while its original purpose is to improve architecture and logic;
  * All mistakes have to be fixed manually, all edge cases meticulously described in code style documentation.

This doesn't look good, takes lots of time, and frustrates developers. We had to find an alternative solution to make developers happy, and we had found it.

## Robots are our friends

We already had a friendly robot, an old tool called [CSScomb](http://habrahabr.ru/post/149998/) capable of solving our core problem: sorting CSS properties in a given order. However, it had some critical disadvantages:

  * sorting was the only thing it could do,
  * was created with PHP and regexp-based parsers,
  * and could not be extended.

While PHP is more popular in the frontend world compared to, say, C++, this wasn't exactly the technology we wanted to employ.

It was when [mishanga](http://habrahabr.ru/users/mishanga/), a developer from our team, decided to improve the existing tool. He wanted it to be a full-featured and extensible tool written in JS. While Yandex developers still actively participate in CSScomb.js development, it has evolved into an open source project beyond Yandex borders.

Let me introduce [CSScomb.js](https://github.com/csscomb/csscomb.js) — a new version of the good old CSSComb, capable of some nice magic.

## How does it looks like?

Here's an example: let's suppose we want to commit this piece of code (for educational purposes only!)

```css
.block {
-webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
-moz-box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
z-index: 2;
position: absolute;
height: 2px;
width: 2px;
color: #FFFFFF;
}
```

The code doesn't look nice and doesn't follow the code style, so the commit is prevented, and a message appears instead:

```
% git commit block.css -m"Add My awesome css"

Code style errors found.
! block.css
```

Such a file cannot be committed because there is a git commit hook defined in our repo, which uses CSScomb to check all the CSS file changes we want to commit. It work in a "linter" mode and is quite smart, so checks only the actual changes introduced and not everything.

After we see that message, we just ask CSScomb.js to help us fix the problem:

```
% csscomb block.css
```

This time, it gets better:

```css
.block
{
    position: absolute;
    z-index: 2;

    width: 2px;
    height: 2px;

    color: #fff;
    -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
       -moz-box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
            box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
}
```

The tool did a lot of atomic changes and adjustments: moved the curly bracket on a new line, lowercased the color, aligned indentation for the vendor prefixes, and rearranged the properties to follow the styleguide order. This code successfully passes the automated check and proceeds to the code review where its quality and functionality will be assessed.

The developer didn't have to think about following the CSS styleguide, he just wrote the code the way he liked it, while the rest is automated. This is exactly what we wanted to achieve.

## Magic inside

This system consists of two parts: the CSScomb itself and a pre-commit hook that uses it. I'll give more details on the hook later, and now let's see how CSSComb.js is designed.

CSScomb.js is founded on two things: a plugin system, and a CSS-parser named [gonzales-pe](https://github.com/tonyganch/gonzales-pe) which is a really quite tool supporting not only pure CSS but also preprocessors such Sass or LESS.

The parser parses the CSS code and builds an AST (Abstract Syntax Tree) on top of it. For example, this piece of CSS:

```css
.block
{
     position: absolute
}
```

will generate the following AST:

```
[ "stylesheet",
  [ "ruleset",
    [ "selector",
      [ "simpleselector",
        [ "class", [ "ident", "block" ] ],
        [ "s", "\n" ]
      ]
    ],
    [ "block",
      [ "s", "\n    " ],
      [ "declaration",
        [ "property", [ "ident", "position" ] ],
        [ "propertyDelim" ],
        [ "value", [ "s", " " ], [ "ident", "absolute" ] ]
      ],
      [ "s", "\n" ]
    ]
  ],
  [ "s", "\n" ]
]
```

This format is too complex to be read by a human, but at the same time it's notably suitable for automated processing performed by [plugins](https://github.com/csscomb/csscomb.js/tree/master/lib/options) which are responsible for all the subsequent transformations. The plugins do not interact with the "raw" CSS code directly, but only with the AST. A separate configuration file defines which plugins should be used.

In the example above I intentionally omitted a semicolon after `absolute`. A plugin that detects and correct missing semicolons could notice and fix that by modifying the AST tree (here you only see the relevant part of the tree):

```
...
    [ "block",
      [ "s", "\n    " ],
      [ "declaration",
        [ "property", [ "ident", "position" ] ],
        [ "propertyDelim" ],
        [ "value", [ "s", " " ], [ "ident", "absolute" ] ]

      ],
      >>>[ "declDelim" ],<<<
      [ "s", "\n" ]
...
```

After all the plugins finish the processing, the same `gonzales-pe` tool transforms AST back into CSS code, and the previously skipped semicolon can now be found in the appropriate place:

```css
.block
{
     position: absolute;
}
```

## Getting started with CSSComb

### Step 1

Add CSScomb.js to your project dependencies. 
If your project uses npm, add it to `devDependencies` in the `package.json` file:

```
{
  ...
  "devDependencies": {
    ...
    "csscomb": "2.0.4",
    ...
  }
  ...
}
```

### Step 2

For the plugins to postprocess your code, a [plugin configuration file](https://github.com/csscomb/csscomb.js/blob/master/doc/configuration.md) has to be placed in the project root. Learn more about each plugin and its options [here](https://github.com/csscomb/csscomb.js/blob/master/doc/options.md). 

CSScomb.js can automate this process (up to a certain extent) by generating a config file based on an existing CSS file.

```
csscomb -d example.css > .csscomb.json
```

All the plugins can be configured in this way, the only exception being the property sorting plugin that requires the sorting to be described manually (or copy it from anywhere else).

### Step 3

We have to make CSScomb.js run in a linter mode before the commit in the same way as jscs/jshint-groups or similar tools do. In a Linux/BSD based environment it can look like this:

```
#!/usr/bin/env bash

PATCH_FILE="working-tree.patch" 
NPM_BIN="./node_modules/.bin"

function cleanup {
    exit_code=$?
    if [ -f "$PATCH_FILE" ]; then
        patch -p0 < "$PATCH_FILE"
        rm "$PATCH_FILE"
    fi
    exit $exit_code
}

# Cleaning up after exit
trap cleanup EXIT SIGINT SIGHUP

# Creating a patch
git diff > "$PATCH_FILE" --no-prefix
# Drop unstaged changes
git checkout -- .

# getting a list of files which we are about to commit
git_cached_files=$(git diff --cached --name-only --diff-filter=ACMR | xargs echo)
if [ "$git_cached_files" ]; then
    # running CSScomb.js
    $NPM_BIN/csscomb -v -l $git_cached_files || exit 1
fi
```

Why can't we just run CSSComb.js in the correction mode right away, and automatically commit the result? This works fine in most cases, except for the case when we make several changes in the same file but only want to commit one of those (`git add -p`). If we find an error in that file version we are going to commit, these problems may occur:
  * We could run CSScomb.js on the file version we are going to commit and get conflicts applying toe patch
  * We could run CSScomb.js on the etire file, but the changes we do not yet want to commit can contain anything, even broken code.

In general, it might be annoying when a file changes "by itself". Thus, we decided that CSScomb.js should be run by the developer himself.

## Ready, steady, go!

That's it! Now CSScomb.js won't let in any non-compliant code, and code formatting is fast and automated.
This is how a simple tool keep your CSS organized and saves developers' time.

Don't feel like out-of-the-box capabilities are enough for you? Create an issue, or [contribute](https://github.com/csscomb/csscomb.js/pulls) your own solution.


