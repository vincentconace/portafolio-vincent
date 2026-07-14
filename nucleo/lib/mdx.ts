import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import matter from 'gray-matter'
import { Recurso, Heading, Category, CATEGORIES } from './types'

function normalizeCategory(raw: unknown): Category {
  const c = String(raw ?? '').trim().toLowerCase()
  if (c === 'guides' || c === 'guias' || c === 'guia' || c === 'guía') return 'guías'
  if (c === 'mcps' || c === 'mcp') return 'mcp'
  if (c === 'agents' || c === 'agentes' || c === 'agente') return 'agentes'
  return (CATEGORIES as readonly string[]).includes(c) ? (c as Category) : 'guías'
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'recursos')
const CONTENT_DIR_EN = path.join(process.cwd(), 'content', 'recursos-en')

function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
}

/**
 * Lee la versión en inglés de un recurso (content/recursos-en/<slug>.mdx).
 * Devuelve null si no existe (→ fallback al español).
 */
function readEn(slug: string): { title?: string; description?: string; content: string } | null {
  const p = path.join(CONTENT_DIR_EN, `${slug}.mdx`)
  if (!fs.existsSync(p)) return null
  const raw = fs.readFileSync(p, 'utf-8')
  const { data, content } = matter(raw)
  return { title: data.title, description: data.description, content }
}

// Memoizado por request con React cache(): evita releer/parsear los 457 .mdx
// varias veces dentro de un mismo render (page + layout + helpers).
export const getAllRecursos = cache((): Recurso[] => {
  const files = ensureContentDir()

  const recursos = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const fullPath = path.join(CONTENT_DIR, filename)
    const raw = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(raw)
    const en = readEn(slug)

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      title_en: en?.title ?? data.title ?? slug,
      description_en: en?.description ?? data.description ?? '',
      content_en: '', // no se necesita el cuerpo en la lista/cards
      difficulty: data.difficulty ?? 'fácil',
      category: normalizeCategory(data.category),
      tools: data.tools ?? [],
      featured: data.featured ?? false,
      featuredOrder: data.featuredOrder,
      badge: data.badge,
      version: data.version,
      downloadUrl: data.downloadUrl,
      github: data.github,
      publishedAt: data.publishedAt ?? new Date().toISOString().split('T')[0],
      readingTime: data.readingTime,
      author: data.author,
      relatedSlugs: data.relatedSlugs ?? [],
      content,
    } as Recurso
  })

  return sortRecursosByDefault(recursos)
})

function sortRecursosByDefault(recursos: Recurso[]): Recurso[] {
  return recursos.sort((a, b) => {
    // Featured first, by featuredOrder
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    if (a.featured && b.featured) {
      const aOrder = a.featuredOrder ?? 999
      const bOrder = b.featuredOrder ?? 999
      if (aOrder !== bOrder) return aOrder - bOrder
    }
    // Then by publishedAt desc
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

export function getRecursoBySlug(slug: string): Recurso | null {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)
  const en = readEn(slug)

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    title_en: en?.title ?? data.title ?? slug,
    description_en: en?.description ?? data.description ?? '',
    content_en: en?.content ?? content,
    difficulty: data.difficulty ?? 'fácil',
    category: data.category ?? 'guías',
    tools: data.tools ?? [],
    featured: data.featured ?? false,
    featuredOrder: data.featuredOrder,
    badge: data.badge,
    version: data.version,
    downloadUrl: data.downloadUrl,
    github: data.github,
    publishedAt: data.publishedAt ?? new Date().toISOString().split('T')[0],
    readingTime: data.readingTime,
    author: data.author,
    relatedSlugs: data.relatedSlugs ?? [],
    content,
  } as Recurso
}

export function getAllSlugs(): string[] {
  const files = ensureContentDir()
  return files.map((f) => f.replace(/\.mdx$/, ''))
}

export function getRecursosByCategory(category: string): Recurso[] {
  return getAllRecursos().filter((r) => r.category === category)
}

/** Limpia la sintaxis markdown inline del texto de un encabezado (para la TOC). */
function cleanHeadingText(raw: string): string {
  return raw
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // imágenes
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → solo el texto
    .replace(/`([^`]+)`/g, '$1') // código inline
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // negrita
    .replace(/(\*|_)([^*_]+)\1/g, '$2') // itálica
    .replace(/<[^>]+>/g, '') // tags HTML/JSX
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const cleanText = cleanHeadingText(match[2].trim())
    const id = cleanText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    headings.push({ id, text: cleanText, level })
  }

  return headings
}
