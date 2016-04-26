import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'

import * as models from '../../models'
import * as fslib from '../'

export function parse(config: models.Config): Array<models.SourceDir> {
  let sourceDirs: Array<models.SourceDir> = []

  if (!fslib.isDirectory(config.source)) return sourceDirs
  if (!fslib.prepareG3(config)) return sourceDirs

  fslib.copySync(config.source, config._g3Path)

  if (!fslib.isFile(path.join(config._g3Path, models.Const.FILE_APP) + '.jsx') && !fslib.isFile(path.join(config._g3Path, models.Const.FILE_APP) + '.html')) {
    let appJS = `const React = require('react');
    const ReactDOM = require('react-dom');
    const router = require('react-router');
    const config = require('./config');
    ReactDOM.render(
      <router.Router history={router.` + config.history + `} routes={config}/>,
      document.getElementById('` + models.Const.DOM_REACT_ROOT + `')
    );`

    fslib.write(path.join(config._g3Path, models.Const.FILE_APP + '.jsx'), appJS)
  }

  fslib.getSourceDirs(config, config.source, sourceDirs, true)

  sourceDirs.forEach((sourceDir: models.SourceDir) => {
    const configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS)
    const configContent = fslib.getConfigJSContent(config, sourceDir)
    fslib.write(configPath, configContent)

    sourceDir.filenames.forEach((filename: string) => {
      if (path.extname(filename) === '.html') {
        const htmlPath = path.join(config._g3Path, sourceDir.key, filename)
        const jsxPath = path.join(config._g3Path, sourceDir.key, filename.substring(0, filename.lastIndexOf('.')) + '.jsx')
        const html = fslib.readFileSync(htmlPath)
        const jsx = fslib.createReactComponent(html)
        fslib.write(jsxPath, jsx)
      }
    })
  })
  fslib.writeDATA(config)
  return sourceDirs
}
