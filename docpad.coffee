# DocPad Configuration File
# http://docpad.org/docs/config

moment = require 'moment'

# Define the DocPad Configuration
docpadConfig = {

plugins:
    rss:
        default:
            collection: 'articles'
    grunt:
        writeAfter: false
        generateAfter: ["shell", "copy"]
    ghpages:
        deployRemote: 'origin'
        deployBranch: 'master'
    moment:
        formats: [
            {raw: 'date', format: 'Do MMMM YYYY', formatted: 'humanDate'}
            {raw: 'date', format: 'YYYY-MM-DD', formatted: 'computerDate'}
        ]
    marked:
        markedRenderer:
            heading: (text, level)->
                anchor = text.toLowerCase().replace(/[^\w]+/g, '-');
                anchor = text.replace /<\/?\w+(?:\s.+?)*>/g, '';
                anchor = anchor
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]/g, '')
                    .toLowerCase()
                "<h#{level} class=\"text-header text-header_lvl_#{level}\" id=\"#{anchor}\"><a href=\"\##{anchor}\" class=\"text-header__anchor\">#{text}</a></h#{level}>"
            paragraph: (text) ->
                "<p class=\"text__p\">#{text}</p>"
            image: (src) ->
                "<img class=\"text-image i-bem\" data-bem='{ \"text-image\": {} }'  src=\"#{src}\"/>"
            code: (text, lang) ->
                params = "{}"
                lang && params = "{ \"lang\": \"#{lang}\"}"
                "<pre class=\"highlight i-bem\" data-bem='{ \"highlight\": #{params} }'><code>#{text}</code></pre>"

templateData:

    site:
        title: 'Frontend Babel'
        description: 'Articles and blog posts from all over the world. Translated INTO English.'
        services:
            disqus: 'frontendbabel'

    cutTag: '<!-- cut -->'

    # Post part before “cut”
    cuttedContent: (content) ->
        if @hasReadMore content
            cutIdx = content.search @cutTag
            content[0..cutIdx-1]
        else
            content

    # Has “cut”?
    hasReadMore: (content) ->
        content and ((content.search @cutTag) isnt -1)

    hlp:
        pageTitle: (document) ->
            switch document.layout
                when 'index' then "Frontend Babel. Articles and blog posts from all over the world"
                else "#{document.title} — Frontend Babel"
        personLink: (person) ->
            if person.site
                "<a href=\"#{person.site}\">#{person.name}</a>"
            else
                person.name
        articleCredits: (article) ->
            "Written by #{@personLink(article.author)}#{@onDate(article.source.date)}; " +
            "translated by #{@personLink(article.translator)}#{@onDate(article.date)}"
        onDate: (date) ->
            if date
                " on " + moment(date).format('Do MMMM YYYY')
            else
                ""
        metaProps: (document) ->
            if document.meta.layout == 'index'
                desc = "Frontend Babel — an online hub for publishing English translations of frontend articles originally written in other languages. Not all authors have time, resources or skills to make an English version of what they write. Other members of the community can change that, contributing their translations and helping the world discover new frontend stars, experts, and innovators. Across boundaries."
            if document.meta.image
                image = document.meta.image
            "" +
            (if desc then "<meta content=\"#{desc}\" property=\"og:description\"/>" else "") +
            (if image then "<meta content=\"#{image}\" property=\"og:image\"/>" else "")

collections:

    pages: (database) ->
        @getCollection('documents').findAllLive({ relativeOutDirPath: 'pages' }).on 'add', (document) ->
            a = document.attributes
            basename = a.basename
            newUrl = "#{basename}.#{a.outExtension}"
            document.set('isPage', true)
            urls = ["/#{newUrl}"]

            layout = a.layout
            if !layout
                layout = 'page'

            document
                .setMetaDefaults({
                    url: urls[0]
                    layout: layout
                })
                .addUrl(urls)
    menu: (database) ->
        @getCollection('pages').findAllLive({ order: $ne: false })

    articles: (database) ->
        @getCollection('documents').findAllLive({ relativeOutDirPath: 'articles' }).on 'add', (document)->
            a = document.attributes

            layout = a.layout
            if !layout
                layout = 'article'

            document
                .setMetaDefaults({
                    layout: layout
                })

            repo = {
                owner: 'frontendbabel'
                name: 'frontendbabel.github.com'
                branch: 'source'
            }

            # Normalize meta info
            document.set({
              author: a.author || {},
              source: a.source || {},
              translator: a.translator || {},
              sourcePath: ['https://github.com', repo.owner, repo.name, 'edit', repo.branch, 'src/documents', a.relativePath].join('/')
            })

env: 'static'

}

# Export the DocPad Configuration
module.exports = docpadConfig
