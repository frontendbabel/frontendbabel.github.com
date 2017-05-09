import { join } from 'path'

import Webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

import paths from './paths'

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const __EXTRACT__ = process.env.NO_EXTRAXT !== '1'

let cssLoaderOptions = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
      localIdentName: '[name]__[local]___[hash:base64:5]'
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: function() {
        return [
          require('precss')
        ];
      }
    }
  }
]

if (!__EXTRACT__) {

  cssLoaderOptions.unshift({
    loader: 'style-loader'
  })

}

let cssLoader = {
    test: /\.css$/
}

if (__EXTRACT__) {
  cssLoader.loader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: cssLoaderOptions
  })
} else {
  cssLoader.use = cssLoaderOptions
}

const config = {
  entry: {
    head: join(paths.webpackSource, 'js', 'head.js'),
    page: join(paths.webpackSource, 'js', 'page.js'),
    styles: join(paths.webpackSource, 'css', 'page.css'),
    posts: join(paths.projectRoot, 'src', 'templates', 'Posts.js'),
    post: join(paths.projectRoot, 'src', 'templates', 'Post.js')
  },
  devtool: __DEV__ ? '#cheap-module-eval-source-map' : false,
  output: {
    path: paths.webpackDestination,
    publicPath: paths.webpackPublicPath,
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['es2015', 'react', 'stage-0']
            }
          }
        ]
      },
      cssLoader,
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'page-[hash].css',
      allChunks: true
    }),
    new AssetsPlugin({
      path: paths.webpackDestination,
      prettyPrint: __DEV__
    }),
    // Make sure everything is written to disk in dev, otherwise metalsmith would fail
    new WriteFilePlugin({
      test: /\.json$/,
      log: false
    }),
    new Webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new CopyWebpackPlugin([
      {
        from: join(paths.projectRoot, 'src', 'assets',  'favicon.ico'),
        to: paths.webpackDestination
      }
    ])
  ]
}

if (__DEV__) {
  config.plugins.push(new Webpack.optimize.CommonsChunkPlugin({
    name: 'loader',
    chunks: ['head', 'page', 'styles']
  }))
}

if (__PROD__) {
  config.plugins.push(new Webpack.LoaderOptionsPlugin({
    minimize: true
  }))
  config.plugins.push(new Webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new Webpack.optimize.AggressiveMergingPlugin())
  config.plugins.push(new Webpack.optimize.UglifyJsPlugin())
}

export default config
