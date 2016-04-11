"use strict";
const React = require('react');
const models = require('../../../api/models');
class Alert extends React.Component {
    render() {
        var alert = this.props.alert;
        var pageEl = null;
        if (alert.pageUrl && alert.pageText) {
            pageEl = React.createElement("a", {href: alert.pageUrl, className: 'ct-ml-sm'}, alert.pageText);
        }
        var className = 'ct-ma-sm ct-alert --' + models.EAlertTypeUtils.getValue(alert.alertType);
        return (React.createElement("div", {className: className}, 
            alert.message, 
            pageEl));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Alert;
//# sourceMappingURL=alert.js.map