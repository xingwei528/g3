var webpack = require('webpack')

module.exports = {
  entry: './src/index.jsx',

  output: {
    path: './public/assets/js',
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!less' }
    ]
  },
  devtool: "sourcemap",
  debug: true
}
