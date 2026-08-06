import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  Globe,
  Link2,
  Mail,
} from 'lucide-react'
import { Container, SectionLabel } from './components/ui'
import ContactForm from './components/ContactForm'
import {
  CASE_STUDIES,
  CONTACT_EMAIL,
  EXTRAS,
  HOURLY_RATE,
  INCLUDED,
  PACKAGE_PRICE,
  SITE_URL,
} from './config/websitesOffer'
import { flyerUrlForReferral, getActiveReferral } from './lib/referral'
import './WebsitesPage.css'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function WebsitesPage() {
  const [referral, setReferral] = useState(null)

  useEffect(() => {
    setReferral(getActiveReferral())
  }, [])

  const flyerHref = flyerUrlForReferral(referral?.code, { autoPrint: true })
  const shareUrl = referral
    ? `${SITE_URL}/websites?ref=${encodeURIComponent(referral.code)}`
    : `${SITE_URL}/websites`

  const openFlyerPdf = () => {
    const win = window.open(flyerHref, '_blank', 'noopener,noreferrer')
    if (!win) {
      window.location.href = flyerHref
    }
  }

  return (
    <div className="subpage websites-page">
      <section className="websites-hero">
        <Container>
          <motion.div {...fadeUp} className="websites-hero-grid">
            <div>
              <SectionLabel>Build &amp; Host</SectionLabel>
              <h1 className="subpage-title">
                Websites That Drive Revenue.
              </h1>
              <p className="subpage-sub">
                Design, build, and launch a site that gets found on Google and
                turns visitors into customers. Fixed price. Fast delivery.
              </p>
              <div className="websites-hero-actions">
                <a href="#get-started" className="ui-btn ui-btn--primary">
                  <span>Get started</span>
                  <ArrowRight size={16} />
                </a>
                <button type="button" className="ui-btn ui-btn--secondary" onClick={openFlyerPdf}>
                  <Download size={16} />
                  <span>Export PDF flyer</span>
                </button>
              </div>
              {referral && (
                <div className="websites-ref-banner" role="status">
                  <Link2 size={16} />
                  <div>
                    <strong>Referral code: {referral.code}</strong>
                    <span>
                      Introduced by {referral.name}. This enquiry is attributed
                      to their sales account.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="websites-price-card">
              <p className="websites-price-label">Website + hosting</p>
              <div className="websites-price-main">
                <span>{PACKAGE_PRICE.gbp.label}</span>
                <span className="websites-price-or">or</span>
                <span>{PACKAGE_PRICE.aed.label}</span>
              </div>
              <p className="websites-price-usd">{PACKAGE_PRICE.usd.label} USD</p>
              <p className="websites-price-note">
                Fixed package price. Take it or leave it — no haggling.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="section section--surface">
        <Container>
          <motion.div {...fadeUp} className="section-intro">
            <SectionLabel>What&apos;s included</SectionLabel>
            <h2 className="ui-section-heading">Everything you need to go live</h2>
          </motion.div>
          <div className="websites-include-grid">
            {INCLUDED.map((item, i) => (
              <motion.article
                key={item.title}
                className="websites-include-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Check size={18} className="websites-check" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <motion.div {...fadeUp} className="section-intro">
            <SectionLabel>Global price guide</SectionLabel>
            <h2 className="ui-section-heading">One price. Three currencies.</h2>
            <p>
              First commission covers build and hosting. Extra development is
              billed at a clear hourly rate.
            </p>
          </motion.div>

          <div className="websites-price-table-wrap">
            <table className="websites-price-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>GBP</th>
                  <th>AED</th>
                  <th>USD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Website build + hosting</strong>
                    <span>Design, build, launch, and host</span>
                  </td>
                  <td>{PACKAGE_PRICE.gbp.label}</td>
                  <td>{PACKAGE_PRICE.aed.label}</td>
                  <td>{PACKAGE_PRICE.usd.label}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Extra development</strong>
                    <span>Updates, new features, custom work</span>
                  </td>
                  <td>{HOURLY_RATE.gbp.label}</td>
                  <td>{HOURLY_RATE.aed.label}</td>
                  <td>{HOURLY_RATE.usd.label}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="websites-extras">
            {EXTRAS.map((item) => (
              <div key={item.title} className="websites-extra-card">
                <div className="websites-extra-head">
                  <h3>{item.title}</h3>
                  {item.badge && <span className="websites-badge">{item.badge}</span>}
                </div>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--dark">
        <Container>
          <motion.div {...fadeUp} className="section-intro">
            <SectionLabel>Client references</SectionLabel>
            <h2 className="ui-section-heading">Sites we&apos;ve shipped</h2>
            <p>Live examples across hospitality, finance, property, and tech.</p>
          </motion.div>
          <div className="websites-cases">
            {CASE_STUDIES.map((site, i) => (
              <motion.a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="websites-case"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div>
                  <p className="websites-case-sector">{site.sector}</p>
                  <h3>{site.name}</h3>
                  <p className="websites-case-url">{site.url.replace(/^https?:\/\/(www\.)?/, '')}</p>
                </div>
                <ExternalLink size={16} />
              </motion.a>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="websites-how">
            <motion.div {...fadeUp}>
              <SectionLabel>How it works</SectionLabel>
              <h2 className="ui-section-heading">Brief to live in days</h2>
            </motion.div>
            <ol className="websites-steps">
              {[
                ['Brief', 'Tell us about your business and goals.'],
                ['Design', 'We mock up before we build.'],
                ['Build', 'Clean code, fast loading, mobile-first.'],
                ['Launch', 'Go live with hosting and support included.'],
              ].map(([title, desc], i) => (
                <li key={title}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {referral && (
        <section className="section section--surface websites-partner-share">
          <Container>
            <motion.div {...fadeUp} className="websites-share-box">
              <Globe size={22} />
              <div>
                <h2>Your partner link</h2>
                <p>
                  Share this URL so every enquiry lands against code{' '}
                  <strong>{referral.code}</strong>.
                </p>
                <code>{shareUrl}</code>
              </div>
              <button
                type="button"
                className="ui-btn ui-btn--secondary"
                onClick={() => navigator.clipboard?.writeText(shareUrl)}
              >
                <span>Copy link</span>
              </button>
            </motion.div>
          </Container>
        </section>
      )}

      <section className="section section--surface websites-cta" id="get-started">
        <Container>
          <div className="contact-grid">
            <motion.div {...fadeUp} className="contact-info">
              <SectionLabel>Get started</SectionLabel>
              <h2 className="ui-section-heading">Ready for your site?</h2>
              <p className="section-intro">
                Send a short brief. Fixed package pricing —{' '}
                {PACKAGE_PRICE.gbp.label} / {PACKAGE_PRICE.aed.label} /{' '}
                {PACKAGE_PRICE.usd.label}.
              </p>
              <div className="contact-item">
                <Mail size={18} />
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              {referral && (
                <div className="contact-item">
                  <Link2 size={18} />
                  <span>Referral: {referral.code}</span>
                </div>
              )}
              <button type="button" className="ui-btn ui-btn--secondary websites-print-cta" onClick={openFlyerPdf}>
                <Download size={16} />
                <span>Export PDF flyer for hardcopy</span>
              </button>
            </motion.div>
            <motion.div {...fadeUp} className="contact-form-wrap">
              <ContactForm
                source="websites-offer"
                referralCode={referral?.code}
                defaultMessage={
                  referral
                    ? `I'm interested in the website + hosting package. Referral code: ${referral.code}.`
                    : 'I\'m interested in the website + hosting package.'
                }
              />
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  )
}
