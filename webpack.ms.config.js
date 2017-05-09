module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
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
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  }
};
