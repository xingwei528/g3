"use strict";
const React = require('react');
class Footer extends React.Component {
    render() {
        return (React.createElement("footer", {className: "footer"}, 
            React.createElement("div", {className: "ct-container"}, 
                React.createElement("div", {className: "ct-row"}, 
                    React.createElement("div", {className: "ct-md-3 ct-sm-12"}, 
                        React.createElement("a", {href: "/", className: "footer-logo"}, 
                            React.createElement("img", {src: "/assets/img/logo-grey.png"})
                        )
                    ), 
                    React.createElement("nav", {className: "ct-md-2 ct-sm-6"}, 
                        React.createElement("h4", {className: "footer-title"}, "Explore"), 
                        React.createElement("a", {href: "/"}, "Most Popular"), 
                        React.createElement("a", {href: "/"}, "Most Stars"), 
                        React.createElement("a", {href: "/"}, "Recently Added")), 
                    React.createElement("nav", {className: "ct-md-2 ct-sm-6"}, 
                        React.createElement("h4", {className: "footer-title"}, "Social"), 
                        React.createElement("a", {href: "https://www.facebook.com/get3w/", target: "_blank"}, "Facebook"), 
                        React.createElement("a", {href: "https://www.twitter.com/get3w/", target: "_blank"}, "Twitter"), 
                        React.createElement("a", {href: "https://www.pinterest.com/get3w/", target: "_blank"}, "Pinterest"), 
                        React.createElement("a", {href: "https://github.com/get3w/", target: "_blank"}, "Github")), 
                    React.createElement("nav", {className: "ct-md-2 ct-sm-6"}, 
                        React.createElement("h4", {className: "footer-title"}, "Quick Links"), 
                        React.createElement("a", {href: "/"}, "Contact"), 
                        React.createElement("a", {href: "/"}, "We're Hiring!")), 
                    React.createElement("nav", {className: "ct-md-3 ct-sm-6"}, 
                        React.createElement("h4", {className: "footer-title"}, "About"), 
                        React.createElement("p", null, "Get3W is a hackable site editor for the 21st century, with only one mission: Make website more simplified.")))
            ), 
            React.createElement("div", {className: "ct-container"}, 
                React.createElement("div", {className: "footer-legal"}, "© 2016 GET3W.COM")
            )));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
//# sourceMappingURL=footer.js.map