"use strict";
const api = require('../api/api');
const release_1 = require('./release');
class Client extends api.API {
    constructor() {
        super({
            api: release_1.default.domainAPI,
        });
    }
    setToken(token) {
        this.options.token = token;
    }
}
var client = new Client();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = client;
//# sourceMappingURL=client.js.map