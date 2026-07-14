'use client'

import React from 'react'
import Link from 'next/link'

interface ShimmerButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  href?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function ShimmerButton({
  children,
  onClick,
  className = '',
  href,
  disabled = false,
  type = 'button',
}: ShimmerButtonProps) {
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1.5rem',
    borderRadius: 'var(--radius)',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    textDecoration: 'none',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, #33363b 0%, #1c1e21 55%, #000000 100%)',
    color: 'var(--accent-on)',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.25), 0 8px 24px -6px rgba(28,30,33,0.35)',
    transition: 'all 200ms ease-out',
    opacity: disabled ? 0.6 : 1,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  }

  const shimmerStyle = `
    .shimmer-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 60%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.18),
        transparent
      );
      animation: shimmer 2.5s ease-in-out infinite;
      pointer-events: none;
    }
    .shimmer-btn:hover {
      filter: brightness(1.05);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.16),
        inset 0 -1px 0 rgba(0,0,0,0.3),
        0 14px 32px -6px rgba(28,30,33,0.45) !important;
      transform: translateY(-1px);
    }
    .shimmer-btn:active {
      transform: translateY(0);
    }
  `

  if (href) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: shimmerStyle }} />
        <Link
          href={href}
          className={`shimmer-btn ${className}`}
          style={baseStyles}
        >
          {children}
        </Link>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerStyle }} />
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`shimmer-btn ${className}`}
        style={baseStyles}
      >
        {children}
      </button>
    </>
  )
}
