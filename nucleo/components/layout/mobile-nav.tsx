'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  Home,
  Library,
  Star,
  LayoutGrid,
  MoreHorizontal,
  LogIn,
  X,
  BrainCircuit,
  type LucideIcon,
} from 'lucide-react'
import { buildSections, type CategoryCounts } from './sidebar-config'

type SheetId = null | 'categories' | 'more'

export function MobileNav({ counts, totalCount }: { counts: CategoryCounts; totalCount: number }) {
  const sections = React.useMemo(() => buildSections(counts, totalCount), [counts, totalCount])
  const pathname = usePathname()
  const sp = useSearchParams()
  const search = sp ?? new URLSearchParams()
  const [sheet, setSheet] = useState<SheetId>(null)

  useEffect(() => {
    setSheet(null)
  }, [pathname, sp])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = sheet ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sheet])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheet(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const categoriesSection = sections.find((s) => s.label === 'Categorías')
  const navegarSection = sections.find((s) => s.label === 'Navegar')

  const homeActive = pathname === '/nucleo-de-la-ia'
  const bovedaActive =
    pathname === '/nucleo-de-la-ia/boveda' &&
    !search.get('category') &&
    search.get('featured') !== 'true'
  const featuredActive = pathname === '/nucleo-de-la-ia/boveda' && search.get('featured') === 'true'
  const categoriesActive = pathname === '/nucleo-de-la-ia/boveda' && Boolean(search.get('category'))

  const tabs: Array<{
    key: string
    icon: LucideIcon
    label: string
    href?: string
    sheetId?: SheetId
    active: boolean
  }> = [
    { key: 'inicio', icon: Home, label: 'Inicio', href: '/nucleo-de-la-ia', active: homeActive },
    {
      key: 'categorias',
      icon: LayoutGrid,
      label: 'Categorías',
      sheetId: 'categories',
      active: categoriesActive || sheet === 'categories',
    },
    {
      key: 'destacados',
      icon: Star,
      label: 'Destacados',
      href: '/nucleo-de-la-ia/boveda?featured=true',
      active: featuredActive,
    },
    {
      key: 'mas',
      icon: MoreHorizontal,
      label: 'Más',
      sheetId: 'more',
      active: sheet === 'more',
    },
  ]

  return (
    <>
      {/* Mobile topbar */}
      <header className="ni-m-topbar">
        <Link href="/nucleo-de-la-ia" className="ni-m-brand" aria-label="Núcleo IA — inicio">
          <span className="ni-m-logo" aria-hidden="true">
            <BrainCircuit size={22} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
          </span>
          <span className="ni-m-brand-text">
            núcleo<span style={{ color: 'var(--accent)' }}>.</span>ia
          </span>
        </Link>
      </header>

      {/* Backdrop */}
      {sheet && (
        <div
          className="ni-m-backdrop"
          onClick={() => setSheet(null)}
          aria-hidden="true"
        />
      )}

      {/* Categories sheet */}
      <div
        className={`ni-m-sheet${sheet === 'categories' ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Categorías"
        aria-hidden={sheet !== 'categories'}
      >
        <SheetHandle onClose={() => setSheet(null)} title="Categorías" />
        <div className="ni-m-sheet-body">
          <Link
            href="/nucleo-de-la-ia/boveda"
            className={`ni-m-sheet-link${bovedaActive ? ' is-active' : ''}`}
          >
            <Library size={16} strokeWidth={1.75} />
            <span>Toda la bóveda</span>
            <span className="ni-m-count">{totalCount}</span>
          </Link>
          <div className="ni-m-divider" />
          {categoriesSection?.items.map((item) => {
            const Icon = item.icon
            const active =
              pathname === '/nucleo-de-la-ia/boveda' && search.get('category') === item.matchCategory
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`ni-m-sheet-link${active ? ' is-active' : ''}`}
              >
                <Icon size={16} strokeWidth={1.75} />
                <span>{item.label}</span>
                {typeof item.count === 'number' && (
                  <span className="ni-m-count">{item.count}</span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* More sheet */}
      <div
        className={`ni-m-sheet${sheet === 'more' ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Más opciones"
        aria-hidden={sheet !== 'more'}
      >
        <SheetHandle onClose={() => setSheet(null)} title="Más" />
        <div className="ni-m-sheet-body">
          {navegarSection?.items
            .filter((i) => i.matchPath === '/nucleo-de-la-ia/boveda')
            .map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className="ni-m-sheet-link">
                  <Icon size={16} strokeWidth={1.75} />
                  <span>{item.label}</span>
                  {typeof item.count === 'number' && (
                    <span className="ni-m-count">{item.count}</span>
                  )}
                </Link>
              )
            })}
          <div className="ni-m-divider" />
          <button type="button" className="ni-m-sheet-link as-button" aria-label="Iniciar sesión">
            <LogIn size={16} strokeWidth={1.75} />
            <span>Iniciar sesión</span>
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="ni-m-bottom" aria-label="Navegación principal">
        {tabs.map((tab) => {
          const Icon = tab.icon
          if (tab.href) {
            return (
              <Link
                key={tab.key}
                href={tab.href}
                className={`ni-m-tab${tab.active ? ' is-active' : ''}`}
                aria-current={tab.active ? 'page' : undefined}
              >
                <Icon size={20} strokeWidth={1.75} />
                <span>{tab.label}</span>
              </Link>
            )
          }
          return (
            <button
              key={tab.key}
              type="button"
              className={`ni-m-tab${tab.active ? ' is-active' : ''}`}
              onClick={() => setSheet(tab.sheetId ?? null)}
              aria-expanded={sheet === tab.sheetId}
              aria-controls={tab.sheetId === 'categories' ? 'ni-sheet-categories' : 'ni-sheet-more'}
            >
              <Icon size={20} strokeWidth={1.75} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .ni-m-topbar,
        .ni-m-bottom,
        .ni-m-sheet,
        .ni-m-backdrop { display: none; }

        @media (max-width: 1024px) {
          .ni-m-topbar {
            position: sticky;
            top: 0;
            z-index: 40;
            display: flex;
            align-items: center;
            padding: 0 1rem;
            height: 56px;
            background: var(--navbar-bg-scrolled);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border-subtle);
          }
          .ni-m-brand {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: var(--text-primary);
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: -0.02em;
          }
          .ni-m-logo {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            line-height: 0;
          }
          .ni-m-brand-text { font-size: 1rem; }

          .ni-m-bottom {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 40;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            padding: 0.375rem 0.25rem calc(0.375rem + env(safe-area-inset-bottom, 0));
            background: var(--navbar-bg-scrolled);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-top: 1px solid var(--border-subtle);
          }
          .ni-m-tab {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.2rem;
            height: 52px;
            padding: 0.25rem 0.25rem;
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 0.68rem;
            font-weight: 500;
            text-decoration: none;
            border-radius: var(--radius);
            cursor: pointer;
            transition: color 150ms ease, background 150ms ease;
            min-width: 44px;
          }
          .ni-m-tab:hover { color: var(--text-secondary); }
          .ni-m-tab:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: -2px;
          }
          .ni-m-tab.is-active {
            color: var(--accent);
          }
          .ni-m-tab.is-active span { font-weight: 600; }

          .ni-m-backdrop {
            position: fixed;
            inset: 0;
            z-index: 55;
            display: block;
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(2px);
            animation: ni-fade 180ms ease-out;
          }
          .ni-m-sheet {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 60;
            display: flex;
            flex-direction: column;
            max-height: 78dvh;
            background: var(--bg-surface);
            border-top: 1px solid var(--border-subtle);
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.45);
            transform: translateY(100%);
            transition: transform 240ms cubic-bezier(0.32, 0.72, 0, 1);
            padding-bottom: env(safe-area-inset-bottom, 0);
          }
          .ni-m-sheet.is-open { transform: translateY(0); }

          .ni-m-sheet-handle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            padding: 0.75rem 1rem 0.5rem;
          }
          .ni-m-sheet-handle::before {
            content: '';
            position: absolute;
            top: 0.5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 36px;
            height: 4px;
            border-radius: 9999px;
            background: var(--border-strong);
          }
          .ni-m-sheet-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-top: 0.5rem;
          }
          .ni-m-close {
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
            margin-top: 0.5rem;
          }

          .ni-m-sheet-body {
            overflow-y: auto;
            padding: 0.5rem 0.75rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .ni-m-sheet-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 0.75rem;
            border-radius: var(--radius);
            color: var(--text-secondary);
            font-size: 0.925rem;
            font-weight: 500;
            text-decoration: none;
            background: transparent;
            border: none;
            cursor: pointer;
            text-align: left;
            font-family: inherit;
            min-height: 48px;
            transition: background 150ms ease, color 150ms ease;
          }
          .ni-m-sheet-link:hover,
          .ni-m-sheet-link:focus-visible {
            background: var(--bg-elevated);
            color: var(--text-primary);
            outline: none;
          }
          .ni-m-sheet-link.is-active {
            background: var(--bg-elevated);
            color: var(--accent);
            font-weight: 600;
          }
          .ni-m-sheet-link.as-button { width: 100%; }
          .ni-m-sheet-link > span:nth-child(2) {
            flex: 1;
            min-width: 0;
          }
          .ni-m-count {
            flex-shrink: 0;
            font-size: 0.72rem;
            font-weight: 600;
            color: var(--text-muted);
            background: var(--bg-base);
            border: 1px solid var(--border-subtle);
            padding: 0.12rem 0.5rem;
            border-radius: 9999px;
            font-variant-numeric: tabular-nums;
          }
          .ni-m-sheet-link.is-active .ni-m-count {
            color: var(--accent);
            background: rgba(var(--accent-rgb), 0.1);
            border-color: rgba(var(--accent-rgb), 0.25);
          }
          .ni-m-divider {
            height: 1px;
            background: var(--border-subtle);
            margin: 0.5rem 0;
          }
          .ni-m-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 0.75rem;
          }
          .ni-m-row-label {
            font-size: 0.85rem;
            color: var(--text-secondary);
            font-weight: 500;
          }
        }

        @keyframes ni-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ni-m-sheet,
          .ni-m-backdrop { transition: none; animation: none; }
        }
      ` }} />
    </>
  )
}

function SheetHandle({ onClose, title }: { onClose: () => void; title: string }) {
  return (
    <div className="ni-m-sheet-handle" style={{ position: 'relative' }}>
      <div className="ni-m-sheet-title">{title}</div>
      <button
        type="button"
        className="ni-m-close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X size={16} strokeWidth={1.75} />
      </button>
    </div>
  )
}
