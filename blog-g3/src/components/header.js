"use strict";
const React = require('react');
const utils = require('../lib/utils');
const jsxInput = require('../lib/controls/jsxInput');
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
    }
    onSearch(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    onMenu(e) {
        this.setState({
            menu: !this.state.menu
        });
    }
    onSingoutClick(e) {
    }
    render() {
        var btnElement = null;
        var query = utils.Page.getUrlVar('q');
        var qEl = React.createElement(jsxInput.Component, jsxInput.getProps('q', query, '', 'input-text', false, false, null));
        return (React.createElement("div", {className: "ct-container"}, 
            React.createElement("div", {className: "navigation"}, 
                React.createElement("div", {className: "navbar-header"}, 
                    React.createElement("a", {className: "logo ct-fl", href: "/"}, 
                        React.createElement("img", {src: "/assets/img/logo.png", alt: "logo"})
                    ), 
                    React.createElement("a", {className: "navbar-toggle ct-fr", href: "/"}, 
                        React.createElement("i", {className: "fa fa-reorder"})
                    )), 
                React.createElement("div", {className: "navbar-collapse collapse"}, 
                    React.createElement("nav", {className: "nav"}, 
                        React.createElement("a", {href: "/", style: { display: 'none' }}, "Features"), 
                        React.createElement("a", {href: "/"}, "Explore"), 
                        React.createElement("a", {href: "/"}, "Pricing")), 
                    React.createElement("div", {className: "navbar-right"}, 
                        React.createElement("form", {className: "input-form", onSubmit: this.onSearch.bind(this)}, 
                            qEl, 
                            React.createElement("a", {className: "fa fa-search", href: "javascript:void(0)", onClick: this.onSearch.bind(this)})), 
                        btnElement)))
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
//# sourceMappingURL=header.js.map