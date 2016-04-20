import * as path from 'path'
import * as _ from 'lodash'
import * as chokidar from 'chokidar'
import * as fslib from './'
import * as models from '../models'

function getExt(p: string): string {
  const ext = path.extname(p)
  const filename = path.basename(p)
  if (ext === '.js' || ext === '.jsx' || filename === models.Const.FILE_CONFIG_JSON) return ext
  return ''
}

function syncFile(config: models.Config, sourceDirs: Array<models.SourceDir>, p: string) {
  const ext = getExt(p)
  if (ext) {
    const rel = fslib.pathRelative(config.source, p)
    const g3Path = path.join(config._g3Path, fslib.pathRelative(config.source, p))
    if (ext === '.js' || ext === '.jsx') {
      fslib.readFile(p, (error: Error, data: NodeBuffer) => {
        if (error) {
          console.log('Error happened', error);
        } else {
          fslib.write(g3Path, data)
          console.log('file changed: ' + rel)
        }
      })
    } else if (ext == '.json') {
      const dirpath = path.dirname(p)
      const key = fslib.pathRelative(config.source, dirpath)
      const sourceDir = _.find(sourceDirs, (s: models.SourceDir) => {
        return s.key = key
      })
      console.log(sourceDir)
      if (sourceDir) {
        const configPath = path.join(config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS)
        const configContent = fslib.parseConfig(config, sourceDir)
        fslib.write(configPath, configContent)
      }
    }
  }
}

function syncDir(config: models.Config, sourceDirs: Array<models.SourceDir>, p: string) {
  console.log(p)
  console.log(fslib.readdirSync(p))
}

export function watch (config: models.Config, sourceDirs: Array<models.SourceDir>) {
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
  .on('unlink', (p) => {
    // file removed
  })
  .on('unlinkDir', (p) => {
    // dir removed
  })
  .on('error', (error) =>  {
    console.log('Error happened', error);
  })
}
