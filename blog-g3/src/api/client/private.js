"use strict";
class Private {
    constructor(request) {
        this.request = request;
    }
    webApps(username, appname, pagename, cb) {
        this.request.get('/private/web/apps/' + username + '/' + appname + '/' + pagename, null, cb);
    }
    webStars(username, cb) {
        this.request.get('/private/web/stars/' + username, null, cb);
    }
    webUsers(username, cb) {
        this.request.get('/private/web/users/' + username, null, cb);
    }
    deleteTemp(username, cb) {
        this.request.post('/private/actions/delete_temp/' + username, null, cb);
    }
    getUploadAvatarUrl(username) {
        return this.request.getURL('/private/actions/upload_avatar/' + username);
    }
    getUploadFilesUrl(username, appname) {
        if (appname) {
            return this.request.getURL('/private/actions/upload_files/' + username + '/' + appname);
        }
        return this.request.getURL('/private/actions/upload_files/' + username);
    }
    getUploadZipUrl(username, appname) {
        if (appname) {
            return this.request.getURL('/private/actions/upload_zip/' + username + '/' + appname);
        }
        return this.request.getURL('/private/actions/upload_zip/' + username);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Private;
//# sourceMappingURL=private.js.map