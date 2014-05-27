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
        generateAfter: ["bem", "copy"]

templateData:

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

            document
                .setMetaDefaults({
                    #outPath: newOutPath,
                    url: urls[0]
                })
                .addUrl(urls)

    articles: (database) ->
        @getCollection('documents').findAllLive({ relativeOutDirPath: 'articles' })


env: 'static'

}

# Export the DocPad Configuration
module.exports = docpadConfig
