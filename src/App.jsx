import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Zap,
} from 'lucide-react'
import { Container, SectionHeading, DisplayTitle, Button } from './components/ui'
import ContactForm from './components/ContactForm'
import { Reveal, MediaReveal } from './components/motion'
import BreathingField from './components/BreathingField'
import { portfolio as portfolioData } from './data/projects'
import './App.css'

const featuredProjects = portfolioData.filter((p) => p.featured)

const pillars = [
  {
    number: '01',
    title: 'Clear decisions',
    desc: 'We help you pick the right AI, not a pile of tools.',
  },
  {
    number: '02',
    title: 'Sharp products',
    desc: 'Systems that look considered and actually ship.',
  },
  {
    number: '03',
    title: 'Commercial pace',
    desc: 'Built to grow. Paid for, not just launched.',
  },
]

const services = [
  {
    number: '01',
    title: 'Custom AI',
    description: 'Models, agents, and RAG pipelines trained on your data.',
  },
  {
    number: '02',
    title: 'Product builds',
    description: 'Full-stack products from concept to live deployment.',
  },
  {
    number: '03',
    title: 'Automation',
    description: 'Workflows that replace slow, manual work.',
  },
  {
    number: '04',
    title: 'Strategy',
    description: 'Where AI pays off. Scoped, priced, and clear before you commit.',
  },
]

const processSteps = [
  { n: '01', title: 'Brief', desc: 'Goals, constraints, and where AI actually fits.' },
  { n: '02', title: 'Design', desc: 'Architecture, scope, and cost, agreed upfront.' },
  { n: '03', title: 'Build', desc: 'Fast delivery. No bloat, no waste.' },
  { n: '04', title: 'Ship', desc: 'Live, monitored, and ready to iterate.' },
]

const stats = [
  { value: 'Weeks', label: 'Brief to working prototype.' },
  { value: 'Day 1', label: 'Useful output from the start.' },
  { value: 'UK', label: 'Founder-led. Direct access.' },
]

const faqs = [
  {
    q: 'What does Shift AI Tech do?',
    a: 'Shift AI Tech is a UK AI studio that builds custom AI models, agents, automation, full product builds, and websites for businesses that need a commercial edge.',
  },
  {
    q: 'Are you the same as Shift Technology or other Shift AI brands?',
    a: 'No. We are Shift AI Tech at shiftaitech.com, an independent UK studio. Not Shift Technology (insurance AI) and not Shift AI at shiftai.co.uk.',
  },
  {
    q: 'How fast can you ship?',
    a: 'From brief to a working prototype in weeks, with useful output from day one.',
  },
  {
    q: 'Do you build websites as well as AI?',
    a: 'Yes. Bespoke design, build, host, and SEO foundations. Fixed-price packages on our Websites page.',
  },
]

function App() {
  return (
    <div className="page">

      <section className="hero">
        <div className="hero-art" aria-hidden="true">
          <BreathingField />
        </div>
        <Container>
          <div className="hero-inner">
            <p className="hero-kicker">Shift AI Tech · AI studio · United Kingdom</p>
            <h1 className="hero-title">
              We build AI products that give businesses their edge.
            </h1>
            <Reveal className="hero-sub" delay={0.12}>
              Shift AI Tech builds custom models, automation, and full product builds.
              From brief to live in weeks.
            </Reveal>
            <Reveal className="hero-actions" delay={0.2}>
              <Button href="#contact">Start a project</Button>
              <a href="#projects" className="hero-story-link" data-cursor="WORK">
                See the work <ArrowRight size={15} />
              </a>
            </Reveal>
          </div>
        </Container>
        <div className="hero-scroll-cue" aria-hidden="true">
          <span className="hero-scroll-cue-line" />
        </div>
      </section>

      <section className="approach">
        <Container>
          <Reveal>
            <p className="approach-statement">
              Shaping how businesses use AI. Seen, trusted, and paid for.
            </p>
          </Reveal>
          <div className="approach-grid">
            {pillars.map((p, i) => (
              <Reveal key={p.title} className="approach-item" delay={i * 0.06}>
                <span className="approach-num">{p.number}</span>
                <h3 className="approach-title">{p.title}</h3>
                <p className="approach-desc">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="solutions" className="section section--capability">
        <Container>
          <Reveal className="capability-header-copy">
            <DisplayTitle>Capability</DisplayTitle>
            <SectionHeading>What we build.</SectionHeading>
          </Reveal>
          <div className="service-rows">
            {services.map((s, i) => (
              <Reveal key={s.title} className="service-row" delay={i * 0.05} data-cursor="BUILD">
                <span className="service-row-num">{s.number}</span>
                <div className="service-row-body">
                  <h3 className="service-row-title">{s.title}</h3>
                  <p className="service-row-desc">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="projects" className="section section--dark">
        <Container>
          <Reveal>
            <DisplayTitle>Work</DisplayTitle>
            <SectionHeading>Selected projects.</SectionHeading>
            <p className="section-intro">
              Real products across compliance, health, training, and finance.
            </p>
          </Reveal>

          <div className="showcase">
            {featuredProjects.map((p, i) => (
              <div
                key={p.id}
                id={`case-study-${p.id}`}
                className={`showcase-item${i % 2 === 1 ? ' showcase-item--flip' : ''}`}
              >
                <MediaReveal className="showcase-media" data-cursor="VIEW">
                  <div className="showcase-media-main">
                    <img src={p.images[0]} alt={`${p.partner} screenshot`} loading="lazy" />
                  </div>
                </MediaReveal>
                <Reveal className="showcase-content" delay={0.12}>
                  <span className="showcase-sector">{p.sector}</span>
                  <h3 className="showcase-name">{p.partner}</h3>
                  <p className="showcase-desc">{p.short || p.description}</p>
                  {p.link && (
                    <div className="showcase-foot">
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="showcase-link"
                        data-cursor="VIEW"
                      >
                        {p.link.label} <ArrowUpRight size={14} />
                      </a>
                    </div>
                  )}
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--dark results">
        <Container>
          <div className="stats-grid stats-grid--tight">
            {stats.map((s, i) => (
              <Reveal key={s.value} className="stat-cell" delay={i * 0.04}>
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="work-with-us" className="section">
        <Container>
          <Reveal>
            <DisplayTitle>Method</DisplayTitle>
            <SectionHeading>From idea to live.</SectionHeading>
          </Reveal>
          <div className="process-grid">
            {processSteps.map((p, i) => (
              <Reveal key={p.title} className="process-card" delay={i * 0.05}>
                <span className="process-card-num">{p.n}</span>
                <h3 className="process-card-title">{p.title}</h3>
                <p className="process-card-desc">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="section">
        <Container>
          <Reveal>
            <DisplayTitle>FAQ</DisplayTitle>
            <SectionHeading>Straight answers.</SectionHeading>
            <p className="section-intro">
              Clear answers about who we are and what we build.
            </p>
          </Reveal>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <Reveal key={item.q} className="faq-item" delay={i * 0.04}>
                <h3 className="faq-q">{item.q}</h3>
                <p className="faq-a">{item.a}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="section section--contact">
        <div className="contact-bg" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80"
            alt=""
            loading="lazy"
          />
          <div className="contact-bg-overlay" />
        </div>
        <Container>
          <Reveal>
            <SectionHeading>Tell us what you need.</SectionHeading>
            <p className="section-intro">We usually reply within a day.</p>
          </Reveal>
          <div className="contact-grid">
            <Reveal className="contact-info">
              <div className="contact-item">
                <Mail size={18} />
                <a href="mailto:jack@shiftaitech.com">jack@shiftaitech.com</a>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>United Kingdom</span>
              </div>
              <div className="contact-response">
                <Zap size={14} />
                Reply within 24 hours
              </div>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default App
