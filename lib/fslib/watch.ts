import * as chokidar from 'chokidar'
import * as fslib from './'
import * as models from '../models'

export function watch (config: models.Config) {
  const watcher = chokidar.watch(config._appPath, {
    ignored: /\.git|node_modules|bower_components|\.sass\-cache|[\/\\]\./
  })
  let isReady = false

  watcher
  .on('ready', () => {
    isReady = true
  })
  .on('add', (path) => {
    if (isReady) {
      console.log(path)
      //fslib.copySync()
    }
  })
  .on('addDir', (path) => {
    // dir added
  })
  .on('change', (path) => {
    // file changed
  })
  .on('unlink', (path) => {
    // file removed
  })
  .on('unlinkDir', (path) => {
    // dir removed
  })
  .on('error', (error) =>  {
    console.log('Error happened', error);
  })
}
