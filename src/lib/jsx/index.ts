import * as lib from '../'
import HTMLtoJSX from './htmltojsx';
import * as models from '../../models'

export function getJSXContent(ext: string, content: string, components: Array<string>) {
  content = content || ''
  if (ext === '.jsx' && content.indexOf('export default') !== -1) {
    return content
  }

  const namedComponents = components.map((component: string) => {
    return lib.toComponentName(component)
  })

  models.Const.DEFAULT_TAG_NAMES.forEach((component: string) => {
    namedComponents.push(lib.toComponentName(component))
  })

  const htmlToJSX = new HTMLtoJSX({}, namedComponents)

  let imports = models.Const.DEFAULT_IMPORTS
  components.forEach((component: string) => {
    imports += `
import ${lib.toComponentName(component)} from './components/${component}';`
  })

  let jsx = content || ''
  if (ext === '.html' || ext === '.htm') {
    jsx = htmlToJSX.convert(content)
  }

  var output = `
${imports}
export default React.createClass({
  render: function() {
    return (
      ${jsx}
    )
  }
});`

  return output
}
