"use strict";
var home = require('../../home');
function status(appPath) {
    var homeConfig = home.getConfig();
    var authConfig = homeConfig.authConfig;
    if (!authConfig.username || !authConfig.accessToken) {
        console.log("\nPlease login prior to status:\n");
        return;
    }
    console.log("\nYour Username:" + authConfig.username + "\n");
}
exports.status = status;
//# sourceMappingURL=index.js.map