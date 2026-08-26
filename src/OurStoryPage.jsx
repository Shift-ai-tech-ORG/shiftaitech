import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Container, SectionLabel, Button } from './components/ui'
import { Reveal } from './components/motion'
import BreathingField from './components/BreathingField'
import './OurStoryPage.css'

const beats = [
  {
    n: '01',
    title: 'The commission',
    body: 'In 2024 we funded advanced neural models to predict Bitcoin price moves. Over $650,000 across build, training, and infrastructure.',
  },
  {
    n: '02',
    title: 'The proof',
    body: 'Those models helped create Infinite Point Capital, a U.S. regulated Bitcoin fund. Targeted AUM of $100 to $300 million. The systems had to perform. They did.',
  },
  {
    n: '03',
    title: 'The rebuild',
    body: 'By 2026 the same systems were rebuilt with AI-assisted tooling. An 82% cut in development cost. Same standard. Far less waste.',
  },
  {
    n: '04',
    title: 'The studio',
    body: 'That is the shift. Serious AI products, built faster and leaner. We lived it before the industry wrote the white papers. Now we build that way for clients.',
  },
]

const researchPapers = [
  {
    id: 'research-paper-1',
    title: 'Deloitte: State of AI in the Enterprise',
    summary: 'Productivity, efficiency, and new business models.',
    href: 'https://www.deloitte.com/content/dam/assets-shared/docs/about/2025/state-of-ai-2026-global.pdf',
    external: true,
  },
  {
    id: 'research-paper-2',
    title: 'McKinsey: The state of AI',
    summary: 'Enterprise adoption and where measurable value shows up.',
    href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    external: true,
  },
  {
    id: 'research-paper-3',
    title: 'Shift AI: The AI Value Shift',
    summary: 'Cost, productivity, and growth from real deployments.',
  },
]

export default function OurStoryPage() {
  return (
    <div className="page our-story-page">
      <section className="story-hero">
        <div className="story-hero-art" aria-hidden="true">
          <BreathingField />
        </div>
        <Container>
          <div className="story-hero-inner">
            <Reveal>
              <p className="hero-kicker">Our story</p>
              <h1 className="story-hero-title">
                We built it the expensive way first.
              </h1>
              <p className="story-hero-sub">
                Then AI tools cut the same build by 82%. That lesson is Shift.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="story-beats">
            {beats.map((b, i) => (
              <Reveal key={b.n} className="story-beat" delay={i * 0.05}>
                <span className="story-beat-num">{b.n}</span>
                <div className="story-beat-body">
                  <h2 className="story-beat-title">{b.title}</h2>
                  <p className="story-beat-text">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--surface">
        <Container>
          <Reveal>
            <SectionLabel>Research</SectionLabel>
            <h2 className="ui-section-heading">Further reading</h2>
          </Reveal>
          <div className="research-list">
            {researchPapers.map((paper, i) => {
              const inner = (
                <>
                  <div className="research-row-body">
                    <h3 className="research-row-title">{paper.title}</h3>
                    <p className="research-row-summary">{paper.summary}</p>
                  </div>
                  <span className="research-row-action">
                    {paper.external ? 'Read report' : 'Read article'}
                    {paper.external ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
                  </span>
                </>
              )

              if (paper.external) {
                return (
                  <Reveal key={paper.id} delay={i * 0.05}>
                    <a
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="research-row"
                    >
                      {inner}
                    </a>
                  </Reveal>
                )
              }

              return (
                <Reveal key={paper.id} delay={i * 0.05}>
                  <Link to={`/research/${paper.id}`} className="research-row">
                    {inner}
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal className="story-close">
            <h2 className="story-close-title">We didn&apos;t read this shift. We lived it.</h2>
            <p>
              Real capital. Real deployment. That experience is how we build for clients now.
            </p>
            <Button href="/#contact">Start a project</Button>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
