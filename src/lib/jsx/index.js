"use strict";
var lib = require('../');
var htmltojsx_1 = require('./htmltojsx');
var models = require('../../models');
function getJSXContent(ext, content, components) {
    content = content || '';
    if (ext === '.jsx' && (content.indexOf('render(') !== -1 || content.indexOf('export default') !== -1)) {
        return content;
    }
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
    var jsx = content || '';
    if (ext === '.html' || ext === '.htm') {
        jsx = htmlToJSX.convert(content);
    }
    var output = "\n" + imports + "\nexport default React.createClass({\n  render: function() {\n    return (\n      " + jsx + "\n    )\n  }\n});";
    return output;
}
exports.getJSXContent = getJSXContent;
//# sourceMappingURL=index.js.map