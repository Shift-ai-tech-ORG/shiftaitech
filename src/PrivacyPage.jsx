import { Container } from './components/ui'
import './PrivacyPage.css'

export default function PrivacyPage() {
  return (
    <div className="page privacy-page">
      <section className="privacy-section">
        <Container narrow>
          <p className="hero-kicker">Privacy</p>
          <h1 className="privacy-title">Privacy notice</h1>
          <p className="privacy-updated">Last updated November 2026</p>

          <h2>Who we are</h2>
          <p>
            Shift AI Tech is the trading name of Shift AI Technology Ltd, registered in England and Wales,
            company number 17159725. Registered office: Unit 14, The Maltings Industrial Estate, Hall Road,
            Southminster, Essex CM0 7EQ.
          </p>
          <p>
            Shift AI Technology Ltd is the controller of the personal data described here. For any privacy
            question or request, email{' '}
            <a href="mailto:partnerships@shiftaitech.com">partnerships@shiftaitech.com</a>.
          </p>

          <h2>What we collect and why</h2>
          <p>We only collect what you type into our forms or send us by email.</p>
          <ul>
            <li>
              <strong>Contact form.</strong> Your name, email, company, any referral code and the project details
              you give us. We use them to reply to you and talk about your project.
            </li>
            <li>
              <strong>Onboarding questionnaire.</strong> Your name, business, email, phone, industry, staff numbers,
              revenue band, the systems you use and your answers about your business. We use them to scope and quote
              your project.
            </li>
            <li>
              <strong>Refer a Business form.</strong> Your name and phone, the business you are referring, who to
              speak to there and what they need. We use them to contact that business and to pay you your
              commission.
            </li>
            <li>
              <strong>Emails.</strong> Whatever you send us. We use it to reply to you.
            </li>
          </ul>

          <h2>Our lawful basis</h2>
          <p>
            For enquiries and the onboarding questionnaire, we rely on taking steps at your request before a
            contract, and on our legitimate interest in replying to people who contact us. For referrals, we rely
            on our legitimate interest in following up a business introduction and paying the person who made it.
            If you become a client, we rely on our contract with you. We keep some records because the law
            requires it, for example tax and accounting records.
          </p>

          <h2>If someone referred you to us</h2>
          <p>
            If a person sent us your business details through our Refer a Business form, we got your name and
            business contact details from them. They confirmed you were happy for us to get in touch. When we first
            contact you, we will say who referred you. If you do not want to hear from us, tell us and we will
            delete your details.
          </p>

          <h2>Who receives your data</h2>
          <p>We do not sell your data. We share it only with the services we use to run the site and reply to you:</p>
          <ul>
            <li>
              <strong>GitHub (GitHub Pages)</strong>, which hosts this website. Like any web host, it receives your
              IP address and browser details when you visit. GitHub is based in the United States.
            </li>
            <li>
              <strong>Amazon Web Services</strong>, which receives form submissions in its London (eu-west-2)
              region and passes them on to us.
            </li>
            <li>
              <strong>Google (Google Workspace)</strong>, which provides our business email.
            </li>
          </ul>

          <h2>International transfers</h2>
          <p>
            Some of these providers are based in the United States or may process data there. Where that happens,
            we rely on the safeguards the provider offers for UK data, such as the UK Extension to the EU-US
            Data Privacy Framework or the UK International Data Transfer Addendum.
          </p>

          <h2>How long we keep it</h2>
          <ul>
            <li>Enquiries and onboarding answers: up to 2 years, unless you become a client.</li>
            <li>Referral details: deleted after 12 months if no work goes ahead.</li>
            <li>
              Client and commission records: for as long as we work together, then for as long as the law requires
              for tax and accounting records, usually 6 years.
            </li>
          </ul>

          <h2>Your rights</h2>
          <p>
            You can ask us to give you a copy of your data, correct it, delete it, restrict how we use it, or send it
            to you or another organisation in a portable format. You can also object to us using it. Email{' '}
            <a href="mailto:partnerships@shiftaitech.com">partnerships@shiftaitech.com</a> and we will reply within
            one month.
          </p>
          <p>
            If you are unhappy with how we handle your data, you can complain to the Information Commissioner&apos;s
            Office at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a> or on
            0303 123 1113. We would like the chance to put it right first, so please contact us too.
          </p>

          <h2>Cookies and browser storage</h2>
          <p>
            This site does not set cookies. It has no analytics, advertising trackers or embedded third-party
            content, and our fonts are served from our own site. It does store a few small items in your
            browser&apos;s local storage:
          </p>
          <ul>
            <li>
              <strong>theme</strong>: remembers the colour theme of the site.
            </li>
            <li>
              <strong>shift_referral_code</strong>: if you arrive through a partner&apos;s referral link, this
              remembers their code so they get credit if you contact us. It stays until you clear your browser
              storage.
            </li>
            <li>
              <strong>Onboarding draft</strong>: saves your questionnaire answers as you go so you do not lose them.
              It is removed when you submit.
            </li>
          </ul>
          <p>
            None of this is shared with anyone else. The referral code only reaches us if you send a form. You can
            clear it at any time in your browser settings.
          </p>
        </Container>
      </section>
    </div>
  )
}
