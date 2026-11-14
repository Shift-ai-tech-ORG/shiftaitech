import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FORMS_ENDPOINT } from '../config/site'
import { getActiveReferral } from '../lib/referral'

export default function ContactForm({ referralCode, defaultMessage = '', source, note, compact } = {}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: defaultMessage,
  })
  const [activeReferral, setActiveReferral] = useState(referralCode || '')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fromProp = (referralCode || '').trim().toUpperCase()
    if (fromProp) {
      setActiveReferral(fromProp)
      return
    }
    const stored = getActiveReferral()
    if (stored?.code) setActiveReferral(stored.code)
  }, [referralCode])

  useEffect(() => {
    if (!defaultMessage) return
    setFormData((prev) => {
      const isEmpty = !prev.message.trim()
      const isStaleDefault =
        prev.message === "I'm interested in the website + hosting package." ||
        prev.message.startsWith("I'm interested in the website + hosting package.")
      if (isEmpty || isStaleDefault) {
        return { ...prev, message: defaultMessage }
      }
      return prev
    })
  }, [defaultMessage])

  const handleChange = (e) => {
    e.target.classList.remove('is-invalid')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const markInvalid = (e) => {
    e.target.classList.add('is-invalid')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const endpoint = FORMS_ENDPOINT.replace(/\/$/, '')
      if (endpoint.includes('PLACEHOLDER')) {
        throw new Error('FORMS_NOT_CONFIGURED')
      }

      const res = await fetch(`${endpoint}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          type: 'enquiry',
          fields: {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            business: formData.company,
            message: formData.message,
            ...(source ? { source } : {}),
            referralCode: activeReferral || undefined,
          },
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        let msg = 'Something went wrong. Please email us directly at jack@shiftaitech.com.'
        try {
          const payload = await res.json()
          if (payload?.error) msg = payload.error
        } catch { /* keep default */ }
        setError(msg)
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'FORMS_NOT_CONFIGURED') {
        setError('Contact form is temporarily unavailable. Please email jack@shiftaitech.com.')
      } else {
        setError('Network error. Please email us directly at jack@shiftaitech.com.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="contact-form-success"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CheckCircle2 size={40} />
        <h3>Message received.</h3>
        <p>We&apos;ll reply within a day.</p>
        {activeReferral && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            Logged against referral <strong>{activeReferral}</strong>
          </p>
        )}
        <button
          className="contact-form-reset"
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', company: '', message: defaultMessage })
          }}
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form className={`contact-form${compact ? ' contact-form--compact' : ''}`} onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <div className="contact-form-group">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="Your name"
            onInvalid={markInvalid}
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="you@company.com"
            onInvalid={markInvalid}
          />
        </div>
      </div>
      <div className="contact-form-group">
        <label htmlFor="cf-company">Company <span className="contact-form-optional">(optional)</span></label>
        <input
          id="cf-company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          autoComplete="organization"
          placeholder="Your company"
        />
      </div>
      <div className="contact-form-group">
        <label htmlFor="cf-referral">Referral code <span className="contact-form-optional">(optional)</span></label>
        <input
          id="cf-referral"
          type="text"
          name="referralCode"
          value={activeReferral}
          onChange={(e) => setActiveReferral(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))}
          autoComplete="off"
          placeholder="If someone sent you, add their code"
        />
      </div>
      <div className="contact-form-group">
        <label htmlFor="cf-message">Project details</label>
        <textarea
          id="cf-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={compact ? 3 : 5}
          onInvalid={markInvalid}
          placeholder="Describe your project, goals, and timeline"
        />
      </div>
      <button type="submit" className="contact-form-submit" disabled={loading}>
        {loading ? 'Sending\u2026' : <><span>Send message</span> <ArrowRight size={16} /></>}
      </button>
      {note && <p className="contact-form-note">{note}</p>}
      <p className="form-privacy-line">
        We only use your details to reply to you. See our <Link to="/privacy">privacy notice</Link>.
      </p>
      {error && (
        <p className="contact-form-error">
          {error}
        </p>
      )}
    </form>
  )
}
