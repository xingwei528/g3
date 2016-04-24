import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'

import * as models from '../../models'
import * as fslib from '../'

export function parse(config: models.Config, callback: (sourceDirs: Array<models.SourceDir>) => void) {
  fslib.copySync(config.source, config._g3Path)

  const appPath = path.join(config._g3Path, models.Const.FILE_APP_JSX)
  if (!fslib.isFile(appPath)) {
    let appJS = `const React = require('react');
    const ReactDOM = require('react-dom');
    const router = require('react-router');
    const config = require('./config');
    ReactDOM.render(
      <router.Router history={router.` + config.history + `} routes={config}/>,
      document.getElementById('` + models.Const.DOM_REACT_ROOT + `')
    );`

    fslib.write(appPath, appJS)
  }

  let sourceDirs: Array<models.SourceDir> = []

  fslib.parseDir(config, config.source, sourceDirs, true)

  sourceDirs.forEach((sourceDir: models.SourceDir) => {
    const configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS)
    const configContent = fslib.getConfigJSContent(config, sourceDir)
    fslib.write(configPath, configContent)
  })
  fslib.writeDATA(config)
  callback(sourceDirs)

  // fse.walk(config.source).on('readable', function () {
  //   var item
  //   while (item = this.read()) {
  //     const filepath = item.path
  //     if (fslib.isDirectory(filepath)) {
  //       const dirpath = filepath
  //       const dirname = path.basename(dirpath).toLowerCase()
  //       const sourceDir = new models.SourceDir()
  //       sourceDir.key = fslib.pathRelative(config.source, dirpath)
  //       const pathParent = fslib.pathParent(sourceDir.key)
  //       let parentSourceDir: models.SourceDir = null
  //       parentSourceDir = _.find(sourceDirs, (s: models.SourceDir) => {
  //         return s.key === pathParent;
  //       });
  //       if (parentSourceDir) {
  //         if (parentSourceDir.includes) {
  //           if (parentSourceDir.includes.indexOf(dirname) === -1) {
  //             continue
  //           }
  //         } else if (parentSourceDir.excludes) {
  //           if (parentSourceDir.excludes.indexOf(dirname) !== -1) {
  //             continue
  //           }
  //         }
  //         parentSourceDir.dirnames.push(dirname)
  //       }
  //
  //       if (fslib.isFile(path.join(dirpath, models.Const.FILE_CONFIG_JSON))) {
  //         let configJSON: models.ConfigJSON = null
  //         try {
  //           configJSON = JSON.parse(fse.readFileSync(path.join(dirpath, models.Const.FILE_CONFIG_JSON)).toString())
  //         } catch(e) {
  //           console.log(e)
  //         }
  //         if (configJSON) {
  //           sourceDir.path = configJSON.path
  //           sourceDir.layout = configJSON.layout
  //           sourceDir.includes = configJSON.includes
  //           sourceDir.excludes = configJSON.excludes
  //         }
  //       }
  //       if (sourceDir.path === undefined) {
  //         if (parentSourceDir) {
  //           sourceDir.path = fslib.pathJoin(parentSourceDir.path, dirname)
  //         } else {
  //           sourceDir.path = sourceDir.key
  //         }
  //       }
  //
  //       sourceDir.filenames = []
  //       sourceDir.dirnames = []
  //       sourceDirs.push(sourceDir)
  //     } else if (fslib.isFile(filepath)) {
  //       const key = fslib.pathRelative(config.source, path.dirname(filepath))
  //       const theSourceDir: models.SourceDir = _.find(sourceDirs, (s: models.SourceDir) => {
  //         return s.key === key;
  //       });
  //       if (theSourceDir) {
  //         theSourceDir.filenames.push(path.basename(filepath).toLowerCase())
  //       }
  //     }
  //   }
  // }).on('end', function () {
  //   sourceDirs.forEach((sourceDir: models.SourceDir) => {
  //     const configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS)
  //     const configContent = fslib.getConfigJSContent(config, sourceDir)
  //     fslib.write(configPath, configContent)
  //   })
  //   fslib.writeDATA(config)
  //   callback(sourceDirs)
  // })
}
