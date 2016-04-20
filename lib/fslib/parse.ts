import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../models'
import * as fslib from './'

export function parseConfig(config: models.Config, sourceDir: models.SourceDir): string {
  let configJS = ''
  configJS += 'module.exports = {'
  if (sourceDir.path) {
    configJS += "path: '" + sourceDir.path + "',"
    fslib.writeHTML(config, sourceDir.path, '')
  } else {
    configJS += "component: 'div',"
  }
  if (sourceDir.layout) {
    configJS += "getComponent(nextState, cb) {"
    configJS += "    require.ensure([], (require) => {"
    configJS += "        cb(null, require('" + sourceDir.layout + "'));"
    configJS += "    });"
    configJS += "},"
  }
  if (sourceDir.filenames.indexOf(models.Const.FILE_INDEX_JSX) !== -1) {
    configJS += "getIndexRoute(location, cb) {"
    configJS += "    cb(null, {"
    configJS += "        getComponent(nextState, cb) {"
    configJS += "            require.ensure([], (require) => {"
    configJS += "                cb(null, require('./index'));"
    configJS += "            });"
    configJS += "        }"
    configJS += "    });"
    configJS += "},"
  }
  let children = sourceDir.includes
  if (children === undefined) {
    children = sourceDir.dirnames
  }
  if (children.length > 0) {
    configJS += "getChildRoutes(location, cb) {"
    configJS += "    require.ensure([], (require) => {"
    configJS += "        cb(null, ["
    configJS += children.map((child: string) => {
      return "require('./" + child + "/config')"
    }).join(',')
    configJS += "        ]);"
    configJS += "    });"
    configJS += "}"
  }
  configJS += '}'

  return configJS
}

export function parse(config: models.Config, callback: (sourceDirs: Array<models.SourceDir>) => void) {
  fslib.copySync(config.source, config._g3Path)

  const appPath = path.join(config._g3Path, models.Const.FILE_APP_JSX)
  if (!fslib.isFile(appPath)) {
    let appJS = "const React = require('react');"
    appJS += "const ReactDOM = require('react-dom');"
    appJS += "const router = require('react-router');"
    appJS += "const config = require('./config');"
    appJS += "ReactDOM.render("
    appJS += "  <router.Router history={router." + config.history + "} routes={config}/>,"
    appJS += "  document.getElementById('" + models.Const.DOM_REACT_ROOT + "')"
    appJS += ");"
    fse.createOutputStream(appPath).write(appJS)
  }

  let sourceDirs: Array<models.SourceDir> = []

  fse.walk(config.source).on('readable', function () {
    var item
    while (item = this.read()) {
      const filepath = item.path
      if (fslib.isDirectory(filepath)) {
        const dirpath = filepath
        const dirname = path.basename(dirpath).toLowerCase()
        const sourceDir = new models.SourceDir()
        sourceDir.key = fslib.pathRelative(config.source, dirpath)
        const pathParent = fslib.pathParent(sourceDir.key)
        let parentSourceDir: models.SourceDir = null
        parentSourceDir = _.find(sourceDirs, (s: models.SourceDir) => {
          return s.key === pathParent;
        });
        if (parentSourceDir) {
          if (parentSourceDir.includes) {
            if (parentSourceDir.includes.indexOf(dirname) === -1) {
              continue
            }
          } else if (parentSourceDir.excludes) {
            if (parentSourceDir.excludes.indexOf(dirname) !== -1) {
              continue
            }
          }
          parentSourceDir.dirnames.push(dirname)
        }

        if (fslib.isFile(path.join(dirpath, models.Const.FILE_CONFIG_JSON))) {
          let configJSON: models.ConfigJSON = null
          try {
            configJSON = JSON.parse(fse.readFileSync(path.join(dirpath, models.Const.FILE_CONFIG_JSON)).toString())
          } catch(e) {}
          if (configJSON) {
            sourceDir.path = configJSON.path
            sourceDir.layout = configJSON.layout
            sourceDir.includes = configJSON.includes
            sourceDir.excludes = configJSON.excludes
          }
        }
        if (sourceDir.path === undefined) {
          if (parentSourceDir) {
            sourceDir.path = fslib.pathJoin(parentSourceDir.path, dirname)
          } else {
            sourceDir.path = sourceDir.key
          }
        }

        sourceDir.filenames = []
        sourceDir.dirnames = []
        sourceDirs.push(sourceDir)
      } else if (fslib.isFile(filepath)) {
        const key = fslib.pathRelative(config.source, path.dirname(filepath))
        const sourceDir: models.SourceDir = _.find(sourceDirs, (s: models.SourceDir) => {
          return s.key === key;
        });
        if (sourceDir) {
          sourceDir.filenames.push(path.basename(filepath).toLowerCase())
        }
      }
    }
  }).on('end', function () {
    sourceDirs.forEach((sourceDir: models.SourceDir) => {
      const configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS)
      const configContent = parseConfig(config, sourceDir)
      fslib.write(configPath, configContent)
    })
    fslib.writeDATA(config)
    callback(sourceDirs)
  })
}
