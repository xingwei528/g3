"use strict";
const users_tokens_1 = require('./users_tokens');
class Users {
    constructor(request) {
        this.request = request;
        this.tokens = new users_tokens_1.default(this.request);
    }
    delete(password, cb) {
        this.request.delete('/users', {
            password: password
        }, cb);
    }
    edit(data, cb) {
        this.request.patch('/users', data, cb);
    }
    login(account, password, cb) {
        this.request.post('/users/actions/login', {
            account: account,
            password: password
        }, cb);
    }
    logout(cb) {
        this.request.post('/users/actions/logout', null, cb);
    }
    passwordForgot(email, cb) {
        this.request.post('/users/actions/password_forgot', {
            email: email
        }, cb);
    }
    passwordReset(currentPassword, newPassword, cb) {
        this.request.post('/users/actions/password_reset', {
            currentPassword: currentPassword,
            newPassword: newPassword
        }, cb);
    }
    signup(username, email, password, cb) {
        this.request.post('/users', {
            username: username,
            email: email,
            password: password
        }, cb);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Users;
//# sourceMappingURL=users.js.map