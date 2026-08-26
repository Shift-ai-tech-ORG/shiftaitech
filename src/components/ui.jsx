import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'

export function Container({ children, className = '', narrow = false }) {
  return (
    <div
      className={`ui-container${narrow ? ' ui-container--narrow' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export function SectionLabel({ children }) {
  return <p className="ui-section-label">{children}</p>
}

export function SectionHeading({ children, className = '' }) {
  return <h2 className={`ui-section-heading ${className}`.trim()}>{children}</h2>
}

export function DisplayTitle({ children, className = '' }) {
  return <p className={`ui-display-title ${className}`.trim()}>{children}</p>
}

export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const cls = `ui-btn ui-btn--${variant} ${className}`.trim()
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight size={16} />
    </>
  )

  if (href) {
    return (
      <Magnetic>
        <a href={href} className={cls} data-cursor="GO" {...props}>
          {inner}
        </a>
      </Magnetic>
    )
  }

  return (
    <Magnetic>
      <button className={cls} data-cursor="GO" {...props}>
        {inner}
      </button>
    </Magnetic>
  )
}

export function Card({ children, className = '', hover = true }) {
  return (
    <div className={`ui-card${hover ? ' ui-card--hover' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}

export function Divider() {
  return <div className="ui-divider" />
}
