import * as path from 'path'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import * as models from '../../models'
import * as lib from '../../lib'
import * as home from '../../home'

export function status(appPath) {
  const homeConfig: models.HomeConfig = home.getConfig()
  const authConfig = homeConfig.authConfig

  if (!authConfig.username || !authConfig.accessToken) {
    console.log("\nPlease login prior to status:\n")
    return
	}

  console.log(`\nYour Username:${authConfig.username}\n`)
}
