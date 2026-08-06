import { REFERRAL_PARTNERS } from '../config/websitesOffer'

const STORAGE_KEY = 'shift_referral_code'

export function normaliseReferralCode(raw) {
  if (!raw || typeof raw !== 'string') return null
  const code = raw.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '')
  return code || null
}

export function getPartnerForCode(code) {
  const normalised = normaliseReferralCode(code)
  if (!normalised) return null
  return REFERRAL_PARTNERS[normalised] || {
    code: normalised,
    name: normalised,
    region: 'Partner',
  }
}

/** Capture ?ref= / ?referral= from the URL and persist for the session. */
export function captureReferralFromSearch(search = window.location.search) {
  const params = new URLSearchParams(search)
  const raw = params.get('ref') || params.get('referral') || params.get('code')
  const code = normaliseReferralCode(raw)
  if (code) {
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* private mode */
    }
  }
  return code
}

export function getStoredReferralCode() {
  try {
    return normaliseReferralCode(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export function getActiveReferral() {
  if (typeof window === 'undefined') return null
  const fromUrl = captureReferralFromSearch()
  const code = fromUrl || getStoredReferralCode()
  return code ? getPartnerForCode(code) : null
}

export function flyerUrlForReferral(code, { autoPrint = false } = {}) {
  const basePath = `${import.meta.env.BASE_URL}flyer/websites.html`.replace(/\/{2,}/g, '/')
  const params = new URLSearchParams()
  const normalised = normaliseReferralCode(code)
  if (normalised) params.set('ref', normalised)
  if (autoPrint) params.set('print', '1')
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

export function websitesUrlForReferral(code) {
  const normalised = normaliseReferralCode(code)
  const path = '/websites'
  if (!normalised) return path
  return `${path}?ref=${encodeURIComponent(normalised)}`
}
