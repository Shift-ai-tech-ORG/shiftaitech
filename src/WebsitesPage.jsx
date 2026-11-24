import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Download,
  ExternalLink,
} from 'lucide-react'
import { Container, SectionLabel, SectionHeading, DisplayTitle, Button } from './components/ui'
import ContactForm from './components/ContactForm'
import { Reveal, LineReveal, MediaReveal } from './components/motion'
import BreathingField from './components/BreathingField'
import {
  CASE_STUDIES,
  COMPLETED_SITES,
  CONTACT_EMAIL,
  EXTRAS,
  HOURLY_RATE,
  INCLUDED,
  PACKAGE_LABEL,
  PACKAGE_NOTE,
  PACKAGE_PRICE,
  SITE_URL,
  WEBSITE_FAQS,
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
            <div className="websites-hero-copy">
              <p className="hero-kicker">Build &amp; host</p>
              <LineReveal
                className="websites-hero-title"
                lines={[
                  { text: 'Websites that' },
                  { text: 'get found' },
                  { text: 'and convert.', mark: true },
                ]}
              />
              <Reveal>
                <p className="websites-hero-sub">
                  Design, build, and launch. Fixed price. Fast delivery.
                </p>
              </Reveal>
              <div className="websites-hero-actions">
                <Button href="#get-started">Get started</Button>
                <button type="button" className="hero-story-link" onClick={openFlyerPdf}>
                  Export flyer <Download size={15} />
                </button>
              </div>
              {referral && (
                <p className="websites-ref-banner" role="status">
                  <span>Referral {referral.code}</span>
                  Introduced by {referral.name}.
                </p>
              )}
            </div>

            <Reveal className="websites-price-panel" delay={0.08}>
              <p className="websites-price-label">{PACKAGE_LABEL}</p>
              <p className="websites-price-figures">
                <span>{PACKAGE_PRICE.gbp.label}</span>
                <span>{PACKAGE_PRICE.aed.label}</span>
                <span>{PACKAGE_PRICE.usd.label}</span>
              </p>
              <p className="websites-price-note">
                Brochure sites to get a business live. Extra work at {HOURLY_RATE.gbp.label}.
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
                <h3 className="websites-row-title">{item.title}</h3>
                <p className="websites-row-desc">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--surface">
        <Container>
          <Reveal>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="ui-section-heading">Brochure package. Three currencies.</h2>
            <p className="section-intro">{PACKAGE_NOTE}</p>
          </Reveal>
          <div className="websites-price-rows">
            <Reveal className="websites-price-row">
              <div>
                <strong>{PACKAGE_LABEL}</strong>
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
          {EXTRAS.filter((item) => item.priceKey !== 'hourly').map((item) => (
            <Reveal key={item.title} className="websites-price-row" delay={0.08}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
              <div className="websites-price-cells websites-price-cells--single">
                <span>{item.badge || 'Scoped'}</span>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="section section--dark">
        <Container>
          <Reveal>
            <DisplayTitle>Work</DisplayTitle>
            <SectionHeading>Featured sites.</SectionHeading>
            <p className="section-intro">
              A sample of recent launches. Full completed list below.
            </p>
          </Reveal>
          <div className="websites-cases">
            {CASE_STUDIES.map((site, i) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="websites-case"
              >
                <MediaReveal className="websites-case-frame">
                  {site.image ? (
                    <img
                      src={site.image}
                      alt=""
                      width={1400}
                      height={875}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  ) : (
                    <span className="websites-case-mark" aria-hidden="true">shift.</span>
                  )}
                </MediaReveal>
                <span className="websites-case-meta">
                  <span className="websites-case-kicker">
                    <span className="websites-case-index">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="websites-case-sector">{site.sector}</span>
                  </span>
                  <h3>{site.name}</h3>
                  <span className="websites-case-url">
                    {site.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    <ExternalLink size={14} aria-hidden="true" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--surface">
        <Container>
          <Reveal>
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="ui-section-heading">All sites completed.</h2>
            <p className="section-intro">
              {COMPLETED_SITES.length} shipped builds across hospitality, trades,
              property, charity, health and compliance.
            </p>
          </Reveal>
          <div className="websites-completed">
            {COMPLETED_SITES.map((site, i) => (
              <a
                key={`${site.name}-${site.url}`}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="websites-completed-item"
              >
                <span className="websites-completed-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="websites-completed-name">{site.name}</h3>
                <span className="websites-completed-sector">{site.sector}</span>
                <span className="websites-completed-url">
                  {site.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="section method">
        <Container>
          <div className="method-layout">
            <div className="method-rail">
              <p className="ui-display-title">Method</p>
              <h2 className="ui-section-heading">Brief to live.</h2>
            </div>
            <ol className="method-steps">
              {[
                ['01', 'Brief', 'Tell us about the business and the goal.'],
                ['02', 'Design', 'We mock up before we build.'],
                ['03', 'Build', 'Clean, fast, mobile-first.'],
                ['04', 'Launch', 'Live with hosting and support included.'],
              ].map(([n, title, desc], i) => (
                <Reveal key={n} as="li" className="method-step" delay={i * 0.04}>
                  <span className="method-num" aria-hidden="true">{n}</span>
                  <div className="method-copy">
                    <h3 className="method-title">{title}</h3>
                    <p className="method-desc">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
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
                className="ui-btn ui-btn--primary"
                onClick={() => navigator.clipboard?.writeText(shareUrl)}
              >
                Copy link
              </button>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="section" id="website-faq">
        <Container>
          <Reveal>
            <DisplayTitle>FAQ</DisplayTitle>
            <SectionHeading>Package questions.</SectionHeading>
          </Reveal>
          <div className="faq-list">
            {WEBSITE_FAQS.map((item, i) => (
              <Reveal key={item.q} className="faq-item" delay={i * 0.04}>
                <h3 className="faq-q">{item.q}</h3>
                <p className="faq-a">{item.a}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--contact" id="get-started">
        <Container>
          <p className="hero-kicker">Start</p>
          <LineReveal
            as="h2"
            when="view"
            className="contact-title"
            lines={[
              { text: 'Ready for' },
              { text: 'your site.', mark: true },
            ]}
          />
          <Reveal>
            <p className="section-intro">
              Brochure package from {PACKAGE_PRICE.gbp.label}. eCommerce and AI
              modules via free consultation. We usually reply within a day.
            </p>
          </Reveal>
          <div className="contact-grid">
            <Reveal className="contact-info contact-people">
              <a className="contact-person" href={`mailto:${CONTACT_EMAIL}`}>
                <span className="contact-person-role">Websites</span>
                <span className="contact-person-name">partnerships@<wbr />shiftaitech.com</span>
              </a>
              {referral && (
                <p className="contact-response">Referral {referral.code}</p>
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
