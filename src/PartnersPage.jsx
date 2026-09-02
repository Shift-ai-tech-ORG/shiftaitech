import { ArrowUpRight } from 'lucide-react'
import { Container, Button } from './components/ui'
import { Reveal, MediaReveal } from './components/motion'
import BreathingField from './components/BreathingField'
import './PartnersPage.css'

const partners = [
  {
    id: 'ramdvg',
    name: 'RAMDVG',
    role: 'Tokenisation platform partner',
    sector: 'Real-world assets · Aviation-first',
    short:
      'Cryptographic tokenisation that couples high-value assets to an immutable data core, with AI on top.',
    summary:
      'RAMDVG built RAMGET, a patent-pending platform that ties uniquely identifiable assets to a secure, cryptographically linked data core. Ownership, provenance, maintenance history, and compliance travel with the asset as one tradeable unit. Their AI layer, SEEMOR, opens that protected data through natural-language queries for finance, operations, and legal teams.',
    body:
      'They started where the bar is highest: commercial aviation. Most regulated. Most data-heavy. Highest need for integrity. Shift partners with RAMDVG to layer production AI onto that tokenised foundation, so law firms and asset owners get systems that ship, not slide decks.',
    points: [
      'RAMGET tokens with inseparable, immutable asset data',
      'SEEMOR AI for natural-language insight on protected records',
      'Built for aviation complexity; ready across high-value asset classes',
    ],
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
                Built with the right partners.
              </h1>
              <p className="partners-hero-sub">
                Strategic alliances that extend what Shift ships. Tokenisation,
                infrastructure, and delivery credibility for serious AI work.
              </p>
            </Reveal>
          </div>
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
                        <img
                          key={src}
                          src={src}
                          alt=""
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                </MediaReveal>

                <Reveal className="partners-showcase-content" delay={0.1}>
                  <span className="partners-showcase-sector">{p.sector}</span>
                  <p className="partners-showcase-role">{p.role}</p>
                  <h2 className="partners-showcase-name">{p.name}</h2>
                  <p className="partners-showcase-short">{p.short}</p>
                  <p className="partners-showcase-desc">{p.summary}</p>
                  <p className="partners-showcase-desc">{p.body}</p>
                  <ul className="partners-showcase-points">
                    {p.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
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
              Technology, legal, and delivery partners who want to take AI into
              production with us.
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
