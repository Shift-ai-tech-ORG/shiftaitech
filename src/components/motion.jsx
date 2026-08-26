import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView, useReducedMotion } from 'framer-motion'

export const EASE = [0.23, 1, 0.32, 1]

export function Reveal({ children, delay = 0, className, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      style={{ overflow: 'visible' }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: EASE, delay: Math.min(delay, 0.28) }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function MediaReveal({ children, className, ...rest }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      {...rest}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)', opacity: 1 }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.05, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function SplitTitle({ children, className = '', as = 'h1' }) {
  const reduce = useReducedMotion()
  const [simple, setSimple] = useState(true)
  const Tag = motion[as] || motion.h1
  const words = String(children).trim().split(/\s+/)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px), (prefers-reduced-motion: reduce)')
    const update = () => setSimple(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (reduce || simple) {
    const Static = as === 'h1' ? 'h1' : as === 'p' ? 'p' : 'h2'
    const S = Static
    return <S className={className}>{children}</S>
  }

  return (
    <Tag className={`split-title ${className}`.trim()}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="split-word">
          <motion.span
            className="split-word-inner"
            initial={{ y: '108%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.12 + i * 0.045 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="tnum">
      {val}
      {suffix}
    </span>
  )
}
