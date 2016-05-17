export class Const {
  static DIR_DOT_G3 = '.g3'
  static DIR_SRC = 'src'
  static DIR_PUBLIC = 'public'
  static DIR_DATA = 'data'
  static DIR_COMPONENTS = 'components'

  static FILE_G3_YML = 'g3.yml'
  static FILE_CONFIG_YML = 'config.yml'
  static FILE_CONFIG_JS = 'config.js'

  static FILE_APP = 'app'
  static FILE_INDEX = 'index'
  static FILE_LAYOUT = 'layout'

  static DOM_REACT_ROOT = 'root'

  static DEFAULT_TAG_NAMES = [
    'Link',
    'IndexLink'
  ]
  static DEFAULT_TAG_NAMES_LOWER = [
    'link',
    'indexlink'
  ]
  static DEFAULT_IMPORTS = `import React from 'react';
import { Link, IndexLink } from 'react-router';`

  static API_ACCESS_TOKEN = "X-Get3W-Access-Token"
  static API_USER = "X-Get3W-User"
  static API_HOST = "get3w.com"
  static API_DOMAIN = "http://api.get3w.com/"

  // HomeDirName is the config directory name
  static HOME_DIR_NAME = ".g3"
  // HomeConfigName is the name of root config file
  static HOME_CONFIG_NAME = "config.json"

  static STATUS_NOT_MODIFIED = 304
  static STATUS_BAD_REQUEST = 400
  static STATUS_UNAUTHORIZED = 401
  static STATUS_PAYMENT_REQUIRED = 402
  static STATUS_FORBIDDEN = 403
  static STATUS_NOT_FOUND = 404
  static STATUS_METHOD_NOT_ALLOWED = 405
  static STATUS_NOT_ACCEPTABLE = 406
  static STATUS_PROXY_AUTHENTICATION_REQUIRED = 407
  static STATUS_REQUEST_TIMEOUT = 408
  static STATUS_CONFLICT = 409
  static STATUS_GONE = 410
  static STATUS_LENGTH_REQUIRED = 411
  static STATUS_INTERNAL_SERVER_ERROR = 500
}
