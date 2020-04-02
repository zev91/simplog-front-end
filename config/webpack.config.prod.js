const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseCongig = require('./webpack.config.base');

const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);
process.env.BABEL_ENV = 'development';//指定 babel 编译环境

module.exports = merge(baseCongig,{
  mode: 'none',
  devtool: 'source-map',
  entry: {
    main: [resolvePath('../src/client/client-entry.js')]
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: resolvePath('../dist/static'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]',
          publicPath: '/'
        }
      }]
    }
    ]
  },

  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash:8].css'
    // }),
    // 清理上一次构建的文件
    new CleanWebpackPlugin(),
    //生成 manifest 方便定位对应的资源文件
    new ManifestPlugin({
      fileName: '../server/asset-manifest.json',
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"'},
      '__IS_PROD__': true,
      '__SERVER__': false
    })
  ],

  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       drop_console: true,
      //       drop_debugger: true
      //     },
      //     warnings: false,
      //     ie8: true,
      //     output: {
      //       comments: false,
      //     },
      //   },
      //   cache: true,
      //   parallel: true,
      //   sourceMap: false
      // }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        libs: { // 抽离第三方库
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'libs'// 打包后的文件名，任意命名    
        }
      }
    },
  },
})