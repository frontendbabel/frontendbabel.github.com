---
title: How to contribute
---

# How to contribute

**Frontend Babel** is an open source project publically
[hosted on Github](https://github.com/frontendbabel/frontendbabel.github.com).
You are very welcome to make a pull request, send a patch and create issues!

Here are some ideas on what could be your contribution:
* [Add new source article into our task
  queue](https://github.com/frontendbabel/frontendbabel.github.com/issues/new)<br/>
If you know an interesting article worth to be published, create an issue about it. So another
contributer can grab this taks and translate it.
* [Push new translations](#push-new-translation)<br/>
Find a nice article in a language you know, translate it into English and publish at this website.
* **Tell friends about the project**<br/>
With mentioning this project in social networks and your blog posts you can involve people from
all over the world!
* Fix English in the texts<br/>
If you spotted a grammar error, you can edit an article (the is a link to editor below) and propose
your pull request.
* Propose site changes<br/>
Suggest what can be improved in this web site with adding your ideas in [the list of
issues](https://github.com/frontendbabel/frontendbabel.github.com/issues?labels=%40+Translation&state=open).
* [Grab an issue to do](https://github.com/frontendbabel/frontendbabel.github.com/issues?labels=&page=1&state=open)<br/>
With your concern this web site can be improved a lot :-)

## Push new translation

If you are ready to push new translation, then
1. [Set up the project locally](#set-up-the-project-locally)
1. [Add an article text](#workign-with-articles-texts)
1. Make a pull request with your changes to an original repo

If you only want to suggest an article for future translation,
[create an issue](https://github.com/frontendbabel/frontendbabel.github.com/issues/new).

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
