const path = require('path');
const webpack = require('webpack');
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

module.exports = {
  mode: 'development',
  devtool: "eval-source-map",
  resolve: {
    alias: {
        'config': resolvePath('../config/'),
        'dist': resolvePath('../dist/'),
        'server': resolvePath('../server/'),
        'src': resolvePath('../src/'),
        'utils': resolvePath('../src/utils/'),
        'styles': resolvePath('../src/styles/'),
      }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
}