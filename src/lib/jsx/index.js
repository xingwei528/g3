"use strict";
var htmltojsx_1 = require('./htmltojsx');
function getJSXContent(html, components) {
    var htmlToJSX = new htmltojsx_1.default({
        createClass: false
    }, components);
    var output = "import React from 'react';\nexport default React.createClass({\n  render: function() {\n    return (\n      " + htmlToJSX.convert(html) + "\n    )\n  }\n});";
    return output;
}
exports.getJSXContent = getJSXContent;
//# sourceMappingURL=index.js.map