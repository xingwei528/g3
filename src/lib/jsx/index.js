"use strict";
var lib = require('../');
var htmltojsx_1 = require('./htmltojsx');
var models = require('../../models');
function getJSXContent(html, components) {
    var namedComponents = components.map(function (component) {
        return lib.toComponentName(component);
    });
    models.Const.DEFAULT_TAG_NAMES.forEach(function (component) {
        namedComponents.push(lib.toComponentName(component));
    });
    var htmlToJSX = new htmltojsx_1.default({}, namedComponents);
    var imports = models.Const.DEFAULT_IMPORTS;
    components.forEach(function (component) {
        imports += "\nimport " + lib.toComponentName(component) + " from './components/" + component + "';";
    });
    var output = "\n" + imports + "\nexport default React.createClass({\n  render: function() {\n    return (\n      " + htmlToJSX.convert(html) + "\n    )\n  }\n});";
    return output;
}
exports.getJSXContent = getJSXContent;
//# sourceMappingURL=index.js.map