import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { onboardingSections } from './config/onboarding'
import { FORMS_ENDPOINT } from './config/site'
import { LineReveal } from './components/motion'
import BreathingField from './components/BreathingField'
import './OnboardingPage.css'

const STORAGE_KEY = 'shift_onboarding_v1'

function fieldVisible(field, answers) {
  if (!field.showIf) return true
  const val = answers[field.showIf.field]
  return val === field.showIf.equals
}

export default function OnboardingPage() {
  const [params] = useSearchParams()
  const lead = {
    leadId: params.get('lead') || '',
    name: params.get('name') || '',
    business: params.get('business') || '',
    email: params.get('email') || '',
    phone: params.get('phone') || '',
    date: params.get('date') || '',
    time: params.get('time') || '',
  }

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const stepMounted = useRef(false)

  useEffect(() => {
    let initial = {}
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) initial = JSON.parse(raw)
    } catch { /* ignore */ }
    setAnswers({
      name: initial.name || lead.name,
      business: initial.business || lead.business,
      email: initial.email || lead.email,
      phone: initial.phone || lead.phone,
      ...initial,
    })
  }, [lead.name, lead.business, lead.email, lead.phone])

  useEffect(() => {
    if (Object.keys(answers).length === 0) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    } catch { /* ignore */ }
  }, [answers])

  useEffect(() => {
    if (!stepMounted.current) {
      stepMounted.current = true
      return
    }
    const el = document.querySelector('.onboarding-form')
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, [step])

  const sections = onboardingSections
  const section = sections[step]
  const total = sections.length
  const progress = Math.round(((step + 1) / total) * 100)

  function setField(id, value) {
    setAnswers((a) => ({ ...a, [id]: value }))
  }

  function toggleCheckbox(id, value, max) {
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? a[id] : []
      if (cur.includes(value)) return { ...a, [id]: cur.filter((x) => x !== value) }
      if (max && cur.length >= max) return a
      return { ...a, [id]: [...cur, value] }
    })
  }

  async function submit() {
    if (status === 'sending') return
    setStatus('sending')
    setError('')
    const endpoint = FORMS_ENDPOINT.replace(/\/$/, '')
    const fields = {
      name: answers.name || lead.name,
      business: answers.business || lead.business,
      email: answers.email || lead.email,
      phone: answers.phone || lead.phone,
      discoveryDate: lead.date,
      discoveryTime: lead.time,
      ...answers,
    }
    try {
      if (endpoint.includes('PLACEHOLDER')) throw new Error('not configured')
      const res = await fetch(`${endpoint}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'onboarding', leadId: lead.leadId || undefined, fields }),
      })
      if (!res.ok) throw new Error('submit failed')
      setStatus('done')
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      setStatus('error')
      setError('Could not submit. Please email jack@shiftaitech.com')
    }
  }

  function next() {
    if (step < total - 1) {
      setStep((s) => s + 1)
    } else {
      submit()
    }
  }

  function back() {
    if (step > 0) setStep((s) => s - 1)
  }

  const visibleFields = useMemo(
    () => section.fields.filter((f) => fieldVisible(f, answers)),
    [section, answers],
  )

  return (
    <div className="onboarding-page">
      <section className="onboarding-hero">
        <div className="onboarding-hero-art" aria-hidden="true">
          <BreathingField />
        </div>
        <div className="onboarding-main">
          {status === 'done' ? (
            <div className="onboarding-success">
              <p className="onboarding-kicker">Onboarding</p>
              <h1>Thank you.</h1>
              <p>We&apos;ve received your onboarding information and will use it to prepare your personalised AI strategy session.</p>
              <Link to="/" className="onboarding-home">Back to Shift</Link>
            </div>
          ) : (
            <>
              <p className="onboarding-kicker">Client onboarding · about 5 minutes</p>
              <LineReveal
                className="onboarding-title"
                lines={[
                  { text: "Let's build your" },
                  { text: 'demonstration.', mark: true },
                ]}
              />
              <p className="onboarding-sub">Help us understand how your business operates so we can prepare a personalised audit and AI roadmap.</p>
            </>
          )}
        </div>
      </section>

      {status !== 'done' && (
      <div className="onboarding-main onboarding-form">
        <div className="onboarding-card">
          <div className="onboarding-progress">
            <p className="onboarding-progress-figure">{progress}%</p>
            <p className="onboarding-progress-meta">Step {step + 1} of {total}</p>
          </div>
          <div
            className="onboarding-progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Step ${step + 1} of ${total}`}
          >
            <div style={{ width: `${progress}%` }} />
          </div>
          <h2 className="onboarding-step-title">{section.title}</h2>

          {section.subtitle && <p className="onboarding-section-sub">{section.subtitle}</p>}

          <div className="onboarding-fields">
            {visibleFields.map((field) => (
              <div key={field.id} className={`onboarding-field${field.type === 'text' ? '' : ' onboarding-field--wide'}`}>
                <label>{field.label}</label>
                {field.type === 'text' && (
                  <input
                    type={field.id === 'email' ? 'email' : 'text'}
                    value={answers[field.id] || ''}
                    onChange={(e) => setField(field.id, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea
                    rows={5}
                    maxLength={field.maxLength}
                    value={answers[field.id] || ''}
                    onChange={(e) => setField(field.id, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
                {field.type === 'radio' && (
                  <div className="onboarding-options">
                    {field.options.map((opt) => (
                      <label key={opt} className="onboarding-option">
                        <input
                          type="radio"
                          name={field.id}
                          checked={answers[field.id] === opt}
                          onChange={() => setField(field.id, opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}
                {field.type === 'checkbox' && (
                  <div className="onboarding-options">
                    {field.options.map((opt) => {
                      const cur = Array.isArray(answers[field.id]) ? answers[field.id] : []
                      return (
                        <label key={opt} className="onboarding-option">
                          <input
                            type="checkbox"
                            checked={cur.includes(opt)}
                            onChange={() => toggleCheckbox(field.id, opt, field.max)}
                          />
                          {opt}
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {error && <p className="onboarding-error">{error}</p>}

          <div className="onboarding-nav">
            <button type="button" className="onboarding-back" onClick={back} disabled={step === 0}>Back</button>
            <button type="button" className="onboarding-next" onClick={next} disabled={status === 'sending'}>
              {step === total - 1 ? (status === 'sending' ? 'Submitting…' : 'Submit') : 'Continue'}
            </button>
          </div>
          <p className="form-privacy-line">
            We only use your details to reply to you and scope your project. See our <Link to="/privacy">privacy notice</Link>.
          </p>
        </div>
      </div>
      )}
    </div>
  )
}
