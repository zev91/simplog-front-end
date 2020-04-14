const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

const proConfig = require('../src/share/pro-config');

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
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              publicPath: 'http://localhost:' + proConfig.wdsPort + '/'
            }
          }]
      },
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HardSourceWebpackPlugin()
  ]
}