import { Recurso, RecursoFilters, RecursoCardData } from './types'

/**
 * Proyecta un Recurso a su versión liviana para tarjetas (sin `content`).
 * Aplicar antes de pasar datos a componentes cliente (grid, destacados, relacionados).
 */
export function toRecursoCardData(recurso: Recurso): RecursoCardData {
  const { content: _content, content_en: _contentEn, ...rest } = recurso
  return rest
}

export function filterRecursos(recursos: Recurso[], filters: RecursoFilters): Recurso[] {
  return recursos.filter((recurso) => {
    // Text search — title, description, tools
    if (filters.q && filters.q.trim() !== '') {
      const q = filters.q.toLowerCase().trim()
      const inTitle = recurso.title.toLowerCase().includes(q)
      const inDescription = recurso.description.toLowerCase().includes(q)
      const inTools = recurso.tools.some((t) => t.toLowerCase().includes(q))
      if (!inTitle && !inDescription && !inTools) return false
    }

    // Category filter
    if (filters.category && filters.category !== '' && filters.category !== 'all') {
      if (recurso.category !== filters.category) return false
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty !== '' && filters.difficulty !== 'all') {
      if (recurso.difficulty !== filters.difficulty) return false
    }

    // Featured filter
    if (filters.featured === true) {
      if (!recurso.featured) return false
    }

    return true
  })
}

export function sortRecursos(recursos: Recurso[]): Recurso[] {
  return [...recursos].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    if (a.featured && b.featured) {
      const aOrder = a.featuredOrder ?? 999
      const bOrder = b.featuredOrder ?? 999
      if (aOrder !== bOrder) return aOrder - bOrder
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

export function getFeaturedRecursos(recursos: Recurso[], limit = 3): Recurso[] {
  return recursos
    .filter((r) => r.featured)
    .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999))
    .slice(0, limit)
}

export function getCategoryCounts(
  recursos: Recurso[]
): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const r of recursos) {
    counts[r.category] = (counts[r.category] ?? 0) + 1
  }
  return counts
}
