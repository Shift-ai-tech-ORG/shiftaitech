/** Quick-win website build + host offer: shared by landing page & flyer. */

export const PACKAGE_PRICE = {
  gbp: { amount: 500, label: '£500', currency: 'GBP' },
  aed: { amount: 2500, label: 'AED 2,500', currency: 'AED' },
  usd: { amount: 650, label: '$650', currency: 'USD' },
}

export const HOURLY_RATE = {
  gbp: { amount: 50, label: '£50/hr', currency: 'GBP' },
  aed: { amount: 250, label: 'AED 250/hr', currency: 'AED' },
  usd: { amount: 65, label: '$65/hr', currency: 'USD' },
}

/** Fixed package = brochure / get-started sites */
export const PACKAGE_LABEL = 'Brochure website + hosting'

export const PACKAGE_NOTE =
  'Fixed package pricing is for brochure websites that get a business up and running online. eCommerce and AI business modules are also an area of expertise and are available subject to a free consultation.'

export const CONSULTATION_NOTE =
  'eCommerce builds and AI business modules: free consultation. Scoped and priced after we understand the brief.'

/** Visible copy and FAQ schema must stay identical, character for character. */
export const WEBSITE_FAQS = [
  {
    q: 'How much is a brochure website?',
    a: 'A brochure website with design, build, launch, and hosting is £500, AED 2,500, or $650.',
  },
  {
    q: 'What does the brochure package include?',
    a: 'Bespoke design, a mobile-first layout, copywriting, SEO foundations, hosting with SSL and security updates, and launch support.',
  },
  {
    q: 'What does extra development cost?',
    a: 'Extra development is £50/hr, AED 250/hr, or $65/hr.',
  },
  {
    q: 'Do you build online stores and AI modules?',
    a: 'Yes. eCommerce and AI modules start with a free consultation, then scoped pricing.',
  },
  {
    q: 'How do I start a website project?',
    a: 'Use the form on this page, or email partnerships@shiftaitech.com. We usually reply within a day.',
  },
]

export const INCLUDED = [
  {
    title: 'Bespoke design',
    desc: 'Built from scratch around your brand. No templates.',
  },
  {
    title: 'Mobile first',
    desc: 'Designed for phones first, where most of your traffic lands.',
  },
  {
    title: 'Copywriting',
    desc: 'Clear, persuasive content that speaks to your customers.',
  },
  {
    title: 'SEO foundations',
    desc: 'Google Business Profile, meta tags, and fast indexing.',
  },
  {
    title: 'Hosting included',
    desc: 'Live hosting, SSL, and security updates in the package price.',
  },
  {
    title: 'Launch support',
    desc: 'We get you live and stay available when you need help.',
  },
]

export const EXTRAS = [
  {
    title: 'eCommerce & AI modules',
    desc: 'Stores, CRM/API links, and AI business modules. Free consultation first, then scoped pricing.',
    badge: 'Free consult',
  },
  {
    title: 'Extra development',
    desc: 'Changes, new pages, and custom features billed hourly.',
    priceKey: 'hourly',
  },
]

/** Featured sites, the primary showcase */
export const CASE_STUDIES = [
  {
    name: 'The Red Cow',
    url: 'https://theredcowchesterton.co.uk',
    sector: 'Hospitality',
    image: '/websites/red-cow.jpg',
  },
  {
    name: 'A&D Roofing & Construction',
    url: 'https://aanddroofingsolutions.com',
    sector: 'Trades',
    image: '/websites/ad-roofing.jpg',
  },
  {
    name: 'Ready4Refurb',
    url: 'https://ready4refurb.com',
    sector: 'Property',
    image: '/websites/ready4refurb.jpg',
  },
  {
    name: 'Mixa Restaurant',
    url: 'https://www.mixarestaurant.com',
    sector: 'Hospitality',
    image: '/websites/mixa.jpg',
  },
]

/**
 * Full completed / shipped list for sales confidence.
 * Featured sites appear again here so the bottom list reads as a full portfolio.
 */
export const COMPLETED_SITES = [
  { name: 'The Red Cow', url: 'https://theredcowchesterton.co.uk', sector: 'Hospitality' },
  { name: 'Mixa Restaurant', url: 'https://www.mixarestaurant.com', sector: 'Hospitality' },
  { name: 'Ready4Refurb', url: 'https://ready4refurb.com', sector: 'Property' },
  { name: 'A&D Roofing & Construction', url: 'https://aanddroofingsolutions.com', sector: 'Trades' },
  { name: 'LJ Plumbing & Heating', url: 'https://ljplumbing.co.uk', sector: 'Trades' },
  { name: 'Syd Wells Gambian Project', url: 'https://sydwellscharity.com', sector: 'Charity' },
  { name: 'AP Creative Co', url: 'https://apcreativeco.co.uk', sector: 'Creative' },
  { name: 'BioSense', url: 'https://bio-sense.ai', sector: 'Health' },
  { name: 'Braid', url: 'https://usebraid.ai', sector: 'Compliance' },
  { name: 'Ground Six', url: 'https://groundsix.co.uk', sector: 'Building & landscaping' },
]

/** Sales partners and their referral codes. Add new partners here. */
export const REFERRAL_PARTNERS = {
  LEE: { code: 'LEE', name: 'Lee', region: 'Network' },
  MARTIN: { code: 'MARTIN', name: 'Martin', region: 'Network' },
  BAHRAIN: { code: 'BAHRAIN', name: 'Bahrain Partner', region: 'GCC' },
}

export const WEBSITES_PATH = '/websites'
export const FLYER_PATH = '/flyer/websites.html'
export const CONTACT_EMAIL = 'partnerships@shiftaitech.com'
export const SITE_URL = 'https://shiftaitech.com'
