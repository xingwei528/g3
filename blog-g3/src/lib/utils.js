"use strict";
const scriptjs = require('scriptjs');
const swal = require('sweetalert');
const $ = require('jquery');
const _ = require('lodash');
const uuid = require('node-uuid');
const moment = require('moment');
const store = require('store');
const mustache = require('mustache');
const http = require('../api/http');
const models = require('../api/models');
const base64 = require('./utils/base64');
const utf8 = require('./utils/utf8');
const lang = require('./lang');
const client_1 = require('./client');
const release_1 = require('./release');
class Segment {
    static identify(user) {
        if (window['analytics']) {
            analytics.identify(user.id, {
                name: user.username,
                email: user.email
            });
        }
    }
    static track(type) {
        if (window['analytics']) {
            analytics.track(type);
        }
    }
}
Segment.SIGNUP = "Signup";
Segment.LOGIN = "Login";
exports.Segment = Segment;
class UploadProps {
    static getImageProps(from, appPath, location, success, fail) {
        let api = client_1.default.apps.files;
        const url = api.getUploadUrl(appPath, location);
        return UploadProps.getProps(url, false, "image/*", success, fail);
    }
    static getFilesProps(from, appPath, location, success, fail) {
        let api = client_1.default.apps.files;
        const url = api.getUploadUrl(appPath, location);
        return UploadProps.getProps(url, true, "", success, fail);
    }
    static getAvatarProps(username, success, fail) {
        const url = client_1.default._private.getUploadAvatarUrl(username);
        return UploadProps.getProps(url, false, "image/*", success, fail);
    }
    static getZipProps(username, appname, success, fail) {
        const url = client_1.default._private.getUploadZipUrl(username, appname);
        return UploadProps.getProps(url, false, ".zip", success, fail);
    }
    static getProps(url, multi, accept, success, fail, progress) {
        const props = {
            action: url,
            headers: {
                'X-Get3W-Access-Token': Auth.getToken()
            },
            multiple: multi,
            dataType: 'json',
            accept: accept,
            maxFileSize: 5000000,
            withCredentials: true,
            onStart(files) {
                DOM.loading(true);
            },
            onSuccess(ret) {
                DOM.loading(false);
                success(http.parseSnake(JSON.stringify(ret)));
            },
            onProgress(step, file) {
                DOM.loading(true);
                progress && progress();
            },
            onError(err) {
                console.log('onError', err);
                DOM.loading(false);
                fail ? fail(err.message) : Tips.error(err.message);
            },
        };
        return props;
    }
}
exports.UploadProps = UploadProps;
class Ace {
    static newEditor(editorType, value) {
        Ace.editor = ace.edit('ace-editor');
        Ace.editor.setTheme('ace/theme/monokai');
        Ace.editor.getSession().setMode('ace/mode/' + editorType);
        Ace.editor.getSession().setUseWrapMode(true);
        Ace.editor["$blockScrolling"] = Infinity;
        Ace.editor.setValue(value);
        setTimeout(() => {
            Ace.editor.focus();
            Ace.editor.gotoLine(1);
        }, 100);
        return Ace.editor;
    }
}
exports.Ace = Ace;
class DOM {
    static stop(e) {
        if (e) {
            e.stopPropagation();
        }
    }
    static prevent(e) {
        if (e) {
            e.preventDefault();
        }
    }
    static getComponentId(sectionPath, componentOrder) {
        return sectionPath + "-" + componentOrder;
    }
    static target(target) {
        return $(target);
    }
    static addClass(target, className) {
        $(target).addClass(className);
    }
    static removeClass(target, className) {
        $(target).removeClass(className);
    }
    static attr(target, attributeName) {
        return $(target).attr(attributeName);
    }
    static scrollTo(elementId) {
        setTimeout(() => {
            var scrollPane = $('.box_inner');
            var scrollTarget = $("#" + elementId);
            if (scrollTarget.length) {
                var scrollY = scrollTarget.offset().top + scrollPane.scrollTop() - scrollPane.offset().top;
                scrollPane.animate({ scrollTop: scrollY }, 500, 'swing');
            }
        }, 100);
    }
    static loading(loading) {
        loading ? $('#g3w-loading').show() : $('#g3w-loading').hide();
    }
    static mask(mask) {
        mask ? $('#g3w-windows-mask').show() : $('#g3w-windows-mask').hide();
    }
    static winHeight(substract) {
        return ($(window).height() - substract);
    }
    static winWidth(substract) {
        return ($(window).width() - substract);
    }
    static getValue(el) {
        if (el && typeof el.getValue === "function") {
            return el.getValue();
        }
        return "";
    }
    static getAbsoluteStyle(elId, width, height) {
        var position = $('#' + elId).offset();
        var isRight = position.left + width + 20 > $(document).width();
        var isBottom = position.top + height + 20 > $(document).height();
        var style = {
            top: 0, left: 0
        };
        if (isRight && isBottom) {
            style = {
                bottom: 0, right: 0
            };
        }
        else if (isRight) {
            style = {
                top: 0, right: 0
            };
        }
        else if (isBottom) {
            style = {
                bottom: 0, left: 0
            };
        }
        style.width = width + 'px';
        style.position = 'absolute';
        return style;
    }
    static momentLocale() {
        moment.locale('zh-cn', {
            months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
                LT: 'Ah点mm分',
                L: 'YYYY-MM-DD',
                LL: 'YYYY年MMMD日',
                LLL: 'YYYY年MMMD日LT',
                LLLL: 'YYYY年MMMD日ddddLT',
                l: 'YYYY-MM-DD',
                ll: 'YYYY年MMMD日',
                lll: 'YYYY年MMMD日LT',
                llll: 'YYYY年MMMD日ddddLT'
            },
            calendar: {
                sameDay: "[今天]LT",
                nextDay: '[明天]LT',
                nextWeek: '[下周]LT',
                lastDay: '[昨天]LT',
                lastWeek: '[上周]LT',
                sameElse: 'LL'
            }
        });
    }
}
exports.DOM = DOM;
class Tips {
    static info(message) {
        if ($('.console_extra_tips .info').length === 0) {
            $('body').append("<div class='console_extra_tips'><div class='info'>" + message + "</span></div>");
        }
        else {
            $('.console_extra_tips .info').html(message).fadeIn();
        }
        setTimeout(function () {
            $('.console_extra_tips .info').fadeOut();
        }, 3000);
    }
    static success(message) {
        if ($('.console_extra_tips .success').length === 0) {
            $('body').append("<div class='console_extra_tips'><div class='success'>" + message + "</span></div>");
        }
        else {
            $('.console_extra_tips .success').html(message).fadeIn();
        }
        setTimeout(function () {
            $('.console_extra_tips .success').fadeOut();
        }, 3000);
    }
    static error(message) {
        if ($('.console_extra_tips .error').length === 0) {
            $('body').append("<div class='console_extra_tips'><div class='error'>" + message + "</span></div>");
        }
        else {
            $('.console_extra_tips .error').html(message).fadeIn();
        }
        setTimeout(function () {
            $('.console_extra_tips .error').fadeOut();
        }, 3000);
    }
}
exports.Tips = Tips;
class Swal {
    static tip(title, text, isTimer) {
        if (isTimer) {
            swal({
                title: title,
                text: text,
                timer: 2000,
                html: true
            });
        }
        else {
            swal({
                title: title,
                text: text,
                html: true
            });
        }
    }
    static success(title, text, isNotTimer, onClick) {
        if (isNotTimer) {
            swal({
                title: title,
                text: text,
                type: "success",
                html: true
            }, onClick);
        }
        else {
            swal({
                title: title,
                text: text,
                type: "success",
                timer: 2000,
                html: true
            }, onClick);
        }
    }
    static error(err, callback) {
        swal({
            title: err.message,
            text: '',
            type: "error",
            html: true
        }, callback);
    }
    static warning(title, text, isNotTimer) {
        if (isNotTimer) {
            swal({
                title: title,
                text: text,
                type: "warning",
                html: true
            });
        }
        else {
            swal({
                title: title,
                text: text,
                type: "warning",
                timer: 2000,
                html: true
            });
        }
    }
    static delete(title, text, confirm) {
        swal({
            title: title,
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f36c60",
            confirmButtonText: lang.get('Yes, delete it!'),
            cancelButtonText: lang.get('Cancel'),
            closeOnConfirm: true,
            html: true
        }, confirm);
    }
    static confirm(title, text, confirm, confirmButtonText, closeOnConfirm) {
        if (typeof (closeOnConfirm) === 'undefined') {
            closeOnConfirm = true;
        }
        swal({
            title: title,
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f36c60",
            confirmButtonText: confirmButtonText || lang.get('Submit'),
            cancelButtonText: lang.get('Cancel'),
            closeOnConfirm: closeOnConfirm,
            html: true
        }, confirm);
    }
}
exports.Swal = Swal;
class String {
    static equalsIgnoreCase(str1, str2) {
        return (str1 && str1.toUpperCase()) === (str2 && str2.toUpperCase());
    }
    static isUsername(str) {
        var regPartton = /^[A-Za-z0-9.\-_]+$/;
        return regPartton.test(str);
    }
    static isEmail(str) {
        var regPartton = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return regPartton.test(str);
    }
    static isPhone(str) {
        var regPartton = /1[3-8]+\d{9}/;
        return regPartton.test(str);
    }
    static isFileName(name) {
        return /^[^\\/:\*\.\?"<>\|]+$/.test(name);
    }
    static isImage(name) {
        return /(\.|\/)(gif|jpe?g|png)$/i.test(name);
    }
    static getUnixTimestamp() {
        return Math.round(new Date().getTime() / 1000);
    }
    static getObjectId(idx) {
        return new Date().getTime() + ((typeof idx === 'number') ? (idx + 1) : 0);
    }
    static uuid_v1() {
        return uuid.v1().replace(/-/g, "");
    }
    static uuid_v4() {
        return uuid.v4().replace(/-/g, "");
    }
    static getByteCount(str) {
        if (!str)
            return 0;
        var ch;
        var count = 0;
        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            do {
                count++;
                ch = ch >> 8;
            } while (ch);
        }
        return count;
    }
    static mustache(tpl, data) {
        return mustache.render(tpl, data);
    }
}
exports.String = String;
class Translate {
    static base64ForUrlEncode(text) {
        if (!text)
            return "";
        var bytes = utf8.encode(text);
        var encoded = base64.encode(bytes)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        return encoded;
    }
    static base64ForUrlDecode(encoded) {
        if (!encoded)
            return "";
        encoded = encoded
            .replace(/\-/g, '+')
            .replace(/\_/g, '/');
        var bytes = base64.decode(encoded);
        var text = utf8.decode(bytes);
        return text;
    }
    static base64Encode(text) {
        if (!text)
            return "";
        var bytes = utf8.encode(text);
        return base64.encode(bytes);
    }
    static base64Decode(encoded) {
        if (!encoded)
            return "";
        var bytes = base64.decode(encoded);
        return utf8.decode(bytes);
    }
    static base64IsValid(base64) {
        if (!base64)
            return false;
        return /^[A-Za-z0-9\-_]+$/.test(base64);
    }
    static arrayToString(list) {
        var retval = '';
        if (list && list.length > 0) {
            list.forEach(function (item) {
                retval += item + ',';
            });
            retval = retval.substr(0, retval.length - 1);
        }
        return retval;
    }
    static toObject(json) {
        var obj = {};
        try {
            obj = $.parseJSON(json);
        }
        catch (e) { }
        return obj || {};
    }
    static toJSON(data) {
        return $.parseJSON(JSON.stringify(data));
    }
    static toNumber(str) {
        return parseInt(str) || 0;
    }
    static toBoolean(str) {
        return str ? (str === 'true') : false;
    }
    static toDate(str) {
        return moment(str).toDate();
    }
    static toMoment(str) {
        return moment(str);
    }
    static timestampToDate(timestamp) {
        return moment.unix(timestamp).toDate();
    }
    static toShortDate(date) {
        if (!date)
            return '';
        return Translate.momentToShort(Translate.toMoment(date.toString()));
    }
    static toLongDate(date) {
        if (!date)
            return '';
        return Translate.momentToLong(Translate.toMoment(date.toString()));
    }
    static momentToShort(date) {
        return date.format("YYYY-MM-DD");
    }
    static momentToLong(date) {
        return date.format("YYYY-MM-DD HH:mm:ss");
    }
    static getValueToEditor(dataType, value) {
        value = value || "";
        if (dataType === models.Const.DATA_TYPE_TEXT_AREA || dataType === models.Const.DATA_TYPE_EDITOR) {
            value = value.replace(/\r/g, "");
            value = value.replace(/\n/g, "");
            value = value.replace(/<br \/>/gi, "\n");
            value = value.replace(/<br>/gi, "\n");
            value = value.replace(/<br\/>/gi, "\n");
        }
        value = value.trim();
        return value;
    }
    static getValueFromEditor(dataType, value) {
        value = value || "";
        if (dataType === models.Const.DATA_TYPE_TEXT_AREA || dataType === models.Const.DATA_TYPE_EDITOR) {
            value = value.replace(/\n/g, "<br />");
            value = value.replace(/\r/g, "");
        }
        value = value.trim();
        return value;
    }
    static encode(val) {
        return encodeURIComponent(val);
    }
    static decode(val) {
        return decodeURIComponent(val);
    }
}
exports.Translate = Translate;
class Page {
    static getStorage(key) {
        return store.get(key);
    }
    static setStorage(name, value) {
        store.set(name, value);
    }
    static removeStorage(name) {
        store.remove(name);
    }
    static parseURL() {
        var username = '';
        var appname = '';
        var pathname = _.trim(location.pathname, '/');
        pathname = pathname.toLowerCase();
        var arr = pathname.split('/');
        var count = arr.length;
        if (count === 3) {
            username = arr[0];
            appname = arr[1];
        }
        return [username, appname];
    }
    static isPc() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    static getCookie(key) {
        var result = '';
        var str = document.cookie;
        var cookies = str ? str.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = parts.shift();
            var cookie = parts.join('=');
            if (key && key === name) {
                result = cookie;
                break;
            }
        }
        return result;
    }
    static setCookie(name, value, days) {
        if (typeof days === "undefined")
            days = 7;
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    static removeCookie(name) {
        Page.setCookie(name, "", -1);
    }
    static getCoEditKey() {
        return Page.getUrlVar('coEditKey');
    }
    static addLocale(url, locale) {
        return Page.addQuery(url, 'locale', locale);
    }
    static removeQuery(url, queryName) {
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {
            var prefix = encodeURIComponent(queryName) + '=';
            var pars = urlparts[1].split(/[&]/g);
            for (var i = pars.length; i-- > 0;) {
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }
            url = urlparts[0] + '?' + pars.join('&');
            return url;
        }
        else {
            return url;
        }
    }
    static addTimestamp(url) {
        return Page.addQuery(url, "ts", String.getUnixTimestamp());
    }
    static addQuery(url, queryName, queryValue) {
        if (url.indexOf(queryName + '=') !== -1) {
            url = Page.removeQuery(url, queryName);
        }
        var value = encodeURIComponent(queryValue);
        if (url && url.indexOf('?') !== -1) {
            url += '&' + queryName + '=' + value;
        }
        else {
            url += '?' + queryName + '=' + value;
        }
        return url;
    }
    static getUrlVar(key) {
        var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
        return result && decodeURIComponent(result[1]) || "";
    }
    static isProtocal(url) {
        if (!url)
            return false;
        return (url.indexOf("://") != -1 || _.startsWith(url, "javascript:void(0)"));
    }
    static redirectToReturnUrl(defaultUrl) {
        location.href = Addr.getReturnUrl(defaultUrl);
    }
    static redirect(url) {
        location.href = url;
    }
    static reload() {
        location.reload(true);
    }
    static downloadURL(url) {
        $('<iframe>', { src: url }).hide().appendTo('body');
    }
}
exports.Page = Page;
class App {
    static getRootUrl(app, relatedUrl) {
        var url = "http://" + app.name + "." + app.owner + "." + release_1.default.rootDestination;
        if (relatedUrl) {
            url += "/" + _.trimStart(relatedUrl, '/');
        }
        return url;
    }
    static getSourceUrl(app, config, relatedUrl) {
        var url = "http://" + app.name + "." + app.owner + "." + release_1.default.rootDestination;
        if (!_.endsWith(url, '/')) {
            url += '/';
        }
        if (relatedUrl) {
            url += _.trimStart(relatedUrl, '/');
        }
        return url;
    }
    static getDestinationUrl(app, config, relatedUrl) {
        var url = "http://" + app.name + "." + app.owner + "." + release_1.default.rootDestination;
        if (relatedUrl) {
            url += "/" + _.trimStart(relatedUrl, '/');
        }
        return url;
    }
    static getPublishedUrl(app, relatedUrl) {
        var url = "http://" + app.name + "." + app.owner + "." + release_1.default.rootDestination + "/";
        if (relatedUrl) {
            url += _.trimStart(relatedUrl, '/');
        }
        return url;
    }
}
exports.App = App;
class Addr {
    static getOwnerUrl(owner) {
        return release_1.default.domain + "/" + owner + "/";
    }
    static getRepoUrl(owner, name) {
        return release_1.default.domain + "/" + owner + "/" + name + "/";
    }
    static getCloudUrl(url) {
        return release_1.default.domain + "/" + url.replace(/(^\/*)|(\/*$)/g, "");
    }
    static getAbsoluteUrl(url) {
        url = url || '';
        if (_.startsWith(url, 'http://') || _.startsWith(url, 'https://'))
            return url;
        return release_1.default.domain + "/" + url.replace(/(^\/*)|(\/*$)/g, "");
    }
    static getUrl(url) {
        url = url || '';
        if (!Page.isProtocal(url)) {
            url = '/' + (_.trimStart(url, '/') || '');
        }
        return url;
    }
    static getImgUrl(url) {
        return Addr.getAbsoluteUrl('assets/img/' + url);
    }
    static getUrlCDN(relatedUrl) {
        if (relatedUrl) {
            relatedUrl = _.trim(relatedUrl, '/');
        }
        else {
            relatedUrl = '';
        }
        return release_1.default.domainCDN + '/' + relatedUrl;
    }
    static getReturnUrl(defaultUrl) {
        var reg = new RegExp("(^|&)" + "returnUrl" + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        else {
            return defaultUrl || Addr.getUrl();
        }
    }
    static getCoEditUrl(appKey) {
        if (Page.getUrlVar('coEditKey')) {
            return location.href;
        }
        return location.href + '&coEditKey=' + appKey;
    }
    static getThirdLoginUrl(bindingType, returnUrl, username) {
        if (username) {
            return '/home/authlogin.html?isStart=true&bindingType=' + bindingType + "&username=" + username + '&returnUrl=' + returnUrl;
        }
        else {
            return '/home/authlogin.html?isStart=true&bindingType=' + bindingType + '&returnUrl=' + returnUrl;
        }
    }
    static getErrorUrl() {
        return Addr.getUrl('error.html');
    }
    static getAvatarUrl(user) {
        if (!user || !user.avatarUrl)
            return Addr.getImgUrl('avatar.png');
        return "http://avatars.assets." + release_1.default.rootDestination + "/" + user.avatarUrl;
    }
    static getPath(owner, name) {
        return owner + "/" + name;
    }
    static getEditUrl(path) {
        return Addr.getUrl(path + '/edit');
    }
    static getDashboardUrl() {
        return Addr.getUrl('dashboard/');
    }
    static getLoginUrl(returnUrl) {
        returnUrl = returnUrl || window.location.href;
        return Addr.getUrl('login/index.html?returnUrl=' + encodeURIComponent(returnUrl));
    }
    static getSignupUrl(returnUrl) {
        returnUrl = returnUrl || Addr.getReturnUrl();
        return Addr.getUrl('signup/index.html?returnUrl=' + encodeURIComponent(returnUrl));
    }
    static getForgetPasswordUrl(returnUrl) {
        returnUrl = returnUrl || Addr.getReturnUrl();
        return Addr.getUrl('forgetpassword/index.html?returnUrl=' + encodeURIComponent(returnUrl));
    }
}
exports.Addr = Addr;
class Auth {
    static locale(user) {
        var lang = Page.getUrlVar('locale');
        if (lang) {
            if (user) {
                if (user.locale !== lang) {
                    client_1.default.users.edit({
                        locale: lang
                    }, (err, user) => {
                        if (!err) {
                        }
                    });
                }
            }
            else {
                Page.setCookie('locale', lang);
            }
        }
        if (!lang) {
            if (user && user.locale) {
                lang = user.locale;
            }
        }
        if (!lang) {
            lang = Page.getCookie('locale');
        }
        if (!lang) {
            if (navigator["languages"]) {
                lang = navigator["languages"][0];
            }
            else if (navigator.userLanguage) {
                lang = navigator.userLanguage;
            }
            else {
                lang = navigator.language;
            }
        }
        return lang;
    }
    static getToken() {
        const authState = Auth.getAuthState();
        return (authState && authState.token && authState.token !== 'undefined' && authState.token !== 'null') ? authState.token : '';
    }
    static getAuthState() {
        let authState = Page.getStorage(models.Const.AUTH_STATE);
        if (!authState) {
            authState = {
                token: '',
                user: null,
                orgs: [],
                orgLeaders: [],
                orgAdmins: [],
                isAnonymous: true,
            };
        }
        return authState;
    }
    static cacheAuthState(authState) {
        client_1.default.setToken(authState.token);
        Ajax.setHeader(authState.token);
        Page.setStorage(models.Const.AUTH_STATE, authState);
    }
    static removeCache() {
        Page.removeStorage(models.Const.AUTH_STATE);
        Page.removeStorage(models.Const.ORG_STATE);
        Ajax.setHeader('');
    }
}
exports.Auth = Auth;
class Ajax {
    static setHeader(token) {
        var headers = {};
        var authorization = 'Bearer ' + token;
        headers['Authorization'] = authorization;
        $.ajaxSetup({
            headers: headers
        });
    }
    static handleError(xhr, fail) {
        var errorMessage = '';
        if (xhr && xhr.responseText) {
            try {
                var responseObject = JSON.parse(xhr.responseText);
                var message = responseObject.exceptionMessage || responseObject.errorMessage || responseObject.message;
                errorMessage = message;
            }
            catch (e) { }
        }
        if (fail) {
            fail(errorMessage);
        }
        else {
            DOM.loading(false);
            if (errorMessage) {
                Tips.error(errorMessage);
            }
        }
    }
    static get(url, done, fail) {
        Ajax.ajaxJSON(models.ERestMethod.GET, null, url, done, fail);
    }
    static post(parameters, url, done, fail) {
        Ajax.ajaxJSON(models.ERestMethod.POST, parameters, url, done, fail);
    }
    static put(parameters, url, done, fail) {
        Ajax.ajaxJSON(models.ERestMethod.PUT, parameters, url, done, fail);
    }
    static delete(url, done, fail) {
        Ajax.ajaxJSON(models.ERestMethod.DELETE, null, url, done, fail);
    }
    static ajaxGet(parameters, url, done, fail) {
        Ajax.ajax("GET", parameters, url, done, fail);
    }
    static ajaxPost(parameters, url, done, fail) {
        Ajax.ajax("POST", parameters, url, done, fail);
    }
    static ajaxPut(parameters, url, done, fail) {
        Ajax.ajax("PUT", parameters, url, done, fail);
    }
    static ajaxDelete(parameters, url, done, fail) {
        Ajax.ajax("DELETE", parameters, url, done, fail);
    }
    static ajax(method, parameters, url, done, fail) {
        if (done) {
            $.ajax({
                url: url,
                type: method,
                data: parameters,
                dataType: 'json'
            })
                .done((data) => {
                done(data);
            })
                .fail((xhr) => {
                Ajax.handleError(xhr, fail);
            });
        }
        else {
            $.ajax({
                url: url,
                type: method,
                data: parameters,
                dataType: 'json'
            })
                .fail((xhr) => {
                Ajax.handleError(xhr, fail);
            });
        }
    }
    static ajaxJSON(method, parameters, url, done, fail) {
        var data = (method === models.ERestMethod.GET || typeof parameters == "string") ? parameters : JSON.stringify(parameters || {});
        if (done) {
            $.ajax({
                url: url,
                type: models.ERestMethodUtils.getValue(method),
                data: data,
                contentType: "application/json charset=utf-8",
                dataType: 'json'
            })
                .done((data) => {
                done(data);
            })
                .fail((xhr) => {
                Ajax.handleError(xhr, fail);
            });
        }
        else {
            $.ajax({
                url: url,
                type: models.ERestMethodUtils.getValue(method),
                data: data,
                contentType: "application/json charset=utf-8",
                dataType: 'json'
            })
                .fail((xhr) => {
                Ajax.handleError(xhr, fail);
            });
        }
    }
    static loadLibResources() {
        Ajax.loadScript("/lib/wysihtml/0.5.4/dist/wysihtml-toolbar.min.js", () => {
            Ajax.loadScript("/lib/wysihtml/0.5.4/parser_rules/advanced_and_extended.js");
        });
        Ajax.loadScript("/lib/ace/src-noconflict/ace.js");
    }
    static loadScript(url, success) {
        url = Addr.getAbsoluteUrl(url);
        if (Ajax.scriptUrlList[url]) {
            success && success();
        }
        else {
            scriptjs(url, function () {
                success && success();
                Ajax.scriptUrlList[url] = true;
            });
        }
    }
}
Ajax.SCRIPT_URL_STRIPE = 'https://checkout.stripe.com/checkout.js';
Ajax.scriptUrlList = {};
exports.Ajax = Ajax;
//# sourceMappingURL=utils.js.map