import * as path from 'path'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../models'
import {copySync} from './copySync'
import {removeSync} from './removeSync'
import {isFile} from './isFile'
import {writeHTML} from './writeHTML'
import {writeDATA} from './writeDATA'

function parseConfig(config: models.Config, dirpath: string, filepath: string): string {
  const configJSON: models.ConfigJSON = JSON.parse(fse.readFileSync(filepath).toString())
  let configJS = ''
  configJS += 'module.exports = {'
  if (configJSON.path) {
    configJS += "path: '" + configJSON.path + "',"
    writeHTML(config, configJSON.path, '')
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
  if (isFile(path.join(dirpath, models.Const.FILE_INDEX_JSX))) {
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
  if (configJSON.children && configJSON.children.length > 0) {
    configJS += "getChildRoutes(location, cb) {"
    configJS += "    require.ensure([], (require) => {"
    configJS += "        cb(null, ["
    configJS += configJSON.children.map((child: string) => {
      return "require('" + child + "/config')"
    }).join(',')
    configJS += "        ]);"
    configJS += "    });"
    configJS += "}"
  }
  configJS += '}'

  return configJS
}

export function parse(config: models.Config, callback) {
  copySync(config.source, config._g3Path)

  let appJS = "const React = require('react');"
  appJS += "const ReactDOM = require('react-dom');"
  appJS += "const router = require('react-router');"
  appJS += "const config = require('./config');"
  appJS += "ReactDOM.render("
  appJS += "  <router.Router history={router." + config.history + "} routes={config}/>,"
  appJS += "  document.getElementById('" + models.Const.DOM_REACT_ROOT + "')"
  appJS += ");"
  fse.createOutputStream(path.join(config._g3Path, models.Const.FILE_APP_JSX)).write(appJS)

  fse.walk(config._g3Path).on('readable', function () {
    var item
    while (item = this.read()) {
      const filepath = item.path
      if (isFile(filepath)) {
        if (path.basename(filepath) === models.Const.FILE_CONFIG_JSON) {
          const dirpath = path.dirname(filepath)
          const ws = fse.createOutputStream(path.join(dirpath, 'config.js'))
          ws.write(parseConfig(config, dirpath, filepath))
          removeSync(filepath)
        }
      }
    }
  }).on('end', function () {
    writeDATA(config)
    callback()
  })
}
