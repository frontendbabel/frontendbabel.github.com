const { resolve, join } = require('path')

const projectRoot = resolve(__dirname, '..', '..')

module.exports = {
  projectRoot,
  distribution: join(projectRoot, 'dist'),
  metalsmithSource: 'content',
  metalsmithDestination: join('dist', 'site'),
  webpackSource: join(projectRoot, 'src', 'assets'),
  webpackDestination: join(projectRoot, 'dist', 'assets'),
  webpackPublicPath: '/assets/',
  serverRoot: join(projectRoot, 'dist', 'site')
}
