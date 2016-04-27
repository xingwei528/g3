import * as _ from 'lodash'
var jsdom = require('jsdom-no-contextify').jsdom
const HTMLtoJSX = require('htmltojsx')
var defaultView = jsdom().defaultView;

import parser from './parser'

export function getJSXContnt(html) {
  const htmlToJSX = new HTMLtoJSX({
    createClass: false
  })

  var output = `const React = require('react');
  module.exports = React.createClass({
    render: function() {
      return (
        ` + htmlToJSX.convert(parser.parse(html)) + `
      )
    }
  });`

  return output
}
