'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, Star, X, ChevronDown, Check } from 'lucide-react'
import { useTranslation } from '@/providers'

const categoryValues = ['all', 'guías', 'skills', 'plugins', 'templates', 'prompts', 'agentes', 'mcp']
const difficultyValues = ['all', 'fácil', 'intermedio', 'avanzado']

interface Option {
  value: string
  label: string
}

/**
 * Dropdown propio (sin <select> nativo del navegador), en el estilo minimal
 * de la web: disparador subrayado + popover animado.
 */
function FilterDropdown({
  options,
  value,
  onChange,
  label,
}: {
  options: Option[]
  value: string
  onChange: (v: string) => void
  label: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = options.find((o) => o.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="nf-dropdown" ref={ref}>
      <button
        type="button"
        className={`nf-trigger${open ? ' is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{current.label}</span>
        <ChevronDown className="nf-chevron" size={15} strokeWidth={1.75} />
      </button>
      {open && (
        <ul className="nf-menu" role="listbox" aria-label={label}>
          {options.map((o) => {
            const active = o.value === value
            return (
              <li key={o.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={`nf-option${active ? ' is-active' : ''}`}
                  onClick={() => {
                    onChange(o.value)
                    setOpen(false)
                  }}
                >
                  <span>{o.label}</span>
                  {active && <Check size={14} strokeWidth={2} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

interface SearchFilterProps {
  totalCount: number
  filteredCount: number
}

export function SearchFilter({ totalCount, filteredCount }: SearchFilterProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categories = categoryValues.map((v) => ({
    value: v,
    label: v === 'all' ? t('nucleo.boveda.optAll') : t(`nucleo.cat.${v}`),
  }))
  const difficulties = difficultyValues.map((v) => ({
    value: v,
    label: v === 'all' ? t('nucleo.boveda.optAllDiff') : t(`nucleo.difficulty.${v}`),
  }))

  const [q, setQ] = useState(searchParams.get('q') ?? '')
  const [category, setCategory] = useState(searchParams.get('category') ?? 'all')
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') ?? 'all')
  const [featured, setFeatured] = useState(searchParams.get('featured') === 'true')

  const updateURL = useCallback(
    (newQ: string, newCategory: string, newDifficulty: string, newFeatured: boolean) => {
      const params = new URLSearchParams()
      if (newQ) params.set('q', newQ)
      if (newCategory && newCategory !== 'all') params.set('category', newCategory)
      if (newDifficulty && newDifficulty !== 'all') params.set('difficulty', newDifficulty)
      if (newFeatured) params.set('featured', 'true')
      const queryString = params.toString()
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
    },
    [router, pathname]
  )

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(q, category, difficulty, featured)
    }, 300)
    return () => clearTimeout(timer)
  }, [q, category, difficulty, featured, updateURL])

  const activeFilters =
    (q ? 1 : 0) +
    (category !== 'all' ? 1 : 0) +
    (difficulty !== 'all' ? 1 : 0) +
    (featured ? 1 : 0)

  const clearFilters = () => {
    setQ('')
    setCategory('all')
    setDifficulty('all')
    setFeatured(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .search-filter-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .filter-row {
          display: flex;
          gap: 1.5rem 2rem;
          align-items: flex-end;
          flex-wrap: wrap;
        }
        /* Search — estilo web: transparente, subrayado, texto grande */
        .search-input-wrapper {
          flex: 1;
          min-width: 240px;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 0;
          color: var(--text-muted);
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          border-radius: 0;
          color: var(--text-primary);
          padding: 0.5rem 0 0.5rem 1.75rem;
          font-size: 1.05rem;
          outline: none;
          font-family: inherit;
          transition: border-color 300ms cubic-bezier(0.1, 0, 0.3, 1);
        }
        .search-input::placeholder { color: var(--text-muted); }
        .search-input:focus { border-bottom-color: var(--text-primary); }

        /* Dropdown propio */
        .nf-dropdown { position: relative; }
        .nf-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 140px;
          justify-content: space-between;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          border-radius: 0;
          color: var(--text-secondary);
          padding: 0.5rem 0.15rem;
          font-size: 1.05rem;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 300ms cubic-bezier(0.1, 0, 0.3, 1), color 200ms ease;
        }
        .nf-trigger:hover, .nf-trigger.is-open { color: var(--text-primary); border-bottom-color: var(--text-primary); }
        .nf-chevron { transition: transform 300ms cubic-bezier(0.1, 0, 0.3, 1); flex-shrink: 0; }
        .nf-trigger.is-open .nf-chevron { transform: rotate(180deg); }
        .nf-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          z-index: 30;
          min-width: 100%;
          list-style: none;
          margin: 0;
          padding: 0.35rem;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: 0 12px 32px -12px rgba(var(--shadow-color), calc(0.5 * var(--shadow-strength)));
          animation: nf-pop 180ms cubic-bezier(0.1, 0, 0.3, 1);
        }
        @keyframes nf-pop {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nf-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          width: 100%;
          background: transparent;
          border: none;
          border-radius: var(--radius);
          color: var(--text-secondary);
          padding: 0.5rem 0.65rem;
          font-size: 0.9rem;
          font-family: inherit;
          cursor: pointer;
          white-space: nowrap;
          transition: background 150ms ease, color 150ms ease;
        }
        .nf-option:hover { background: var(--bg-elevated); color: var(--text-primary); }
        .nf-option.is-active { color: var(--text-primary); font-weight: 600; }

        /* Botones de texto estilo web (subrayado en hover/activo) */
        .nf-textbtn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          border-bottom: 1px solid transparent;
          border-radius: 0;
          padding: 0.5rem 0.15rem;
          font-size: 1.05rem;
          font-family: inherit;
          color: var(--text-muted);
          cursor: pointer;
          white-space: nowrap;
          transition: color 200ms ease, border-color 300ms cubic-bezier(0.1, 0, 0.3, 1);
        }
        .nf-textbtn:hover { color: var(--text-primary); border-bottom-color: var(--text-primary); }
        .nf-textbtn.active { color: var(--text-primary); border-bottom-color: var(--text-primary); }

        .results-count { font-size: 0.85rem; color: var(--text-muted); }
        .results-count strong { color: var(--text-secondary); }

        .nf-trigger:focus-visible, .nf-option:focus-visible,
        .nf-textbtn:focus-visible, .search-input:focus-visible {
          outline: 2px solid var(--text-primary);
          outline-offset: 3px;
        }
        @media (max-width: 640px) {
          .search-filter-container { gap: 1rem; }
          /* Compacto: buscador ancho arriba, dropdowns lado a lado, botones inline */
          .filter-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.85rem 1rem;
            align-items: end;
          }
          .search-input-wrapper { grid-column: 1 / -1; min-width: unset; }
          .search-input { font-size: 1rem; }
          .nf-dropdown { min-width: unset; }
          .nf-trigger { width: 100%; min-width: unset; font-size: 0.95rem; padding: 0.5rem 0; }
          .nf-menu { min-width: 160px; max-width: 72vw; }
          .nf-textbtn { justify-content: flex-start; font-size: 0.95rem; padding: 0.4rem 0; }
          .results-count { font-size: 0.8rem; }
        }
      ` }} />

      <div className="search-filter-container">
        <div className="filter-row">
          {/* Search */}
          <div className="search-input-wrapper">
            <span className="search-icon">
              <Search size={16} strokeWidth={1.75} />
            </span>
            <input
              type="text"
              placeholder={t('nucleo.boveda.search')}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category */}
          <FilterDropdown
            options={categories}
            value={category}
            onChange={setCategory}
            label="Filtrar por categoría"
          />

          {/* Difficulty */}
          <FilterDropdown
            options={difficulties}
            value={difficulty}
            onChange={setDifficulty}
            label="Filtrar por dificultad"
          />

          {/* Featured toggle */}
          <button
            onClick={() => setFeatured(!featured)}
            className={`nf-textbtn${featured ? ' active' : ''}`}
            type="button"
          >
            <Star size={15} strokeWidth={1.75} fill={featured ? 'currentColor' : 'none'} />
            {t('nucleo.boveda.featured')}
          </button>

          {/* Clear */}
          {activeFilters > 0 && (
            <button onClick={clearFilters} className="nf-textbtn" type="button">
              <X size={14} strokeWidth={1.75} />
              {t('nucleo.boveda.clear')} ({activeFilters})
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="results-count">
          {t('nucleo.boveda.showing')} <strong>{filteredCount}</strong> {t('nucleo.boveda.of')}{' '}
          <strong>{totalCount}</strong> {t('nucleo.boveda.resources')}
          {activeFilters > 0 && ` ${t('nucleo.boveda.filtersActive')}`}
        </p>
      </div>
    </>
  )
}
