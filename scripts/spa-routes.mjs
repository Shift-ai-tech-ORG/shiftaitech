#!/usr/bin/env node
/**
 * Copy the built index shell into each public route (HTTP 200 for crawlers)
 * and swap in route-specific title, description, canonical, and factual copy.
 * The article is hidden once JavaScript runs.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { COMPLETED_SITES, WEBSITE_FAQS } from '../src/config/websitesOffer.js'

const dist = join(process.cwd(), 'dist')
const indexPath = join(dist, 'index.html')
const SITE = 'https://shiftaitech.com'

const routes = {
  portfolio: {
    title: 'Portfolio: websites and products | Shift AI',
    description: 'The websites and products we have built, each live on its own domain.',
    article: `
      <h1>Everything we’ve built, live on the web.</h1>
      <p>The websites and products we have built, each live on its own domain.</p>
      <h2>Every site and product we’ve shipped</h2>
      <ul>
        ${COMPLETED_SITES.map((site) => `<li><a href="${site.url}">${site.name}</a>, ${site.sector}</li>`).join('\n        ')}
      </ul>
      <p><a href="${SITE}/portfolio">https://shiftaitech.com/portfolio</a></p>
    `,
  },
  websites: {
    title: 'AI Websites That Rank &amp; Convert | Shift AI Tech',
    description:
      'Brochure websites from £500, AED 2,500, or $650. Shift AI Tech designs, builds, and hosts them with SEO foundations. Extra work from £50/hr.',
    article: `
      <h1>Websites that get found and convert.</h1>
      <p>Design, build, and launch. Fixed price. Fast delivery. United Kingdom.</p>
      <p>Brochure website plus hosting: £500, AED 2,500, or $650. Extra work at £50 per hour.</p>
      <p>Included: bespoke design, mobile-first layout, copywriting, and SEO foundations. eCommerce and AI business modules are available after a free consultation.</p>
      ${WEBSITE_FAQS.map((item) => `<h2>${item.q}</h2>\n      <p>${item.a}</p>`).join('\n      ')}
      <p><a href="${SITE}/websites">https://shiftaitech.com/websites</a></p>
    `,
  },
  'our-story': {
    title: 'Our Story · Shift AI Tech',
    description:
      'How Shift AI Tech funded Bitcoin prediction models, then cut the same rebuild by 82% with AI tooling. UK AI product studio.',
    article: `
      <h1>We built it the expensive way first.</h1>
      <p>Then AI tools cut the same build by 82%. That lesson is Shift.</p>
      <p>In 2024 we funded advanced neural models to predict Bitcoin price moves. Over $650,000 across build, training, and infrastructure.</p>
      <p>Those models helped create Infinite Point Capital, a U.S. regulated Bitcoin fund. Targeted AUM of $100 to $300 million.</p>
      <p>By 2026 the same systems were rebuilt with AI-assisted tooling. An 82% cut in development cost.</p>
      <p><a href="${SITE}/our-story">https://shiftaitech.com/our-story</a></p>
    `,
  },
  refer: {
    title: 'Refer a Business to Shift and Earn 10% · Shift AI Tech',
    description:
      'Refer a business to Shift AI Tech and earn 10% of the project price, plus 10% of every monthly fee, paid within 7 days of the client paying.',
    article: `
      <h1>Refer a business to Shift and earn 10% of what they spend</h1>
      <p>Pass on a business that needs a website, wants to come up first on Google, or needs a CRM or AI tool. Shift calls them, quotes and builds. You earn 10% of the project price, paid within 7 days of the business paying Shift, and 10% of every monthly fee for as long as they stay a client. No cap.</p>
      <p>Send a business at <a href="${SITE}/refer">https://shiftaitech.com/refer</a> or email partnerships@shiftaitech.com.</p>
    `,
  },
  partners: {
    title: 'Specialist &amp; Infrastructure Partners · Shift AI Tech',
    description:
      'Shift works with specialist partners including RAMDVG and AP Creative Co, and infrastructure programmes including AWS Activate and NVIDIA Inception.',
    article: `
      <h1>Specialists and infrastructure.</h1>
      <p>Specialist partners: RAMDVG, a tokenisation asset exchange, and Anthony Parry of AP Creative Co, for social, content, design, print, web, and events.</p>
      <p>Infrastructure: AWS Activate and the NVIDIA Inception programme.</p>
      <p><a href="${SITE}/partners">https://shiftaitech.com/partners</a></p>
    `,
  },
  team: {
    title: 'Team · Shift AI Tech',
    description:
      'Meet the founders of Shift AI Tech: Jack Rockell and Darren Bishop, directors of Shift AI Technology Ltd.',
    article: `
      <h1>The people behind Shift.</h1>
      <p>Jack Rockell, co-founder and director, technology. Developer responsible for Shift’s products, systems, and technical delivery. jack@shiftaitech.com</p>
      <p>Darren Bishop, co-founder and director, business and partnerships. darren@shiftaitech.com</p>
      <p>Shift AI Technology Ltd, Companies House 17159725, Southminster, Essex.</p>
      <p><a href="${SITE}/team">https://shiftaitech.com/team</a></p>
    `,
  },
  blog: {
    title: 'Our Story · Shift AI Tech',
    description:
      'How Shift AI Tech funded Bitcoin prediction models, then cut the same rebuild by 82% with AI tooling. UK AI product studio.',
    article: `
      <h1>Our story</h1>
      <p>Published writing lives on the Our Story page.</p>
      <p><a href="${SITE}/our-story">https://shiftaitech.com/our-story</a></p>
    `,
  },
  onboarding: {
    title: 'Start a Project · Shift AI Tech',
    description: 'Onboard with Shift AI Tech to scope and ship custom AI, automation, or a new website.',
    article: `
      <h1>Start a project with Shift AI Tech.</h1>
      <p>Email partnerships@shiftaitech.com or jack@shiftaitech.com.</p>
      <p><a href="${SITE}/onboarding">https://shiftaitech.com/onboarding</a></p>
    `,
  },
  privacy: {
    title: 'Privacy Notice · Shift AI Tech',
    description:
      'How Shift AI Technology Ltd collects, uses and protects personal data sent through shiftaitech.com, and your rights.',
    article: `
      <h1>Privacy notice</h1>
      <p>Last updated November 2026.</p>
      <p>Shift AI Technology Ltd (company number 17159725, registered in England and Wales) is the controller of personal data sent through shiftaitech.com. Contact partnerships@shiftaitech.com.</p>
      <p>We use details from our contact, onboarding and referral forms only to reply, scope work, contact referred businesses and pay referral commission. Processors: GitHub Pages (hosting, US), Amazon Web Services (form handling, London) and Google Workspace (email).</p>
      <p>You can ask for access, correction, deletion, restriction or portability of your data, or object to its use. You can complain to the ICO at ico.org.uk or 0303 123 1113.</p>
      <p><a href="${SITE}/privacy">https://shiftaitech.com/privacy</a></p>
    `,
  },
  'research/research-paper-3': {
    title: 'The AI Value Shift · Shift AI Tech',
    description:
      'How AI is driving measurable business impact, compiled by Shift AI Tech from BCG, McKinsey, Deloitte, and PwC.',
    article: `
      <h1>The AI Value Shift</h1>
      <p>How artificial intelligence is driving measurable business impact. A Shift AI research note drawing on Boston Consulting Group, McKinsey, Deloitte, and PwC. These figures are from those firms, not Shift client results.</p>
      <ul>
        <li>74% of organisations report a measurable ROI from AI within the first year (McKinsey).</li>
        <li>66% of organisations report measurable productivity and efficiency gains (Deloitte).</li>
        <li>3 times greater cost reductions among AI-leading companies (BCG).</li>
        <li>Up to 90% cost reduction in customer service operations via AI automation (BCG).</li>
        <li>20 to 30% cost savings in software engineering and maintenance (BCG).</li>
        <li>34% of firms are using AI to transform core business processes (Deloitte).</li>
        <li>40% of organisations cite cost reduction as a primary benefit (Deloitte).</li>
        <li>27% versus 9% revenue-per-employee growth in AI-exposed industries versus others (PwC).</li>
      </ul>
      <p>These figures are from BCG, McKinsey, Deloitte, and PwC. They are not Shift client results.</p>
      <p><a href="${SITE}/our-story">Our story</a></p>
      <p><a href="${SITE}/research/research-paper-3">https://shiftaitech.com/research/research-paper-3</a></p>
    `,
  },
}

if (!existsSync(indexPath)) {
  console.error('postbuild: dist/index.html missing — run vite build first')
  process.exit(1)
}

const shell = readFileSync(indexPath, 'utf8')

const CRUMBS = {
  portfolio: 'Portfolio',
  websites: 'Websites',
  'our-story': 'Our Story',
  partners: 'Partners',
  refer: 'Refer and Earn',
  team: 'Team',
  onboarding: 'Start a project',
  privacy: 'Privacy notice',
  'research/research-paper-3': 'The AI Value Shift',
}

const RESEARCH_CITATIONS = [
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
]

function jsonLd(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`
}

function withoutHomeOnlyNodes(html) {
  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    (full, json) => {
      try {
        const data = JSON.parse(json)
        if (!Array.isArray(data['@graph'])) return full
        const next = data['@graph'].filter(
          (node) =>
            node['@type'] !== 'FAQPage' &&
            node['@type'] !== 'WebPage' &&
            node['@type'] !== 'ItemList',
        )
        if (next.length === data['@graph'].length) return full
        data['@graph'] = next
        return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`
      } catch {
        return full
      }
    },
  )
}

function routeLd(route, page) {
  const url = `${SITE}/${route}`
  const name = page.title.replace(/&amp;/g, '&')
  const blocks = [
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name,
      description: page.description,
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
      inLanguage: 'en-GB',
    }),
  ]

  if (CRUMBS[route]) {
    blocks.push(
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: CRUMBS[route], item: url },
        ],
      }),
    )
  }

  if (route === 'websites') {
    blocks.push(
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: WEBSITE_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }),
    )
    blocks.push(
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${url}#portfolio`,
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
      }),
    )
  }

  if (route === 'research/research-paper-3') {
    blocks.push(
      jsonLd({
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
        citation: RESEARCH_CITATIONS,
        inLanguage: 'en-GB',
      }),
    )
  }

  return blocks.join('\n    ')
}

function apply(html, route, page) {
  const url = `${SITE}/${route}`
  return withoutHomeOnlyNodes(html)
    .replace('</head>', `    ${routeLd(route, page)}\n  </head>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${page.description}$2`,
    )
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${page.title}$2`)
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${page.description}$2`,
    )
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${page.title}$2`)
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${page.description}$2`,
    )
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(
      /<article id="static-facts">[\s\S]*?<\/article>/,
      `<article id="static-facts">${page.article}</article>`,
    )
}

for (const [route, page] of Object.entries(routes)) {
  const html = apply(shell, route, page)
  const dir = join(dist, route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  // Vercel cleanUrls serves /route from route.html before the SPA rewrite.
  writeFileSync(join(dist, `${route}.html`), html)
  console.log(`postbuild: ${route}.html`)
}
