"use strict";
const React = require('react');
class Loading extends React.Component {
    render() {
        return (React.createElement("div", null, 
            React.createElement("div", {id: "g3w-loading", className: 'g3w-loading'}, 
                React.createElement("div", {className: 'loading-animation'}, 
                    React.createElement("div", {className: 'loading-text'}, "载入中...")
                ), 
                React.createElement("div", {className: 'loading-mask'})), 
            React.createElement("div", {id: "g3w-windows-mask", className: 'g3w-windows-mask'})));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Loading;
//# sourceMappingURL=loading.js.map