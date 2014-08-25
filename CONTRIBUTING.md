# How to contribute

**Frontend Babel** is an open source project publicly
[hosted on Github](https://github.com/frontendbabel/frontendbabel.github.com).
You are very welcome to make a pull request, send a patch and create issues!

Here are some ideas on what could be your contribution:
* [Add new source article into our task
  queue](https://github.com/frontendbabel/frontendbabel.github.com/issues/new)<br/>
If you know an interesting article worth to be published, create an issue about it. So another
contributor can grab this task and translate it.
* [Push new translations](#push-new-translation)<br/>
Find a nice article in a language you know, translate it into English and publish at this website.
* **Tell friends about the project**<br/>
By mentioning this project on social networks and in your blog posts you can involve people from
all over the world!
* Fix English in the texts<br/>
If you spotted a grammar error, you can edit the article (there is a link to the editor below) and propose
your pull request.
* Propose site changes<br/>
Suggest what can be improved in this website by adding your ideas to [the list of
issues](https://github.com/frontendbabel/frontendbabel.github.com/issues?labels=%40+Translation&state=open).
* [Grab an issue to do](https://github.com/frontendbabel/frontendbabel.github.com/issues?labels=&page=1&state=open)<br/>
With your help this website can be improved a lot :-).

## Push new translation

If you are ready to push the new translation, then
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

## Working with articles' texts
Articles' sources are stored in the `src/documents/articles/` directory. To add a new article
create a new `<article-name>` folder, place `index.html.md` file and start.

The articles are written with Markdown. Explore [an
example](https://github.com/frontendbabel/frontendbabel.github.com/blob/source/src/documents/articles/graphical-interface/index.html.md)
to learn the structure.

### Provide credits
You need to provide meta information about the original source, its author and translator, like the following:

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
to recognize and promote people. It is nice if you contact the original author of the article and get his or her permission.

### Provide meta information
It is recommended to provide meta information which makes an article more attrative when sharing link to it in social
networks.

You might want to give an article short description. For this declare `meta.desc` property. Use `>` operator for long
strings.

```md
meta:
  desc: >
    Hugo Domingo, a freelance developer shares his experiments in SVG animation.
    Currently being supported by all the popular browseres this feature enables
    us to create stunning web effects.
```

Besides description, you can provide thumbnail and so make an article snippet more noticeable. To do this place a
thumbnail into article source folder named as `thumb.png` (`jpg` and 'gif' are also possible extensions). You also can
provide an URL to a third party resource with an image using `meta.thumb` property. However it is recommended to store
thumbnails with articles.
