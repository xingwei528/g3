var express = require('express')
var compression = require('compression')
import * as models from '../../models'
import * as lib from '../../lib'
import * as application from '../../application'
import * as commands from '../'

export function serve(appPath) {
  const g3Config: models.G3Config = application.getG3Config(appPath, 'serve')
  if (!lib.isDirectory(g3Config._destinationPath)) {
    commands.build(appPath)
  }

  var app = express()
  app.use(compression())

  app.use(express.static(g3Config._destinationPath))

  var PORT = g3Config.port || 9393

  app.listen(PORT, function() {
    console.log('G3 Production server running at localhost:' + PORT)
  })
}
