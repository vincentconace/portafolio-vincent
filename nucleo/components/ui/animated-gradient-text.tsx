import React, { ElementType } from 'react'

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  as?: ElementType
}

export function AnimatedGradientText({
  children,
  className = '',
  as: Tag = 'span' as ElementType,
}: AnimatedGradientTextProps) {
  return (
    <Tag
      className={`gradient-text-animated ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1c1e21, #52555a, #8a8d93, #52555a, #1c1e21)',
        backgroundSize: '300% 300%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'gradient-shift 4s ease infinite',
        display: 'inline',
      }}
    >
      {children}
    </Tag>
  )
}
