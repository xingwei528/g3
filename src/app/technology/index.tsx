import * as React from 'react'

class About extends React.Component<{}, {}> {
  render() {
    return (
      <div id="services">
                <div className="service">
                    <div className="service-intro">
                        <h1 className="service-title">Technology</h1>
                        <div className="rich-text">
                            <p />
                            <p>We add <b>horsepower + agility</b> to your internal operations with our team of experienced software engineers. At Tivix, we accelerate your process by using our immersive process to get from zero-to-60 fast. Once reaching milestones,
                                our job is to work ourselves out of a job by transitioning the code base back to your internal team at any time.</p>
                        </div>
                    </div>
                    <div className="service-nav">
                        <h5>See also</h5>
                        <ul>
                            <li><a href="/innovation">Innovation <i className="fa fa-angle-right" /></a></li>
                            <li><a href="/team-members">Meet our team <i className="fa fa-angle-right" /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="service-blurbs">
                    <div className="service-image"><img alt="Building with you" className="img-responsive" height={450} src="/uploads/images/building-with-you.2e16d0ba.fill-900x450.jpg" width={900} /><img alt="Luke and Mario" className="img-responsive" height={450} src="/uploads/images/Luke_and_Mario.f6f5ec90.fill-900x450.png" width={900} /></div>
                    <ul>
                        <li>
                            <h4>Engineering Expertise</h4>
                            <p>Our team is the real deal. We're a Silicon Valley-based shop of actual engineers with deep expertise. We love engineering high-performance, scalable software.</p>
                            <div className="gradient-overlay" />
                        </li>
                        <li>
                            <h4>Agility</h4>
                            <p>We jump right into a project and ramp up quickly. Our team integrates with yours, working collaboratively throughout the development process.</p>
                            <div className="gradient-overlay" />
                        </li>
                        <li>
                            <h4>Operational Efficiency</h4>
                            <p>Fill in the normal peaks and valleys of development spending by optimizing your engineering budget. Get the advantage of budget visibility combined with bandwidth flexibility.</p>
                        </li>
                    </ul>
                </div>
                <div className="service-testimonial">
                    <div className="testimonial-image"><a href="http://www.cloudvelox.com/">CloudVelox</a> <span>Disaster Recovery and Cloud Migration</span> Web<img alt="Cloud Velocity dashboard" className="browser" height={416} src="/uploads/images/cloudvelocity.86dcbc2d.fill-593x416-c0.jpg" width={593} /></div>
                    <div className="testimonial-text">
                        <blockquote>
                            <p>We needed an engineering partner that not only had deep understanding of web technologies but also could work well under the changing requirements of a venture-funded startup. We engaged with Tivix several months before our official
                                launch, and they've been solid members of our development team.</p>
                            <footer><cite><strong>Rajeev Chawla</strong>, Founder &amp; CEO, <a href="/projects/cloudvelox/">CloudVelox</a></cite></footer>
                        </blockquote>
                    </div>
                </div>
                <section className="skills">
                    <div className="skills-title">
                        <h2>Our expertise</h2>
                        <div className="gradient-overlay-white" />
                    </div>
                    <div className="skill-list">
                        <div className="skill">
                            <h4><i className="tvx tvx-django" /> Django/Python</h4>
                            <div className="rich-text">We believe passionately in the power of Django-Python for rapid development of scalable software applications.&nbsp;We've been a Django-Python shop since 2008. See our code at <a href="http://github.com/tivix">github.com/tivix</a></div>
                        </div>
                        <div className="skill">
                            <h4><i className="fa fa-mobile-phone" /> Mobile</h4>
                            <div className="rich-text">The Tivix team develops native iOS and Android applications (Objective-C, Swift, and Java), typically connected via cloud-based API's. Mobile experiences are driving user expectations today, and Tivix has deep experience in building
                                mobile applications that solve real-world problems.</div>
                        </div>
                        <div className="skill">
                            <h4><i className="fa fa-sitemap" /> Cloud</h4>
                            <div className="rich-text">Tivix is well-steeped in the field of modern cloud computing infrastructure, both public and private. Many of the applications we develop benefit from the instant-scalability of cloud infrastructure, and all benefit from&nbsp;exposing shared
                                services via well-structured API's for mobile and other applications.&nbsp;</div>
                        </div>
                    </div>
                </section>
            </div>

    )
  }
}

module.exports = About
