import Debug from 'debug'
import metalsmith from './metalsmith'

const debug = Debug('server-webpack')

metalsmith.build(function (err) {
  if (err) {
    throw err
  }
  debug('Metalsmith build finished!')
})
