import { Container, SectionLabel } from './components/ui'
import { Reveal } from './components/motion'
import './PartnersPage.css'

const teamMembers = [
  {
    name: '',
    role: 'Partner',
    summary:
      'Co-founder of Shift AI Tech. Leads product strategy, client partnerships, and technical delivery across AI and web projects.',
  },
  {
    name: '',
    role: 'Partner',
    summary:
      'Co-founder of Shift AI Tech. Drives business development, operations, and growth strategy across the company.',
  },
  {
    name: '',
    role: 'Partner',
    summary:
      'Co-founder of Shift AI Tech. Brings strategic insight and executional leadership to every engagement.',
  },
]

export default function PartnersPage() {
  return (
    <div className="subpage partners-page">
      <section className="subpage-hero">
        <Container>
          <Reveal>
            <SectionLabel>Partners</SectionLabel>
            <h1 className="subpage-title">Meet the Partners Behind Shift</h1>
            <p className="subpage-sub">
              The people driving Shift AI Tech forward. Strategy, delivery, and growth.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="partners-grid">
            {teamMembers.map((member, i) => (
              <Reveal
                key={member.name + member.role}
                as="article"
                className="partner-card"
                delay={i * 0.07}
              >
                {member.image && (
                  <div className="partner-img-wrap">
                    <img src={member.image} alt={member.name} className="partner-img" />
                  </div>
                )}
                <p className="partner-role">{member.role}</p>
                <h2 className="partner-name">{member.name}</h2>
                <p className="partner-summary">{member.summary}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
