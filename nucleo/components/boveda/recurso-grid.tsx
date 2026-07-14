'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { SearchX } from 'lucide-react'
import { useTranslation } from '@/providers'
import { RecursoCardData } from '@nucleo/lib/types'
import { RecursoCard } from './recurso-card'

interface RecursoGridProps {
  recursos: RecursoCardData[]
  pageSize?: number
}

const DEFAULT_PAGE_SIZE = 24

export function RecursoGrid({ recursos, pageSize = DEFAULT_PAGE_SIZE }: RecursoGridProps) {
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(pageSize)

  // Reiniciar la paginación cuando cambia la lista filtrada (nuevas props del server).
  // `recursos` solo cambia de identidad al navegar/filtrar, no en re-renders de estado.
  useEffect(() => {
    setVisibleCount(pageSize)
  }, [recursos, pageSize])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + pageSize)
  }, [pageSize])

  const visibleRecursos = recursos.slice(0, visibleCount)
  const hasMore = visibleCount < recursos.length

  if (recursos.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 2rem',
          gap: '1rem',
          textAlign: 'center',
        }}
      >
        <SearchX size={56} strokeWidth={1.25} style={{ color: 'var(--text-muted)' }} aria-hidden />
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: '0.5rem',
          }}
        >
          {t('nucleo.boveda.emptyTitle')}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '380px', lineHeight: 1.6 }}>
          {t('nucleo.boveda.emptyDesc')}
        </p>
      </div>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .recurso-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }
        .recurso-grid-item {
          animation: fade-in-up 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) both;
        }
        .recurso-grid-item.featured-item {
          grid-column: span 1;
        }
        @media (min-width: 1024px) {
          .recurso-grid-item.featured-item:nth-child(1) {
            grid-column: span 2;
          }
        }
        @media (max-width: 640px) {
          .recurso-grid {
            grid-template-columns: 1fr;
          }
        }
        .load-more-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
        }
        .load-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 2rem;
          border-radius: 9999px;
          border: 1px solid var(--text-primary);
          background: var(--text-primary);
          color: var(--text-inverse);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform var(--transition), box-shadow var(--transition);
          font-family: inherit;
        }
        .load-more-btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 12px 28px -10px rgba(var(--shadow-color), 0.55);
        }
        .load-more-btn:active { transform: translateY(0) scale(0.98); }
        .load-more-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .load-more-count {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
      ` }} />
      <div className="recurso-grid">
        {visibleRecursos.map((recurso, index) => (
          <div
            key={recurso.slug}
            className={`recurso-grid-item${recurso.featured ? ' featured-item' : ''}`}
            style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
          >
            <RecursoCard recurso={recurso} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrapper">
          <button
            type="button"
            className="load-more-btn"
            onClick={handleLoadMore}
            aria-label={t('nucleo.boveda.loadMore')}
          >
            {t('nucleo.boveda.loadMore')}
          </button>
          <span className="load-more-count">
            {t('nucleo.boveda.showing')} {visibleRecursos.length} {t('nucleo.boveda.of')} {recursos.length}
          </span>
        </div>
      )}
    </>
  )
}
