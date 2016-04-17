import * as React from 'react'

class About extends React.Component<{}, {}> {
  render() {
    return (
      <div id="static">
        <div className="static-body" id="careers">
            <header>
                <h1 className="static-title">Tivix is looking to add a few great people to our team.</h1>
            </header>
            <section>
                <div className="content">
                    <p>If you’re passionate about building great web and mobile products for some of the best brands in the world, we’d love to hear from you.</p>
                    <p>Our main hiring criterion is that we want wicked-smart people who love being part of a bright, energetic team. We do well with people who have high standards for themselves and the work they produce. We also want people who are good
                        at self-learning — the technology landscape changes quickly these days and learning is an ongoing process for all of us.</p>
                    <p>We offer competitive salary packages, including a generous quarterly bonus program and profit-sharing.</p>
                    <p>Want to apply? The best thing to do is to fill out the form below, and tell us which of these words get you excited when you wake up in the morning:</p>
                    <p><strong>Django, Python, native iOS, native Android, UI/UX, CSS3, HTML5, JavaScript, GitHub, Bootstrap, jQuery, Product Management, Project Management, DevOps, Design thinking, coffee, beer.</strong></p>
                    <p>Looking forward to hearing from you!</p>
                </div>
                <div className="benefits">
                    <ul className="slides">
                        <li><img src="/uploads/images/jobs.jpg" /></li>
                    </ul>
                    <div className="benefit-list">
                        <h5>Additional benefits at Tivix include:</h5>
                        <ul>
                            <li>Full medical and dental insurance.</li>
                            <li>401(k) plan with company match.</li>
                            <li>Life and LTD insurance.</li>
                            <li>Liberal PTO policy.</li>
                            <li>Generous reimbursement policy for public transportation, mobile service, education, and conferences.</li>
                            <li>An office kitchen that is always well-stocked with food and beverages of all kinds!</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
      </div>
    )
  }
}

module.exports = About
