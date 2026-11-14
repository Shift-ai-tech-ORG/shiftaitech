import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { COMPLETED_SITES, WEBSITE_FAQS } from '../config/websitesOffer'

const SITE = 'https://shiftaitech.com'
const BRAND = 'Shift AI Tech'
const DEFAULT_DESC =
  'Shift AI Tech is a UK AI studio that builds custom AI models, agents, automation, full product builds, and websites that get found and convert.'

const ROUTES = {
  '/': {
    title: 'Shift AI · The AI Shape-Shifters',
    description:
      'Shift AI is a technology studio that turns ambitious briefs into working AI products, automation, and digital products. United Kingdom.',
  },
  '/portfolio': {
    title: 'Portfolio: websites and products | Shift AI',
    description: 'The websites and products we have built, each live on its own domain.',
  },
  '/websites': {
    title: 'AI Websites That Rank & Convert | Shift AI Tech',
    description:
      'Brochure websites from £500, AED 2,500, or $650. Shift AI Tech designs, builds, and hosts them with SEO foundations. Extra work from £50/hr.',
  },
  '/our-story': {
    title: 'Our Story · Shift AI Tech',
    description:
      'How Shift AI Tech funded Bitcoin prediction models, then cut the same rebuild by 82% with AI tooling. UK AI product studio.',
  },
  '/refer': {
    title: 'Refer a Business to Shift and Earn 10% · Shift AI Tech',
    description:
      'Refer a business to Shift AI Tech and earn 10% of the project price, plus 10% of every monthly fee, paid within 7 days of the client paying.',
  },
  '/partners': {
    title: 'Specialist & Infrastructure Partners · Shift AI Tech',
    description:
      'Shift works with specialist partners including RAMDVG and AP Creative Co, and infrastructure programmes including AWS Activate and NVIDIA Inception.',
  },
  '/team': {
    title: 'Team · Shift AI Tech',
    description:
      'Meet the founders of Shift AI Tech: Jack Rockell and Darren Bishop, directors of Shift AI Technology Ltd.',
  },
  '/blog': {
    title: 'Our Story · Shift AI Tech',
    description:
      'How Shift AI Tech funded Bitcoin prediction models, then cut the same rebuild by 82% with AI tooling. UK AI product studio.',
  },
  '/onboarding': {
    title: 'Start a Project · Shift AI Tech',
    description: 'Onboard with Shift AI Tech to scope and ship custom AI, automation, or a new website.',
  },
  '/privacy': {
    title: 'Privacy Notice · Shift AI Tech',
    description:
      'How Shift AI Technology Ltd collects, uses and protects personal data sent through shiftaitech.com, and your rights.',
  },
  '/research/research-paper-3': {
    title: 'The AI Value Shift · Shift AI Tech',
    description:
      'How AI is driving measurable business impact, compiled by Shift AI Tech from BCG, McKinsey, Deloitte, and PwC.',
  },
}

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: BRAND,
  legalName: 'Shift AI Technology Ltd',
  alternateName: ['Shift AI Technology', 'ShiftAI Tech', 'Shift AI Tech UK'],
  url: SITE,
  logo: `${SITE}/shift-logo-new.png`,
  email: 'partnerships@shiftaitech.com',
  description:
    'Shift AI Tech (Shift AI Technology Ltd, company 17159725) is a UK AI studio that builds custom AI models, agents, RAG pipelines, automation, full product builds, and websites for British businesses. Shipped work includes BioSense and Deep Space. In 2024 the first models were funded with over $650,000. The same systems were later rebuilt with an 82% cut in development cost. Not Shift Technology (insurance AI), not Shift AI at shiftai.co.uk (automotive), not SHIFT AI LTD of Newcastle (17222733), and not other unrelated Shift AI brands.',
  foundingDate: '2024',
  identifier: {
    '@type': 'PropertyValue',
    name: 'Companies House number',
    value: '17159725',
    url: 'https://find-and-update.company-information.service.gov.uk/company/17159725',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit 14, The Maltings Industrial Estate, Hall Road',
    addressLocality: 'Southminster',
    addressRegion: 'Essex',
    postalCode: 'CM0 7EQ',
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
  founder: [
    {
      '@type': 'Person',
      name: 'Jack Rockell',
      jobTitle: 'CTO',
      email: 'jack@shiftaitech.com',
      sameAs: 'https://www.linkedin.com/in/jack-rockell-841482267/',
    },
    {
      '@type': 'Person',
      name: 'Darren Bishop',
      jobTitle: 'Head of Operations',
      email: 'darren@shiftaitech.com',
      sameAs: 'https://www.linkedin.com/in/dwbishop/',
    },
  ],
  sameAs: [
    'https://find-and-update.company-information.service.gov.uk/company/17159725',
    'https://www.linkedin.com/in/jack-rockell-841482267/',
    'https://www.linkedin.com/in/dwbishop/',
  ],
  knowsAbout: [
    'Artificial intelligence',
    'Custom AI models',
    'AI agents',
    'RAG pipelines',
    'Business automation',
    'Product development',
    'Website design and SEO',
    'UK SME AI adoption',
  ],
  slogan: 'UK custom AI products: models, RAG and agents for British businesses.',
  disambiguatingDescription:
    'Independent UK AI product studio at shiftaitech.com. Distinct from Shift Technology, shiftai.co.uk, and other Shift AI brands.',
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
        url: `${SITE}/#custom-ai`,
        itemOffered: {
          '@type': 'Service',
          name: 'Custom AI',
          description: 'Models, agents, and RAG pipelines trained on your data.',
        },
      },
      {
        '@type': 'Offer',
        url: `${SITE}/#product-builds`,
        itemOffered: {
          '@type': 'Service',
          name: 'Product builds',
          description: 'Full-stack AI products from concept to live deployment.',
        },
      },
      {
        '@type': 'Offer',
        url: `${SITE}/#automation`,
        itemOffered: {
          '@type': 'Service',
          name: 'Automation',
          description: 'Workflows that replace slow, manual work.',
        },
      },
      {
        '@type': 'Offer',
        url: `${SITE}/#strategy`,
        itemOffered: {
          '@type': 'Service',
          name: 'Strategy',
          description: 'Where AI pays off. Scoped, priced, and clear before you commit.',
        },
      },
      {
        '@type': 'Offer',
        name: 'Brochure website + hosting',
        price: '500',
        priceCurrency: 'GBP',
        url: `${SITE}/websites`,
        description:
          'Fixed-price brochure website: design, build, launch, and host. Also quoted at AED 2,500 and $650. Extra development from £50/hr. eCommerce and AI modules by free consultation.',
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
      name: 'Who founded Shift AI Tech?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jack Rockell and Darren Bishop. Jack leads technology. Darren leads business and partnerships. The company is Shift AI Technology Ltd, number 17159725.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you the same as Shift Technology or other Shift AI brands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We are Shift AI Tech at shiftaitech.com, an independent UK studio. Not Shift Technology (insurance AI) and not Shift AI at shiftai.co.uk.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Shift based?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Southminster, Essex, United Kingdom. Founder-led. You work with the people who build the product.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which programmes is Shift in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AWS Activate, and the NVIDIA Inception programme.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can you ship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'From brief to a working prototype in weeks, with useful output from day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you build websites as well as AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bespoke design, build, host, and SEO foundations. Fixed-price packages on our Websites page.',
      },
    },
  ],
}

const WEBSITES_PORTFOLIO = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE}/websites#portfolio`,
  name: 'All sites completed.',
  itemListElement: COMPLETED_SITES.map((site, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
      description: site.sector,
    },
  })),
}

const WEBSITES_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE}/websites#faq`,
  mainEntity: WEBSITE_FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const WORK = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE}/#work`,
  name: 'Selected Shift AI Tech projects',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'CreativeWork',
        name: 'Deep Space',
        description: 'Training courses scripted, narrated, and delivered by AI.',
        creator: { '@id': `${SITE}/#organization` },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'WebApplication',
        name: 'BioSense',
        url: 'https://bio-sense.ai/',
        description: 'Personal health intelligence from blood panels and wearables.',
        creator: { '@id': `${SITE}/#organization` },
      },
    },
  ],
}

const CRUMBS = {
  '/portfolio': 'Portfolio',
  '/websites': 'Websites',
  '/our-story': 'Our Story',
  '/partners': 'Partners',
  '/refer': 'Refer and Earn',
  '/team': 'Team',
  '/onboarding': 'Start a project',
  '/privacy': 'Privacy notice',
  '/research/research-paper-3': 'The AI Value Shift',
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

function removeJsonLd(id) {
  document.getElementById(id)?.remove()
}

function stripStaticFaq() {
  document.querySelectorAll('script[type="application/ld+json"]:not([id])').forEach((el) => {
    try {
      const data = JSON.parse(el.textContent)
      if (data['@type'] === 'FAQPage' || data['@type'] === 'ItemList') {
        el.remove()
        return
      }
      if (!Array.isArray(data['@graph'])) return
      const next = data['@graph'].filter((node) => node['@type'] !== 'FAQPage')
      if (next.length === data['@graph'].length) return
      data['@graph'] = next
      el.textContent = JSON.stringify(data)
    } catch {
      /* leave the shell untouched if it is not JSON */
    }
  })
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
    const known = Boolean(ROUTES[path])
    const page = ROUTES[path] || {
      title: 'Page not found · Shift AI Tech',
      description: 'That page is not on shiftaitech.com.',
    }
    const url = `${SITE}${path === '/' ? '/' : path}`

    stripStaticFaq()

    document.title = page.title
    upsertMeta('name', 'description', page.description)
    upsertMeta('name', 'author', BRAND)
    upsertMeta(
      'name',
      'robots',
      known
        ? 'index, follow, max-image-preview:large, max-snippet:-1'
        : 'noindex, follow',
    )
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', BRAND)
    upsertMeta('property', 'og:title', page.title)
    upsertMeta('property', 'og:description', page.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${SITE}/og.jpg`)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:alt', 'Shift AI Tech. We build AI that gives businesses their edge.')
    upsertMeta('property', 'og:locale', 'en_GB')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', page.title)
    upsertMeta('name', 'twitter:description', page.description)
    upsertMeta('name', 'twitter:image', `${SITE}/og.jpg`)
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
    upsertJsonLd('ld-webpage', webpage)

    if (path === '/') {
      upsertJsonLd('ld-faq', FAQ)
      upsertJsonLd('ld-work', WORK)
      removeJsonLd('ld-portfolio')
    } else if (path === '/websites') {
      upsertJsonLd('ld-faq', WEBSITES_FAQ)
      upsertJsonLd('ld-portfolio', WEBSITES_PORTFOLIO)
      removeJsonLd('ld-work')
    } else {
      removeJsonLd('ld-faq')
      removeJsonLd('ld-work')
      removeJsonLd('ld-portfolio')
    }

    if (CRUMBS[path]) {
      upsertJsonLd('ld-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: CRUMBS[path], item: url },
        ],
      })
    } else {
      removeJsonLd('ld-breadcrumb')
    }

    if (path === '/research/research-paper-3') {
      upsertJsonLd('ld-article', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: 'The AI Value Shift',
        description: page.description,
        author: { '@id': `${SITE}/#organization` },
        publisher: { '@id': `${SITE}/#organization` },
        mainEntityOfPage: url,
        isPartOf: { '@id': `${SITE}/#website` },
        about:
          'Third-party findings from BCG, McKinsey, Deloitte, and PwC. These figures are not Shift client results.',
        citation: [
          {
            '@type': 'CreativeWork',
            name: 'The Widening AI Value Gap (2025)',
            author: 'Boston Consulting Group',
            url: 'https://www.bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap',
          },
          {
            '@type': 'CreativeWork',
            name: 'The State of AI (2025)',
            author: 'McKinsey & Company',
            url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
          },
          {
            '@type': 'CreativeWork',
            name: 'State of AI in the Enterprise (2026)',
            author: 'Deloitte',
            url: 'https://www.deloitte.com/dk/en/issues/generative-ai/state-of-ai-in-enterprise.html',
          },
          {
            '@type': 'CreativeWork',
            name: 'Global AI Jobs Barometer (2025)',
            author: 'PwC',
            url: 'https://www.pwc.com/gx/en/news-room/press-releases/2025/ai-linked-to-a-fourfold-increase-in-productivity-growth.html',
          },
        ],
        inLanguage: 'en-GB',
      })
    } else {
      removeJsonLd('ld-article')
    }
  }, [pathname])

  return null
}
