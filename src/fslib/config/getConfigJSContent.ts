import * as models from '../../models'
import * as fslib from '../'

export function getConfigJSContent(config: models.Config, sourceDir: models.SourceDir): string {
  let configJS = ''
  configJS += 'module.exports = {'
  if (sourceDir.path) {
    configJS += "path: '" + sourceDir.path + "',"
    fslib.writeHTML(config, sourceDir.path, '')
  } else {
    configJS += "component: 'div',"
  }
  if (sourceDir.layout) {
    configJS += `
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('` + sourceDir.layout + `'));
        });
    },`
  }
  if (sourceDir.filenames.indexOf(models.Const.FILE_INDEX_JSX) !== -1) {
    configJS += `
    getIndexRoute(location, cb) {
        cb(null, {
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./index'));
                });
            }
        });
    },`
  }
  let children = []
  if (sourceDir.includes && sourceDir.dirnames) {
    sourceDir.includes.forEach((dirname: string) => {
      if (sourceDir.dirnames.indexOf(dirname) !== -1) {
        children.push(dirname)
      }
    })
  } else {
    sourceDir.dirnames.forEach((dirname: string) => {
      if (sourceDir.excludes && sourceDir.excludes.indexOf(dirname) !== -1) {
        return
      }
      children.push(dirname)
    })
  }
  if (children.length > 0) {
    configJS += `
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [`
    configJS += children.map((child: string) => {
      return "\n    require('./" + child + "/config')"
    }).join(',')
    configJS += `
        ]);
      });
    }
    `
  }
  configJS += '}'

  return configJS
}
