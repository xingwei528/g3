"use strict";
const React = require('react');
class Message extends React.Component {
    render() {
        return (React.createElement("div", {className: "hm_mes"}, 
            React.createElement("span", {className: "hm_msIcon"}, "通知消息："), 
            React.createElement("div", {className: "hm_mScroll"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#"}, "关于2016年度党员登陆中国移动网上大学培训的通知")
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#"}, "中国移动政企分公司新入党员工名单出炉")
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#"}, "关于2016年度党员登陆中国移动网上大学培训的通知")
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#"}, "中国移动政企分公司新入党员工名单出炉")
                    ))
            )));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Message;
//# sourceMappingURL=message.js.map