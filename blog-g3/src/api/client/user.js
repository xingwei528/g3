"use strict";
class User {
    constructor(request) {
        this.request = request;
    }
    get(cb) {
        this.request.get('/user', null, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
//# sourceMappingURL=user.js.map