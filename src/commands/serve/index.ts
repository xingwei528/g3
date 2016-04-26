var express = require('express')
var compression = require('compression')
import * as models from '../../models'
import * as fslib from '../../fslib'
import * as commands from '../'

export function serve(appPath) {
  const config: models.Config = fslib.getConfig(appPath, 'serve')
  if (!fslib.isDirectory(config.destination)) {
    commands.build(appPath)
  }

  var app = express()
  app.use(compression())

  app.use(express.static(config.destination))

  var PORT = config.port || 9393

  app.listen(PORT, function() {
    console.log('G3 Production server running at localhost:' + PORT)
  })
}
