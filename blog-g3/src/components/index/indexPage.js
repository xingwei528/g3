"use strict";
const React = require('react');
class IndexPage extends React.Component {
    render() {
        return (React.createElement("div", {className: "features"}, 
            React.createElement("div", {className: "mpc_lineBox"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "mpc_title"}, "Improve website with suggest edits"), 
                    React.createElement("div", {className: "mpc_subtitle ct-center"}, "The visitors can suggest edits to your website without affecting the original content." + ' ' + "The suggestions won't change the original content until you approves them."), 
                    React.createElement("div", {className: "mpc_box autoMaxImg clearfix"}, 
                        React.createElement("div", {className: "browser"}, 
                            React.createElement("img", {className: "browserbar", src: "/assets/img/features/browserbar.png", alt: "", "data-pin-nopin": "true"}), 
                            React.createElement("video", {className: "responsive-video splash-video", autoPlay: true, loop: true, poster: "assets/img/features/homepage-poster.png"}, 
                                React.createElement("source", {src: "/assets/img/features/homepage.mp4", type: "video/mp4"})
                            ))
                    ))
            ), 
            React.createElement("div", {className: "mpc_lineBox"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "mpc_title"}, "Create better website together"), 
                    React.createElement("div", {className: "mpc_subtitle ct-center"}, "It’s easy for teams to have collaboration about website and work transparently on Get3W, whether they sit in one office or around the world."), 
                    React.createElement("div", {className: "mpc_box autoMaxImg clearfix"}, 
                        React.createElement("img", {className: "pc", src: "/assets/img/features/mpc_1.jpg"}), 
                        React.createElement("img", {className: "phone", src: "/assets/img/features/mpc_1m.jpg"})))
            ), 
            React.createElement("div", {className: "mpc_lineBox"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "mpc_title"}, "Change the way you edit website"), 
                    React.createElement("div", {className: "mpc_subtitle ct-center"}, "Edit your website directly with just click anything to edit and make changes instantly"), 
                    React.createElement("div", {className: "mpc_box autoMaxImg mpc_ulPhone1 clearfix"}, 
                        React.createElement("img", {className: "pc", src: "/assets/img/features/mpc_2.jpg"}), 
                        React.createElement("img", {className: "phone", src: "/assets/img/features/mpc_2m.jpg"})), 
                    React.createElement("div", {className: "mpc_row clearfix", style: { display: "none" }}, 
                        React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-6 mpc_rowBox"}, 
                            React.createElement("div", {className: "mpc_title mpc_titlea mpc_st1"}, "Straightfrom your tools"), 
                            React.createElement("div", {className: "mpc_subtitle mpc_subtitlea mpc_st2"}, "Share your work directly form Sketch and Photoshop with just a simple keyboard shotcut"), 
                            React.createElement("div", {className: "mpc_rIcon"}, 
                                React.createElement("img", {src: "/assets/img/features/mpc_icon1.jpg"}), 
                                React.createElement("img", {src: "/assets/img/features/mpc_icon2.jpg"}), 
                                React.createElement("img", {src: "/assets/img/features/mpc_icon3.jpg"}), 
                                React.createElement("img", {src: "/assets/img/features/mpc_icon4.jpg"}), 
                                React.createElement("img", {src: "/assets/img/features/mpc_icon5.jpg"}))), 
                        React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-6 mpc_rowBox"}, 
                            React.createElement("div", {className: "mpc_rowBicon"}, 
                                React.createElement("img", {src: "/assets/img/features/mpc_2icon1.jpg"}), 
                                React.createElement("img", {src: "/assets/img/features/mpc_2icon2.jpg"}))
                        )))
            ), 
            React.createElement("div", {className: "mpc_lineBox", style: { display: "none" }}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "mpc_ul mpc_ulPhone1 clearfix"}, 
                        React.createElement("ul", {className: "autoMaxImg"}, 
                            React.createElement("li", {className: "col-xs-12 col-sm-12 col-md-6"}, 
                                React.createElement("img", {src: "/assets/img/features/mImg1.jpg"})
                            ), 
                            React.createElement("li", {className: "col-xs-12 col-sm-12 col-md-6"}, 
                                React.createElement("div", {className: "mpc_title mpc_titlea"}, "Encourage teamwork"), 
                                React.createElement("div", {className: "mpc_subtitle mpc_subtitlea"}, "a fast, simple, and collaborative process that lets you work with others")))
                    )
                )
            ), 
            React.createElement("div", {className: "mpc_lineBox", style: { display: "none" }}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "mpc_ul clearfix"}, 
                        React.createElement("ul", {className: "autoMaxImg"}, 
                            React.createElement("li", {className: "col-xs-12 col-sm-12 col-md-6"}, 
                                React.createElement("div", {className: "mpc_title mpc_titlea mpc_phone_t1"}, "Connect your messaging apps"), 
                                React.createElement("div", {className: "mpc_subtitle mpc_subtitlea"}, "Make Wake part of your current communication channles by integrating Slack,HipChat or Flowdock")), 
                            React.createElement("li", {className: "col-xs-12 col-sm-12 col-md-6"}, 
                                React.createElement("img", {src: "/assets/img/features/mImg2.jpg"})
                            ))
                    )
                )
            ), 
            React.createElement("div", {className: "mpc_lineBox", style: { display: "none" }}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "mpc_ul mpc_ula clearfix"}, 
                        React.createElement("ul", {className: "autoMaxImg"}, 
                            React.createElement("li", {className: "col-xs-12 col-sm-12 col-md-6"}, 
                                React.createElement("img", {src: "/assets/img/features/mImg3.jpg"})
                            ), 
                            React.createElement("li", {className: "col-xs-12 col-sm-12 col-md-6"}, 
                                React.createElement("div", {className: "mpc_title mpc_titlea"}, "All device support"), 
                                React.createElement("div", {className: "mpc_subtitle mpc_subtitlea"}, "Let your websites viewable on phones and tablets as well as desktops")))
                    )
                )
            ), 
            React.createElement("div", {className: "mpc_lineBox"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "mpc_ul clearfix"}, 
                        React.createElement("ul", {className: "autoMaxImg"}, 
                            React.createElement("li", {className: "col-xs-12 col-sm-12 col-md-6"}, 
                                React.createElement("div", {className: "mpc_title mpc_titlea mpc_phone_t1"}, "Choose your favorite web hosting"), 
                                React.createElement("div", {className: "mpc_subtitle mpc_subtitlea"}, "You can integrate the web hosting your team already uses with our powerful API.")), 
                            React.createElement("li", {className: "col-xs-12 col-sm-12 col-md-6"}, 
                                React.createElement("img", {src: "/assets/img/features/mImg2.jpg"})
                            ))
                    )
                )
            ), 
            React.createElement("div", {className: "mpc_lineBox"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "mpc_title"}, "More Features"), 
                    React.createElement("div", {className: "mpc_subtitle ct-center"}, "Let the entire company follow along and affter their expertise"), 
                    React.createElement("div", {className: "mpc_bomList"}, 
                        React.createElement("span", null, 
                            React.createElement("img", {src: "/assets/img/features/mbm_icon1.jpg"})
                        ), 
                        React.createElement("span", null, 
                            React.createElement("img", {src: "/assets/img/features/mbm_icon2.jpg"})
                        ), 
                        React.createElement("span", null, 
                            React.createElement("img", {src: "/assets/img/features/mbm_icon3.jpg"})
                        ), 
                        React.createElement("span", null, 
                            React.createElement("img", {src: "/assets/img/features/mbm_icon4.jpg"})
                        ), 
                        React.createElement("span", null, 
                            React.createElement("img", {src: "/assets/img/features/mbm_icon5.jpg"})
                        ), 
                        React.createElement("div", null, 
                            React.createElement("a", {href: "#", className: "mpc_down"}, "Download Windows Installer")
                        )))
            ), 
            React.createElement("div", {className: "mpc_lineBox"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "pricing-card pricing-card-horizontal"}, 
                        React.createElement("div", {className: "pricing-card-cta"}, 
                            React.createElement("a", {href: "/join?source=button-home", className: "btn btn-block btn-theme-green btn-jumbotron", rel: "nofollow"}, "Sign up for Get3W")
                        ), 
                        React.createElement("div", {className: "pricing-card-text display-heading-3 mb-0 text-thin"}, "Public websites are always free. Private plans start at $7/month."))
                )
            )));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IndexPage;
//# sourceMappingURL=indexPage.js.map