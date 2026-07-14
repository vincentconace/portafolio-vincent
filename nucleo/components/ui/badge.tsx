import React from 'react'

type BadgeVariant = 'default' | 'featured' | 'new' | 'updated' | 'popular'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantMap: Record<BadgeVariant, string> = {
  default: 'badge-default',
  featured: 'badge-featured',
  new: 'badge-new',
  updated: 'badge-updated',
  popular: 'badge-popular',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span className={`badge ${variantMap[variant]} ${className}`}>
      {children}
    </span>
  )
}
