---
title: How to contribute
---

# How to contribute

The code of this project and articles source is open and hosted publically on GitHub. Thus, everyone
can contribute with Pull Requests to the original repository.

## Push new translation

If you are ready to push new translation, then
1. [Set up the project locally](#set-up-the-project-locally)
1. [Add an article text](#workign-with-articles-texts)
1. Make a pull request with your changes to an original repo

## Set up the project locally
1. Fork [the original repository](https://github.com/frontendbabel/frontendbabel.github.com)
1. Clone your repository and run:
  ```bash
git clone <your-fork-adress> frontendbabel
cd frontendbabel
npm install
docpad run
  ```
You will need to have `docpad` installed on your computer. Follow their [installation
guide](http://docpad.org/docs/install).
1. Open (http://0.0.0.0:9778/) to see your project copy.

## Working with articles texts
Articles sources are stored in `src/documents/articles/` directory. To add a new article
create new `<article-name>.html.md` file and start.

The articles are written with markdown. Explore [an
example](https://github.com/frontendbabel/frontendbabel.github.com/blob/source/src/documents/articles/graphical-interface.html.md)
to learn the structure.

### Provide creadits
You need to provide meta information about the original source, its author and translator like following:

```md
source:
  name: Название статьи
  url: http://blog.author-site.name/article
  lang: RU

author:
  name: Ivan Ivanov
  site: http://blog.author-site.name/
  twitter: ivan
  github: awesomeivan

translator:
  name: Anna Smith
  site: http://anna.me/
  twitter: annaanna
  github: annasmith
```
Information about author's and translator's social network accounts is optional. However we recommend to provide it
as it might be good for the people's promotion. This will be nice if you contact an author of your article and come to
an agreement.
