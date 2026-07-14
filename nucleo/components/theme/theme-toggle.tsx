'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

type Size = 'sm' | 'md'

export function ThemeToggle({ size = 'md', className }: { size?: Size; className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const dim = size === 'sm' ? 32 : 36
  const icon = size === 'sm' ? 14 : 16

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: 'var(--radius)',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'background 150ms ease, color 150ms ease, border-color 150ms ease, transform 150ms ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.color = 'var(--text-primary)'
        el.style.borderColor = 'var(--border-strong)'
        el.style.background = 'var(--bg-elevated-hover)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.color = 'var(--text-secondary)'
        el.style.borderColor = 'var(--border)'
        el.style.background = 'var(--bg-elevated)'
      }}
    >
      {isDark ? <Sun size={icon} strokeWidth={1.75} /> : <Moon size={icon} strokeWidth={1.75} />}
    </button>
  )
}
