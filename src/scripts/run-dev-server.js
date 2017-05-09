import http from 'http'
import Debug from 'debug'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'

import metalsmith from './metalsmith'
import webpackConfig from '../config/webpack'
import paths from '../config/paths'

function buildMetalsmith () {
  debug('Rebuildung Metalsmith')

  metalsmith.build((err) => {
    if (err) {
      throw err
    }
    debug('Metalsmith build finished! Reloading pages.')
    callLiveReload()
  })
}

function callLiveReload () {
  http.get('http://localhost:35729/changed?files=*.html')
}

const debug = Debug('server')
const app = express()
let lastWebpackHash = null

const webpackCompiler = webpack(webpackConfig)
const webpackMiddlewareInstance = webpackMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: false,
  stats: false
})

webpackCompiler.plugin('done', (stats) => {
  console.log('--- Webpack Stats: ---')
  console.log(stats.toString({colors: true, chunks: false}))
  console.log('------')

  if (stats.hash !== lastWebpackHash) {
    buildMetalsmith()
    lastWebpackHash = stats.hash
    return
  }

  debug('Webpack build finished! Reloading pages.')
  callLiveReload()
})

app.use(webpackMiddlewareInstance)
app.use(express.static(paths.serverRoot))

app.listen(3000, function () {
  debug('Development server startet at http://localhost:3000')
})
