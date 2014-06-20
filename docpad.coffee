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

events:
    renderDocument: (opts) ->
        {extension,file} = opts
        if file.type is 'document' and extension is 'html'
            opts.content = opts.content.replace /<((h(\d)).*?)>(.+?)<\/\2>/g, (str, fulltag, name, level, header) ->
                if /<a\s+[^>]*class="text-header__anchor/.test(header)
                    return str
                # add class
                if !fulltag.match(/class=/)
                    fulltag += " class='text-header text-header_lvl_#{level}'"
                idRe = /^.*?id=('|")(.+?)\1.*?$/g
                if fulltag.match(idRe)
                    anchor = fulltag.replace idRe, (fulltag, quote, id) ->
                        id
                else
                    anchor = ''
                if anchor == ''
                    anchor = header.replace /<\/?\w+(?:\s.+?)*>/g, '';
                    anchor = anchor
                        .trim()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-]/g, '')
                        .toLowerCase()
                    fulltag += "id='##{anchor}'"
                "<#{fulltag}><a href=\"\##{anchor}\" class=\"text-header__anchor\"></a>#{header}</#{name}>"

env: 'static'

}

# Export the DocPad Configuration
module.exports = docpadConfig
