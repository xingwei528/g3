import HTMLtoJSX from './htmltojsx'

export function getJSXContent(html: string, components: Array<string>) {
  const htmlToJSX = new HTMLtoJSX({
    createClass: false
  }, components)

  var output = `import React from 'react';
export default React.createClass({
  render: function() {
    return (
      ${htmlToJSX.convert(html)}
    )
  }
});`

  return output
}
