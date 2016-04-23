"use strict";
const React = require('react');
class Home extends React.Component {
    render() {
        return (<div>
          <section id="intro">
              <div className="intro-image">
                  <h1>Building Software that Matters</h1>
                  <h2>Custom Web + Mobile + Cloud Development</h2><a className="lets-talk-btn" href="/contact-us">Let's talk</a>
                  <div id="client_logos">
                      <ul className="clients">
                          <li className="logo"><i className="client client-bestegg"/></li>
                          <li className="logo"><i className="client client-microsoft"/></li>
                          <li className="logo"><i className="client client-apple"/></li>
                          <li className="logo"><i className="client client-vmware"/></li>
                          <li className="logo"><i className="client client-solarcity"/></li>
                          <li className="logo"><i className="client client-bayer"/></li>
                      </ul>
                  </div>
              </div>
          </section>
          <section id="who_we_are">
              <div className="section-header">
                  <h1>Who we are</h1>
                  <h2>We're a San&nbsp;Francisco consulting firm<br />with insanely high standards.</h2><a className="meet-the-team" href="/team-members/">Meet the team</a></div>
              <div id="featured_work">
                  <div id="project_content">
                      <div id="project_captions">
                          <h2>Featured work:</h2>
                          <ul className="project-slider">
                              <li>
                                  <h3>Marlette Funding</h3>
                                  <p>Financial services platform.</p><a className="btn" href="/projects/marlette-funding/">read more</a></li>
                              <li>
                                  <h3>Charity Navigator</h3>
                                  <p>Charity Evaluator Mobile App</p><a className="btn" href="/projects/charity-navigator/">read more</a></li>
                              <li>
                                  <h3>Solar Bonds</h3>
                                  <p>Financial Services Platform</p><a className="btn" href="/projects/solar-bonds/">read more</a></li>
                              <li>
                                  <h3>CloudVelox</h3>
                                  <p>Disaster Recovery and Cloud Migration</p><a className="btn" href="/projects/cloudvelox/">read more</a></li>
                          </ul>
                      </div>
                      <div id="project_thumbs">
                          <a data-slide-index={0} href="javascript:;"><img alt="Best Egg Home 1156x" className="featured-thumbnail" height={50} src="/uploads/images/ReallyRawEgg.a43d9fe4.fill-68x50-c50.png" width={68}/></a>
                          <a data-slide-index={1} href="javascript:;"><img alt="Charity Navigator Pie Charts optimized" className="featured-thumbnail" height={50} src="/uploads/images/IMG_0284-2.74bd1530.fill-68x50-c50.jpg" width={68}/></a>
                          <a data-slide-index={2} href="javascript:;"><img alt="Solar City Bonds" className="featured-thumbnail" height={50} src="/uploads/images/SolarCityBonds.2e16d0ba.fill-68x50-c50.png" width={68}/></a>
                          <a data-slide-index={3} href="javascript:;"><img alt="Cloud Velocity dashboard" className="featured-thumbnail" height={50} src="/uploads/images/cloudvelocity.86dcbc2d.fill-68x50-c50.jpg" width={68}/></a>
                      </div>
                  </div>
                  <div id="project_images">
                      <ul className="project-slider">
                          <li>
                              <div className="image-cell">
                                  <div className="img-web"><img alt="Best Egg Home 1156x" className="img-responsive" height={353} src="/uploads/images/ReallyRawEgg.width-497.png" width={497}/></div>
                              </div>
                          </li>
                          <li>
                              <div className="image-cell">
                                  <div className="img-mobile"><img alt="Charity Navigator Pie Charts optimized" className="img-responsive" height={883} src="/uploads/images/IMG_0284-2.width-497.jpg" width={497}/></div>
                              </div>
                          </li>
                          <li>
                              <div className="image-cell">
                                  <div className="img-web"><img alt="Solar City Bonds" className="img-responsive" height={348} src="/uploads/images/SolarCityBonds.width-497.png" width={497}/></div>
                              </div>
                          </li>
                          <li>
                              <div className="image-cell">
                                  <div className="img-web"><img alt="Cloud Velocity dashboard" className="img-responsive" height={293} src="/uploads/images/cloudvelocity.width-497.jpg" width={497}/></div>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </section>
          <section id="blurb_section">
              <div className="section-header">
                  <h1>What we do</h1>
                  <h2>Strategy + Process + Code.</h2></div>
              <div className="blurb"><img alt="We work for you." height={140} src="/uploads/images/1406_Tivix_candid-0641.19676e96.fill-532x140-c100.jpg" width={532}/>
                  <h3 className="title"><a href="/engineering/">Engineering</a></h3>
                  <p />
                  <div className="rich-text"><b>Need a high-performing engineering team?</b>Tivix can engage quickly, getting you to your next important milestone. Our engineering team is the real deal, with deep experience building scalable software that performs across web, mobile,
                      and cloud platforms.</div>
                  <p /><a href="/engineering/">Learn more <i className="fa fa-angle-right"/></a></div>
              <div className="blurb"><img alt="Team meeting" height={140} src="/uploads/images/team_meeting.2e16d0ba.fill-532x140-c100.jpg" width={532}/>
                  <h3 className="title"><a href="/innovation/">Innovation</a></h3>
                  <p />
                  <div className="rich-text"><b>Need to get an innovative product to market quickly?</b>&nbsp;Tivix works with entrepreneurs and investors to move your idea rapidly from concept to launch. We combine proven innovation methodology with deep engineering expertise to build
                      innovative software that matters.</div>
                  <p /><a href="/innovation/">Learn more <i className="fa fa-angle-right"/></a></div>
          </section>
          <section id="blog_section">
              <div className="section-header">
                  <h1>From the blog</h1>
                  <h2><a href="/blog/identifying-progressive-web-app-pwa-opportunity/">Identifying a Progressive Web App (PWA) Opportunity</a></h2></div>
              <div className="blog-preview">
                  <div className="blog-author-img"><img alt="Jim's profile pic" height={128} src="/uploads/images/1601_Tivix_0617.3594ae66.fill-128x128.jpg" width={128}/></div>
                  <div className="blog-body">
                      <p className="blog-post-byline">by <a href="/team-members/jim-hamski/">Jim Hamski</a></p>
                      <p className="blog-post-date">3/14/16</p>
                      <p />
                      <div className="block-wysiwyg">
                          <div className="rich-text">
                              <h3>Serving your mobile users</h3>
                              <p>As <a href="http://www.smartinsights.com/mobile-marketing/mobile-marketing-analytics/mobile-marketing-statistics/">mobile usage skyrockets</a>many companies have rushed to build native mobile applications, only to discover
                                  that creating a successful native app can be harder and more expensive than they expected, especially in comparison to the web platform they already have ...</p>
                          </div>
                      </div><a href="/blog/identifying-progressive-web-app-pwa-opportunity/">Read more <i className="fa fa-angle-right"/></a>
                      <p />
                  </div>
              </div>
          </section>
          <section id="testimonial_section">
              <blockquote>
                  <p>In developing innovative consumer applications for our global businesses, we have found the Silicon Valley expertise of the Tivix team to be incredibly valuable.</p>
                  <footer><cite><strong>Scott Lyle</strong>, Director, Business Innovation, Pfizer Corporation</cite></footer>
              </blockquote>
          </section>
      </div>);
    }
}
module.exports = Home;
//# sourceMappingURL=index.jsx.map