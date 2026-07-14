import React from 'react'

interface StepIndicatorProps {
  number: number
  title: string
  description?: string
  children?: React.ReactNode
  last?: boolean
}

export function StepIndicator({ number, title, description, children, last = false }: StepIndicatorProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .step-container {
          display: flex;
          gap: 1.25rem;
          position: relative;
        }
        .step-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .step-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent-glow);
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent);
          flex-shrink: 0;
          z-index: 1;
        }
        .step-line {
          width: 2px;
          flex: 1;
          background: var(--border);
          margin-top: 0.5rem;
          min-height: 2rem;
        }
        .step-content {
          flex: 1;
          padding-bottom: 2rem;
        }
        .step-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.375rem;
          line-height: 1.35;
        }
        .step-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 0.75rem;
        }
      ` }} />
      <div className="step-container">
        <div className="step-left">
          <div className="step-number">{number}</div>
          {!last && <div className="step-line" />}
        </div>
        <div className="step-content">
          <div className="step-title">{title}</div>
          {description && <p className="step-description">{description}</p>}
          {children && <div style={{ marginTop: '0.75rem' }}>{children}</div>}
        </div>
      </div>
    </>
  )
}
