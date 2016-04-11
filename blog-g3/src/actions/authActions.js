"use strict";
const types = require('../constants/actionTypes');
const utils = require("../lib/utils");
function login(authState) {
    utils.Auth.cacheAuthState(authState);
    return { type: types.AUTH_LOGIN, authState };
}
exports.login = login;
function logout() {
    utils.Auth.removeCache();
    return { type: types.AUTH_LOGOUT };
}
exports.logout = logout;
function updateUser(user) {
    const authState = utils.Auth.getAuthState();
    authState.user = user;
    utils.Auth.cacheAuthState(authState);
    return { type: types.AUTH_UPDATE_USER, user };
}
exports.updateUser = updateUser;
//# sourceMappingURL=authActions.js.map