import * as path from 'path'
import * as fs from 'fs'
import * as fse from 'fs-extra'

import * as models from '../models'
import * as fslib from './'

export function getConfig(appPath: string, command: string): models.Config {
  appPath = path.resolve(appPath)
  const config: models.Config = JSON.parse(fse.readFileSync(path.join(appPath, 'g3.json')).toString())
  config._appPath = appPath
  config._g3Path = path.join(appPath, '.g3')
  config._command = command
  if (!config.source) {
    config.source = "./src"
  }
  if (!config.destination) {
    config.destination = "./public"
  }
  config.source = path.join(config._appPath, config.source)
  config.destination = config._command === 'run' ? path.join(config._g3Path, 'public') : path.join(config._appPath, config.destination)

  if (!config.history) {
    config.history = "browserHistory"
  }

  config._files = []
  config._directories = []
  fs.readdirSync(config._appPath).forEach((p: string) => {
    if (fslib.isFile(path.join(config._appPath, p))) {
      config._files.push(p)
      if (p === 'index.html') {
        config._indexContent = fslib.readFileSync(path.join(config._appPath, p))
      }
    } else if (fslib.isDirectory(path.join(config._appPath, p))) {
      config._directories.push(p)
    }
  })

  return config
}
