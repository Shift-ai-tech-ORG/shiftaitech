import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import Magnetic from './Magnetic'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const navLinks = [
    { label: 'Studio', href: '/#studio', type: 'hash' },
    { label: 'Products', href: '/#products', type: 'hash' },
    { label: 'Team', href: '/#team', type: 'hash' },
    { label: 'Refer and Earn', href: '/refer', type: 'route' },
  ]

  const renderLink = (link) => {
    const isActive =
      link.type === 'route' && location.pathname === link.href

    if (link.type === 'route') {
      return (
        <Link
          key={link.label}
          to={link.href}
          className={`nav-link${isActive ? ' nav-link--active' : ''}`}
          aria-current={isActive ? 'page' : undefined}
          data-cursor="GO"
        >
          {link.label}
        </Link>
      )
    }

    if (isHome) {
      return (
        <a key={link.label} href={link.href.replace('/', '')} className="nav-link" data-cursor="GO">
          {link.label}
        </a>
      )
    }

    return (
      <a key={link.label} href={link.href} className="nav-link" data-cursor="GO">
        {link.label}
      </a>
    )
  }

  const inHero = isHome && !scrolled

  return (
    <nav className={`nav${scrolled || !isHome ? ' nav--scrolled' : ''}${mobileOpen ? ' nav--open' : ''}${inHero ? ' nav--hero' : ''}`}>
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="Shift AI Tech home">
          <img
            src={`${import.meta.env.BASE_URL}shift-logo-new.png`}
            alt="Shift AI Tech"
            className="nav-logo-img"
          />
        </Link>

        <div className="nav-links">
          {navLinks.map(renderLink)}
        </div>

        <div className="nav-right">
          <Magnetic>
            <a href={isHome ? '#contact' : '/#contact'} className="nav-cta" data-cursor="GO">
              <span>Let&apos;s Talk</span>
              <ArrowRight size={15} />
            </a>
          </Magnetic>
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="nav-mobile">
          {navLinks.map((link, i) => (
            <div className="nav-mobile-row" key={link.label} onClick={() => setMobileOpen(false)}>
              <span className="nav-mobile-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {renderLink(link)}
            </div>
          ))}
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="nav-mobile-cta"
            onClick={() => setMobileOpen(false)}
          >
            Let&apos;s Talk <ArrowRight size={15} />
          </a>
        </div>
      )}
    </nav>
  )
}
