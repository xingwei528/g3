import * as path from 'path'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import * as models from '../../models'
import * as lib from '../../lib'
import * as application from '../../application'
import * as home from '../../home'
import * as api from '../../api'

export function status(appPath) {
  const g3Config: models.G3Config = application.getG3Config(appPath, 'status')
  const homeConfig: models.HomeConfig = home.getConfig()
  const authConfig = homeConfig.authConfig

  if (!authConfig.username || !authConfig.accessToken) {
    console.log("\nPlease login prior to status:\n")
    return
	}

  console.log(`\nYour Username:${authConfig.username}\n`)

  const host = models.Const.API_HOST
	const owner = authConfig.username
	const name = g3Config._name

  const client = api.getClient(authConfig.accessToken)
  client.apps.files.checksum(owner, name, (err: models.Error, res: {
    files: {[index: string]: string}
  }) => {
    console.log(res.files)
  })
}
