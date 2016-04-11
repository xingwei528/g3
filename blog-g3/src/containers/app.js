"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const components_1 = require('../lib/components');
const header_1 = require("../containers/header");
const footer_1 = require("../components/footer");
class App extends React.Component {
    render() {
        return (React.createElement("div", null, 
            React.createElement(header_1.default, null), 
            this.props.children, 
            React.createElement(footer_1.default, null), 
            React.createElement(components_1.Loading, null)));
    }
}
function mapStateToProps(state) {
    return {
        authState: state.authState,
        orgState: state.orgState
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(App);
//# sourceMappingURL=app.js.map