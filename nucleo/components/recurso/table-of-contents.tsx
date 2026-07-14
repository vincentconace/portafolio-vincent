'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ListTree, ChevronDown } from 'lucide-react'
import { Heading } from '@nucleo/lib/types'
import { useTranslation } from '@/providers'
import { useLang } from '@nucleo/components/i18n/t'

interface TableOfContentsProps {
  headings: Heading[]
  headingsEn?: Heading[]
}

export function TableOfContents({ headings, headingsEn }: TableOfContentsProps) {
  const { t } = useTranslation()
  const lang = useLang()
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false })
  const listRef = useRef<HTMLDivElement>(null)

  const source = lang === 'en' && headingsEn && headingsEn.length > 0 ? headingsEn : headings
  const filteredHeadings = source.filter((h) => h.level === 2 || h.level === 3)

  // `filteredHeadings` es un array nuevo por render → guardamos una referencia
  // estable y usamos una clave por ids para no re-suscribir el scroll en cada render.
  const filteredRef = useRef(filteredHeadings)
  filteredRef.current = filteredHeadings
  const headingKey = filteredHeadings.map((h) => h.id).join('|')

  // Scrollspy robusto: el activo es el último encabezado cuyo tope quedó por
  // encima de la línea de lectura (scrollY + 120). Siempre marca algo (por
  // defecto el primero), así el indicador nunca desaparece. rAF para fluidez.
  useEffect(() => {
    const items = filteredRef.current
    if (items.length === 0) return

    let raf = 0
    const compute = () => {
      raf = 0
      const line = window.scrollY + 120
      let current = items[0].id
      for (const h of items) {
        const el = document.getElementById(h.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = h.id
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [headingKey])

  // Reposiciona el "thumb" (indicador estás-acá) sobre el item activo → se desliza.
  const measure = useCallback(() => {
    const list = listRef.current
    if (!list) return
    const el = list.querySelector<HTMLElement>('.toc-item.active')
    if (el && !isCollapsed) {
      setThumb({ top: el.offsetTop, height: el.offsetHeight, visible: true })
    } else {
      setThumb((prev) => ({ ...prev, visible: false }))
    }
  }, [isCollapsed])

  useEffect(() => {
    measure()
  }, [activeId, isCollapsed, lang, filteredHeadings.length, measure])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const handleClick = (id: string) => {
    setActiveId(id)
    const el = document.getElementById(id)
    if (el) {
      const offset = 96
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (filteredHeadings.length === 0) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .toc-wrapper {
          position: sticky;
          top: 96px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: var(--border-strong) transparent;
        }
        .toc-wrapper::-webkit-scrollbar { width: 6px; }
        .toc-wrapper::-webkit-scrollbar-thumb {
          background: var(--border-strong);
          border-radius: 9999px;
        }
        .toc-container {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(var(--shadow-color), calc(0.3 * var(--shadow-strength)));
        }
        /* Cabecera = overline fino + chevron (colapsa) */
        .toc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          background: none;
          border: none;
          border-bottom: 1px solid var(--border-subtle);
          cursor: pointer;
          user-select: none;
          font-family: inherit;
          text-align: left;
          transition: background 300ms cubic-bezier(0.1, 0, 0.3, 1);
        }
        .toc-header:hover { background: var(--bg-elevated); }
        .toc-title {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .toc-title svg { color: var(--text-secondary); }
        .toc-chevron {
          color: var(--text-muted);
          flex-shrink: 0;
          transition: transform 300ms cubic-bezier(0.1, 0, 0.3, 1);
        }
        .toc-chevron[data-collapsed="true"] { transform: rotate(-90deg); }

        /* Colapsable animado (truco grid-template-rows 1fr → 0fr) */
        .toc-collapse {
          display: grid;
          grid-template-rows: 1fr;
          transition: grid-template-rows 350ms cubic-bezier(0.1, 0, 0.3, 1);
        }
        .toc-collapse.collapsed { grid-template-rows: 0fr; }
        .toc-collapse-inner { overflow: hidden; }

        .toc-body { padding: 0.7rem 0.85rem 0.8rem; }
        .toc-list { position: relative; }

        /* Riel vertical + thumb de tinta que se desliza al item activo */
        .toc-rail {
          position: absolute;
          left: 3px;
          top: 2px;
          bottom: 2px;
          width: 1.5px;
          border-radius: 9999px;
          background: var(--border);
        }
        .toc-thumb {
          position: absolute;
          left: 2px;
          top: 0;
          width: 3px;
          border-radius: 9999px;
          background: var(--text-primary);
          opacity: 0;
          transition: transform 420ms cubic-bezier(0.1, 0, 0.3, 1),
                      height 420ms cubic-bezier(0.1, 0, 0.3, 1),
                      opacity 260ms ease;
          pointer-events: none;
        }
        .toc-thumb.on { opacity: 1; }

        .toc-item {
          position: relative;
          display: block;
          width: 100%;
          padding: 0.42rem 0.5rem 0.42rem 1.15rem;
          font-size: 0.85rem;
          line-height: 1.45;
          color: var(--text-muted);
          text-align: left;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
          transition: color 300ms cubic-bezier(0.1, 0, 0.3, 1),
                      padding-left 300ms cubic-bezier(0.1, 0, 0.3, 1);
        }
        .toc-item:hover { color: var(--text-secondary); padding-left: 1.35rem; }
        .toc-item.active { color: var(--text-primary); font-weight: 500; }
        .toc-item.level-3 { padding-left: 1.85rem; font-size: 0.82rem; }
        .toc-item.level-3:hover { padding-left: 2.05rem; }

        @media (max-width: 1024px) {
          .toc-wrapper { position: static; max-height: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .toc-thumb, .toc-item, .toc-collapse, .toc-chevron, .toc-header {
            transition: none;
          }
          .toc-wrapper { scroll-behavior: auto; }
        }
      ` }} />
      <nav className="toc-wrapper" aria-label={t('nucleo.widgets.toc')}>
        <div className="toc-container">
          <button
            type="button"
            className="toc-header"
            onClick={() => setIsCollapsed((v) => !v)}
            aria-expanded={!isCollapsed}
          >
            <span className="toc-title">
              <ListTree size={13} strokeWidth={1.75} />
              {t('nucleo.widgets.onThisPage')}
            </span>
            <ChevronDown
              className="toc-chevron"
              size={14}
              strokeWidth={1.75}
              data-collapsed={isCollapsed}
            />
          </button>

          <div className={`toc-collapse${isCollapsed ? ' collapsed' : ''}`}>
            <div className="toc-collapse-inner">
              <div className="toc-body">
                <div className="toc-list" ref={listRef}>
                  <span className="toc-rail" aria-hidden />
                  <span
                    className={`toc-thumb${thumb.visible ? ' on' : ''}`}
                    aria-hidden
                    style={{ transform: `translateY(${thumb.top}px)`, height: `${thumb.height}px` }}
                  />
                  {filteredHeadings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => handleClick(heading.id)}
                      className={`toc-item${heading.level === 3 ? ' level-3' : ''}${activeId === heading.id ? ' active' : ''}`}
                    >
                      {heading.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
