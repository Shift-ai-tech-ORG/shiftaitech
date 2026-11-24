import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TeamPage from './TeamPage.jsx'
import BlogPage from './BlogPage.jsx'
import OurStoryPage from './OurStoryPage.jsx'
import PartnersPage from './PartnersPage.jsx'
import ResearchPaperPage from './ResearchPaperPage.jsx'
import OnboardingPage from './OnboardingPage.jsx'
import WebsitesPage from './WebsitesPage.jsx'
import ReferPage, { ReferSentPage } from './ReferPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import SiteFX from './components/SiteFX.jsx'
import Seo from './components/Seo.jsx'
import { captureReferralFromSearch } from './lib/referral'

captureReferralFromSearch()

function PageFade({ children }) {
  const { pathname } = useLocation()
  const seen = useRef(false)
  const animate = seen.current
  useEffect(() => {
    seen.current = true
  }, [pathname])
  return (
    <div key={pathname} className={animate ? 'page-fade' : undefined}>
      {children}
    </div>
  )
}

function AppShell() {
  return (
    <>
      <Seo />
      <SiteFX />
      <Navigation />
      <main id="content">
      <PageFade>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/websites" element={<WebsitesPage />} />
        <Route path="/portfolio" element={<Navigate to="/websites" replace />} />
        <Route path="/refer" element={<ReferPage />} />
        <Route path="/refer/sent" element={<ReferSentPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/research/:paperId" element={<ResearchPaperPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </PageFade>
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppShell />
    </BrowserRouter>
  </StrictMode>,
)
