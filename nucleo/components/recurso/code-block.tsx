'use client'

import React, { useState } from 'react'
import { File, Copy, Check } from 'lucide-react'
import { useTranslation } from '@/providers'

interface CodeBlockProps {
  children: string
  language?: string
  showLineNumbers?: boolean
  filename?: string
}

export function CodeBlock({ children, language = 'bash', showLineNumbers = false, filename }: CodeBlockProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const code = typeof children === 'string' ? children.trim() : String(children).trim()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const lines = code.split('\n')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .code-block-container {
          position: relative;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          margin: 1.25rem 0;
          overflow: hidden;
        }
        .code-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.625rem 1rem;
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--border);
        }
        .code-block-filename {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: var(--font-mono), monospace;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .code-block-lang-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-family: var(--font-mono), monospace;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-right: auto;
        }
        .code-block-copy {
          background: none;
          border: 1px solid var(--border-strong);
          border-radius: 9999px;
          color: var(--text-secondary);
          padding: 0.3rem 0.75rem;
          font-size: 0.7rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: background var(--transition), color var(--transition),
                      border-color var(--transition);
          white-space: nowrap;
        }
        .code-block-copy:hover {
          color: var(--text-inverse);
          border-color: var(--text-primary);
          background: var(--text-primary);
        }
        .code-block-copy.copied {
          color: #4ade80;
          border-color: rgba(34,197,94,0.4);
          background: rgba(34,197,94,0.08);
        }
        .code-block-pre {
          overflow-x: auto;
          padding: 1.125rem 1.25rem;
          margin: 0;
          font-family: var(--font-mono), 'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          line-height: 1.7;
        }
        .code-block-pre code {
          background: none;
          border: none;
          padding: 0;
          color: var(--text-primary);
          font-size: inherit;
          font-family: inherit;
        }
        .code-line {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .line-number {
          color: var(--text-muted);
          font-size: 0.78rem;
          min-width: 1.5rem;
          text-align: right;
          user-select: none;
          flex-shrink: 0;
          padding-top: 0;
        }
        .line-content {
          flex: 1;
          white-space: pre;
        }
        /* Simple syntax coloring */
        .token-comment { color: var(--text-muted); font-style: italic; }
        .token-string { color: var(--syntax-string); }
        .token-keyword { color: var(--syntax-keyword); }
        .token-number { color: var(--syntax-number); }
        .token-operator { color: var(--text-secondary); }
        .token-prompt { color: var(--text-muted); user-select: none; }

        /* En el teléfono el código ENVUELVE: nunca scroll lateral, siempre hacia
           abajo. (overflow-wrap:anywhere corta tokens larguísimos —URLs, hashes—
           y evita que el bloque empuje el ancho de la página.) */
        @media (max-width: 640px) {
          .code-block-container { max-width: 100%; }
          .code-block-pre {
            overflow-x: hidden;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }
          .code-block-pre code {
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }
          .code-line { flex-wrap: wrap; }
          .line-content {
            white-space: pre-wrap;
            overflow-wrap: anywhere;
            min-width: 0;
          }
        }
      ` }} />

      <div className="code-block-container">
        <div className="code-block-header">
          {filename ? (
            <span className="code-block-filename">
              <File size={12} strokeWidth={1.6} />
              {filename}
            </span>
          ) : (
            <span className="code-block-lang-label">{language}</span>
          )}
          <button
            onClick={handleCopy}
            className={`code-block-copy${copied ? ' copied' : ''}`}
            type="button"
            title="Copiar código"
          >
            {copied ? (
              <>
                <Check size={12} strokeWidth={1.75} />
                {t('nucleo.recurso.copied')}
              </>
            ) : (
              <>
                <Copy size={12} strokeWidth={1.6} />
                {t('nucleo.recurso.copy')}
              </>
            )}
          </button>
        </div>

        <pre className="code-block-pre">
          <code>
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="code-line">
                  <span className="line-number">{i + 1}</span>
                  <span className="line-content">{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </>
  )
}
