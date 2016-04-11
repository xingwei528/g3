"use strict";
const _ = require('lodash');
const base64 = require('../lib/utils/base64');
const utf8 = require('../lib/utils/utf8');
const models = require('./models');
var XMLHttpRequest = window["XMLHttpRequest"];
function base64Encode(text) {
    var bytes = utf8.encode(text);
    return base64.encode(bytes);
}
function snakeToCamelcase(key) {
    return key.replace(/(_+[a-z0-9])/g, function (snip) {
        return snip.toUpperCase().replace("_", "");
    });
}
function camelToSnakecase(key) {
    return key.replace(/([A-Z0-9])/g, function (snip) {
        return "_" + snip.toLowerCase();
    });
}
function parseSnake(responseText) {
    if (!responseText) {
        return {};
    }
    return JSON.parse(responseText.replace(/"([^"]*)"\s*:/g, snakeToCamelcase));
}
exports.parseSnake = parseSnake;
function stringify(obj) {
    return JSON.stringify(obj).replace(/"([^"]*)"\s*:/g, camelToSnakecase);
}
class APIRequest {
    constructor(options) {
        this.options = options;
        this.options.api = options.api;
    }
    _getURL(path, data, method, api) {
        var url = path.indexOf('//') >= 0 ? path : api + path;
        url += ((/\?/).test(url) ? '&' : '?');
        if (_.isObject(data) && _.indexOf(['GET', 'HEAD'], method) > -1) {
            url += '&' + _.map(data, function (v, k) {
                return k + '=' + v;
            }).join('&');
        }
        return url + '&' + (new Date()).getTime();
    }
    _request(method, path, data, cb) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, this._getURL(path, data, method, this.options.api), true);
        if (cb) {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status < 400) {
                        var pages = {};
                        const headerLink = xhr.getResponseHeader('Link') || '';
                        headerLink.split(',').forEach((link) => {
                            var key = (/rel="([^\'\"]+)"/.exec(link) || [])[1];
                            var val = (/<(.*)>/.exec(link) || [])[1];
                            pages[key] = val;
                        });
                        cb(null, parseSnake(xhr.responseText), pages, xhr.status);
                    }
                    else {
                        var err = parseSnake(xhr.responseText);
                        cb({ status: xhr.status, message: err.message || models.ERestMethodUtils.errorCode(xhr.status) }, null, {}, xhr.status);
                    }
                }
            };
        }
        xhr.dataType = 'json';
        xhr.setRequestHeader('Accept', 'application/vnd.get3w+json; version=1');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        if ((this.options.token) || (this.options.username && this.options.password)) {
            var authorization = this.options.token ? 'Bearer ' + this.options.token : 'Basic ' + base64Encode(this.options.username + ':' + this.options.password);
            xhr.setRequestHeader('Authorization', authorization);
        }
        if (data) {
            xhr.send(stringify(data));
        }
        else {
            xhr.send();
        }
    }
    getURL(path) {
        return this._getURL(path, null, "get", this.options.api);
    }
    get(path, data, cb) {
        return this._request("GET", path, data, cb);
    }
    post(path, data, cb) {
        return this._request("POST", path, data, cb);
    }
    patch(path, data, cb) {
        return this._request("PATCH", path, data, cb);
    }
    put(path, data, cb) {
        return this._request("PUT", path, data, cb);
    }
    delete(path, data, cb) {
        return this._request("DELETE", path, data, cb);
    }
}
exports.APIRequest = APIRequest;
class WebRequest {
    constructor() {
    }
    _getURL(path, data, method) {
        var url = path;
        url += ((/\?/).test(url) ? '&' : '?');
        if (_.isObject(data) && _.indexOf(['GET', 'HEAD'], method) > -1) {
            url += '&' + _.map(data, function (v, k) {
                return k + '=' + v;
            }).join('&');
        }
        return url + '&' + (new Date()).getTime();
    }
    _request(method, path, authorization, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, this._getURL(path, data, method), true);
        if (cb) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status < 400) {
                        cb(null, xhr.responseText, xhr.status);
                    }
                    else {
                        var err = {
                            status: xhr.status,
                            message: models.ERestMethodUtils.errorCode(xhr.status)
                        };
                        cb(err, null, xhr.status);
                    }
                }
            };
        }
        if (authorization) {
            xhr.setRequestHeader('Authorization', authorization);
        }
        if (data) {
            xhr.dataType = 'json';
            xhr.send(JSON.stringify(data));
        }
        else {
            xhr.send();
        }
    }
    getBasicAuthorization(username, password) {
        return 'Basic ' + base64Encode(username + ':' + password);
    }
    getBearerAuthorization(token) {
        return 'Bearer ' + token;
    }
    get(path, authorization, cb) {
        return this._request("GET", path, authorization, null, cb);
    }
    post(path, authorization, data, cb) {
        return this._request("POST", path, authorization, data, cb);
    }
    patch(path, authorization, data, cb) {
        return this._request("PATCH", path, authorization, data, cb);
    }
    put(path, authorization, data, cb) {
        return this._request("PUT", path, authorization, data, cb);
    }
    delete(path, authorization, data, cb) {
        return this._request("DELETE", path, authorization, data, cb);
    }
}
exports.WebRequest = WebRequest;
//# sourceMappingURL=http.js.map