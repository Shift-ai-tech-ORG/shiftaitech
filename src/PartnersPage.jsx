import { ArrowUpRight } from 'lucide-react'
import { Container, Button } from './components/ui'
import { Reveal } from './components/motion'
import BreathingField from './components/BreathingField'
import './PartnersPage.css'

const partners = [
  {
    id: 'ramdvg',
    name: 'RAMDVG',
    role: 'Tokenisation platform partner',
    tagline: 'Cryptographic tokenisation for real-world assets.',
    summary:
      'RAMDVG built RAMGET — a patent-pending platform that ties uniquely identifiable assets to a secure, cryptographically linked data core. Ownership, provenance, maintenance history, and compliance travel with the asset as one tradeable unit. Their AI layer, SEEMOR, opens that protected data through natural-language queries for finance, operations, and legal teams.',
    body:
      'They started where the bar is highest: commercial aviation. Most regulated. Most data-heavy. Highest need for integrity. If it works on aircraft, it works on art, infrastructure, energy, and beyond. Shift partners with RAMDVG to layer production AI onto that tokenised foundation — so law firms and asset owners get systems that ship, not slide decks.',
    points: [
      'RAMGET tokens with inseparable, immutable asset data',
      'SEEMOR AI for natural-language insight on protected records',
      'Built for aviation complexity; ready across high-value asset classes',
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

      <section className="section">
        <Container>
          <div className="partners-list">
            {partners.map((p, i) => (
              <Reveal key={p.id} className="partners-row" delay={i * 0.06}>
                <div className="partners-row-meta">
                  <p className="partners-row-role">{p.role}</p>
                  <h2 className="partners-row-name">{p.name}</h2>
                  {p.tagline && (
                    <p className="partners-row-tagline">{p.tagline}</p>
                  )}
                </div>
                <div className="partners-row-body">
                  <p className="partners-row-summary">{p.summary}</p>
                  {p.body && (
                    <p className="partners-row-summary partners-row-summary--follow">
                      {p.body}
                    </p>
                  )}
                  {p.points?.length > 0 && (
                    <ul className="partners-row-points">
                      {p.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partners-row-link"
                      data-cursor="VIEW"
                    >
                      {p.hrefLabel || p.href} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </Reveal>
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
