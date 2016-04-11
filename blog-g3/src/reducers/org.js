"use strict";
const _ = require('lodash');
const types = require('../constants/actionTypes');
const initialState = null;
function orgAppState(state = initialState, action) {
    switch (action.type) {
        case types.ORG_CHANGE:
            return _.assign({}, state, action.orgState);
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = orgAppState;
//# sourceMappingURL=org.js.map