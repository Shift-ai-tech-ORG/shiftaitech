import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, Button } from './components/ui'
import ContactForm from './components/ContactForm'
import './App.css'
import './HomePage.css'

const services = [
  {
    title: 'AI Strategy & Consultancy',
    body: "Know what you want to achieve, but not quite how to get there? We'll help identify the opportunities, assess what's possible and work out a practical route forward.",
  },
  {
    title: 'Custom AI Models',
    body: "When off-the-shelf technology doesn't quite cut it, we develop AI solutions around the challenge at hand. Built for your requirements, rather than someone else's.",
  },
  {
    title: 'Intelligent Automation',
    body: 'Less time spent on repetitive tasks. More time for the things that move your business forward. We build smarter workflows that help your people work more efficiently.',
  },
  {
    title: 'AI Agents',
    body: 'Give your customers and teams better ways to get things done. From intelligent assistants to task-based agents, we build practical tools that support everyday work.',
  },
  {
    title: 'Digital Product Development',
    body: 'From the first prototype to a working product, we help turn ambitious ideas into applications, platforms and digital experiences that people can actually use.',
  },
  {
    title: 'Software Integration',
    body: 'We connect systems, develop new functionality and help your existing tools work harder in parallel.',
  },
]

const products = [
  {
    id: 'braid',
    name: 'Braid',
    mark: 'braid',
    kicker: 'Compliance',
    lead: 'Meet Braid. Smart client risk-assessments built for compliance.',
    body: 'Braid is a cutting-edge AI-powered client risk assessment platform designed to make AML compliance faster, simpler, and more affordable. Bringing together Companies House records, sanctions screening and Politically Exposed Person (PEP) data, Braid produces structured, 13-section risk assessment reports tailored to your firm’s own policies and procedures. Built with robust safeguards, traceable sources and UK-based data hosting, Braid is currently being resold through FibreCRM, extending its reach to compliance professionals and businesses seeking a more efficient approach to client risk assessments.',
    href: 'https://usebraid.ai',
    label: 'usebraid.ai',
    image: '/case-studies/braid-panel.jpg',
    portrait: true,
  },
  {
    id: 'space',
    name: 'Deep Space',
    mark: 'Deep Space Commodities',
    kicker: 'Education',
    lead: 'Exploring the future of Space Education, powered by Shift AI.',
    body: 'Deep Space is an AI-powered learning platform designed to make complex, specialist subjects more accessible through engaging, interactive education. Developed for Deep Space Commodities alongside Dr Tom James, Shift AI has built a platform that combines 73 different video lessons with an intelligent AI Tutor that answers questions in real time. With contextual AI assistance, structured assessments and personalised learning support, Deep Space demonstrates how intelligent technology can transform traditional education into a more engaging, responsive and interactive experience.',
    image: '/case-studies/deep-space-1.jpg',
  },
  {
    id: 'bio',
    name: 'BioSense',
    mark: 'BioSense',
    kicker: 'Health',
    lead: 'Health intelligence, built for BioSenseAI.',
    body: 'Developed for our client, BioSenseAI, BioSense is an AI-powered health intelligence platform designed to help individuals better understand their bodies, gain meaningful insights into their health and take greater control of their wellbeing. Bringing together data from wearable devices, blood test results, nutrition and lifestyle habits, BioSense uses artificial intelligence to uncover patterns, track changes and deliver personalised health insights.',
    href: 'https://bio-sense.ai',
    label: 'bio-sense.ai',
    image: '/case-studies/biosense.jpg',
  },
]

const partners = [
  {
    name: 'AWS Activate',
    src: '/partners/aws.svg',
    href: 'https://aws.amazon.com/startups/credits',
  },
  {
    name: 'NVIDIA Inception',
    src: '/partners/nvidia.svg',
    href: 'https://www.nvidia.com/en-us/startups/',
    wide: true,
  },
  {
    name: 'AP Creative Co',
    src: '/partners/ap-lockup.webp',
    href: 'https://apcreativeco.co.uk',
  },
  {
    name: 'RAMDVG',
    word: 'RAMDVG',
    href: 'https://ramdvg.com/',
  },
]

const team = [
  {
    name: 'Jack Rockell',
    role: 'CTO',
    photo: '/jack-rockell.webp',
    email: 'jack@shiftaitech.com',
    linkedin: 'https://www.linkedin.com/in/jack-rockell-841482267/',
    bio: 'Jack is the technical driving force behind Shift AI, with extensive hands-on experience in AI engineering, software development and building complex digital products from the ground up. His track record spans AI-powered trading infrastructure, predictive modelling, intelligent automation and production-ready platforms. With expertise across machine learning, AI agents, cloud infrastructure and full-stack development, Jack combines deep technical knowledge with an entrepreneurial approach to problem-solving. At Shift AI, he leads product engineering and development, turning ambitious ideas into scalable, commercially viable technology, with a particular talent for taking projects from concept to deployment at speed.',
  },
  {
    name: 'Darren Bishop',
    role: 'Head of Operations',
    photo: '/darren-bishop.webp',
    email: 'darren@shiftaitech.com',
    linkedin: 'https://www.linkedin.com/in/dwbishop/',
    bio: 'Darren’s career spans global financial institutions, emerging FinTech businesses and AI ventures, including projects with London Stock Exchange Group. With extensive expertise across financial markets, data analytics, AI and Web3, Darren combines sharp commercial instincts with an established international network of industry leaders, investors and technology partners. At Shift AI, he leads business development and strategic partnerships, identifying new opportunities, opening doors and turning ambitious ideas into commercially viable ventures.',
  },
  {
    name: 'Dan Kent',
    role: 'Developer',
    photo: '/dan-kent.webp',
    bio: 'Dan brings over 10 years of software engineering experience to Shift AI, with a background spanning full-stack development, data analytics, API integrations and AI. Alongside his coding expertise, Dan is a highly skilled UX/UI designer, combining technical knowledge with a keen eye for design and user experience. At Shift AI, Dan brings both the engineering expertise and creative thinking needed to build software that looks great, works well and delivers exactly what it’s supposed to.',
  },
]

function HeroFilm() {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const save = navigator.connection && navigator.connection.saveData
    if (!reduce && !save) setPlay(true)
  }, [])

  return (
    <div className="shape-hero-media" aria-hidden="true">
      <img src="/hero-poster.jpg" alt="" className="shape-hero-poster" />
      {play && (
        <video
          className="shape-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  )
}

function useProductStack() {
  useLayoutEffect(() => {
    const root = document.querySelector('.shape-ads')
    if (!root) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const cards = () => [...root.querySelectorAll('.shape-ad')]

    const pin = () => {
      const items = cards()
      if (reduce.matches) {
        items.forEach((el) => {
          el.style.top = ''
          el.style.zIndex = ''
        })
        return
      }
      const nav = 88
      const vh = window.innerHeight
      items.forEach((el, i) => {
        el.style.zIndex = String(i + 2)
        const top = Math.min(nav, vh - el.offsetHeight)
        el.style.top = `${top}px`
      })
    }

    pin()
    const ro = new ResizeObserver(pin)
    cards().forEach((el) => ro.observe(el))
    window.addEventListener('resize', pin)
    reduce.addEventListener('change', pin)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', pin)
      reduce.removeEventListener('change', pin)
    }
  }, [])
}

export default function App() {
  useProductStack()
  return (
    <div className="shape-page">
      <section className="shape-hero">
        <HeroFilm />
        <Container>
          <div className="shape-hero-copy">
            <h1 className="shape-hero-title">
              <span className="shape-hero-line">The AI</span>
              <span className="shape-hero-line shape-hero-mark">Shape-Shifters</span>
            </h1>
            <p className="shape-hero-lead">
              We’re Shift AI, a technology studio focused on solving real business challenges. From intelligent automation and bespoke AI models to fully developed digital products, we combine creative thinking, technical expertise and rapid development to turn ambitious ideas into working solutions, without wasting time.
            </p>
            <Button href="#studio">Let’s build something</Button>
          </div>
        </Container>
      </section>

      <section className="shape-band shape-sheet" id="studio">
        <Container>
          <h2 className="shape-statement">Good ideas don’t come in one <span className="shape-accent">shape</span>, and neither do we.</h2>
          <div className="shape-prose">
            <p>Every single business has its own challenges and ways of working. We believe that technology should fit the business, not the other way round.</p>
            <p>At Shift AI, we take time to understand what our clients are looking to achieve before deciding how to get there. That could mean developing a completely new AI product, automating the work that slows your team down or finding a smarter way to use the systems you already have.</p>
            <p className="shape-prose-strong">We’re not here to sell you AI for the sake of it. We’re here to build something worth having.</p>
          </div>
        </Container>
      </section>

      <section className="shape-section shape-sheet">
        <Container>
          <h2 className="shape-studio-title">From the Studio</h2>
          <p className="shape-studio-sub">Whatever the brief, we bring the creativity and technical know-how to move your projects forward.</p>
          <ol className="shape-services">
            {services.map((item, i) => (
              <li key={item.title} className="shape-service">
                <span className="shape-index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
          <Button href="#products">Made by Shift</Button>
        </Container>
      </section>

      <section className="shape-section shape-section--alt shape-sheet" id="products">
        <Container>
          <p className="shape-kicker">Our own technology</p>
          <h2 className="shape-heading">We also build our own technology too.</h2>
          <p className="shape-intro">
            Here at Shift AI, we don’t just explore what AI can do for our customers. We’re actively developing our own products, building new technologies, and bringing them to the market. Our work spans different industries and applications, each bringing its own challenges and opportunities.
          </p>
          <div className="shape-ads">
            {products.map((product) => (
              <article key={product.name} className={`shape-ad shape-ad--${product.id}${product.portrait ? ' shape-ad--portrait' : ''}`}>
                <div className="shape-ad-stage">
                  <div className="shape-ad-frame">
                    <img src={product.image} alt={`${product.name} screenshot`} />
                  </div>
                </div>
                <div className="shape-ad-copy">
                  {product.mark.toLowerCase() !== product.name.toLowerCase() && (
                    <p className={`shape-brand shape-brand--${product.id}`}>{product.mark}</p>
                  )}
                  <h3>{product.name}</h3>
                  <p className="shape-ad-sector">{product.kicker}</p>
                  <p className="shape-product-lead">{product.lead}</p>
                  <p>{product.body}</p>
                  {product.href && (
                    <a className="shape-out" href={product.href} target="_blank" rel="noopener noreferrer">
                      {product.label} <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="shape-more">
            <Link to="/websites">See the websites we’ve shipped</Link>
          </p>
        </Container>
      </section>

      <section className="shape-build shape-sheet">
        <Container>
          <div className="shape-build-grid">
            <div className="shape-build-copy">
              <h2 className="shape-statement">We know what it takes to build.</h2>
              <p className="shape-statement-note">Because we’ve done the hard yards ourselves.</p>
              <div className="shape-prose">
                <p>Building technology takes more than a good idea. It requires experimentation, investment, difficult decisions, and a willingness to rethink your approach when things aren’t working.</p>
                <p>Shift AI built its first AI models in 2024, and has invested over $650,000 in technology R&amp;D. By 2026, advances in AI development methods meant those same systems could be built at 82% less cost.</p>
                <p>That experience continues to shape how we work today. We’re always looking for smarter, faster and more cost-effective ways to develop and deliver technology, without compromising on quality or adding unnecessary complexity.</p>
              </div>
            </div>
            <div className="shape-stats">
              <p className="shape-stat">
                <span className="shape-stat-figure">$650,000+</span>
                <span className="shape-stat-caption">invested in technology R&amp;D</span>
              </p>
              <p className="shape-stat">
                <span className="shape-stat-figure">82%</span>
                <span className="shape-stat-caption">reduction in development costs for comparable systems</span>
              </p>
            </div>
          </div>
          <p className="shape-build-line">Because great technology doesn’t have to come with a <span className="shape-accent">hefty price tag</span>.</p>
        </Container>
      </section>

      <section className="shape-section shape-sheet" id="partners">
        <Container>
          <p className="shape-kicker">Our partners</p>
          <h2 className="shape-heading">The programmes and specialists we build with.</h2>
          <ul className="shape-logos">
            {partners.map((partner) => (
              <li key={partner.name}>
                <a href={partner.href} target="_blank" rel="noopener noreferrer">
                  {partner.src ? (
                    <img
                      className={partner.wide ? 'shape-logo-img shape-logo-img--wide' : 'shape-logo-img'}
                      src={partner.src}
                      alt={partner.name}
                    />
                  ) : (
                    <span className="shape-wordmark">{partner.word}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="shape-section shape-section--alt shape-sheet" id="team">
        <Container>
          <h2 className="shape-heading">The people who do the work.</h2>
          <div className="shape-team">
            {team.map((member) => (
              <article key={member.name} className="shape-person">
                <div className="shape-person-photo">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <span className="shape-monogram" aria-hidden="true">DK</span>
                  )}
                </div>
                <div>
                  <p className="shape-role">{member.role}</p>
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                  {(member.email || member.linkedin) && (
                    <p className="shape-person-links">
                      {member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      )}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="shape-close shape-sheet" id="contact">
        <Container>
          <div className="shape-close-grid">
            <div>
              <p className="shape-kicker">Let’s Talk</p>
              <h2>Big ideas come in all <span className="shape-accent">shapes and sizes</span>.</h2>
              <p className="shape-close-mark">Good thing we’re shape-shifters.</p>
              <p>From bold new ventures to the business challenges nobody’s quite cracked yet, we love a brief that gets us thinking.</p>
              <p>Got something in mind? Whether it’s a fully formed concept or the beginnings of something brilliant, let’s see what shape we can give it.</p>
              <p className="shape-close-mail">
                <a href="mailto:partnerships@shiftaitech.com">partnerships@shiftaitech.com</a>
              </p>
            </div>
            <ContactForm
              source="homepage"
              compact
              note="No pressure, no obligation. Just a conversation about your idea."
            />
          </div>
        </Container>
      </section>
    </div>
  )
}
