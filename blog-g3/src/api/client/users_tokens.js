"use strict";
class Tokens {
    constructor(request) {
        this.request = request;
    }
    create(scopes, cb) {
        this.request.post('/users/tokens', {
            scopes: scopes
        }, cb);
    }
    delete(accessToken, cb) {
        this.request.delete('/users/tokens/' + accessToken, null, cb);
    }
    get(scopes, cb) {
        this.request.get('/users/tokens', {
            scopes: scopes
        }, cb);
    }
    list(cb) {
        this.request.get('/users/tokens', null, cb);
    }
    regenerate(scopes, cb) {
        this.request.post('/users/tokens/actions/regenerate', {
            scopes: scopes
        }, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tokens;
//# sourceMappingURL=users_tokens.js.map