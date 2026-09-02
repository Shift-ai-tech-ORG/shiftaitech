import { ArrowUpRight } from 'lucide-react'
import { Container, Button } from './components/ui'
import { Reveal } from './components/motion'
import BreathingField from './components/BreathingField'
import './PartnersPage.css'

/**
 * Strategic partners. Darren will supply the final RAMDVG narrative —
 * keep copy factual and short until that lands.
 */
const partners = [
  {
    id: 'ramdvg',
    name: 'RAMDVG',
    role: 'Tokenisation platform partner',
    summary:
      'Joint partner for AI-enabled solutions alongside RAMDVG’s cryptographic tokenisation platform for real-world assets. Together we support legal and commercial teams deploying AI on top of immutable, data-rich digital twins.',
    href: 'https://ramdvg.com/',
    hrefLabel: 'ramdvg.com',
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
                Strategic alliances that extend what Shift ships — tokenisation,
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
                </div>
                <div className="partners-row-body">
                  <p className="partners-row-summary">{p.summary}</p>
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
