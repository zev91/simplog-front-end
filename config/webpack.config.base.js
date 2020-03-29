const path = require('path');
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

module.exports = {
  mode: 'development',
  devtool: "eval-source-map",
  resolve: {
    alias: {
        'config': resolvePath('../config/'),
        'dist': resolvePath('../dist/'),
        'server': resolvePath('../server/'),
        'src': resolvePath('../src/')
      }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}