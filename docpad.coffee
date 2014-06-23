# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {

plugins:
    rss:
        default:
            collection: 'articles'
    grunt:
        writeAfter: false
        generateAfter: ["shell", "copy"]
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
                "<h#{level} class=\"text-header text-header_lvl_#{level}\"><a href=\"\##{anchor}\" class=\"text-header__anchor\">#{text}</a></h#{level}>"
            paragraph: (text) ->
                "<p class=\"text__p\">#{text}</p>"

templateData:

    site:
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

            # Normalize meta info
            document.set({
              author: a.author || {},
              source: a.source || {},
              translator: a.translator || {}
            })

env: 'static'

}

# Export the DocPad Configuration
module.exports = docpadConfig
