"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const components_1 = require('../../lib/components');
const lang = require('../../lib/lang');
const models = require('../../api/models');
const utils = require('../../lib/utils');
const client_1 = require('../../lib/client');
const authActions = require('../../actions/authActions');
const links = require('../../constants/links');
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null
        };
    }
    componentDidMount() {
        var accountNode = ReactDOM.findDOMNode(this.refs["account"]);
        accountNode.focus();
    }
    componentWillReceiveProps(props) {
        if (!props.authState.isAnonymous) {
            react_router_1.browserHistory.push(links.INDEX);
        }
    }
    onForgetPassword(e) {
        utils.DOM.stop(e);
        utils.Page.redirect(utils.Addr.getForgetPasswordUrl());
    }
    onSignup(e) {
        utils.DOM.stop(e);
        utils.Page.redirect(utils.Addr.getSignupUrl());
    }
    onSubmit(e) {
        utils.DOM.prevent(e);
        const account = utils.DOM.getValue(this.refs["account"]);
        const password = utils.DOM.getValue(this.refs["password"]);
        if (account && password) {
            utils.DOM.loading(true);
            client_1.default.users.login(account, password, (err, res) => {
                utils.DOM.loading(false);
                if (!err && res.user) {
                    const token = res.accessToken;
                    const user = res.user;
                    const isAnonymous = (token && user && user.id) ? false : true;
                    const authState = {
                        token, user, isAnonymous
                    };
                    this.props.authActions.login(authState);
                    react_router_1.browserHistory.push(links.INDEX);
                }
                else {
                    this.setState({
                        alert: new models.Alert(models.EAlertType.DANGER, lang.get('There was a problem with your login.'))
                    });
                }
            });
        }
    }
    render() {
        var alertEl = null;
        if (this.state.alert) {
            alertEl = React.createElement(components_1.Alert, {alert: this.state.alert});
        }
        var accountEl = React.createElement(components_1.Input, {ref: "account", placeholder: lang.get('Username or Email'), className: 'email', required: true});
        var passwordEl = React.createElement(components_1.Input, {ref: 'password', placeholder: lang.get('Password'), className: 'password', required: true});
        return (React.createElement("div", {className: 'console-auth'}, 
            React.createElement("div", {className: 'input-box'}, 
                React.createElement("form", {className: 'container', ref: 'form', onSubmit: this.onSubmit.bind(this)}, 
                    React.createElement("a", {className: 'logo ct-center-block', href: '/'}, 
                        React.createElement("img", {src: utils.Addr.getImgUrl('logo-grey.png')})
                    ), 
                    alertEl, 
                    React.createElement("label", {className: 'login-input'}, 
                        accountEl, 
                        passwordEl), 
                    React.createElement("button", {className: 'ct-btn --block ct-bg-blue', onClick: this.onSubmit.bind(this)}, lang.get('Log In')), 
                    React.createElement("div", {className: 'login-back ct-mt-lg ct-mlr-sm'}, 
                        React.createElement("a", {className: 'ct-fl grey', href: 'javascript:;', onClick: this.onForgetPassword.bind(this)}, lang.get('Forgot password?')), 
                        React.createElement("a", {className: 'ct-fr red', href: 'javascript:;', onClick: this.onSignup.bind(this)}, lang.get('No account? Sign up'))))
            ), 
            React.createElement(components_1.Loading, null)));
    }
}
function mapStateToProps(state) {
    return {
        authState: state.authState,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        authActions: redux_1.bindActionCreators(authActions, dispatch)
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LoginPage);
//# sourceMappingURL=loginPage.js.map