import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Download,
  ExternalLink,
  Link2,
  Mail,
} from 'lucide-react'
import { Container, SectionLabel, Button } from './components/ui'
import ContactForm from './components/ContactForm'
import { Reveal } from './components/motion'
import BreathingField from './components/BreathingField'
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
    if (!win) window.location.href = flyerHref
  }

  return (
    <div className="page websites-page">
      <section className="websites-hero">
        <div className="websites-hero-art" aria-hidden="true">
          <BreathingField />
        </div>
        <Container>
          <div className="websites-hero-grid">
            <Reveal className="websites-hero-copy">
              <p className="hero-kicker">Build &amp; host</p>
              <h1 className="websites-hero-title">
                Websites that get found and convert.
              </h1>
              <p className="websites-hero-sub">
                Design, build, and launch. Fixed price. Fast delivery.
              </p>
              <div className="websites-hero-actions">
                <Button href="#get-started">Get started</Button>
                <button type="button" className="hero-story-link" onClick={openFlyerPdf}>
                  Export flyer <Download size={15} />
                </button>
              </div>
              {referral && (
                <div className="websites-ref-banner" role="status">
                  <Link2 size={16} />
                  <div>
                    <strong>Referral {referral.code}</strong>
                    <span>Introduced by {referral.name}.</span>
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal className="websites-price-panel" delay={0.08}>
              <p className="websites-price-label">Website + hosting</p>
              <p className="websites-price-figures">
                <span>{PACKAGE_PRICE.gbp.label}</span>
                <span className="websites-price-sep">·</span>
                <span>{PACKAGE_PRICE.aed.label}</span>
                <span className="websites-price-sep">·</span>
                <span>{PACKAGE_PRICE.usd.label}</span>
              </p>
              <p className="websites-price-note">
                Fixed package. Extra work at {HOURLY_RATE.gbp.label}.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <SectionLabel>Included</SectionLabel>
            <h2 className="ui-section-heading">What you get.</h2>
          </Reveal>
          <div className="websites-rows">
            {INCLUDED.map((item, i) => (
              <Reveal key={item.title} className="websites-row" delay={i * 0.04}>
                <span className="websites-row-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="websites-row-body">
                  <h3 className="websites-row-title">{item.title}</h3>
                  <p className="websites-row-desc">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--surface">
        <Container>
          <Reveal>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="ui-section-heading">One package. Three currencies.</h2>
          </Reveal>
          <div className="websites-price-rows">
            <Reveal className="websites-price-row">
              <div>
                <strong>Website build + hosting</strong>
                <span>Design, build, launch, and host</span>
              </div>
              <div className="websites-price-cells">
                <span>{PACKAGE_PRICE.gbp.label}</span>
                <span>{PACKAGE_PRICE.aed.label}</span>
                <span>{PACKAGE_PRICE.usd.label}</span>
              </div>
            </Reveal>
            <Reveal className="websites-price-row" delay={0.05}>
              <div>
                <strong>Extra development</strong>
                <span>Updates, features, custom work</span>
              </div>
              <div className="websites-price-cells">
                <span>{HOURLY_RATE.gbp.label}</span>
                <span>{HOURLY_RATE.aed.label}</span>
                <span>{HOURLY_RATE.usd.label}</span>
              </div>
            </Reveal>
          </div>
          {EXTRAS.length > 0 && (
            <div className="websites-extras-list">
              {EXTRAS.map((item) => (
                <Reveal key={item.title} className="websites-extra-line">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="section section--dark">
        <Container>
          <Reveal>
            <SectionLabel>Work</SectionLabel>
            <h2 className="ui-section-heading">Sites we&apos;ve shipped.</h2>
          </Reveal>
          <div className="websites-cases">
            {CASE_STUDIES.map((site, i) => (
              <Reveal key={site.url} delay={i * 0.04}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="websites-case"
                >
                  <div>
                    <p className="websites-case-sector">{site.sector}</p>
                    <h3>{site.name}</h3>
                    <p className="websites-case-url">
                      {site.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                  <ExternalLink size={16} />
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <SectionLabel>Method</SectionLabel>
            <h2 className="ui-section-heading">Brief to live.</h2>
          </Reveal>
          <div className="websites-process">
            {[
              ['01', 'Brief', 'Tell us about the business and the goal.'],
              ['02', 'Design', 'We mock up before we build.'],
              ['03', 'Build', 'Clean, fast, mobile-first.'],
              ['04', 'Launch', 'Live with hosting and support included.'],
            ].map(([n, title, desc], i) => (
              <Reveal key={n} className="websites-process-item" delay={i * 0.04}>
                <span className="websites-process-num">{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {referral && (
        <section className="section section--surface">
          <Container>
            <Reveal className="websites-share-box">
              <div>
                <h2>Your partner link</h2>
                <p>
                  Share this URL so enquiries land against code <strong>{referral.code}</strong>.
                </p>
                <code>{shareUrl}</code>
              </div>
              <button
                type="button"
                className="ui-btn ui-btn--secondary"
                onClick={() => navigator.clipboard?.writeText(shareUrl)}
              >
                Copy link
              </button>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="section section--contact" id="get-started">
        <Container>
          <Reveal>
            <h2 className="ui-section-heading">Ready for your site?</h2>
            <p className="section-intro">
              Fixed package from {PACKAGE_PRICE.gbp.label}. We usually reply within a day.
            </p>
          </Reveal>
          <div className="contact-grid">
            <Reveal className="contact-info">
              <div className="contact-item">
                <Mail size={18} />
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              {referral && (
                <div className="contact-item">
                  <Link2 size={18} />
                  <span>Referral {referral.code}</span>
                </div>
              )}
              <button type="button" className="hero-story-link websites-print-cta" onClick={openFlyerPdf}>
                Export PDF flyer <ArrowRight size={15} />
              </button>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.08}>
              <ContactForm
                source="websites-offer"
                referralCode={referral?.code}
                defaultMessage={
                  referral
                    ? `I'm interested in the website + hosting package. Referral code: ${referral.code}.`
                    : "I'm interested in the website + hosting package."
                }
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  )
}
