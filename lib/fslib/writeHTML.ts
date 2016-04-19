import * as path from 'path'
import * as fse from 'fs-extra'
import * as models from '../models'

export function writeHTML(config: models.Config, routePath: string, content: string) {
  if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1) return
  const filepath = path.join(config.destination, routePath, "index.html")
  const ws = fse.createOutputStream(filepath)
  const scripts = config._command === 'run' ? '<script src="/webpack-dev-server.js"></script><script src="/bundle.js"></script>' : '<script src="/assets/js/bundle.js"></script>'
  let html = config._indexContent.replace('<div id="react-root"></div>', '<div id="react-root">' + content + '</div>' + scripts)
  ws.write(html)
}
