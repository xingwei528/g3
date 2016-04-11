"use strict";
const React = require('react');
class InnerLoading extends React.Component {
    render() {
        return (React.createElement("div", {className: 'g3w-inner-loading'}, 
            React.createElement("span", {className: "g3w-loading"}, 
                React.createElement("i", null), 
                React.createElement("i", null), 
                React.createElement("i", null))
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InnerLoading;
//# sourceMappingURL=innerLoading.js.map