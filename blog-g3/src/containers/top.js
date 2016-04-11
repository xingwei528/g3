"use strict";
const React = require('react');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const utils = require('../lib/utils');
const actions = require('../actions/authActions');
const links = require('../constants/links');
class Top extends React.Component {
    onLogout(e) {
        utils.DOM.stop(e);
        this.props.actions.logout();
        react_router_1.browserHistory.push(links.LOGIN);
    }
    render() {
        if (!this.props.authState.user)
            return null;
        const user = this.props.authState.user;
        return (React.createElement("div", {className: "topBg"}, 
            React.createElement("div", {className: "wrapper"}, 
                React.createElement("span", {className: "fl"}, 
                    "你好，", 
                    React.createElement("a", {href: "/users/" + user.userName, className: "cor_yellow"}, user.displayName), 
                    "，欢迎来到中国移动网上党校！"), 
                React.createElement("a", {href: "javascript:;", className: "topOut", onClick: this.onLogout.bind(this)}, "退出登录"), 
                React.createElement("a", {href: "http://cms.hecmcc.com/xcmh/?u=" + encodeURIComponent(user.displayName), className: "top_btn"}, "进入宣传门户"))
        ));
    }
}
function mapStateToProps(state) {
    return {
        authState: state.authState
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: redux_1.bindActionCreators(actions, dispatch)
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Top);
//# sourceMappingURL=top.js.map