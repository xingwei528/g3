import * as models from '../../models'
import * as lib from '../'

export function getConfigJSContent(g3Config: models.G3Config, sourceDir: models.SourceDir): string {
  let configJS = ''
  configJS += 'module.exports = {'
  if (sourceDir.config.path) {
    configJS += "  path: '" + sourceDir.config.path + "'"
    lib.writeHTML(g3Config, sourceDir.config.path, '')
  } else {
    configJS += "  component: 'div'"
  }

  if (sourceDir.config.layout) {
    configJS += `,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('` + sourceDir.config.layout + `'));
    });
  }`
  }

  let index = sourceDir.config.index
  if (index === undefined
    && (sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.jsx') !== -1
      || sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.html') !== -1)) {
    index = './index'
  }
  if (index) {
    configJS += `,
  getIndexRoute(location, cb) {
    cb(null, {
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('` + index + `'));
        });
      }
    });
  }`
  }

  let children = []
  if (sourceDir.config.includes && sourceDir.dirnames) {
    sourceDir.config.includes.forEach((dirname: string) => {
      if (sourceDir.dirnames.indexOf(dirname) !== -1) {
        children.push(dirname)
      }
    })
  } else {
    sourceDir.dirnames.forEach((dirname: string) => {
      if (sourceDir.config.excludes && sourceDir.config.excludes.indexOf(dirname) !== -1) {
        return
      }
      children.push(dirname)
    })
  }
  if (children.length > 0) {
    configJS += `,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [`
  configJS += children.map((child: string) => {
    return "require('./" + child + "/config')"
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
