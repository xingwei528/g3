"use strict";
const React = require('react');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const utils = require('../lib/utils');
const authActions = require('../actions/authActions');
const orgActions = require('../actions/orgActions');
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: utils.Page.getUrlVar('q'),
            isMenu: false,
        };
    }
    onSearch(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.state.query) {
            utils.Page.redirect('');
        }
    }
    onSingoutClick(e) {
    }
    onMenu(e) {
        this.setState({
            query: this.state.query,
            isMenu: !this.state.isMenu
        });
    }
    render() {
        var btnElement = null;
        if (this.props.authState.isAnonymous) {
            btnElement = [
                React.createElement("a", {key: "signup", className: "signup", href: utils.Addr.getSignupUrl()}, "Sign up"),
                React.createElement("a", {key: "login", className: "login", href: utils.Addr.getLoginUrl()}, "Login")
            ];
        }
        else {
            var username = this.props.authState.user.username;
            var userUrl = '';
            var starsUrl = '';
            var menuEl = null;
            if (this.state.isMenu) {
                menuEl = (React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", {className: "dropdown-header"}, "Welcome"), 
                    React.createElement("li", {className: "divider"}), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: userUrl}, "Your apps")
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: starsUrl}, "Your stars")
                    ), 
                    React.createElement("li", {className: "divider"}), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: ""}, "Create new...")
                    ), 
                    React.createElement("li", {className: "divider"}), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: ""}, "Settings")
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "javascript:void(0)", onClick: this.onSingoutClick.bind(this)}, "Sign out")
                    )));
            }
            btnElement = (React.createElement("div", {className: "user"}, 
                React.createElement("a", {className: "username", href: "javascript:void(0)", onClick: this.onMenu.bind(this)}, 
                    username, 
                    React.createElement("i", {className: "fa fa-caret-down"})), 
                menuEl));
        }
        let sloganEl = null;
        sloganEl = (React.createElement("div", {className: "ct-container carrousel"}, 
            React.createElement("div", {className: "ico"}, 
                React.createElement("img", {src: "/assets/img/features/logo-large.png"})
            ), 
            React.createElement("p", {className: "solgan"}, "Edit the World Wide Web"), 
            React.createElement("p", {className: "sub-slogan"}, "You can change any websites with Get3W Editor, Enter your website URL below and make changes."), 
            React.createElement("div", {className: "start-button"}, 
                React.createElement("input", {type: "text", defaultValue: "http://www.get3w.com", className: "start-input"}), 
                React.createElement("a", {href: "/signup/index.html?returnUrl=%2F", className: "g3-btn register-btn"}, 
                    React.createElement("span", null, "Start edit"), 
                    React.createElement("i", {className: "fa fa-angle-right"})))));
        return (React.createElement("header", {className: "header liner-bg"}, 
            React.createElement("div", {className: "ct-container"}, 
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
                            React.createElement("a", {href: "", style: { display: 'none' }}, "Features"), 
                            React.createElement("a", {href: ""}, "Explore"), 
                            React.createElement("a", {href: ""}, "Pricing")), 
                        React.createElement("div", {className: "navbar-right"}, 
                            React.createElement("form", {className: "input-form", onSubmit: this.onSearch.bind(this)}, 
                                React.createElement("input", {value: utils.Page.getUrlVar('q'), className: "input-text"}), 
                                React.createElement("a", {className: "fa fa-search", href: "javascript:void(0)", onClick: this.onSearch.bind(this)})), 
                            btnElement)))
            ), 
            sloganEl));
    }
}
function mapStateToProps(state) {
    return {
        authState: state.authState,
        orgState: state.orgState
    };
}
function mapDispatchToProps(dispatch) {
    return {
        authActions: redux_1.bindActionCreators(authActions, dispatch),
        orgActions: redux_1.bindActionCreators(orgActions, dispatch)
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Header);
//# sourceMappingURL=header.js.map