"use strict";
const React = require('react');
const react_router_1 = require('react-router');
class Location extends React.Component {
    onNavClick() {
        react_router_1.browserHistory.push(this.props.navUrl);
    }
    render() {
        if (this.props.currentTitle) {
            return (React.createElement("div", {className: "m2pos"}, 
                React.createElement("a", {className: "m2pos_a", href: "/"}, "首页"), 
                ">", 
                React.createElement("a", {className: "m2pos_a", href: "javascript:;", onClick: this.onNavClick.bind(this)}, this.props.navTitle), 
                ">", 
                React.createElement("span", {className: "m2pos_cut"}, this.props.currentTitle)));
        }
        return (React.createElement("div", {className: "m2pos"}, 
            React.createElement("a", {className: "m2pos_a", href: "/"}, "首页"), 
            ">", 
            React.createElement("a", {className: "m2pos_a", href: "javascript:;", onClick: this.onNavClick.bind(this)}, this.props.navTitle)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Location;
//# sourceMappingURL=location.js.map