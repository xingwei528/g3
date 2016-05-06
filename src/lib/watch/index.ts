import * as path from 'path'
import * as _ from 'lodash'
import * as chokidar from 'chokidar'

import * as models from '../../models'
import * as lib from '../'

function syncFile(g3Config: models.G3Config, sourceDirs: Array<models.SourceDir>, p: string) {
  const ext = path.extname(p)
  const dirpath = path.dirname(p)
  const filename = path.basename(p)
  if (dirpath === g3Config._g3Path || dirpath === g3Config._destinationPath) return

  const rel = lib.pathRelative(g3Config._sourcePath, p)
  const g3Path = path.join(g3Config._g3Path, lib.pathRelative(g3Config._sourcePath, p))
  if (ext === '.js' || ext === '.jsx') {
    lib.readFile(p, (error: Error, data: NodeBuffer) => {
      if (error) {
        console.log('Error happened', error);
      } else {
        lib.writeSync(g3Path, data)
        console.log('file changed: ' + rel)
      }
    })
  } else if (filename == models.Const.FILE_CONFIG_YML) {
    const dirpath = path.dirname(p)
    const key = lib.pathRelative(g3Config._sourcePath, dirpath)
    const sourceDir = _.find(sourceDirs, (s: models.SourceDir) => {
      return s.key = key
    })
    console.log(sourceDir)
    if (sourceDir) {
      const configPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS)
      const configContent = lib.getConfigJSContent(g3Config, sourceDir)
      lib.writeSync(configPath, configContent)
    }
  } else {
    const g3PublicPath = path.join(g3Config._destinationPath, lib.pathRelative(g3Config._appPath, p))
    lib.copy(p, g3PublicPath, (err: Error) => {
      if (err) {
        console.log('error: ' + err)
      } else {
        console.log(p + ' changed')
      }
    })
  }
}

function syncDir(g3Config: models.G3Config, sourceDirs: Array<models.SourceDir>, p: string) {
  // console.log(p)
  // lib.getSourceDirs(g3Config, p, sourceDirs, false)
}

export function watch (config: models.G3Config, sourceDirs: Array<models.SourceDir>) {
  if (!sourceDirs || sourceDirs.length === 0) return

  const watcher = chokidar.watch(config._appPath, {
    ignored: /\.git|node_modules|bower_components|\.sass\-cache|[\/\\]\./
  })
  let isReady = false

  watcher
  .on('ready', () => {
    isReady = true
  })
  .on('add', (p) => {
    if (!isReady) return
    syncFile(config, sourceDirs, p)
  })
  .on('addDir', (p) => {
    if (!isReady) return
    syncDir(config, sourceDirs, p)
  })
  .on('change', (p) => {
    if (!isReady) return
    syncFile(config, sourceDirs, p)
  })
  // .on('unlink', (p) => {
  //   // file removed
  // })
  // .on('unlinkDir', (p) => {
  //   // dir removed
  // })
  .on('error', (error) =>  {
    console.log('Error happened', error);
  })
}
