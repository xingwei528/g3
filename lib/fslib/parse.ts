import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../models'
import * as fslib from './'

function parseConfig(config: models.Config, sourceDir: models.SourceDir): string {
  const configJSON = sourceDir.config
  let configJS = ''
  configJS += 'module.exports = {'
  if (configJSON.path) {
    configJS += "path: '" + configJSON.path + "',"
    fslib.writeHTML(config, configJSON.path, '')
  } else {
    configJS += "component: 'div',"
  }
  if (configJSON.layout) {
    configJS += "getComponent(nextState, cb) {"
    configJS += "    require.ensure([], (require) => {"
    configJS += "        cb(null, require('" + configJSON.layout + "'));"
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
  let children = sourceDir.config.includes
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

export function parse(config: models.Config, callback) {
  fslib.copySync(config.source, config._g3Path)

  let appJS = "const React = require('react');"
  appJS += "const ReactDOM = require('react-dom');"
  appJS += "const router = require('react-router');"
  appJS += "const config = require('./config');"
  appJS += "ReactDOM.render("
  appJS += "  <router.Router history={router." + config.history + "} routes={config}/>,"
  appJS += "  document.getElementById('" + models.Const.DOM_REACT_ROOT + "')"
  appJS += ");"
  fse.createOutputStream(path.join(config._g3Path, models.Const.FILE_APP_JSX)).write(appJS)

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
          if (parentSourceDir.config.includes) {
            if (parentSourceDir.config.includes.indexOf(dirname) === -1) {
              continue
            }
          } else if (parentSourceDir.config.excludes) {
            if (parentSourceDir.config.excludes.indexOf(dirname) !== -1) {
              continue
            }
          }
          parentSourceDir.dirnames.push(dirname)
        }

        let configJSON: models.ConfigJSON = new models.ConfigJSON()
        if (fslib.isFile(path.join(dirpath, models.Const.FILE_CONFIG_JSON))) {
          configJSON = JSON.parse(fse.readFileSync(path.join(dirpath, models.Const.FILE_CONFIG_JSON)).toString())
        }
        if (configJSON.path === undefined) {
          if (parentSourceDir) {
            configJSON.path = fslib.pathJoin(parentSourceDir.config.path, dirname)
          } else {
            configJSON.path = sourceDir.key
          }
        }

        sourceDir.config = configJSON
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
      const ws = fse.createOutputStream(path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS))
      ws.write(parseConfig(config, sourceDir))
    })
    fslib.writeDATA(config)
    callback()
  })
}
