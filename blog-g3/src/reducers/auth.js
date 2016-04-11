"use strict";
const _ = require('lodash');
const types = require('../constants/actionTypes');
const utils = require('../lib/utils');
const initialState = utils.Auth.getAuthState();
function authAppState(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_LOGIN:
            return _.assign({}, state, action.authState);
        case types.AUTH_LOGOUT:
            return _.assign({}, state, {
                token: "",
                user: null,
                orgs: null,
                orgLeaders: null,
                orgAdmins: null,
                isAnonymous: true
            });
        case types.AUTH_UPDATE_USER:
            return _.assign({}, state, action.user);
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authAppState;
//# sourceMappingURL=auth.js.map