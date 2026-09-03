import { ArrowUpRight } from 'lucide-react'
import { Container, Button } from './components/ui'
import { Reveal, MediaReveal } from './components/motion'
import BreathingField from './components/BreathingField'
import './PartnersPage.css'

const partners = [
  {
    id: 'ramdvg',
    name: 'RAMDVG',
    role: 'Tokenisation asset exchange platform',
    sector: 'Real-world assets',
    short:
      'Uniquely identifiable assets are tied directly to their own secure, cryptographically linked data core.',
    images: [
      '/partners/ramdvg-hero.jpg',
      '/partners/ramdvg-aviation.jpg',
      '/partners/ramdvg-building.jpg',
    ],
    href: 'https://ramdvg.com/',
    hrefLabel: 'Visit ramdvg.com',
  },
]

export default function PartnersPage() {
  return (
    <div className="page partners-page">
      <section className="partners-hero">
        <div className="partners-hero-art" aria-hidden="true">
          <BreathingField />
        </div>
        <Container>
          <div className="partners-hero-inner">
            <Reveal>
              <p className="hero-kicker">Partners</p>
              <h1 className="partners-hero-title">
                AI specialised partners.
              </h1>
              <p className="partners-hero-sub">
                Today, AI extends across all business sectors and industries.
                From large to small, every business is looking for a competitive
                edge. AI executed correctly can offer some amazing commercial
                benefits.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section partners-intro-section">
        <Container>
          <Reveal className="partners-intro">
            <p>
              At Shift we put business needs first, applying AI to accelerate
              revenues and save costs.
            </p>
            <p>
              Which is why we partner with key specialist AI technology
              providers. Firms that have proven experience, credibility and
              above all a passion to provide world class business services.
            </p>
            <p className="partners-intro-lead">
              Enclosed are a sample of our specialist AI partners and the
              sectors that they are experts in.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section partners-work">
        <Container>
          <div className="partners-showcase">
            {partners.map((p, i) => (
              <div
                key={p.id}
                className={`partners-showcase-item${i % 2 === 1 ? ' partners-showcase-item--flip' : ''}`}
              >
                <MediaReveal className="partners-showcase-media" data-cursor="VIEW">
                  <div className="partners-showcase-main">
                    <img
                      src={p.images[0]}
                      alt={`${p.name} platform`}
                      loading="lazy"
                    />
                  </div>
                  {p.images.length > 1 && (
                    <div className="partners-showcase-thumbs">
                      {p.images.slice(1, 3).map((src) => (
                        <img key={src} src={src} alt="" loading="lazy" />
                      ))}
                    </div>
                  )}
                </MediaReveal>

                <Reveal className="partners-showcase-content" delay={0.1}>
                  <span className="partners-showcase-sector">{p.sector}</span>
                  <p className="partners-showcase-role">{p.role}</p>
                  <h2 className="partners-showcase-name">{p.name}</h2>
                  <p className="partners-showcase-short">{p.short}</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partners-showcase-link"
                    data-cursor="VIEW"
                  >
                    {p.hrefLabel} <ArrowUpRight size={14} />
                  </a>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section partners-cta-section">
        <Container>
          <Reveal className="partners-cta">
            <h2 className="partners-cta-title">Want to partner with Shift?</h2>
            <p className="partners-cta-sub">
              Specialist AI technology providers who want to take serious
              commercial AI into production with us.
            </p>
            <Button href="mailto:partnerships@shiftaitech.com">
              Talk partnerships
            </Button>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
