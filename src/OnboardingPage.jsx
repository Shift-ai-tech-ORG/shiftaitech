import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { onboardingSections } from './config/onboarding'
import { FORMS_ENDPOINT } from './config/site'
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

  const sections = onboardingSections
  const section = sections[step]
  const total = sections.length
  const progress = Math.round(((step + (status === 'done' ? 1 : 0)) / total) * 100)

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
      window.scrollTo({ top: 0, behavior: 'smooth' })
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

  if (status === 'done') {
    return (
      <div className="onboarding-page">
        <header className="onboarding-header">
          <Link to="/"><img src="/shift-logo-new.png" alt="Shift AI Tech" className="onboarding-logo" /></Link>
        </header>
        <main className="onboarding-main">
          <div className="onboarding-card onboarding-success">
            <h1>Thank you</h1>
            <p>We&apos;ve received your onboarding information and will use it to prepare your personalised AI strategy session.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        <Link to="/"><img src="/shift-logo-new.png" alt="Shift AI Tech" className="onboarding-logo" /></Link>
        <span className="onboarding-badge">Client onboarding · ~5 min</span>
      </header>
      <main className="onboarding-main">
        <h1 className="onboarding-title">Let&apos;s build your demonstration.</h1>
        <p className="onboarding-sub">Help us understand how your business operates so we can prepare a personalised audit and AI roadmap.</p>

        <div className="onboarding-card">
          <div className="onboarding-progress">
            <span>Step {step + 1} of {total} · {section.title}</span>
            <span>{progress}%</span>
          </div>
          <div className="onboarding-progress-bar"><div style={{ width: `${progress}%` }} /></div>

          {section.subtitle && <p className="onboarding-section-sub">{section.subtitle}</p>}

          <div className="onboarding-fields">
            {visibleFields.map((field) => (
              <div key={field.id} className="onboarding-field">
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
        </div>
      </main>
    </div>
  )
}
