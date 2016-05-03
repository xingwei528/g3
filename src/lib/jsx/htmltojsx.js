"use strict";
var lib = require('../');
var NODE_TYPE = {
    ELEMENT: 1,
    TEXT: 3,
    COMMENT: 8
};
var ATTRIBUTE_MAPPING = {
    'for': 'htmlFor',
    'class': 'className'
};
var ELEMENT_ATTRIBUTE_MAPPING = {
    'input': {
        'checked': 'defaultChecked',
        'value': 'defaultValue'
    }
};
var HTMLDOMPropertyConfig = require('react/lib/HTMLDOMPropertyConfig');
for (var propname in HTMLDOMPropertyConfig.Properties) {
    if (!HTMLDOMPropertyConfig.Properties.hasOwnProperty(propname)) {
        continue;
    }
    var mapFrom = HTMLDOMPropertyConfig.DOMAttributeNames[propname] || propname.toLowerCase();
    if (!ATTRIBUTE_MAPPING[mapFrom])
        ATTRIBUTE_MAPPING[mapFrom] = propname;
}
function repeatString(string, times) {
    if (times === 1) {
        return string;
    }
    if (times < 0) {
        throw new Error();
    }
    var repeated = '';
    while (times) {
        if (times & 1) {
            repeated += string;
        }
        if (times >>= 1) {
            string += string;
        }
    }
    return repeated;
}
function endsWith(haystack, needle) {
    return haystack.slice(-needle.length) === needle;
}
function trimEnd(haystack, needle) {
    return endsWith(haystack, needle)
        ? haystack.slice(0, -needle.length)
        : haystack;
}
function hyphenToCamelCase(string) {
    return string.replace(/-(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
}
function isEmpty(string) {
    return !/[^\s]/.test(string);
}
function isConvertiblePixelValue(value) {
    return /^\d+px$/.test(value);
}
function isNumeric(input) {
    return input !== undefined
        && input !== null
        && (typeof input === 'number' || parseInt(input, 10) == input);
}
var jsdom = require('jsdom-no-contextify').jsdom;
var window = jsdom().defaultView;
var createElement = function (tag) {
    return window.document.createElement(tag);
};
var tempEl = createElement('div');
function escapeSpecialChars(value) {
    tempEl.textContent = value;
    return tempEl.innerHTML;
}
var HTMLtoJSX = (function () {
    function HTMLtoJSX(config, components) {
        this.output = '';
        this.level = 0;
        this._inPreTag = false;
        this.componentMap = {};
        this.config = config || {};
        this.components = components || [];
        if (!this.config.indent) {
            this.config.indent = '  ';
        }
    }
    HTMLtoJSX.prototype.reset = function () {
        this.output = '';
        this.level = 0;
        this._inPreTag = false;
        this.componentMap = {};
    };
    HTMLtoJSX.prototype._getTagName = function (node) {
        var tagName = node.tagName.toLowerCase();
        if (tagName === 'link')
            return 'Link';
        var componentName = lib.toComponentName(node.tagName);
        if (this.componentMap[this.level] && this.components.indexOf(componentName) !== -1) {
            tagName = componentName;
        }
        return tagName;
    };
    HTMLtoJSX.prototype.convert = function (html) {
        this.reset();
        var containerEl = createElement('div');
        containerEl.innerHTML = '\n' + this._cleanInput(html) + '\n';
        if (this._onlyOneTopLevel(containerEl)) {
            this._traverse(containerEl);
        }
        else {
            this.output += this.config.indent + this.config.indent + this.config.indent;
            this.level++;
            this._visit(containerEl);
        }
        this.output = this.output.trim();
        return this.output;
    };
    HTMLtoJSX.prototype._cleanInput = function (html) {
        html = html.trim();
        html = html.replace(/<script([\s\S]*?)<\/script>/g, '');
        return html;
    };
    HTMLtoJSX.prototype._onlyOneTopLevel = function (containerEl) {
        if (containerEl.childNodes.length === 1
            && containerEl.childNodes[0].nodeType === NODE_TYPE.ELEMENT) {
            return true;
        }
        var foundElement = false;
        for (var i = 0, count = containerEl.childNodes.length; i < count; i++) {
            var child = containerEl.childNodes[i];
            if (child.nodeType === NODE_TYPE.ELEMENT) {
                if (foundElement) {
                    return false;
                }
                else {
                    foundElement = true;
                }
            }
            else if (child.nodeType === NODE_TYPE.TEXT && !isEmpty(child.textContent)) {
                return false;
            }
        }
        return true;
    };
    HTMLtoJSX.prototype._getIndentedNewline = function () {
        return '\n' + repeatString(this.config.indent, this.level + 2);
    };
    HTMLtoJSX.prototype._visit = function (node) {
        this._beginVisit(node);
        this._traverse(node);
        this._endVisit(node);
    };
    HTMLtoJSX.prototype._traverse = function (node) {
        this.level++;
        for (var i = 0, count = node.childNodes.length; i < count; i++) {
            this._visit(node.childNodes[i]);
        }
        this.level--;
    };
    HTMLtoJSX.prototype._beginVisit = function (node) {
        switch (node.nodeType) {
            case NODE_TYPE.ELEMENT:
                var componentName = lib.toComponentName(node.tagName);
                if (this.components.indexOf(componentName) !== -1) {
                    this.componentMap[this.level] = true;
                }
                this._beginVisitElement(node);
                break;
            case NODE_TYPE.TEXT:
                this._visitText(node);
                break;
            case NODE_TYPE.COMMENT:
                this._visitComment(node);
                break;
            default:
                console.warn('Unrecognised node type: ' + node.nodeType);
        }
    };
    HTMLtoJSX.prototype._endVisit = function (node) {
        switch (node.nodeType) {
            case NODE_TYPE.ELEMENT:
                this._endVisitElement(node);
                break;
            case NODE_TYPE.TEXT:
            case NODE_TYPE.COMMENT:
                break;
        }
    };
    HTMLtoJSX.prototype._beginVisitElement = function (node) {
        if (node.tagName.toLowerCase() === 'children') {
            this.output += '{this.props.children}';
            return;
        }
        var tagName = this._getTagName(node);
        var attributes = [];
        for (var i = 0, count = node.attributes.length; i < count; i++) {
            attributes.push(this._getElementAttribute(node, node.attributes[i]));
        }
        if (tagName === 'textarea') {
            attributes.push('defaultValue={' + JSON.stringify(node.value) + '}');
        }
        if (tagName === 'style') {
            attributes.push('dangerouslySetInnerHTML={{__html: ' + JSON.stringify(node.textContent) + ' }}');
        }
        if (tagName === 'pre') {
            this._inPreTag = true;
        }
        this.output += '<' + tagName;
        if (attributes.length > 0) {
            this.output += ' ' + attributes.join(' ');
        }
        if (!this._isSelfClosing(node)) {
            this.output += '>';
        }
    };
    HTMLtoJSX.prototype._endVisitElement = function (node) {
        if (node.tagName.toLowerCase() === 'children') {
            return;
        }
        var tagName = this._getTagName(node);
        this.output = trimEnd(this.output, this.config.indent);
        if (this._isSelfClosing(node)) {
            this.output += ' />';
        }
        else {
            this.output += '</' + tagName + '>';
        }
        if (tagName === 'pre') {
            this._inPreTag = false;
        }
    };
    HTMLtoJSX.prototype._isSelfClosing = function (node) {
        return !node.firstChild || node.tagName.toLowerCase() === 'textarea' || node.tagName.toLowerCase() === 'style';
    };
    HTMLtoJSX.prototype._visitText = function (node) {
        var parentTag = node.parentNode && node.parentNode.tagName.toLowerCase();
        if (parentTag === 'textarea' || parentTag === 'style') {
            return;
        }
        var text = escapeSpecialChars(node.textContent);
        if (this._inPreTag) {
            text = text
                .replace(/\r/g, '')
                .replace(/( {2,}|\n|\t|\{|\})/g, function (whitespace) {
                return '{' + JSON.stringify(whitespace) + '}';
            });
        }
        else {
            text = text
                .replace(/(\{|\})/g, function (brace) {
                return '{\'' + brace + '\'}';
            });
            if (text.indexOf('\n') > -1) {
                text = text.replace(/\n\s*/g, this._getIndentedNewline());
            }
        }
        this.output += text;
    };
    HTMLtoJSX.prototype._visitComment = function (node) {
        this.output += '{/*' + node.textContent.replace('*/', '* /') + '*/}';
    };
    HTMLtoJSX.prototype._getElementAttribute = function (node, attribute) {
        switch (attribute.name) {
            case 'style':
                return this._getStyleAttribute(attribute.value);
            default:
                var tagName = node.tagName.toLowerCase();
                var name = (ELEMENT_ATTRIBUTE_MAPPING[tagName] &&
                    ELEMENT_ATTRIBUTE_MAPPING[tagName][attribute.name]) ||
                    ATTRIBUTE_MAPPING[attribute.name] ||
                    attribute.name;
                var result = name;
                if (isNumeric(attribute.value)) {
                    result += '={' + attribute.value + '}';
                }
                else if (attribute.value.length > 0) {
                    result += '="' + attribute.value.replace(/"/gm, '&quot;') + '"';
                }
                return result;
        }
    };
    HTMLtoJSX.prototype._getStyleAttribute = function (styles) {
        var jsxStyles = new StyleParser(styles).toJSXString();
        return 'style={{' + jsxStyles + '}}';
    };
    return HTMLtoJSX;
}());
var StyleParser = (function () {
    function StyleParser(rawStyle) {
        this.rawStyle = null;
        this.styles = null;
        this.parse(rawStyle);
    }
    StyleParser.prototype.parse = function (rawStyle) {
        this.styles = {};
        rawStyle.split(';').forEach(function (style) {
            style = style.trim();
            var firstColon = style.indexOf(':');
            var key = style.substr(0, firstColon);
            var value = style.substr(firstColon + 1).trim();
            if (key !== '') {
                key = key.toLowerCase();
                this.styles[key] = value;
            }
        }, this);
    };
    StyleParser.prototype.toJSXString = function () {
        var output = [];
        for (var key in this.styles) {
            if (!this.styles.hasOwnProperty(key)) {
                continue;
            }
            output.push(this.toJSXKey(key) + ': ' + this.toJSXValue(this.styles[key]));
        }
        return output.join(', ');
    };
    StyleParser.prototype.toJSXKey = function (key) {
        if (/^-ms-/.test(key)) {
            key = key.substr(1);
        }
        return hyphenToCamelCase(key);
    };
    StyleParser.prototype.toJSXValue = function (value) {
        if (isNumeric(value)) {
            return value;
        }
        else if (isConvertiblePixelValue(value)) {
            return trimEnd(value, 'px');
        }
        else {
            return '\'' + value.replace(/'/g, '"') + '\'';
        }
    };
    return StyleParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HTMLtoJSX;
//# sourceMappingURL=htmltojsx.js.map