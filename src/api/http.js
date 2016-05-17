"use strict";
var _ = require('lodash');
var base64 = require('js-base64');
var models = require('../models');
var XMLHttpRequest = window["XMLHttpRequest"];
function base64Encode(text) {
    return base64.Base64.encode(text);
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
var APIRequest = (function () {
    function APIRequest(options) {
        this.options = options;
        this.options.api = options.api;
    }
    APIRequest.prototype._getURL = function (path, data, method, api) {
        var url = path.indexOf('//') >= 0 ? path : api + path;
        url += ((/\?/).test(url) ? '&' : '?');
        if (_.isObject(data) && _.indexOf(['GET', 'HEAD'], method) > -1) {
            url += '&' + _.map(data, function (v, k) {
                return k + '=' + v;
            }).join('&');
        }
        return url + '&' + (new Date()).getTime();
    };
    APIRequest.prototype._request = function (method, path, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, this._getURL(path, data, method, this.options.api), true);
        if (cb) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status < 400) {
                        cb(null, parseSnake(xhr.responseText), xhr.status);
                    }
                    else {
                        var err = parseSnake(xhr.responseText);
                        cb({ status: xhr.status, message: err.message || models.ERestMethodUtils.errorCode(xhr.status) }, null, xhr.status);
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
    };
    APIRequest.prototype.getURL = function (path) {
        return this._getURL(path, null, "get", this.options.api);
    };
    APIRequest.prototype.get = function (path, data, cb) {
        return this._request("GET", path, data, cb);
    };
    APIRequest.prototype.post = function (path, data, cb) {
        return this._request("POST", path, data, cb);
    };
    APIRequest.prototype.patch = function (path, data, cb) {
        return this._request("PATCH", path, data, cb);
    };
    APIRequest.prototype.put = function (path, data, cb) {
        return this._request("PUT", path, data, cb);
    };
    APIRequest.prototype.delete = function (path, data, cb) {
        return this._request("DELETE", path, data, cb);
    };
    return APIRequest;
}());
exports.APIRequest = APIRequest;
var WebRequest = (function () {
    function WebRequest() {
    }
    WebRequest.prototype._getURL = function (path, data, method) {
        var url = path;
        url += ((/\?/).test(url) ? '&' : '?');
        if (_.isObject(data) && _.indexOf(['GET', 'HEAD'], method) > -1) {
            url += '&' + _.map(data, function (v, k) {
                return k + '=' + v;
            }).join('&');
        }
        return url + '&' + (new Date()).getTime();
    };
    WebRequest.prototype._request = function (method, path, authorization, data, cb) {
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
    };
    WebRequest.prototype.getBasicAuthorization = function (username, password) {
        return 'Basic ' + base64Encode(username + ':' + password);
    };
    WebRequest.prototype.getBearerAuthorization = function (token) {
        return 'Bearer ' + token;
    };
    WebRequest.prototype.get = function (path, authorization, cb) {
        return this._request("GET", path, authorization, null, cb);
    };
    WebRequest.prototype.post = function (path, authorization, data, cb) {
        return this._request("POST", path, authorization, data, cb);
    };
    WebRequest.prototype.patch = function (path, authorization, data, cb) {
        return this._request("PATCH", path, authorization, data, cb);
    };
    WebRequest.prototype.put = function (path, authorization, data, cb) {
        return this._request("PUT", path, authorization, data, cb);
    };
    WebRequest.prototype.delete = function (path, authorization, data, cb) {
        return this._request("DELETE", path, authorization, data, cb);
    };
    return WebRequest;
}());
exports.WebRequest = WebRequest;
//# sourceMappingURL=http.js.map