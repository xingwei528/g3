"use strict";
var jsdom = require('jsdom-no-contextify').jsdom;
var defaultView = jsdom().defaultView;
function createElement(tag) {
    return defaultView.document.createElement(tag);
}
function isEmpty(string) {
    return !/[^\s]/.test(string);
}
var ATTRIBUTE_MAPPING = {
    'classname': 'className',
    'activestyle': 'activeStyle',
    'htmlfor': 'htmlFor'
};
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.reset = function () {
        this.output = '';
        this.routerLink = false;
    };
    Parser.prototype.oneLevelOnly = function (element) {
        if (element.childNodes.length === 1
            && element.childNodes[0].nodeType === 1) {
            return true;
        }
        var foundElement = false;
        for (var i = 0, count = element.childNodes.length; i < count; i++) {
            var child = element.childNodes[i];
            if (child.nodeType === 1) {
                if (foundElement) {
                    return false;
                }
                else {
                    foundElement = true;
                }
            }
            else if (child.nodeType === 3 && !isEmpty(child.textContent)) {
                return false;
            }
        }
        return true;
    };
    Parser.prototype.convert = function (element) {
        this.reset();
        var wrapper = createElement('div');
        wrapper.innerHTML = element;
        if (this.oneLevelOnly(wrapper)) {
            this.traverse(wrapper);
        }
        else {
            this.visit(wrapper);
        }
        return this.output;
    };
    Parser.prototype.traverse = function (element) {
        for (var i = 0, count = element.childNodes.length; i < count; i++) {
            this.visit(element.childNodes[i]);
        }
    };
    Parser.prototype.visit = function (element) {
        this.begin(element);
        this.traverse(element);
        this.end(element);
    };
    Parser.prototype.handleText = function (element) {
        var text = element.textContent;
        if (this.routerLink) {
            text = text.replace(/\[/g, '{').replace(/]/g, '}');
        }
        var tempEl = createElement('div');
        tempEl.textContent = text;
        this.output += tempEl.innerHTML;
    };
    Parser.prototype.beginNode = function (node) {
        var tagName = this.routerLink ? 'Link' : node.tagName.toLowerCase();
        var attributes = [];
        for (var i = 0, count = node.attributes.length; i < count; i++) {
            var value = node.attributes[i].value;
            if (value.indexOf('[') === -1) {
                value = '"' + value + '"';
            }
            else {
                value = '{' + value.replace(/\[/g, '{').replace(/\]/g, '}') + '}';
            }
            var name = node.attributes[i].name;
            if (this.routerLink) {
                name = name.replace(/data-/g, '');
            }
            for (var key in ATTRIBUTE_MAPPING) {
                if (ATTRIBUTE_MAPPING.hasOwnProperty(key)) {
                    name = name.replace(key, ATTRIBUTE_MAPPING[key]);
                }
            }
            attributes.push(name + '=' + value);
        }
        this.output += '<' + tagName;
        if (attributes.length > 0) {
            this.output += ' ' + attributes.join(' ');
        }
        if (node.firstChild) {
            this.output += '>';
        }
    };
    Parser.prototype.begin = function (node) {
        switch (node.nodeType) {
            case 1:
                if (node.tagName === 'A' && node.getAttribute('data-to')) {
                    this.routerLink = true;
                }
                this.beginNode(node);
                break;
            case 3:
                this.handleText(node);
                break;
        }
    };
    Parser.prototype.end = function (node) {
        if (node.nodeType === 1) {
            var tagName = this.routerLink ? 'Link' : node.tagName.toLowerCase();
            this.routerLink = false;
            if (node.firstChild) {
                this.output += '</' + tagName + '>';
            }
            else {
                this.output += ' />';
            }
        }
    };
    return Parser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Parser;
//# sourceMappingURL=parser.js.map