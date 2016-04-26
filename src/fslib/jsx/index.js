"use strict";
var jsdom = require('jsdom-no-contextify').jsdom;
var HTMLtoJSX = require('htmltojsx');
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
var TagToReactRouter = (function () {
    function TagToReactRouter() {
    }
    TagToReactRouter.prototype.reset = function () {
        this.output = '';
        this.routerLink = false;
    };
    TagToReactRouter.prototype.oneLevelOnly = function (element) {
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
    TagToReactRouter.prototype.parse = function (element) {
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
    TagToReactRouter.prototype.traverse = function (element) {
        for (var i = 0, count = element.childNodes.length; i < count; i++) {
            this.visit(element.childNodes[i]);
        }
    };
    TagToReactRouter.prototype.visit = function (element) {
        this.begin(element);
        this.traverse(element);
        this.end(element);
    };
    TagToReactRouter.prototype.handleText = function (element) {
        var text = element.textContent;
        if (this.routerLink) {
            text = text.replace(/\[/g, '{').replace(/]/g, '}');
        }
        var tempEl = createElement('div');
        tempEl.textContent = text;
        this.output += tempEl.innerHTML;
    };
    TagToReactRouter.prototype.beginNode = function (node) {
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
    TagToReactRouter.prototype.begin = function (node) {
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
    TagToReactRouter.prototype.end = function (node) {
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
    return TagToReactRouter;
}());
function createReactComponent(content) {
    var converter = new HTMLtoJSX({
        createClass: false
    });
    var output = "const React = require('react');\n  const page = React.createClass({\n    render: function() {\n      return (\n        " + converter.convert(new TagToReactRouter().parse(content)) + "\n      )\n    }\n  });\n  module.exports = page;";
    return output;
}
exports.createReactComponent = createReactComponent;
//# sourceMappingURL=index.js.map