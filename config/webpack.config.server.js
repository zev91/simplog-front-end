const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const baseCongig = require('./webpack.config.base');

const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

process.env.BABEL_ENV = 'node';//设置 babel 的运行的环境变量

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseCongig, {
  target: 'node',
  mode: 'development',
  entry: resolvePath('../src/server/app/index.js'),
  output: {
    filename: 'app.js',
    path: resolvePath('../dist/server')
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: `"${process.env.NODE_ENV}"`},
        '__IS_PROD__':isProd,
        '__SERVER__': true
    })
  ]
})