import React, { ElementType } from 'react'
import { ExternalLink } from 'lucide-react'
import { CodeBlock } from './code-block'
import { StepIndicator } from './step-indicator'
import { PrerequisitesChecklist } from './prerequisites-checklist'
import { ProviderSelector } from './provider-selector'
import { ProjectPicker, ProjectGallery } from './nucleo-web'
import { PlanningPrompts } from './planning-prompts'
import type { MDXComponents } from 'mdx/types'

// Callout variants
type CalloutType = 'info' | 'warning' | 'tip' | 'danger'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const calloutConfig: Record<CalloutType, { icon: string; color: string; bg: string; border: string }> = {
  info: {
    icon: 'ℹ️',
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
  },
  warning: {
    icon: '⚠️',
    color: '#fbbf24',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
  },
  tip: {
    icon: '💡',
    color: '#4ade80',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
  },
  danger: {
    icon: '🚨',
    color: '#f87171',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
  },
}

function Callout({ type = 'info', title, children }: CalloutProps) {
  const cfg = calloutConfig[type]
  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        margin: '1.25rem 0',
        borderLeft: `4px solid ${cfg.color}`,
      }}
    >
      {title && (
        <div
          style={{
            fontWeight: 700,
            fontSize: '0.875rem',
            color: cfg.color,
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          {cfg.icon} {title}
        </div>
      )}
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  )
}

// Slugify for heading IDs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Aplana los children de React a texto plano (para IDs de encabezados que
// contienen links, negritas, código, etc.).
function flattenText(node: React.ReactNode): string {
  if (node == null || node === false || node === true) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flattenText).join('')
  if (React.isValidElement(node)) return flattenText((node.props as { children?: React.ReactNode }).children)
  return ''
}

// Heading with anchor
function HeadingWithAnchor({ level, children }: { level: 2 | 3; children: React.ReactNode }) {
  const text = flattenText(children)
  const id = slugify(text)
  const Tag = `h${level}` as ElementType
  const size = level === 2 ? '1.375rem' : '1.15rem'
  const mt = level === 2 ? '2.5rem' : '2rem'

  return (
    <Tag
      id={id}
      style={{
        fontSize: size,
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginTop: mt,
        marginBottom: '0.75rem',
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
        scrollMarginTop: '96px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        borderBottom: level === 2 ? '1px solid var(--border-subtle)' : 'none',
        paddingBottom: level === 2 ? '0.5rem' : '0',
      }}
    >
      <span>{children}</span>
      <a
        href={`#${id}`}
        style={{
          color: 'var(--text-muted)',
          opacity: 0,
          textDecoration: 'none',
          fontSize: '0.7em',
          transition: 'opacity 150ms ease',
          fontWeight: 400,
        }}
        className="heading-anchor"
        aria-label="Link to section"
      >
        #
      </a>
    </Tag>
  )
}

// External link icon
function ExternalIcon() {
  return (
    <ExternalLink
      size={11}
      strokeWidth={1.6}
      style={{ display: 'inline', marginLeft: '3px', marginBottom: '1px', verticalAlign: 'middle' }}
    />
  )
}

export function getMDXComponents(): MDXComponents {
  return {
    // Headings
    h2: ({ children }) => <HeadingWithAnchor level={2}>{children}</HeadingWithAnchor>,
    h3: ({ children }) => <HeadingWithAnchor level={3}>{children}</HeadingWithAnchor>,
    h4: ({ children }) => (
      <h4
        style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginTop: '1.5rem',
          marginBottom: '0.5rem',
          scrollMarginTop: '96px',
        }}
      >
        {children}
      </h4>
    ),

    // Paragraph
    p: ({ children }) => (
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
        {children}
      </p>
    ),

    // Lists
    ul: ({ children }) => (
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li style={{ marginBottom: '0.4rem' }}>{children}</li>
    ),

    // Code
    pre: ({ children }: { children?: React.ReactNode }) => {
      const child = React.Children.only(children) as React.ReactElement<{ children?: string; className?: string }>
      const code = child?.props?.children ?? ''
      const className = child?.props?.className ?? ''
      const lang = className.replace('language-', '') || 'bash'
      return <CodeBlock language={lang}>{code}</CodeBlock>
    },
    code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
      if (className) return <code className={className}>{children}</code>
      return (
        <code
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.875em',
            background: 'var(--bg-elevated)',
            color: 'var(--accent-code-text)',
            padding: '0.15em 0.4em',
            borderRadius: '5px',
            border: '1px solid var(--border)',
          }}
        >
          {children}
        </code>
      )
    },

    // Link
    a: ({ href = '#', children }) => {
      const isExternal = href.startsWith('http')
      // Prefijar enlaces internos del contenido (p. ej. /boveda/x) a la ruta anidada.
      const resolvedHref = href.startsWith('/boveda')
        ? `/nucleo-de-la-ia${href}`
        : href
      return (
        <a
          href={resolvedHref}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{
            color: 'var(--accent)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            transition: 'color 150ms ease',
          }}
        >
          {children}
          {isExternal && <ExternalIcon />}
        </a>
      )
    },

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: '3px solid var(--accent)',
          padding: '0.875rem 1.25rem',
          margin: '1.5rem 0',
          background: 'var(--accent-glow)',
          borderRadius: '0 var(--radius) var(--radius) 0',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          fontSize: '0.9375rem',
        }}
      >
        {children}
      </blockquote>
    ),

    // Table
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
          }}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead style={{ background: 'var(--bg-elevated)' }}>{children}</thead>
    ),
    th: ({ children }) => (
      <th
        style={{
          padding: '0.75rem 1rem',
          textAlign: 'left',
          fontWeight: 700,
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border)',
          whiteSpace: 'nowrap',
          fontSize: '0.8rem',
          letterSpacing: '0.02em',
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
          verticalAlign: 'top',
        }}
      >
        {children}
      </td>
    ),

    // HR
    hr: () => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />,

    // Strong / em
    strong: ({ children }) => (
      <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{children}</strong>
    ),

    // Custom components (available in MDX files)
    Step: ({ number, title, description, children, last }: { number: number; title: string; description?: string; children?: React.ReactNode; last?: boolean }) => (
      <StepIndicator number={number} title={title} description={description} last={last}>
        {children}
      </StepIndicator>
    ),
    Checklist: ({ items, storageKey }: { items: string[]; storageKey?: string }) => (
      <PrerequisitesChecklist items={items} storageKey={storageKey} />
    ),
    ProviderSelector: () => <ProviderSelector />,
    ProjectPicker: () => <ProjectPicker />,
    ProjectGallery: () => <ProjectGallery />,
    PlanningPrompts: () => <PlanningPrompts />,
    Callout: ({ type, title, children }: { type?: CalloutType; title?: string; children: React.ReactNode }) => (
      <Callout type={type} title={title}>{children}</Callout>
    ),
  }
}
