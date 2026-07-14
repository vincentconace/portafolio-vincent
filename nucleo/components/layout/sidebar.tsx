'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { PanelLeftClose, PanelLeftOpen, LogIn, BrainCircuit } from 'lucide-react'
import { buildSections, type NavItem, type CategoryCounts } from './sidebar-config'

const STORAGE_KEY = 'nucleo-sidebar'

export const sidebarInitScript = `
(function(){try{
  var k='${STORAGE_KEY}';
  var s=localStorage.getItem(k);
  var c=(s==='collapsed')?'collapsed':'expanded';
  document.documentElement.setAttribute('data-sidebar',c);
}catch(e){document.documentElement.setAttribute('data-sidebar','expanded');}})();
`

function isItemActive(item: NavItem, pathname: string, search: URLSearchParams): boolean {
  if (item.external) return false
  if (item.matchCategory) {
    if (pathname !== '/nucleo-de-la-ia/boveda') return false
    if (search.get('featured') === 'true') return false
    return search.get('category') === item.matchCategory
  }
  if (item.matchFeatured) {
    if (pathname !== '/nucleo-de-la-ia/boveda') return false
    return search.get('featured') === 'true'
  }
  if (item.matchPath === '/nucleo-de-la-ia/boveda') {
    if (pathname !== '/nucleo-de-la-ia/boveda') return false
    return !search.get('category') && search.get('featured') !== 'true'
  }
  if (item.matchPath === '/nucleo-de-la-ia') {
    return pathname === '/nucleo-de-la-ia'
  }
  return false
}

export function Sidebar({ counts, totalCount }: { counts: CategoryCounts; totalCount: number }) {
  const sections = React.useMemo(() => buildSections(counts, totalCount), [counts, totalCount])
  const pathname = usePathname()
  const sp = useSearchParams()
  const search = sp ?? new URLSearchParams()

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.getAttribute('data-sidebar') === 'collapsed'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-sidebar', collapsed ? 'collapsed' : 'expanded')
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? 'collapsed' : 'expanded')
    } catch {}
  }, [collapsed])

  const toggle = useCallback(() => setCollapsed((v) => !v), [])

  return (
    <>
      <aside className="ni-sidebar" aria-label="Navegación principal">
        <div className="ni-sidebar-header">
          <Link href="/nucleo-de-la-ia" className="ni-sidebar-brand" aria-label="Núcleo IA — inicio">
            <span className="ni-logo-mark" aria-hidden="true">
              <BrainCircuit size={22} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
            </span>
            <span className="ni-sidebar-brand-text">
              núcleo<span style={{ color: 'var(--accent)' }}>.</span>ia
            </span>
          </Link>
          <button
            type="button"
            aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
            aria-expanded={!collapsed}
            onClick={toggle}
            className="ni-icon-btn ni-collapse-btn"
            title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {collapsed ? (
              <PanelLeftOpen size={16} strokeWidth={1.75} />
            ) : (
              <PanelLeftClose size={16} strokeWidth={1.75} />
            )}
          </button>
        </div>

        <nav className="ni-sidebar-nav">
          {sections.map((section) => (
            <div key={section.label} className="ni-section">
              <div className="ni-section-label">{section.label}</div>
              <ul className="ni-list">
                {section.items.map((item) => {
                  const active = isItemActive(item, pathname ?? '/', search)
                  const Icon = item.icon
                  const linkProps = item.external
                    ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                    : { href: item.href }
                  const tooltip =
                    typeof item.count === 'number'
                      ? `${item.label} (${item.count})`
                      : item.label
                  return (
                    <li key={`${section.label}-${item.label}`}>
                      <Link
                        {...linkProps}
                        className={`ni-link${active ? ' is-active' : ''}`}
                        aria-current={active ? 'page' : undefined}
                        title={tooltip}
                      >
                        <Icon size={16} strokeWidth={1.75} className="ni-link-icon" />
                        <span className="ni-link-label">{item.label}</span>
                        {typeof item.count === 'number' && (
                          <span className="ni-link-count">{item.count}</span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="ni-sidebar-footer">
          <div className="ni-footer-row">
            <button
              type="button"
              className="ni-signin-btn"
              aria-label="Iniciar sesión"
              title="Iniciar sesión"
            >
              <LogIn size={14} strokeWidth={1.75} />
              <span className="ni-signin-label">Iniciar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .ni-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 50;
          display: flex;
          flex-direction: column;
          width: 260px;
          height: 100dvh;
          background: var(--bg-surface);
          border-right: 1px solid var(--border-subtle);
          overflow: hidden;
          transition: width 220ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        [data-sidebar="collapsed"] .ni-sidebar {
          width: 68px;
        }

        .ni-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 0.875rem 0.875rem 0.875rem 1rem;
          height: 64px;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .ni-sidebar-brand {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: -0.02em;
          font-size: 1rem;
          min-width: 0;
        }
        .ni-logo-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          line-height: 0;
        }
        .ni-sidebar-brand-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        [data-sidebar="collapsed"] .ni-sidebar-brand-text { display: none; }
        [data-sidebar="collapsed"] .ni-sidebar-header {
          padding-left: 0;
          padding-right: 0;
          justify-content: center;
          flex-direction: column;
          gap: 0.4rem;
          height: auto;
          padding-top: 0.875rem;
          padding-bottom: 0.875rem;
        }

        .ni-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
          flex-shrink: 0;
        }
        .ni-icon-btn:hover {
          background: var(--bg-elevated-hover);
          color: var(--text-primary);
          border-color: var(--border-strong);
        }
        .ni-icon-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .ni-sidebar-nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0.75rem 0.5rem 1rem;
          scrollbar-gutter: stable;
        }
        .ni-section {
          padding: 0.5rem 0.5rem 0.75rem;
        }
        .ni-section + .ni-section {
          margin-top: 0.25rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }
        .ni-section-label {
          padding: 0 0.5rem 0.5rem;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        [data-sidebar="collapsed"] .ni-section-label {
          height: 1px;
          padding: 0;
          margin: 0 auto 0.5rem;
          width: 24px;
          background: var(--border-subtle);
          color: transparent;
          overflow: hidden;
          letter-spacing: 0;
        }
        [data-sidebar="collapsed"] .ni-section {
          padding-left: 0;
          padding-right: 0;
        }
        .ni-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ni-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.5rem 0.625rem 0.5rem 0.75rem;
          border-radius: var(--radius);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          line-height: 1.2;
          min-height: 36px;
          cursor: pointer;
          transition: background 150ms ease, color 150ms ease;
        }
        .ni-link:hover {
          background: var(--bg-elevated);
          color: var(--text-primary);
        }
        .ni-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: -2px;
        }
        .ni-link.is-active {
          background: var(--bg-elevated);
          color: var(--text-primary);
          font-weight: 600;
        }
        .ni-link.is-active::before {
          content: '';
          position: absolute;
          left: -0.5rem;
          top: 6px;
          bottom: 6px;
          width: 3px;
          border-radius: 2px;
          background: var(--accent);
          box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.55);
        }
        .ni-link-icon {
          flex-shrink: 0;
          color: currentColor;
          opacity: 0.85;
        }
        .ni-link.is-active .ni-link-icon {
          color: var(--accent);
          opacity: 1;
        }
        .ni-link-label {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ni-link-count {
          flex-shrink: 0;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-base);
          border: 1px solid var(--border-subtle);
          padding: 0.1rem 0.45rem;
          border-radius: 9999px;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.01em;
        }
        .ni-link.is-active .ni-link-count {
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.1);
          border-color: rgba(var(--accent-rgb), 0.25);
        }
        [data-sidebar="collapsed"] .ni-link {
          justify-content: center;
          gap: 0;
          padding: 0 0;
          width: 40px;
          height: 40px;
          margin: 0 auto;
          min-height: 40px;
        }
        [data-sidebar="collapsed"] .ni-link-label,
        [data-sidebar="collapsed"] .ni-link-count {
          display: none;
        }
        [data-sidebar="collapsed"] .ni-link.is-active::before {
          left: -10px;
        }

        .ni-sidebar-footer {
          padding: 0.75rem 0.875rem 1rem;
          border-top: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .ni-footer-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .ni-signin-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          height: 36px;
          padding: 0 0.875rem;
          border-radius: var(--radius);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease;
        }
        .ni-signin-btn:hover {
          background: var(--bg-elevated-hover);
          border-color: var(--border-strong);
        }
        .ni-signin-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        [data-sidebar="collapsed"] .ni-sidebar-footer {
          padding: 0.75rem 0.5rem 1rem;
        }
        [data-sidebar="collapsed"] .ni-footer-row {
          flex-direction: column;
          gap: 0.4rem;
        }
        [data-sidebar="collapsed"] .ni-signin-btn {
          flex: none;
          width: 36px;
          padding: 0;
        }
        [data-sidebar="collapsed"] .ni-signin-label {
          display: none;
        }

        @media (max-width: 1024px) {
          .ni-sidebar { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ni-sidebar { transition: none; }
        }
      ` }} />
    </>
  )
}
