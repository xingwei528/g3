var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var gulp = require('gulp');
var webpack = require('webpack')
var webpackStream = require('webpack-stream')
var WebpackDevServer = require("webpack-dev-server")
import * as models from './models'
import * as fslib from './fslib'

gulp.task('demo-build', function(callback) {
  const config: models.Config = fslib.getConfig('./demo')
  fslib.removeSync(config.destination)
  fslib.copyAppFiles(config)

  fslib.parse(config, () => {
    var options = {
      'process.env.NODE_ENV': '"production"',
      errorDetails: true,
      debug: false,
      output: {
        path: path.join(config.destination, './assets/js'),
        publicPath: "assets/js/",
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
      externals: {
          // require("jquery") is external and available
          //  on the global var jQuery
          "electron": "electron"
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
      ]
    }
    return gulp.src(path.join(config._g3Path, 'app.jsx'))
      .pipe(webpackStream(options))
      .pipe(gulp.dest(path.join(config.destination, './assets/js')))
  })
})

gulp.task('demo-run', function(callback) {
  const config: models.Config = fslib.getConfig('./demo')
  fslib.parse(config, () => {
    var options = {
      entry: path.join(config._g3Path, '/app.jsx'),
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
})
