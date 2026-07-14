export const CATEGORIES = [
  'guías',
  'skills',
  'plugins',
  'templates',
  'prompts',
  'agentes',
  'mcp',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Recurso {
  slug: string
  title: string
  description: string
  title_en: string
  description_en: string
  difficulty: 'fácil' | 'intermedio' | 'avanzado'
  category: Category

  tools: string[]
  featured: boolean
  featuredOrder?: number
  badge?: 'nuevo' | 'actualizado' | 'popular'
  version?: string
  downloadUrl?: string
  github?: string
  publishedAt: string
  readingTime?: string
  author?: string
  relatedSlugs?: string[]
  content: string
  content_en: string
}

// Proyección liviana para las tarjetas: igual a Recurso pero sin el cuerpo MDX
// (ni es ni en). Evita serializar ~3.5MB de `content` al cliente.
export type RecursoCardData = Omit<Recurso, 'content' | 'content_en'>

export interface Heading {
  id: string
  text: string
  level: number
}

export interface RecursoFilters {
  q?: string
  category?: string
  difficulty?: string
  featured?: boolean
}
