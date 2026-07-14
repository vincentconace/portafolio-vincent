'use client'

import React from 'react'

interface BorderBeamProps {
  children: React.ReactNode
  className?: string
  size?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
  active?: boolean
}

export function BorderBeam({
  children,
  className = '',
  colorFrom = '#1c1e21',
  colorTo = '#52555a',
  duration = 3,
  active = false,
}: BorderBeamProps) {
  return (
    <div
      className={`border-beam-host ${className}`}
      style={
        {
          '--beam-color-from': colorFrom,
          '--beam-color-to': colorTo,
          '--beam-duration': `${duration}s`,
          position: 'relative',
          borderRadius: 'var(--radius-md)',
        } as React.CSSProperties
      }
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .border-beam-host {
          isolation: isolate;
        }
        .border-beam-host::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(
            from var(--border-angle, 0deg),
            transparent 0deg,
            transparent 240deg,
            var(--beam-color-from, #1c1e21) 290deg,
            var(--beam-color-to, #52555a) 330deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: border-rotate var(--beam-duration, 3s) linear infinite;
          opacity: ${active ? 1 : 0};
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }
        .border-beam-host:hover::before {
          opacity: 1;
        }
      ` }} />
      {children}
    </div>
  )
}
