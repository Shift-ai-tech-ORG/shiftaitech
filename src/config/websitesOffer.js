/** Quick-win website build + host offer — shared by landing page & flyer. */

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

export const INCLUDED = [
  {
    title: 'Bespoke Design',
    desc: 'Built from scratch around your brand. No templates.',
  },
  {
    title: 'Mobile-First',
    desc: 'Designed for phones first — where most of your traffic lands.',
  },
  {
    title: 'Copywriting',
    desc: 'Clear, persuasive content that speaks to your customers.',
  },
  {
    title: 'SEO Foundations',
    desc: 'Google Business Profile, meta tags, and fast indexing.',
  },
  {
    title: 'Hosting Included',
    desc: 'Live hosting, SSL, and security updates in the package price.',
  },
  {
    title: 'Launch Support',
    desc: 'We get you live and stay available when you need help.',
  },
]

export const EXTRAS = [
  {
    title: 'Extra development',
    desc: 'Changes, new pages, and custom features billed hourly.',
    priceKey: 'hourly',
  },
  {
    title: 'E-Commerce CRM & API links',
    desc: 'Connect your store to CRM, payments, and stock systems.',
    badge: 'Extra',
  },
]

export const CASE_STUDIES = [
  {
    name: 'The Red Cow',
    url: 'https://theredcowchesterton.co.uk',
    sector: 'Hospitality',
  },
  {
    name: 'Eagle AI Labs',
    url: 'https://www.eagleailabs.com',
    sector: 'Technology',
  },
  {
    name: 'Scalpx Capital',
    url: 'https://www.scalpxcapital.com',
    sector: 'Finance',
  },
  {
    name: 'Shift AI Tech',
    url: 'https://shiftaitech.com',
    sector: 'AI Studio',
  },
  {
    name: 'Ready4Refurb',
    url: 'https://ready4refurb.com',
    sector: 'Property',
  },
  {
    name: 'Mixa Restaurant',
    url: 'https://www.mixarestaurant.com',
    sector: 'Hospitality',
  },
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
