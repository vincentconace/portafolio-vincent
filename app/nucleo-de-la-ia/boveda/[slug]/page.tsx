import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Tag, Download, Star } from 'lucide-react'
import remarkGfm from 'remark-gfm'

function GithubMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  )
}
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getRecursoBySlug, getAllSlugs, getAllRecursos, extractHeadings } from '@nucleo/lib/mdx'
import { toRecursoCardData } from '@nucleo/lib/recursos'
import { TableOfContents } from '@nucleo/components/recurso/table-of-contents'
import { DifficultyBadge } from '@nucleo/components/boveda/difficulty-badge'
import { Badge } from '@nucleo/components/ui/badge'
import { RecursoCard } from '@nucleo/components/boveda/recurso-card'
import { getMDXComponents } from '@nucleo/components/recurso/mdx-components'
import { T, LocalizedText, LocalizedMDX, LocalizedDate } from '@nucleo/components/i18n/t'

interface RecursoPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: RecursoPageProps): Promise<Metadata> {
  const { slug } = await params
  const recurso = getRecursoBySlug(slug)
  if (!recurso) return {}

  return {
    title: recurso.title,
    description: recurso.description,
    openGraph: {
      title: recurso.title,
      description: recurso.description,
      type: 'article',
    },
  }
}

const categoryLabels: Record<string, string> = {
  guías: 'Guías',
  plugins: 'Plugins',
  skills: 'Skills',
  templates: 'Templates',
  prompts: 'Prompts',
}

export default async function RecursoPage({ params }: RecursoPageProps) {
  const { slug } = await params
  const recurso = getRecursoBySlug(slug)

  if (!recurso) notFound()

  const headings = extractHeadings(recurso.content)
  const headingsEn =
    recurso.content_en && recurso.content_en !== recurso.content
      ? extractHeadings(recurso.content_en)
      : undefined
  const allRecursos = getAllRecursos()
  const related = recurso.relatedSlugs && recurso.relatedSlugs.length > 0
    ? recurso.relatedSlugs
        .map((s) => allRecursos.find((r) => r.slug === s))
        .filter(Boolean)
    : allRecursos
        .filter((r) => r.slug !== slug && r.category === recurso.category)
        .slice(0, 3)

  const components = getMDXComponents()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .recurso-layout {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .recurso-page {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 3rem;
          padding: 2.5rem 0 5rem;
          align-items: start;
        }
        .recurso-toc {
          display: block;
          align-self: stretch;
        }
        .recurso-main {
          min-width: 0;
        }
        .recurso-content-wrapper {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          line-height: 1.75;
        }
        .meta-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }
        .tool-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 500;
          background: var(--bg-elevated);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          font-family: var(--font-mono), monospace;
        }
        .resource-title {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 0.875rem;
        }
        .resource-description {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          max-width: 680px;
        }
        .resource-meta-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          padding: 1rem 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 2.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .resource-meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .related-section {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 1024px) {
          .recurso-page {
            grid-template-columns: 1fr;
          }
          .recurso-toc {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .recurso-page { padding: 1.5rem 0 3rem; }
        }
      ` }} />

      <div className="recurso-layout">
        {/* Breadcrumb */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1.5rem 0 0',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <Link href="/nucleo-de-la-ia" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 150ms ease' }}>
            <T k="nucleo.recurso.home" />
          </Link>
          <span>/</span>
          <Link href="/nucleo-de-la-ia/boveda" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 150ms ease' }}>
            <T k="nucleo.recurso.boveda" />
          </Link>
          <span>/</span>
          <Link
            href={`/nucleo-de-la-ia/boveda?category=${recurso.category}`}
            style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 150ms ease' }}
          >
            <T k={`nucleo.cat.${recurso.category}`} />
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            <LocalizedText es={recurso.title} en={recurso.title_en} />
          </span>
        </nav>

        <div className="recurso-page">
          {/* TOC — left column */}
          <aside className="recurso-toc">
            <TableOfContents headings={headings} headingsEn={headingsEn} />
          </aside>

          {/* Main content — right column */}
          <div className="recurso-main">
            {/* Meta badges */}
            <div className="meta-bar">
              <DifficultyBadge difficulty={recurso.difficulty} />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <T k={`nucleo.cat.${recurso.category}`} />
              </span>
              {recurso.badge && (
                <Badge variant={recurso.badge === 'nuevo' ? 'new' : recurso.badge === 'actualizado' ? 'updated' : 'popular'}>
                  <T k={`nucleo.badge.${recurso.badge}`} />
                </Badge>
              )}
              {recurso.featured && (
                <Badge variant="featured">
                  <Star size={11} strokeWidth={2} fill="currentColor" /> <T k="nucleo.badge.destacado" />
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="resource-title"><LocalizedText es={recurso.title} en={recurso.title_en} /></h1>
            <p className="resource-description"><LocalizedText es={recurso.description} en={recurso.description_en} /></p>

            {/* Meta row */}
            <div className="resource-meta-row">
              {recurso.publishedAt && (
                <span className="resource-meta-item">
                  <Calendar size={12} strokeWidth={1.6} />
                  <LocalizedDate iso={recurso.publishedAt} />
                </span>
              )}
              {recurso.readingTime && (
                <span className="resource-meta-item">
                  <Clock size={12} strokeWidth={1.6} />
                  {recurso.readingTime} <T k="nucleo.recurso.reading" />
                </span>
              )}
              {recurso.version && (
                <span className="resource-meta-item">
                  <Tag size={12} strokeWidth={1.6} />
                  {recurso.version}
                </span>
              )}
              {recurso.tools.map((tool) => (
                <span key={tool} className="tool-tag">{tool}</span>
              ))}

              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
                {recurso.github && (
                  <a
                    href={recurso.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 150ms ease',
                    }}
                  >
                    <GithubMark size={14} />
                    GitHub
                  </a>
                )}
                {recurso.downloadUrl && (
                  <a
                    href={recurso.downloadUrl}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      transition: 'color 150ms ease',
                    }}
                  >
                    <Download size={13} strokeWidth={1.6} />
                    <T k="nucleo.recurso.download" />
                  </a>
                )}
              </div>
            </div>

            {/* MDX Content — es/en si existe traducción, si no solo es */}
            <div className="recurso-content-wrapper prose">
              {recurso.content_en && recurso.content_en !== recurso.content ? (
                <LocalizedMDX
                  es={
                    <MDXRemote
                      source={recurso.content}
                      components={components}
                      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    />
                  }
                  en={
                    <MDXRemote
                      source={recurso.content_en}
                      components={components}
                      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    />
                  }
                />
              ) : (
                <MDXRemote
                  source={recurso.content}
                  components={components}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              )}
            </div>

            {/* Related resources */}
            {related.length > 0 && (
              <div className="related-section">
                <h2
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.375rem',
                  }}
                >
                  <T k="nucleo.recurso.related" />
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  <T k="nucleo.recurso.relatedDesc" />
                </p>
                <div className="related-grid">
                  {related.filter(Boolean).map((r) => r && (
                    <RecursoCard key={r.slug} recurso={toRecursoCardData(r)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
