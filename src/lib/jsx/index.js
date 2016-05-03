"use strict";
var lib = require('../');
var htmltojsx_1 = require('./htmltojsx');
function getJSXContent(html, components) {
    var namedComponents = components.map(function (component) {
        return lib.toComponentName(component);
    });
    var htmlToJSX = new htmltojsx_1.default({}, namedComponents);
    var imports = '';
    for (var i = 0; i < components.length; i++) {
        imports += "\nimport " + namedComponents[i] + " from './components/" + components[i] + "';";
    }
    var output = "\nimport React from 'react';\nimport { Link } from 'react-router';\n" + imports + "\nexport default React.createClass({\n  render: function() {\n    return (\n      " + htmlToJSX.convert(html) + "\n    )\n  }\n});";
    return output;
}
exports.getJSXContent = getJSXContent;
//# sourceMappingURL=index.js.map