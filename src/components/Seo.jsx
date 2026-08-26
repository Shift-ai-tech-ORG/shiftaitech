import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'https://shiftaitech.com'
const BRAND = 'Shift AI Tech'
const DEFAULT_DESC =
  'Shift AI Tech is a UK AI studio that builds custom AI models, agents, automation, full product builds, and websites that get found and convert.'

const ROUTES = {
  '/': {
    title: 'Shift AI Tech — We Build AI That Works',
    description: DEFAULT_DESC,
  },
  '/websites': {
    title: 'AI Websites That Rank & Convert | Shift AI Tech',
    description:
      'Shift AI Tech designs, builds, and hosts bespoke websites with SEO foundations. Fixed price. Fast delivery. United Kingdom.',
  },
  '/our-story': {
    title: 'Our Story — Shift AI Tech',
    description:
      'How Shift AI Tech funded Bitcoin prediction models, then cut the same rebuild by 82% with AI tooling. UK AI product studio.',
  },
  '/partners': {
    title: 'Partners — Shift AI Tech',
    description: 'Partner with Shift AI Tech on AI products, automation, and websites.',
  },
  '/team': {
    title: 'Team — Shift AI Tech',
    description: 'Meet the founder-led team behind Shift AI Tech, the UK AI product studio.',
  },
  '/blog': {
    title: 'Insights — Shift AI Tech',
    description: 'AI product insights from Shift AI Tech — custom models, automation, and shipping AI that works.',
  },
  '/onboarding': {
    title: 'Start a Project — Shift AI Tech',
    description: 'Onboard with Shift AI Tech to scope and ship custom AI, automation, or a new website.',
  },
}

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: BRAND,
  legalName: 'Shift AI Technology Ltd',
  alternateName: ['Shift AI Technology', 'ShiftAI Tech'],
  url: SITE,
  logo: `${SITE}/shift-logo-new.png`,
  email: 'partnerships@shiftaitech.com',
  description: DEFAULT_DESC,
  foundingDate: '2024',
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'partnerships@shiftaitech.com',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
  ],
  knowsAbout: [
    'Artificial intelligence',
    'Custom AI models',
    'AI agents',
    'RAG pipelines',
    'Business automation',
    'Product development',
    'Website design and SEO',
  ],
  slogan: 'We build AI products that give businesses their edge.',
}

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: BRAND,
  url: SITE,
  description: DEFAULT_DESC,
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en-GB',
}

const PROFESSIONAL_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#service`,
  name: BRAND,
  url: SITE,
  image: `${SITE}/shift-logo-new.png`,
  description: DEFAULT_DESC,
  priceRange: '££',
  areaServed: 'GB',
  provider: { '@id': `${SITE}/#organization` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Shift AI Tech services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom AI',
          description: 'Models, agents, and RAG pipelines trained on your data.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Product builds',
          description: 'Full-stack AI products from concept to live deployment.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automation',
          description: 'Workflows that replace slow, manual work.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website design and build',
          description: 'Bespoke websites with SEO foundations, hosting included.',
          url: `${SITE}/websites`,
        },
      },
    ],
  },
}

const FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Shift AI Tech do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shift AI Tech is a UK AI studio that builds custom AI models, agents, automation, full product builds, and websites for businesses that need a commercial edge.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Shift AI Tech the same as Shift Technology or other Shift AI companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Shift AI Tech is an independent UK studio at shiftaitech.com. It is not Shift Technology (insurance AI) or Shift AI at shiftai.co.uk (automotive tools).',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can Shift AI Tech ship a prototype?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical engagements move from brief to a working prototype in weeks, with useful output from day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Shift AI Tech build websites as well as AI products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Shift AI Tech designs, builds, and hosts bespoke websites with SEO foundations. See https://shiftaitech.com/websites for the fixed-price package.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Shift AI Tech based?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shift AI Tech is based in the United Kingdom and works with clients directly as a founder-led studio.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start a project with Shift AI Tech?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Email partnerships@shiftaitech.com or jack@shiftaitech.com, or start at https://shiftaitech.com/onboarding.',
      },
    },
  ],
}

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
    const page = ROUTES[path] || {
      title: `${BRAND} — AI Studio UK`,
      description: DEFAULT_DESC,
    }
    const url = `${SITE}${path === '/' ? '/' : path}`

    document.title = page.title
    upsertMeta('name', 'description', page.description)
    upsertMeta('name', 'author', BRAND)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', BRAND)
    upsertMeta('property', 'og:title', page.title)
    upsertMeta('property', 'og:description', page.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${SITE}/shift-logo-new.png`)
    upsertMeta('property', 'og:locale', 'en_GB')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', page.title)
    upsertMeta('name', 'twitter:description', page.description)
    upsertMeta('name', 'twitter:image', `${SITE}/shift-logo-new.png`)
    upsertLink('canonical', url)

    const webpage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
      inLanguage: 'en-GB',
    }

    upsertJsonLd('ld-organization', ORGANIZATION)
    upsertJsonLd('ld-website', WEBSITE)
    upsertJsonLd('ld-service', PROFESSIONAL_SERVICE)
    upsertJsonLd('ld-faq', FAQ)
    upsertJsonLd('ld-webpage', webpage)
  }, [pathname])

  return null
}
