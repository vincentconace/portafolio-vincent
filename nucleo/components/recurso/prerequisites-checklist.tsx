'use client'

import React, { useState, useEffect } from 'react'
import { Check, CheckCircle2, ListChecks } from 'lucide-react'
import { useTranslation } from '@/providers'

interface PrerequisitesChecklistProps {
  items?: string[]
  storageKey?: string
}

export function PrerequisitesChecklist({ items, storageKey = 'checklist' }: PrerequisitesChecklistProps) {
  const { t } = useTranslation()
  const safeItems = Array.isArray(items) ? items : []
  const [checked, setChecked] = useState<boolean[]>(() => new Array(safeItems.length).fill(false))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`nucleo-${storageKey}`)
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as boolean[]
          if (Array.isArray(parsed) && parsed.length === safeItems.length) {
            setChecked(parsed)
          }
        } catch {
          // ignore
        }
      }
    }
  }, [storageKey, safeItems.length])

  const toggle = (index: number) => {
    const next = checked.map((v, i) => (i === index ? !v : v))
    setChecked(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`nucleo-${storageKey}`, JSON.stringify(next))
    }
  }

  const checkedCount = checked.filter(Boolean).length
  const allDone = checkedCount === safeItems.length
  const progress = safeItems.length > 0 ? (checkedCount / safeItems.length) * 100 : 0

  if (!mounted) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .checklist-container {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin: 1.5rem 0;
        }
        .checklist-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .checklist-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .checklist-progress-bar {
          height: 4px;
          background: var(--bg-elevated);
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .checklist-progress-fill {
          height: 100%;
          background: ${allDone ? '#22c55e' : 'var(--accent)'};
          border-radius: inherit;
          transition: width 300ms ease, background 300ms ease;
        }
        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.625rem 0;
          border-bottom: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: opacity 150ms ease;
        }
        .checklist-item:last-child { border-bottom: none; }
        .checklist-item:hover { opacity: 0.85; }
        .checklist-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 1.5px solid var(--border);
          background: var(--bg-elevated);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 150ms ease;
          margin-top: 1px;
        }
        .checklist-checkbox.checked {
          background: var(--accent);
          border-color: var(--accent);
        }
        .checklist-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          transition: all 150ms ease;
        }
        .checklist-text.checked {
          text-decoration: line-through;
          color: var(--text-muted);
        }
        .checklist-done-msg {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: var(--radius);
          margin-top: 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #4ade80;
        }
      ` }} />
      <div className="checklist-container">
        <div className="checklist-header">
          <span className="checklist-title">
            <ListChecks size={14} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
            {t('nucleo.widgets.prereqTitle')}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {checkedCount}/{safeItems.length} {t('nucleo.widgets.prereqCompleted')}
          </span>
        </div>

        <div className="checklist-progress-bar">
          <div
            className="checklist-progress-fill"
            style={{ width: `${progress}%`, background: allDone ? '#22c55e' : 'var(--accent)' }}
          />
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {safeItems.map((item, i) => (
            <li
              key={i}
              className="checklist-item"
              onClick={() => toggle(i)}
            >
              <div className={`checklist-checkbox${checked[i] ? ' checked' : ''}`}>
                {checked[i] && <Check size={11} strokeWidth={2.4} color="var(--accent-on)" />}
              </div>
              <span className={`checklist-text${checked[i] ? ' checked' : ''}`}>{item}</span>
            </li>
          ))}
        </ul>

        {allDone && (
          <div className="checklist-done-msg">
            <CheckCircle2 size={14} strokeWidth={1.75} color="#22c55e" />
            {t('nucleo.widgets.prereqReady')}
          </div>
        )}
      </div>
    </>
  )
}
