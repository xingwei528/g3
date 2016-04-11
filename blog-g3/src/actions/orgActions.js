"use strict";
const types = require('../constants/actionTypes');
function orgChange(orgState) {
    return { type: types.ORG_CHANGE, orgState };
}
exports.orgChange = orgChange;
//# sourceMappingURL=orgActions.js.map