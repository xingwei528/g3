import * as path from 'path'
import * as chokidar from 'chokidar'
import * as fslib from './'
import * as models from '../models'

function syncFile(config: models.Config, p: string) {
  const ext = path.extname(p)
  if (ext === '.js' || ext === '.jsx') {
    const rel = fslib.pathRelative(config.source, p)
    const g3Path = path.join(config._g3Path, fslib.pathRelative(config.source, p))
    fslib.write(g3Path, fslib.readFileSync(p))
    console.log('file changed: ' + rel)
  }
}

export function watch (config: models.Config) {
  const watcher = chokidar.watch(config._appPath, {
    ignored: /\.git|node_modules|bower_components|\.sass\-cache|[\/\\]\./
  })
  let isReady = false

  watcher
  .on('ready', () => {
    isReady = true
  })
  .on('add', (p) => {
    if (isReady) {
      syncFile(config, p)
    }
  })
  .on('addDir', (p) => {
    // dir added
  })
  .on('change', (p) => {
    if (isReady) {
      syncFile(config, p)
    }
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
