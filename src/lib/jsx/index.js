"use strict";
var jsdom = require('jsdom-no-contextify').jsdom;
var HTMLtoJSX = require('htmltojsx');
var defaultView = jsdom().defaultView;
var parser_1 = require('./parser');
function getJSXContnt(html) {
    var htmlToJSX = new HTMLtoJSX({
        createClass: false
    });
    var output = "const React = require('react');\n  module.exports = React.createClass({\n    render: function() {\n      return (\n        " + htmlToJSX.convert(parser_1.default.parse(html)) + "\n      )\n    }\n  });";
    return output;
}
exports.getJSXContnt = getJSXContnt;
//# sourceMappingURL=index.js.map