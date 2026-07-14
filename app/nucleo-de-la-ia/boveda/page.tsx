import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllRecursos } from '@nucleo/lib/mdx'
import { filterRecursos, sortRecursos, toRecursoCardData } from '@nucleo/lib/recursos'
import { SearchFilter } from '@nucleo/components/boveda/search-filter'
import { RecursoGrid } from '@nucleo/components/boveda/recurso-grid'
import { T } from '@nucleo/components/i18n/t'

const CATEGORY_KEYS = new Set(['guías', 'skills', 'plugins', 'templates', 'prompts', 'agentes', 'mcp'])

export const metadata: Metadata = {
  title: 'Bóveda de Recursos',
  description:
    'Explora todos los recursos de Núcleo IA: guías, plugins, templates, prompts y skills de inteligencia artificial en español.',
}

interface BovedaPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    difficulty?: string
    featured?: string
  }>
}

const CATEGORY_META: Record<string, { title: string; description: string; eyebrow: string }> = {
  'guías': {
    eyebrow: 'Categoría · Guías',
    title: 'Guías paso a paso',
    description: 'Tutoriales en español para llevarte de cero a producción con las últimas herramientas de IA.',
  },
  skills: {
    eyebrow: 'Categoría · Skills',
    title: 'Skills para Claude',
    description: 'Capacidades reutilizables que extienden a Claude con conocimiento, instrucciones y archivos.',
  },
  plugins: {
    eyebrow: 'Categoría · Plugins',
    title: 'Plugins',
    description: 'Integraciones y extensiones listas para acoplar a tu flujo con IA.',
  },
  templates: {
    eyebrow: 'Categoría · Templates',
    title: 'Templates',
    description: 'Plantillas listas para clonar y adaptar a tu próximo proyecto.',
  },
  prompts: {
    eyebrow: 'Categoría · Prompts',
    title: 'Prompts curados',
    description: 'Prompts probados para tareas concretas: redacción, análisis, diseño, código y más.',
  },
  agentes: {
    eyebrow: 'Categoría · Agentes',
    title: 'Agentes especializados',
    description: 'Sub-agentes con rol, herramientas y contexto definidos para tareas específicas.',
  },
  mcp: {
    eyebrow: 'Categoría · MCPs',
    title: 'Servidores MCP',
    description: 'Servidores Model Context Protocol para conectar Claude a servicios externos.',
  },
}

export default async function BovedaPage({ searchParams }: BovedaPageProps) {
  const params = await searchParams
  const allRecursos = getAllRecursos()
  const sorted = sortRecursos(allRecursos)

  const filters = {
    q: params.q,
    category: params.category,
    difficulty: params.difficulty,
    featured: params.featured === 'true',
  }

  const filtered = filterRecursos(sorted, filters)

  const metaKeys =
    filters.category && CATEGORY_KEYS.has(filters.category)
      ? {
          eyebrow: `nucleo.cat.${filters.category}`,
          title: `nucleo.catMeta.${filters.category}Title`,
          description: `nucleo.catMeta.${filters.category}Desc`,
        }
      : filters.featured
        ? {
            eyebrow: 'nucleo.boveda.featuredEyebrow',
            title: 'nucleo.boveda.featuredTitle',
            description: 'nucleo.boveda.featuredDesc',
          }
        : {
            eyebrow: 'nucleo.boveda.eyebrow',
            title: 'nucleo.boveda.title',
            description: 'nucleo.boveda.desc',
          }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .boveda-header {
          padding: 2.5rem 0 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .boveda-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .boveda-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
          line-height: 1.15;
        }
        .boveda-subtitle {
          font-size: 0.9375rem;
          color: var(--text-muted);
          max-width: 620px;
          line-height: 1.6;
        }
        .boveda-shell {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 3vw, 2rem);
        }
      ` }} />

      <div className="boveda-header">
        <div className="boveda-shell">
          <div className="boveda-eyebrow"><T k={metaKeys.eyebrow} /></div>
          <h1 className="boveda-title"><T k={metaKeys.title} /></h1>
          <p className="boveda-subtitle"><T k={metaKeys.description} /></p>
        </div>
      </div>

      <div className="boveda-shell" style={{ padding: '1.75rem clamp(1rem, 3vw, 2rem) 4rem' }}>
        <Suspense fallback={null}>
          <div style={{ marginBottom: '1.75rem' }}>
            <SearchFilter totalCount={allRecursos.length} filteredCount={filtered.length} />
          </div>
        </Suspense>

        <RecursoGrid recursos={filtered.map(toRecursoCardData)} />
      </div>
    </>
  )
}
