"use strict";
const mustache = require("mustache");
var SECOND = 1000, MINUTE = 60 * SECOND, HOUR = 60 * MINUTE, DAY = 24 * HOUR, WEEK = 7 * DAY, YEAR = DAY * 365, MONTH = YEAR / 12, FORMATS = {
    "en": [
        [0.7 * MINUTE, 'just now'],
        [1.5 * MINUTE, 'a minute ago'],
        [60 * MINUTE, 'minutes ago', MINUTE],
        [1.5 * HOUR, 'an hour ago'],
        [DAY, 'hours ago', HOUR],
        [2 * DAY, 'yesterday'],
        [7 * DAY, 'days ago', DAY],
        [1.5 * WEEK, 'a week ago'],
        [MONTH, 'weeks ago', WEEK],
        [1.5 * MONTH, 'a month ago'],
        [YEAR, 'months ago', MONTH],
        [1.5 * YEAR, 'a year ago'],
        [Number.MAX_VALUE, 'years ago', YEAR]
    ],
    "zh-cn": [
        [0.7 * MINUTE, '当前'],
        [1.5 * MINUTE, '分钟前'],
        [60 * MINUTE, '分钟前', MINUTE],
        [1.5 * HOUR, '小时前'],
        [DAY, '小时前', HOUR],
        [2 * DAY, '昨天'],
        [7 * DAY, '天前', DAY],
        [1.5 * WEEK, '上周'],
        [MONTH, '周前', WEEK],
        [1.5 * MONTH, '1月前'],
        [YEAR, '月前', MONTH],
        [1.5 * YEAR, '1年前'],
        [Number.MAX_VALUE, '年前', YEAR]
    ]
};
var MAP = null;
var LOCALE = 'en';
function getUrl(jsonName) {
    return "/assets/locales/" + LOCALE + "/" + jsonName;
}
function getLocale(locale) {
    var retval = locale === 'zh' ? 'zh-cn' : locale;
    retval = (retval || 'en').toLowerCase();
    if (['en', 'zh-cn'].indexOf(retval) !== -1) {
        return retval;
    }
    return 'en';
}
class Language {
    constructor(locale, shortName, longName, current) {
        this.locale = locale;
        this.shortName = shortName;
        this.longName = longName;
        this.current = current;
    }
    static getLanguages() {
        return [
            new Language(Language.LOCALE_EN, 'EN', 'English', LOCALE === Language.LOCALE_EN),
            new Language(Language.LOCALE_ZH_CN, '简', '简体中文', LOCALE === Language.LOCALE_ZH_CN)
        ];
    }
}
Language.LOCALE_EN = 'en';
Language.LOCALE_ZH_CN = 'zh-cn';
Language.dashboard = "dashboard.json";
Language.forgetpassword = "forgetpassword.json";
Language.list = "list.json";
Language.login = "login.json";
Language.desktop = "desktop.json";
Language.app = "app.json";
Language.signup = "signup.json";
Language.index = "index.json";
exports.Language = Language;
function init(localeOrigin, jsonName, callback) {
    callback();
}
exports.init = init;
function locale() {
    return LOCALE;
}
exports.locale = locale;
function get(msg, data) {
    if (MAP && MAP[msg]) {
        msg = MAP[msg];
    }
    if (data) {
        msg = mustache.render(msg, data);
    }
    return msg;
}
exports.get = get;
class Format {
    static relativeDate(inputDate, referenceDate) {
        !referenceDate && (referenceDate = new Date());
        var input = inputDate.getTime();
        var reference = referenceDate.getTime();
        var delta = reference - input, format, i, len;
        var formats = FORMATS[LOCALE];
        for (i = -1, len = formats.length; ++i < len;) {
            format = formats[i];
            if (delta < format[0]) {
                return format[2] == undefined ? format[1] : Math.round(delta / format[2]) + ' ' + format[1];
            }
        }
    }
}
exports.Format = Format;
//# sourceMappingURL=lang.js.map