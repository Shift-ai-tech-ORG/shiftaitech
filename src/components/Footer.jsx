import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <Link to="/" className="footer-logo-link" aria-label="Shift AI Tech">
            <img
              src={`${import.meta.env.BASE_URL}shift-logo-new.png`}
              alt=""
              className="footer-logo-img"
            />
          </Link>
          <nav className="footer-nav" aria-label="Footer">
            <a href="/#studio" className="footer-nav-link">Studio</a>
            <a href="/#products" className="footer-nav-link">Products</a>
            <a href="/#team" className="footer-nav-link">Team</a>
            <Link to="/partners" className="footer-nav-link">Partners</Link>
            <Link to="/our-story" className="footer-nav-link">Our Story</Link>
            <Link to="/websites" className="footer-nav-link">Websites</Link>
            <Link to="/refer" className="footer-nav-link">Refer and Earn</Link>
            <Link to="/onboarding" className="footer-nav-link">Onboarding</Link>
            <a href="/#contact" className="footer-nav-link">Let’s Talk</a>
          </nav>
        </div>
        <div className="footer-meta">
          <a href="mailto:partnerships@shiftaitech.com" className="footer-nav-link">partnerships@shiftaitech.com</a>
          <Link to="/privacy" className="footer-nav-link">Privacy notice</Link>
          <p>© 2026 Shift AI Technology Ltd, registered in England and Wales, company no. 17159725.</p>
          <p>Registered office: Unit 14, The Maltings Industrial Estate, Hall Road, Southminster, Essex CM0 7EQ.</p>
        </div>
      </div>
    </footer>
  )
}
