'use client'

import React, { useRef } from 'react'

interface TextureCardProps {
  children: React.ReactNode
  featured?: boolean
  className?: string
  as?: 'div' | 'article' | 'section'
  spotlight?: boolean
  href?: string
  style?: React.CSSProperties
}

export function TextureCard({
  children,
  featured = false,
  className = '',
  as: Tag = 'div',
  spotlight = true,
  style,
}: TextureCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    ref.current.style.setProperty('--sx', `${x}%`)
    ref.current.style.setProperty('--sy', `${y}%`)
    ref.current.style.setProperty('--so', '1')
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.setProperty('--so', '0')
  }

  const Element = Tag as React.ElementType

  return (
    <Element
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`cult-card ${featured ? 'cult-card-featured' : ''} ${className}`}
      style={style}
    >
      {spotlight && <span className="cult-spotlight" aria-hidden />}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </Element>
  )
}
