import React from 'react'
import { IndexLink, Link } from 'react-router'

interface P {
  children?: any
}

class Team extends React.Component<P, {}> {
  render() {
    if (this.props.children) return this.props.children

    return (
      <div id="team">
                <div className="team-index-listing">
                    <div className="team-intro">
                        <h1 className="team-title">Tivix Team</h1>
                        <div className="rich-text">
                            <p><b>We are in a business where team is everything.</b> From software engineers to UX experts, from product designers to project managers, the Tivix team is an extraordinary group with a deep passion for working with clients to build
                                software that matters.</p>
                        </div>
                    </div>
                </div>
                <div className="team-grid-outer">
                    <div id="team_grid">
                        <div className="team-member">
                            <a href="/team-members/bret-waters/">
                                <div className="team-overlay">Bret Waters
                                    <div className="title">CEO</div>
                                </div><img alt="Bret Waters" className="team-member-photo" height={170} src="/uploads/images/crop.571d8257.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/sumit-chachra/">
                                <div className="team-overlay">Sumit Chachra
                                    <div className="title">CTO</div>
                                </div><img alt="Sumit Chachra" className="team-member-photo" height={170} src="/uploads/images/1601_Tivix_0729.53eac648.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <Link to="/team/francis-cleary">
                                <div className="team-overlay">Francis Cleary
                                    <div className="title">Technical Architect</div>
                                </div>
                                <img alt="Francis Cleary" className="team-member-photo" height={170} src="/uploads/images/francis_1.a0ad6389.fill-170x170-c80.jpg" width={170} />
                            </Link>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/dariusz-fryta/">
                                <div className="team-overlay">Dariusz Fryta
                                    <div className="title">Technical Architect</div>
                                </div><img alt="Dariusz Fryta" className="team-member-photo" height={170} src="/uploads/images/Dariusz_1.6ac220b9.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/adam-lord/">
                                <div className="team-overlay">Adam Lord
                                    <div className="title">Technical Architect</div>
                                </div><img alt="Adam Lord" className="team-member-photo" height={170} src="/uploads/images/adam_1.b3ca3597.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="extra-image team-grid-3x1"><img alt="Team meeting" className="team-grid-3x1" height={170} src="/uploads/images/team_meeting.2e16d0ba.fill-544x170-c80.jpg" width={544} /></div>
                        <div className="team-member">
                            <a href="/team-members/kyle-connors/">
                                <div className="team-overlay">Kyle Connors
                                    <div className="title">Technical Architect</div>
                                </div><img alt="Kyle Connors" className="team-member-photo" height={170} src="/uploads/images/kyle_1.f3dd6316.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/mateusz-sikora/">
                                <div className="team-overlay">Mateusz Sikora
                                    <div className="title">Technical Architect</div>
                                </div><img alt="Mateusz Sikora" className="team-member-photo" height={170} src="/uploads/images/Mateusz_1.80c1fbfb.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/sebastian-spiegel/">
                                <div className="team-overlay">Sebastian Spiegel
                                    <div className="title">Technical Architect</div>
                                </div><img alt="Sebastian Spiegel" className="team-member-photo" height={170} src="/uploads/images/Sebastian.42aa54d8.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/tomasz-baranowicz/">
                                <div className="team-overlay">Tomasz Baranowicz
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Tomasz Baranowicz" className="team-member-photo" height={170} src="/uploads/images/Tomasz_1.3f9bb761.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/peter-thomas/">
                                <div className="team-overlay">Peter Thomas
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Peter Thomas" className="team-member-photo" height={170} src="/uploads/images/Tivix_Portraits_JDP-103.ccdd682e.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/silin-na/">
                                <div className="team-overlay">Silin Na
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Silin Na" className="team-member-photo" height={170} src="/uploads/images/1601_Tivix_0476.15e9d067.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/eric-todd/">
                                <div className="team-overlay">Eric Todd
                                    <div className="title">Senior Software Engineer</div>
                                </div><img alt="Eric Todd" className="team-member-photo" height={170} src="/uploads/images/et-crop.5354454a.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/mariusz-karwala/">
                                <div className="team-overlay">Mariusz Karwala
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Mariusz Karwala" className="team-member-photo" height={170} src="/uploads/images/Mariusz.536decca.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/adam-strojek/">
                                <div className="team-overlay">Adam Strojek
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Adam Strojek" className="team-member-photo" height={170} src="/uploads/images/1601_Tivix_0335_1.d444e542.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/marzena-podhorska/">
                                <div className="team-overlay">Marzena Podhorska
                                    <div className="title">Operations / Project Manager</div>
                                </div><img alt="Marzena Podhorska" className="team-member-photo" height={170} src="/uploads/images/Marzena.17e51da6.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="extra-image team-grid-2x2"><img alt="Get shit done!" className="team-grid-2x2" height={370} src="/uploads/images/gsd.2e16d0ba.fill-370x370-c80.jpg" width={370} /></div>
                        <div className="team-member">
                            <a href="/team-members/erin-oconnell/">
                                <div className="team-overlay">Erin O'Connell
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Erin O'Connell" className="team-member-photo" height={170} src="/uploads/images/unnamed.93f8104f.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/tan-nguyen/">
                                <div className="team-overlay">Tan Nguyen
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Tan Nguyen" className="team-member-photo" height={170} src="/uploads/images/1403_Tivix_portrait_0988.98b5c632.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/meghan-neff/">
                                <div className="team-overlay">Meghan Neff
                                    <div className="title">Project Manager</div>
                                </div><img alt="Meghan Neff" className="team-member-photo" height={170} src="/uploads/images/meghan.d60da197.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/lukasz-tarka/">
                                <div className="team-overlay">Łukasz Tarka
                                    <div className="title">Project Manager</div>
                                </div><img alt="Łukasz Tarka" className="team-member-photo" height={170} src="/uploads/images/LukaszT_1.66ab9e32.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/lukasz-kozlowski/">
                                <div className="team-overlay">Łukasz Kozłowski
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Łukasz Kozłowski" className="team-member-photo" height={170} src="/uploads/images/LukaszK.c66363cb.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/peter-shafer/">
                                <div className="team-overlay">Peter Shafer
                                    <div className="title">Technical Architect</div>
                                </div><img alt="Peter Shafer" className="team-member-photo" height={170} src="/uploads/images/Tivix_Portraits_JDP-31.35b73c1d.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/rafal-krupinski/">
                                <div className="team-overlay">Rafał Krupiński
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Rafał Krupiński" className="team-member-photo" height={170} src="/uploads/images/Rafal.839d7e5a.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/krystian-kaminski/">
                                <div className="team-overlay">Krystian Kamiński
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Krystian Kamiński" className="team-member-photo" height={170} src="/uploads/images/Krystian.be8931e6.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/amber-chang/">
                                <div className="team-overlay">Amber Chang
                                    <div className="title">Project Manager</div>
                                </div><img alt="Amber Chang" className="team-member-photo" height={170} src="/uploads/images/1601_Tivix_0568.afe6cd7c.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/maxim-kukhtenkov/">
                                <div className="team-overlay">Maxim Kukhtenkov
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Maxim Kukhtenkov" className="team-member-photo" height={170} src="/uploads/images/maxim-photo-2.f4aa1bae.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/maciej-jaworski/">
                                <div className="team-overlay">Maciej Jaworski
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Maciej Jaworski" className="team-member-photo" height={170} src="/uploads/images/Maciej.3d9d5470.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/witold-skibniewski/">
                                <div className="team-overlay">Witold Skibniewski
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Witold Skibniewski" className="team-member-photo" height={170} src="/uploads/images/Witold.d6959ea0.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/jason-arold/">
                                <div className="team-overlay">Jason Arold
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Jason Arold" className="team-member-photo" height={170} src="/uploads/images/jasonarold.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/flavio-zhingri/">
                                <div className="team-overlay">Flavio Zhingri
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Flavio Zhingri" className="team-member-photo" height={170} src="/uploads/images/CDFX4195.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/mia-ferguson/">
                                <div className="team-overlay">Mia Ferguson
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Mia Ferguson" className="team-member-photo" height={170} src="/uploads/images/miaferguson.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/anup-pradhan/">
                                <div className="team-overlay">Anup Pradhan
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Anup Pradhan" className="team-member-photo" height={170} src="/uploads/images/anup.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/jim-hamski/">
                                <div className="team-overlay">Jim Hamski
                                    <div className="title">Project Manager</div>
                                </div><img alt="Jim Hamski" className="team-member-photo" height={170} src="/uploads/images/1601_Tivix_0617.3594ae66.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/will-liu/">
                                <div className="team-overlay">Will Liu
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Will Liu" className="team-member-photo" height={170} src="/uploads/images/will.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/david-gunter/">
                                <div className="team-overlay">David Gunter
                                    <div className="title">Software Engineer</div>
                                </div><img alt="David Gunter" className="team-member-photo" height={170} src="/uploads/images/Tivix_Portraits_JDP-49.f2b5e72f.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/anais-ramon/">
                                <div className="team-overlay">Anaïs Ramón
                                    <div className="title">UI/UX Designer</div>
                                </div><img alt="Anaïs Ramón" className="team-member-photo" height={170} src="/uploads/images/1601_Tivix_0087.b48f5c5b.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/tabatha-memmott/">
                                <div className="team-overlay">Tabatha Memmott
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Tabatha Memmott" className="team-member-photo" height={170} src="/uploads/images/1601_Tivix_0116.091d7789.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/brandon-stalnaker/">
                                <div className="team-overlay">Brandon Stalnaker
                                    <div className="title">Software Engineeer</div>
                                </div><img alt="Brandon Stalnaker" className="team-member-photo" height={170} src="/uploads/images/me-2.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/john-hargan/">
                                <div className="team-overlay">John Hargan
                                    <div className="title">Marketing Associate</div>
                                </div><img alt="John Hargan" className="team-member-photo" height={170} src="/uploads/images/johnhargan.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/bill-conneely/">
                                <div className="team-overlay">Bill Conneely
                                    <div className="title">Senior Director of Finance and Operations</div>
                                </div><img alt="Bill Conneely" className="team-member-photo" height={170} src="/uploads/images/Screen_Shot_2016-02-29_at_10.2.2e16d0ba.fill-170x170-c80.png" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/mike-gilroy/">
                                <div className="team-overlay">Mike Gilroy
                                    <div className="title">Software Engineeer</div>
                                </div><img alt="Mike Gilroy" className="team-member-photo" height={170} src="/uploads/images/Gilroy-Mike-01s.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                        <div className="team-member">
                            <a href="/team-members/girish-kumar/">
                                <div className="team-overlay">Girish Kumar
                                    <div className="title">Software Engineer</div>
                                </div><img alt="Girish Kumar" className="team-member-photo" height={170} src="/uploads/images/girish.2e16d0ba.fill-170x170-c80.jpg" width={170} /></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <section id="testimonial_section">
                        <div className="testimonial">
                            <blockquote>
                                <p>An idea can turn to dust or magic, depending on the talent that rubs against it.</p>
                                <footer><cite><strong>William Bernbach</strong>, Doyle Dane Bernbach</cite></footer>
                            </blockquote>
                        </div>
                    </section>
                </div>
            </div>
    )
  }
}

module.exports = Team
