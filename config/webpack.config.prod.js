const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseCongig = require('./webpack.config.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);
process.env.BABEL_ENV = 'development';//指定 babel 编译环境

module.exports = merge(baseCongig,{
  performance: {
    hints: false
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: {
    main: [resolvePath('../src/client/client-entry.js')]
  },
  output: {
    filename: 'js/bcdn-[name].[chunkhash:8].js',
    path: resolvePath('../dist/static'),
    publicPath: '/blog-cdn/'
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
          name: 'img/bcdn-[name].[hash:8].[ext]',
          publicPath: '/blog-cdn/'
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
    }),
    new BundleAnalyzerPlugin(
      {
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      }
  ),
  new CompressionPlugin({
    filename: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
})
  // new UglifyJsPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
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