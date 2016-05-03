import * as lib from '../'
import HTMLtoJSX from './htmltojsx';

export function getJSXContent(html: string, components: Array<string>) {
  const namedComponents = components.map((component: string) => {
    return lib.toComponentName(component)
  })

  const htmlToJSX = new HTMLtoJSX({}, namedComponents)

  let imports = ''
  for (let i = 0; i < components.length; i++) {
    imports += `
import ${namedComponents[i]} from './components/${components[i]}';`
  }

  var output = `
import React from 'react';
import { Link } from 'react-router';
${imports}
export default React.createClass({
  render: function() {
    return (
      ${htmlToJSX.convert(html)}
    )
  }
});`

  return output
}
