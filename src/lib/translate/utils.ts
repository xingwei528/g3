import * as _ from 'lodash'

export function toComponentName(name: string): string {
  //return _.upperFirst(_.camelCase(name))
  return name.toUpperCase()
}
