var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var gulp = require('gulp');
var webpack = require('webpack')
var WebpackDevServer = require("webpack-dev-server")
import * as fslib from './fslib'

gulp.task('dev', function(callback) {
  fslib.mdToJSON('./data');
  var options = {
    entry: './src/index.jsx',
    output: {
      path: path.join(__dirname, './public/assets/js'),
      publicPath: "/",
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['react']
          }
        }
      ]
    },
    devtool: "sourcemap",
    debug: true
  }
  var port = 9393

  var compiler = webpack(options)
  return new WebpackDevServer(compiler, {
    stats: {
      colors: true
    },
    historyApiFallback: true
  }).listen(port, "localhost", function(err) {
    if (err) throw err
    callback()
  })
})

gulp.task('sample', function(callback) {
  var options = {
    entry: './huge-apps/app.js',
    output: {
      path: path.join(__dirname, './public/assets/js'),
      publicPath: "/",
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['react']
          }
        }
      ]
    },
    devtool: "sourcemap",
    debug: true
  }
  var port = 3030

  var compiler = webpack(options)
  return new WebpackDevServer(compiler, {
    stats: {
      colors: true
    },
    historyApiFallback: true
  }).listen(port, "localhost", function(err) {
    if (err) throw err
    callback()
  })
})
