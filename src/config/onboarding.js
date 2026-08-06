const INDUSTRIES = [
  'Accountant', 'Law Firm', 'Estate Agent', 'Recruitment Agency', 'Dental Practice',
  'Medical Clinic', 'Aesthetics Clinic', 'Gym', 'Fitness Studio', 'Construction',
  'Trades', 'Architecture', 'Insurance', 'Financial Services', 'Marketing Agency',
  'Property', 'Education', 'Hospitality', 'Retail', 'Other',
]

const TEAM_BANDS = ['0', '1', '2-5', '6-10', '10+']

export const onboardingSections = [
  {
    id: 'overview',
    title: 'Business Overview',
    subtitle: 'Confirm your details and tell us a little about the business.',
    fields: [
      { id: 'name', label: 'Your name', type: 'text', placeholder: 'Full name' },
      { id: 'business', label: 'Business name', type: 'text', placeholder: 'Company name' },
      { id: 'email', label: 'Email', type: 'text', placeholder: 'you@company.com' },
      { id: 'phone', label: 'Phone', type: 'text', placeholder: '+44...' },
      { id: 'industry', label: 'Industry', type: 'radio', options: INDUSTRIES },
      { id: 'employees', label: 'Number of employees', type: 'radio', options: ['1', '2-5', '6-10', '11-25', '26-50', '50+'] },
      { id: 'revenue', label: 'Annual revenue', type: 'radio', options: ['Under £100k', '£100k-£250k', '£250k-£500k', '£500k-£1m', '£1m-£5m', '£5m+'] },
    ],
  },
  {
    id: 'stack',
    title: 'Current Software Stack',
    subtitle: 'Which systems do you currently use?',
    fields: [
      {
        id: 'software',
        label: 'Systems in use',
        type: 'checkbox',
        other: true,
        options: ['HubSpot', 'Salesforce', 'Xero', 'QuickBooks', 'Gmail', 'Outlook', 'Slack', 'Teams', 'Calendly', 'Zapier', 'Make', 'Google Drive', 'None'],
      },
    ],
  },
  {
    id: 'leads',
    title: 'Lead Handling',
    fields: [
      { id: 'leadSources', label: 'How do new customers find you?', type: 'checkbox', other: true, options: ['Website', 'Phone', 'Google Search', 'Referrals', 'Social Media', 'Existing Customers'] },
      { id: 'leadTracking', label: 'How are leads tracked?', type: 'checkbox', other: true, options: ['CRM', 'Spreadsheet', 'Email Inbox', 'WhatsApp', 'Not Tracked'] },
      { id: 'leadsMissed', label: 'Do you believe leads are being missed?', type: 'radio', options: ['Yes', 'No', 'Unsure'] },
    ],
  },
  {
    id: 'team',
    title: 'Team Structure',
    fields: [
      { id: 'adminStaff', label: 'Admin staff', type: 'radio', options: TEAM_BANDS },
      { id: 'salesStaff', label: 'Sales staff', type: 'radio', options: TEAM_BANDS },
    ],
  },
  {
    id: 'automation',
    title: 'Automation Readiness',
    fields: [
      { id: 'usesAutomation', label: 'Do you use automation today?', type: 'radio', options: ['Yes', 'No', 'Unsure'] },
      { id: 'automatedProcesses', label: 'Automated processes', type: 'checkbox', options: ['Lead Capture', 'Follow-Up', 'Booking', 'Invoicing', 'Reporting', 'None'] },
    ],
  },
  {
    id: 'bottlenecks',
    title: 'Operational Bottlenecks',
    subtitle: 'Select your top three time drains.',
    fields: [
      { id: 'bottlenecks', label: 'Top bottlenecks', type: 'checkbox', max: 3, other: true, options: ['Lead Management', 'Follow-Up', 'Scheduling', 'Reporting', 'Data Entry', 'Client Communication', 'Invoicing', 'Marketing'] },
    ],
  },
  {
    id: 'priority',
    title: 'Priority Outcome',
    fields: [
      {
        id: 'priorityOutcome',
        label: 'If Shift AI Tech could fix ONE thing in 90 days, what would matter most?',
        type: 'textarea',
        maxLength: 500,
        placeholder: 'Tell us the single change that would matter most…',
      },
    ],
  },
]
