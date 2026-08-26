export const keyMessages = [
  'We build AI products and solutions for all businesses.',
  'Manufacturing, accounting, risk, health & leisure, and learning & development are just some of the sectors in our portfolio of partners.',
  'Using AI tools makes us faster, leaner, and more responsive than 80% of other technology firms.',
  'Work with Shift AI Technology to save time, save money, and make more money.',
]

export const caseStudyCategories = [
  { id: 'aml', label: 'CRM / AI generated KYC & AML Reporting' },
  { id: 'lnd', label: 'AI Learning & Development Training Videos' },
  { id: 'biosense', label: 'Sports & AI Health Life Science' },
  { id: 'screener', label: 'AI Supplier & Customer Screener' },
  { id: 'churn', label: 'Predictive Customer Success & Retention' },
  { id: 'nutrition', label: 'AI Nutrition & Lifestyle Planning' },
]

export const portfolio = [
  {
    id: 'aml',
    iconKey: 'Shield',
    sector: 'Compliance & Finance',
    category: 'CRM / AI generated KYC & AML Reporting',
    partner: 'AML Intelligence Suite',
    short: 'AML reporting that cuts compliance from days to hours.',
    description:
      'Automated Anti-Money Laundering reporting platform for accountancy firms. Monitors transaction data, flags suspicious patterns with ML, and generates regulator-ready KYC & AML reports, reducing compliance workload from days to hours.',
    tags: ['AML Reporting', 'KYC Automation', 'Financial Crime Detection'],
    quote:
      'What used to take our compliance team three days now takes under two hours. The accuracy and audit trail are exceptional.',
    reference: 'Compliance Director, Mid-Sized Accountancy Practice',
    images: ['/case-studies/braid-aml.jpg'],
    featured: true,
  },
  {
    id: 'lnd',
    iconKey: 'GraduationCap',
    sector: 'Learning & Development',
    category: 'AI Learning & Development Training Videos',
    partner: 'AI Course Delivery Platform',
    short: 'Training courses scripted, narrated, and delivered by AI.',
    description:
      'End-to-end AI-powered content delivery for professional training providers. Courses scripted, narrated, and delivered by AI avatar instructors, scaling L&D without studio costs or scheduling constraints.',
    tags: ['AI Avatars', 'Course Delivery', 'Training Video Automation'],
    quote:
      'We went from concept to a fully accredited, AI-delivered course catalogue in eight weeks. The cost saving versus traditional production is significant.',
    reference: 'Head of Learning & Development, Professional Training Provider',
    images: [
      '/case-studies/deep-space-1.jpg',
      '/case-studies/deep-space-3.jpg',
      '/case-studies/deep-space-2.jpg',
    ],
    featured: true,
  },
  {
    id: 'biosense',
    iconKey: 'Activity',
    sector: 'Health & Life Science',
    category: 'Sports & AI Health Life Science',
    partner: 'BioSense',
    short: 'Personal health intelligence from blood panels and wearables.',
    description:
      'Full-stack personalised health intelligence platform built by Shift AI Tech. Users upload blood results, connect wearables (Oura, Whoop, Garmin, Apple Health), and complete daily check-ins. Claude AI analyses biomarkers, detects patterns, and delivers tiered health insights with weekly reports.',
    tags: ['Claude AI', 'Wearable Integration', 'Biomarker Analysis', 'Next.js'],
    quote:
      'From interactive POC to production. Auth, blood-panel analysis, billing, and wearable sync in one continuous health intelligence product.',
    reference: 'Shift AI Tech · Product build',
    link: { href: 'https://bio-sense.ai/', label: 'bio-sense.ai' },
    images: ['/case-studies/biosense.jpg'],
    featured: true,
  },
  {
    id: 'screener',
    iconKey: 'Search',
    sector: 'Risk & Procurement',
    category: 'AI Supplier & Customer Screener',
    partner: 'Supplier & Customer Intelligence Engine',
    description:
      'AI screening platform for onboarding suppliers and high-value customers. Ingests company filings, sanctions lists, adverse media, and transaction history, scoring risk in real time and flagging entities that need manual review before contracts are signed.',
    tags: ['Supplier Screening', 'Customer Due Diligence', 'Risk Scoring'],
    quote:
      'Onboarding reviews that took analysts half a day now complete in minutes, with a full audit trail for every decision.',
    reference: 'Head of Risk, Professional Services Firm',
  },
  {
    id: 'churn',
    iconKey: 'Users',
    sector: 'Customer Success & SaaS',
    category: 'Predictive Customer Success & Retention',
    partner: 'Churn Prediction & Retention Engine',
    description:
      'Predictive ML platform that identifies at-risk subscribers up to 60 days before churn, triggers personalised retention workflows, and surfaces the usage signals correlated with cancellation.',
    tags: ['Churn Prediction', 'Retention Automation', 'Predictive ML'],
    quote:
      'Churn rate dropped 23% in the first quarter after deployment. The early-warning signals have completely changed how our CS team prioritises.',
    reference: 'Head of Customer Success, B2B SaaS Platform',
  },
  {
    id: 'nutrition',
    iconKey: 'Utensils',
    sector: 'Health & Fitness',
    category: 'AI Nutrition & Lifestyle Planning',
    partner: 'Smart Kitchen & Nutrition Planner',
    description:
      'AI-powered kitchen inventory tracker and meal planning system. Tracks pantry stock, designs macro-balanced meal plans aligned to fitness goals, and generates budget-optimised shopping lists.',
    tags: ['Nutrition AI', 'Meal Planning', 'Fitness Optimisation'],
    quote:
      'Users report saving an average of £60 per month on groceries while hitting their nutrition targets more consistently than before.',
    reference: 'Founder, Fitness & Nutrition App',
  },
]
