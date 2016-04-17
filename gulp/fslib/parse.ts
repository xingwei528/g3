import * as path from 'path'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../models'
const copySync = require('./copySync')
const removeSync = require('./removeSync')
const isFile = require('./isFile')

function parse(config: models.Config, callback) {
  copySync(config.source, config._g3Path)

  let appJS = "const React = require('react');"
  appJS += "const dom = require('react-dom');"
  appJS += "const router = require('react-router');"
  appJS += "const config = require('./config');"
  appJS += "dom.render("
  appJS += "  <router.Router history={router." + config.history + "} routes={config}/>,"
  appJS += "  document.getElementById('root')"
  appJS += ");"
  fse.createOutputStream(path.join(config._g3Path, 'app.jsx')).write(appJS)

  fse.walk(config._g3Path).on('readable', function () {
    var item
    while (item = this.read()) {
      const filepath = item.path
      if (isFile(filepath)) {
        let filename = path.basename(filepath)
        let dirname = path.dirname(filepath)
        if (filename === 'config.json') {
          const configJSON: models.ConfigJSON = JSON.parse(fse.readFileSync(filepath).toString())
          let configJS = ''
          configJS += 'module.exports = {'
          if (configJSON.path) {
            configJS += "path: '" + configJSON.path + "',"
          } else {
            configJS += "component: 'div',"
          }
          if (configJSON.template) {
            configJS += "getComponent(nextState, cb) {"
            configJS += "    require.ensure([], (require) => {"
            configJS += "        cb(null, require('" + configJSON.template + "'));"
            configJS += "    });"
            configJS += "},"
          }
          if (isFile(path.join(dirname, 'index.jsx'))) {
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
          const jPath = filepath.substr(0, filepath.lastIndexOf('.')) + '.js'
          console.log(jPath)
          const ws = fse.createOutputStream(jPath)
          ws.write(configJS)
          removeSync(filepath)
        }
      }
    }
  }).on('end', function () {
    callback()
  })
}

export = parse
