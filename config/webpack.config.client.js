const path = require('path');
const merge = require('webpack-merge');
const baseCongig = require('./webpack.config.base');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const proConfig = require('../src/share/pro-config');

const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

module.exports = merge(baseCongig, {
  mode: 'development',
  entry: {
    main: ['react-hot-loader/patch', resolvePath('../src/client/client-entry.js')],
  },
  output: {
    filename: '[name].js',
    path: resolvePath('../dist/static'),
    // publicPath: 'http://localhost:' + proConfig.wdsPort + '/'
    publicPath: '/source/'

  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css' //设置名称
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
      '__IS_PROD__': false,
      '__SERVER__': false
    })],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   test: /\.scss$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
        libs: { // 抽离第三方库
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'libs'// 打包后的文件名，任意命名    
        }
      }
    }
  },
  devServer: {
    // proxy: {
    //   '/source/': {
    //     changeOrigin: true,
    //     target: 'http://localhost:' + proConfig.wdsPort + '/',
    //     pathRewrite: {
    //       '^/source': ''
    //     }
    //   }
    //   },
    contentBase: path.resolve(__dirname, 'dist/static')

  
  }
}) 