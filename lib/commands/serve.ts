var express = require('express')
var path = require('path')
var compression = require('compression')
var fs = require('fs-extra')
import * as models from '../models'
import * as fslib from '../fslib'

export function serve(appPath) {
  const config: models.Config = fslib.getConfig(appPath, 'serve')

  var app = express()
  app.use(compression())

  // serve our static stuff like index.css
  app.use(express.static(config.destination))

  var PORT = process.env.PORT || 9393
  app.listen(PORT, function() {
    console.log('G3 Production server running at localhost:' + PORT)
  })
}
