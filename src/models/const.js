"use strict";
var Const = (function () {
    function Const() {
    }
    Const.DIR_DOT_G3 = '.g3';
    Const.DIR_SRC = 'src';
    Const.DIR_PUBLIC = 'public';
    Const.DIR_DATA = 'data';
    Const.DIR_COMPONENTS = 'components';
    Const.FILE_G3_YML = 'g3.yml';
    Const.FILE_CONFIG_YML = 'config.yml';
    Const.FILE_CONFIG_JS = 'config.js';
    Const.FILE_APP = 'app';
    Const.FILE_INDEX = 'index';
    Const.FILE_LAYOUT = 'layout';
    Const.DOM_REACT_ROOT = 'root';
    Const.DEFAULT_TAG_NAMES = [
        'Link',
        'IndexLink'
    ];
    Const.DEFAULT_TAG_NAMES_LOWER = [
        'link',
        'indexlink'
    ];
    Const.DEFAULT_IMPORTS = "import React from 'react';\nimport { Link, IndexLink } from 'react-router';";
    return Const;
}());
exports.Const = Const;
//# sourceMappingURL=const.js.map