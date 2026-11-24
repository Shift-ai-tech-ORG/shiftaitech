import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/martian-mono/400.css'
import '@fontsource/martian-mono/600.css'
import { FORMS_ENDPOINT } from './config/site'
import { getActiveReferral } from './lib/referral'
import './ReferPage.css'

const RATE = 0.1

/* What Shift builds, with the line an owner says that points to each. */
const BUILDS = [
  {
    code: 'W',
    title: 'Websites for trades',
    body: 'Roofers, builders, plumbers, gas engineers, bathroom fitters and suppliers. Each site is built around photos of their own jobs, with the phone number the easiest thing on the page to find.',
    heard: 'My website’s old and I never get anything from it.',
  },
  {
    code: 'L',
    title: 'Websites for local businesses',
    body: 'Pubs, restaurants, barbers, dog walkers. Menus and prices go on the page as real text, with booking, call and WhatsApp buttons on every screen. From £500 including hosting.',
    heard: 'People keep messaging me to ask how much.',
  },
  {
    code: 'S',
    title: 'Getting found on Google and by AI',
    body: 'Google Business Profile and Bing Places set up properly, plus the work that gets a business named when someone asks ChatGPT or Google for a recommendation in their town.',
    heard: 'When you search for what I do round here, my competitor comes up.',
  },
  {
    code: 'C',
    title: 'CRMs and back-office systems',
    body: 'A system built around how the business already runs, joined up to the tools it can’t drop, such as Xero, Stripe, Outlook and WhatsApp. Built for estate agents, recruiters, accountants, brokers and multi-site groups.',
    heard: 'Our leads are in WhatsApp, my inbox and three spreadsheets.',
  },
  {
    code: 'A',
    title: 'AI tools for one slow job',
    body: 'Software that takes a job that eats a day a week and does it in minutes, built around the way the business already works.',
    heard: 'This job takes someone a day every week.',
  },
]

const PRESETS = [
  { label: '£500 website', project: 500, monthly: 0 },
  { label: 'Example: £6,000 system, £400 a month', project: 6000, monthly: 400 },
]

function formatGBP(value) {
  const whole = Number.isInteger(value)
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(value)
}

function toAmount(raw) {
  const digits = String(raw).replace(/[^0-9]/g, '').slice(0, 7)
  return digits ? Number(digits) : 0
}

function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}

function RateCard() {
  const [project, setProject] = useState(500)
  const [monthly, setMonthly] = useState(0)
  const projectCut = project * RATE
  const monthlyCut = monthly * RATE
  const firstYear = projectCut + monthlyCut * 12

  return (
    <section className="refer-card" aria-labelledby="refer-card-title">
      <h2 id="refer-card-title" className="refer-card-title">What you get</h2>

      <dl className="refer-rates">
        <div className="refer-rate">
          <dt className="refer-rate-figure">10%</dt>
          <dd>
            of the project price, paid within 7 days of the business paying us.
            <span className="refer-rate-sum" aria-live="polite">
              {project > 0 ? `${formatGBP(projectCut)} on ${formatGBP(project)}` : 'Type a price below'}
            </span>
          </dd>
        </div>
        <div className="refer-rate">
          <dt className="refer-rate-figure">10%</dt>
          <dd>
            of every monthly fee they pay, for as long as they stay with us.
            <span className="refer-rate-sum" aria-live="polite">
              {monthly > 0 ? `${formatGBP(monthlyCut)} a month on ${formatGBP(monthly)}` : 'Many websites have no monthly fee'}
            </span>
          </dd>
        </div>
      </dl>

      <div className="refer-calc">
        <p className="refer-calc-lead">Work out your own sum</p>
        <div className="refer-calc-fields">
          <label className="refer-field">
            <span>Project price</span>
            <span className="refer-money">
              <span aria-hidden="true">£</span>
              <input
                type="text"
                inputMode="numeric"
                aria-label="Project price in pounds"
                value={project ? project.toLocaleString('en-GB') : ''}
                onChange={(e) => setProject(toAmount(e.target.value))}
                placeholder="0"
              />
            </span>
          </label>
          <label className="refer-field">
            <span>Monthly fee</span>
            <span className="refer-money">
              <span aria-hidden="true">£</span>
              <input
                type="text"
                inputMode="numeric"
                aria-label="Monthly fee in pounds"
                value={monthly ? monthly.toLocaleString('en-GB') : ''}
                onChange={(e) => setMonthly(toAmount(e.target.value))}
                placeholder="0"
              />
            </span>
          </label>
        </div>
        <div className="refer-presets">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className="refer-preset"
              aria-pressed={project === p.project && monthly === p.monthly}
              onClick={() => {
                setProject(p.project)
                setMonthly(p.monthly)
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="refer-total">
          First year: <strong className="tnum">{formatGBP(firstYear)}</strong>
        </p>
        <p className="refer-note">
          Shift quotes every job after a call, so the real price is set then. There is no cap on what you can earn.
        </p>
      </div>
    </section>
  )
}

const EMPTY_FORM = {
  name: '',
  phone: '',
  partner: '',
  business: '',
  contact: '',
  needs: '',
  told: false,
  website: '',
}

function fieldErrors(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Enter your name'
  if (form.phone.replace(/[^0-9]/g, '').length < 10) errors.phone = 'Enter your phone number, like 07700 900123'
  if (!form.business.trim()) errors.business = 'Enter the name of the business'
  if (!form.contact.trim()) errors.contact = 'Enter who we should speak to and how to reach them'
  if (!form.told) errors.told = 'Tick to confirm they know we will be in touch'
  return errors
}

const FIELD_ORDER = ['name', 'phone', 'business', 'contact', 'told']

function ReferForm() {
  const navigate = useNavigate()
  const formId = useId()
  const summaryRef = useRef(null)
  const startedAt = useRef(Date.now())
  // A ?ref= link (e.g. /refer?ref=GYM) fills in the referral partner for them.
  const [form, setForm] = useState(() => ({ ...EMPTY_FORM, partner: getActiveReferral()?.name || '' }))
  const [errors, setErrors] = useState({})
  const [showSummary, setShowSummary] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const id = (name) => `${formId}-${name}`

  const update = (name, value) => {
    const next = { ...form, [name]: value }
    setForm(next)
    if (errors[name]) {
      const again = fieldErrors(next)
      setErrors((prev) => {
        const copy = { ...prev }
        if (again[name]) copy[name] = again[name]
        else delete copy[name]
        return copy
      })
    }
  }

  useEffect(() => {
    if (showSummary && Object.keys(errors).length) {
      summaryRef.current?.focus()
    }
  }, [showSummary, errors])

  useEffect(() => {
    const base = document.title.replace(/^Error: /, '')
    document.title = showSummary && Object.keys(errors).length ? `Error: ${base}` : base
  }, [showSummary, errors])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = fieldErrors(form)
    setErrors(found)
    if (Object.keys(found).length) {
      setShowSummary(true)
      return
    }
    setShowSummary(false)
    setSendError('')

    // Honeypot and a minimum fill time keep simple bots out.
    if (form.website || Date.now() - startedAt.current < 2500) {
      navigate('/refer/sent', { state: { business: form.business } })
      return
    }

    setSending(true)
    const referral = getActiveReferral()
    const message = [
      `Referral from ${form.name.trim()} (${form.phone.trim()})`,
      `Referral partner: ${form.partner.trim() || 'None given'}`,
      `Business: ${form.business.trim()}`,
      `Who to speak to: ${form.contact.trim()}`,
      form.needs.trim() ? `What they need: ${form.needs.trim()}` : null,
      'Referrer confirms the business knows Shift will be in touch.',
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch(`${FORMS_ENDPOINT.replace(/\/$/, '')}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          type: 'enquiry',
          fields: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            business: form.business.trim(),
            referralPartner: form.partner.trim() || undefined,
            message,
            source: 'Refer a business (/refer)',
            referralCode: referral?.code,
          },
        }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      navigate('/refer/sent', { state: { business: form.business.trim() } })
    } catch {
      setSendError(
        'Your details did not send. Check your connection and try again, or email them to partnerships@shiftaitech.com.',
      )
    } finally {
      setSending(false)
    }
  }

  const errorKeys = FIELD_ORDER.filter((k) => errors[k])
  const describe = (name, hint) =>
    [hint ? id(`${name}-hint`) : null, errors[name] ? id(`${name}-error`) : null].filter(Boolean).join(' ') ||
    undefined

  return (
    <form className="refer-form" onSubmit={handleSubmit} noValidate>
      {showSummary && errorKeys.length > 0 && (
        <div className="refer-errors" role="alert" tabIndex={-1} ref={summaryRef}>
          <h3>There is a problem</h3>
          <ul>
            {errorKeys.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`}>{errors[k]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="refer-fieldset">
        <legend>About you</legend>
        <div className="refer-input">
          <label htmlFor={id('name')}>Your name</label>
          {errors.name && <p className="refer-error" id={id('name-error')}>{errors.name}</p>}
          <input
            id={id('name')}
            type="text"
            autoComplete="name"
            value={form.name}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={describe('name')}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>
        <div className="refer-input">
          <label htmlFor={id('phone')}>Your phone number</label>
          <p className="refer-hint" id={id('phone-hint')}>So we can tell you how it goes and pay you.</p>
          {errors.phone && <p className="refer-error" id={id('phone-error')}>{errors.phone}</p>}
          <input
            id={id('phone')}
            className="refer-input--phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            aria-invalid={errors.phone ? 'true' : undefined}
            aria-describedby={describe('phone', true)}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className="refer-fieldset">
        <legend>Referral partner</legend>
        <div className="refer-input">
          <label htmlFor={id('partner')}>Referral partner name (optional)</label>
          <p className="refer-hint" id={id('partner-hint')}>
            Who sent you to this page? For example, the gym or your referral agent’s name.
          </p>
          <input
            id={id('partner')}
            type="text"
            value={form.partner}
            aria-describedby={describe('partner', true)}
            onChange={(e) => update('partner', e.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className="refer-fieldset">
        <legend>About the business you are referring</legend>
        <div className="refer-input">
          <label htmlFor={id('business')}>Business name</label>
          {errors.business && <p className="refer-error" id={id('business-error')}>{errors.business}</p>}
          <input
            id={id('business')}
            type="text"
            autoComplete="off"
            value={form.business}
            aria-invalid={errors.business ? 'true' : undefined}
            aria-describedby={describe('business')}
            onChange={(e) => update('business', e.target.value)}
          />
        </div>
        <div className="refer-input">
          <label htmlFor={id('contact')}>Who should we speak to, and how?</label>
          <p className="refer-hint" id={id('contact-hint')}>A name and a phone number or email.</p>
          {errors.contact && <p className="refer-error" id={id('contact-error')}>{errors.contact}</p>}
          <input
            id={id('contact')}
            type="text"
            autoComplete="off"
            value={form.contact}
            aria-invalid={errors.contact ? 'true' : undefined}
            aria-describedby={describe('contact', true)}
            onChange={(e) => update('contact', e.target.value)}
          />
        </div>
        <div className="refer-input">
          <label htmlFor={id('needs')}>What do they need? (optional)</label>
          <textarea
            id={id('needs')}
            rows={3}
            value={form.needs}
            onChange={(e) => update('needs', e.target.value)}
          />
        </div>
        <div className="refer-input refer-check">
          {errors.told && <p className="refer-error" id={id('told-error')}>{errors.told}</p>}
          <input
            id={id('told')}
            type="checkbox"
            checked={form.told}
            aria-invalid={errors.told ? 'true' : undefined}
            aria-describedby={describe('told')}
            onChange={(e) => update('told', e.target.checked)}
          />
          <label htmlFor={id('told')}>They know I’m passing their details to Shift and are happy for you to get in touch.</label>
        </div>
      </fieldset>

      <div className="refer-hp" aria-hidden="true">
        <label htmlFor={id('website')}>Leave this empty</label>
        <input
          id={id('website')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      {sendError && <p className="refer-send-error" role="alert">{sendError}</p>}

      <button type="submit" className="refer-btn" disabled={sending}>
        {sending ? 'Sending the business to Shift…' : 'Send the business to Shift'}
      </button>
      <p className="refer-privacy">
        Shift AI Tech uses these details only to contact the business and to pay you, and deletes them after 12 months
        if no work goes ahead. See our <Link to="/privacy">privacy notice</Link>.
      </p>
    </form>
  )
}

export default function ReferPage() {
  return (
    <div className="subpage refer">
      {/* It feels like a rate card pinned on a wall: point at the number, let them work out their own sum, take a name. */}
      <section className="refer-top">
        <div className="refer-wrap refer-top-grid">
          <div className="refer-intro">
            <h1 className="refer-h1">Refer a business to Shift and earn 10% of what they spend</h1>
            <p className="refer-lede">
              Know a business owner who needs a new website, wants to come up first on Google, or is drowning in
              spreadsheets? Pass us their name. We do the selling and the building. When they pay us, you get paid.
            </p>
            <div className="refer-actions">
              <a href="#refer-form" className="refer-btn">Pass on a business</a>
              <Link to="/websites" className="refer-link">
                See what we’ve built
              </Link>
            </div>
          </div>
          <RateCard />
          <ol className="refer-steps">
            <li>
              <strong>You send us the business</strong> with the form on this page, or by text to whoever told you
              about this.
            </li>
            <li>
              <strong>We call them,</strong> find out what they need and quote. You don’t have to sell anything.
            </li>
            <li>
              <strong>They pay us, we pay you</strong> within 7 days, then every month for as long as they keep a
              monthly plan.
            </li>
          </ol>
        </div>
      </section>

      <section className="refer-builds" aria-labelledby="refer-builds-title">
        <div className="refer-wrap">
          <div className="refer-builds-head">
            <h2 id="refer-builds-title" className="refer-h2">What Shift builds</h2>
            <p>
              If you hear a business owner say one of the lines in the right-hand column, they’re worth passing on.
            </p>
          </div>
          <ul className="refer-index">
            {BUILDS.map((b) => (
              <li key={b.code} className="refer-row">
                <span className="refer-code" aria-hidden="true">{b.code}</span>
                <div className="refer-row-body">
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
                <p className="refer-heard">
                  <span className="refer-heard-label">You’ll hear</span>
                  “{b.heard}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="refer-send" id="refer-form" aria-labelledby="refer-send-title">
        <div className="refer-wrap refer-send-grid">
          <div className="refer-send-head">
            <h2 id="refer-send-title" className="refer-h2">Pass on a business</h2>
            <p>
              Six questions. Ask the owner first if it’s fine for us to call them, then send their details here.
            </p>
            <p>
              Easier by email? Send the same details to{' '}
              <a href="mailto:partnerships@shiftaitech.com">partnerships@shiftaitech.com</a>.
            </p>
          </div>
          <ReferForm />
        </div>
      </section>

      <section className="refer-terms" aria-labelledby="refer-terms-title">
        <div className="refer-wrap">
          <h2 id="refer-terms-title" className="refer-h2 refer-h2--small">The small print, in full</h2>
          <dl className="refer-terms-list">
            <div>
              <dt>Who counts</dt>
              <dd>Any business that isn’t already a Shift client or already talking to us. If two people send the same business, the first one we receive gets paid.</dd>
            </div>
            <div>
              <dt>How much</dt>
              <dd>10% of the project price before VAT, and 10% of each monthly fee before VAT for as long as the business pays it. No cap.</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>Within 7 days of the business’s payment reaching our account, by bank transfer. Monthly amounts are paid each month.</dd>
            </div>
            <div>
              <dt>If it doesn’t go ahead</dt>
              <dd>You’re not owed anything, and you don’t owe anything. We’ll tell you either way.</dd>
            </div>
            <div>
              <dt>Doing this a lot?</dt>
              <dd>Regular introducers get a Lead Engine login to track every business they send and the commission building on it. Ask us when you send your second.</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}

export function ReferSentPage() {
  usePageTitle('Business received | Shift AI Tech')
  const { state } = useLocation()
  const business = state?.business

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="subpage refer">
      <section className="refer-top refer-sent">
        <div className="refer-wrap">
          <h1 className="refer-h1">
            {business ? `Thanks. We’ve got ${business}.` : 'Thanks. We’ve got the business.'}
          </h1>
          <p className="refer-lede">
            We’ll text or call you within one working day to say we’ve been in touch with them. If they go ahead, you’ll
            be paid within 7 days of their first payment reaching us.
          </p>
          <p className="refer-lede">
            Questions in the meantime: <a href="mailto:partnerships@shiftaitech.com">partnerships@shiftaitech.com</a>
          </p>
          <div className="refer-actions">
            <Link to="/refer#refer-form" className="refer-btn" reloadDocument>Pass on another business</Link>
            <Link to="/websites" className="refer-link">See what we’ve built</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
