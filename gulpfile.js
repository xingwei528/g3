var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var webpackStream = require('webpack-stream')
var webpack = require('webpack')
var WebpackDevServer = require("webpack-dev-server")

function pack(name) {
  var options = {
    'process.env.NODE_ENV': '"production"',
    errorDetails: true,
    debug: false,
    output: {
      path: path.join(__dirname, './public/assets/js'),
      publicPath: "/",
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!less' }
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
  return gulp.src(name === 'mobile' ? './src/mobile/index.js' : './src/index.js')
    .pipe(webpackStream(options))
    .pipe(gulp.dest(name === 'mobile' ? './public/assets/mobile/js' : './public/assets/js'))
}

function dev(name, callback) {
  var options = {
    entry: './' + name + '.jsx',
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
}

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

gulp.task('pack', function(callback) {
  pack('web', callback)
})

gulp.task('pack-mobile', function(callback) {
  pack('mobile', callback)
})

gulp.task('dev', function(callback) {
  dev('src/index', callback)
})

gulp.task('dev-mobile', function(callback) {
  dev('src/mobile/index', callback)
})
