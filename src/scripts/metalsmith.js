import Metalsmith from 'metalsmith'
import watch from 'metalsmith-watch'
import markdown from 'metalsmith-markdownit'
import assets from 'metalsmith-assets'
import metadata from 'metalsmith-collection-metadata'
import permalinks from 'metalsmith-permalinks'
import collections from 'metalsmith-collections'
import mPaths from 'metalsmith-paths'
import copy from 'metalsmith-copy'
import reactTemplates from 'metalsmith-react-templates'

import paths from '../config/paths'

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const devOnly = (plugin, config) => {
  return __DEV__ ? plugin(config) : (files, metalsmith, done) => {
    done()
  }
}

export default new Metalsmith(paths.projectRoot)
  .clean(__PROD__)
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(mPaths({
    property: "paths"
  }))
  .use(copy({
    pattern: '*.md',
    move: true,
    transform: f => {
      if (f.match(/^index.md/i)) {
        return f
      }
      var fileName = f.split('.md')[0]
      return `${fileName}/index.md`
    }
  }))
  .use(devOnly(watch, {
    livereload: true,
    invalidateCache: true
  }))
  .use(collections({
    all: {
      pattern: ['**/*.md']
    }
  }))
  .use(collections({
    articles: {
      pattern: ['articles/*/*.md'],
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(metadata({
    'all': {
      texts: require('../config/texts')
    },
    'articles': {
      rtemplate: 'Post.js',
      documentType: 'article',
      texts: require('../config/texts')
    }
  }))
  .use(permalinks({
    pattern: ':title',
    relative: false
  }))
  .use(markdown({
    html: true
  }))
  .use(reactTemplates({
    pattern: '**/*.html',
    babel: true,
    directory: 'src/templates',
    baseFile: 'base.html',
    defaultTemplate: 'Page.js',
    requireIgnoreExt: ['.css'],
    extension: null,
    static: true
  }))
  .use(assets({
    source: './dist/assets',
    destination: './assets'
  }))
  // Inject webpack bundles into your html.
  // Relies on <!-- assets-head --> & <!-- assets-body --> placeholders.
  .use((files, metalsmith, done) => {
    const assets = JSON.parse(files['assets/webpack-assets.json'].contents.toString())

    const assetsHead = []
    if (assets.hasOwnProperty('loader')) {
      assetsHead.push(`<script src="${assets.loader.js}"></script>`)
      delete assets.loader
    }

    if (assets.hasOwnProperty('styles')) {
      if (assets.styles.hasOwnProperty('css')) {
        assetsHead.push(`<link rel="stylesheet" href="${assets.styles.css}"/>`)
      } else {
        assetsHead.push(`<script src="${assets.styles.js}"></script>`)
      }

      delete assets.styles
    }

    assetsHead.push(`<script src="${assets.head.js}"></script>`)
    delete assets.head

    const assetsBody = Object.keys(assets).map((asset) => {
      return `<script src="${assets[asset].js}"></script>`
    })

    if (__DEV__) {
      assetsBody.push('<script src="http://localhost:35729/livereload.js"></script>')
    }

    for (let fileName in files) {
      const file = files[fileName]

      if (!/\.html$/.test(fileName)) {
        continue
      }

      const html = file.contents.toString()
        .replace('<!-- assets-head -->', assetsHead.join('\n'))
        .replace('<!-- assets-body -->', assetsBody.join('\n'))

      file.contents = new Buffer(html)
    }

    done()
  })
