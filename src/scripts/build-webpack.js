import webpack from 'webpack'
import Debug from 'debug'

const debug = Debug('server-webpack')
import webpackConfig from '../config/webpack'

function displayStats (stats) {
  debug(stats.toString({colors: true}))
}

webpack(webpackConfig, function (err, stats) {
  if (err) {
    throw err
  }

  const jsonStats = stats.toJson()
  if (jsonStats.errors.length > 0) {
    displayStats(stats)
    throw new Error('Webpack build failed!')
  }

  if (jsonStats.warnings.length > 0) {
    console.error(jsonStats.warnings)
  }

  displayStats(stats)
  debug('Webpacked build finished!')
})
