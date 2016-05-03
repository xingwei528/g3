"use strict";
var models = require('../../models');
function getAppJSContent(g3Config) {
    return "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport {Router, " + g3Config.history + "} from 'react-router';\nimport config from './config';\nReactDOM.render(\n<Router history={" + g3Config.history + "} routes={config} />,\ndocument.getElementById('" + models.Const.DOM_REACT_ROOT + "')\n);";
}
exports.getAppJSContent = getAppJSContent;
//# sourceMappingURL=getAppJSContent.js.map