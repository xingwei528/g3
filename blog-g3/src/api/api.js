"use strict";
const http = require('./http');
const user_1 = require('./client/user');
const users_1 = require('./client/users');
const apps_1 = require('./client/apps');
const private_1 = require('./client/private');
const search_1 = require('./client/search');
class API {
    constructor(options) {
        this.options = options;
        this.request = new http.WebRequest();
        var apiRequest = new http.APIRequest(options);
        this.user = new user_1.default(apiRequest);
        this.users = new users_1.default(apiRequest);
        this.apps = new apps_1.default(apiRequest);
        this.search = new search_1.default(apiRequest);
        this._private = new private_1.default(apiRequest);
    }
}
exports.API = API;
//# sourceMappingURL=api.js.map