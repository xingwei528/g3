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
}
