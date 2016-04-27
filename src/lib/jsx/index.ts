import * as _ from 'lodash'
var jsdom = require('jsdom-no-contextify').jsdom
const HTMLtoJSX = require('htmltojsx')
var defaultView = jsdom().defaultView;

import parser from './parser'

export function getJSXContnt(html) {
  const htmlToJSX = new HTMLtoJSX({
    createClass: false
  })

  var output = `import React from 'react';
export default React.createClass({
  render: function() {
    return (
      ${htmlToJSX.convert(parser.parse(html))}
    )
  }
});`

  return output
}
