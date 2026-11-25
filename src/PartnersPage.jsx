import { ArrowUpRight } from 'lucide-react'
import { Container, Button } from './components/ui'
import { Reveal, MediaReveal, LineReveal } from './components/motion'
import BreathingField from './components/BreathingField'
import './PartnersPage.css'

const specialistPartners = [
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
  {
    id: 'ap-creative',
    name: 'Anthony Parry',
    studio: 'AP Creative Co',
    role: 'Specialist partner: social, content, design, print, web, events',
    sector: 'Creative',
    short: 'Founder-led creative. You talk to Anthony.',
    body: [
      'AP Creative Co wasn’t created to add more marketing noise. I built it to give businesses practical, creative support that genuinely helps them get seen, from managing their social media and producing original content to websites, print, merchandise and events.',
      'I’m still and always will be directly involved in the work: developing ideas, shooting content, shaping campaigns and working closely with the people behind every business.',
      'You’re not sold the dream by one person and quietly handed over to somebody you’ve never met five minutes later.',
    ],
    images: ['/partners/ap-founder.jpg'],
    imageAlt: 'Anthony Parry, founder of AP Creative Co',
    portrait: true,
    href: 'https://apcreativeco.co.uk',
    hrefLabel: 'Visit AP Creative Co',
    hrefSecondary: 'https://apcreativeco.co.uk/contact/',
    hrefSecondaryLabel: 'Start a project',
  },
]

const infrastructurePartners = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    label: 'AWS Activate',
    logo: '/partners/aws.svg',
    short:
      'Selected for AWS Activate. Production AI workloads on Amazon Web Services across Europe, with credits backing the next stage of build.',
    href: 'https://aws.amazon.com/startups/credits',
    hrefLabel: 'AWS for Startups',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    label: 'NVIDIA Inception',
    logo: '/partners/nvidia.svg',
    short:
      'Accepted into the NVIDIA Inception program. Access to NVIDIA tooling, training, and preferential rates as we train and ship AI products on GPU infrastructure.',
    href: 'https://www.nvidia.com/en-us/startups/',
    hrefLabel: 'NVIDIA Inception',
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
            <p className="hero-kicker">Partners</p>
            <LineReveal
              className="partners-hero-title"
              lines={[
                { text: 'Specialists and' },
                { text: 'infrastructure.', mark: true },
              ]}
            />
            <Reveal>
              <p className="partners-hero-sub">
                AI that ships commercially needs both. Sector specialists who
                know the domain, and cloud infrastructure strong enough to run
                production workloads.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section partners-intro-section">
        <Container>
          <Reveal className="partners-intro">
            <p className="partners-intro-lead">
              At Shift we put business needs first, applying AI to accelerate
              revenues and save costs.
            </p>
            <p>
              We work with specialist AI technology providers who bring proven
              domain experience, and we build on infrastructure partners that
              scale serious production systems.
            </p>
          </Reveal>
        </Container>
      </section>

      <section
        className="section partners-work"
        aria-labelledby="specialist-partners-heading"
      >
        <Container>
          <Reveal className="partners-section-head">
            <p className="partners-section-kicker">01</p>
            <h2
              id="specialist-partners-heading"
              className="partners-section-title"
            >
              Specialist partners
            </h2>
            <p className="partners-section-sub">
              Sector experts we work alongside to take commercial AI into
              production.
            </p>
          </Reveal>

          <div className="partners-showcase">
            {specialistPartners.map((p, i) => (
              <div
                key={p.id}
                className={`partners-showcase-item${i % 2 === 1 ? ' partners-showcase-item--flip' : ''}`}
              >
                <MediaReveal className="partners-showcase-media" data-cursor="VIEW">
                  <a
                    className={`partners-showcase-main${p.portrait ? ' partners-showcase-main--portrait' : ''}`}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VIEW"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.imageAlt || `${p.name} platform`}
                      loading="lazy"
                    />
                  </a>
                  {p.images.length > 1 && (
                    <div className="partners-showcase-thumbs">
                      {p.images.slice(1, 3).map((src) => (
                        <img key={src} src={src} alt="" loading="lazy" />
                      ))}
                    </div>
                  )}
                </MediaReveal>

                <Reveal className="partners-showcase-content" delay={0.1}>
                  <span className="partners-showcase-sector">
                    {p.studio || p.sector}
                  </span>
                  <p className="partners-showcase-role">{p.role}</p>
                  <h3 className="partners-showcase-name">{p.name}</h3>
                  <p className="partners-showcase-short">{p.short}</p>
                  {p.body?.map((para) => (
                    <p key={para.slice(0, 48)} className="partners-showcase-body">
                      {para}
                    </p>
                  ))}
                  <div className="partners-showcase-links">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partners-showcase-link"
                      data-cursor="VIEW"
                    >
                      {p.hrefLabel} <ArrowUpRight size={14} />
                    </a>
                    {p.hrefSecondary && (
                      <a
                        href={p.hrefSecondary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partners-showcase-link"
                        data-cursor="VIEW"
                      >
                        {p.hrefSecondaryLabel} <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="section partners-infra-section"
        aria-labelledby="infrastructure-partners-heading"
      >
        <Container>
          <Reveal className="partners-section-head">
            <p className="partners-section-kicker">02</p>
            <h2
              id="infrastructure-partners-heading"
              className="partners-section-title"
            >
              Infrastructure partners
            </h2>
            <p className="partners-section-sub">
              Cloud and compute programmes we build production AI on.
            </p>
          </Reveal>

          <div className="partners-infra-list">
            {infrastructurePartners.map((p) => (
              <Reveal key={p.id} className="partners-infra-item" delay={0.08}>
                <div className="partners-infra-mark" aria-hidden="true">
                  <img src={p.logo} alt="" width="152" height="91" />
                </div>
                <div className="partners-infra-copy">
                  <p className="partners-infra-label">{p.label}</p>
                  <h3 className="partners-infra-name">{p.name}</h3>
                  <p className="partners-infra-text">{p.short}</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partners-showcase-link"
                    data-cursor="VIEW"
                  >
                    {p.hrefLabel} <ArrowUpRight size={14} />
                  </a>
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
              Specialist providers and infrastructure teams who want to take
              serious commercial AI into production with us.
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
