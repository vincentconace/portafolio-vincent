'use client'

import {
  Home,
  Library,
  Star,
  BookOpen,
  Zap,
  Plug,
  LayoutTemplate,
  MessageSquareText,
  Bot,
  Cloud,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  count?: number
  external?: boolean
  matchCategory?: string
  matchPath?: string
  matchFeatured?: boolean
}

export type NavSection = {
  label: string
  items: NavItem[]
}

export type CategoryCounts = Record<string, number>

export function buildSections(counts: CategoryCounts, totalCount: number): NavSection[] {
  return [
    {
      label: 'Navegar',
      items: [
        { href: '/nucleo-de-la-ia', label: 'Inicio', icon: Home, matchPath: '/nucleo-de-la-ia' },
        { href: '/nucleo-de-la-ia/boveda', label: 'Bóveda completa', icon: Library, count: totalCount, matchPath: '/nucleo-de-la-ia/boveda' },
        { href: '/nucleo-de-la-ia/boveda?featured=true', label: 'Destacados', icon: Star, matchFeatured: true },
      ],
    },
    {
      label: 'Categorías',
      items: [
        { href: '/nucleo-de-la-ia/boveda?category=guías', label: 'Guías', icon: BookOpen, count: counts['guías'] ?? 0, matchCategory: 'guías' },
        { href: '/nucleo-de-la-ia/boveda?category=skills', label: 'Skills', icon: Zap, count: counts['skills'] ?? 0, matchCategory: 'skills' },
        { href: '/nucleo-de-la-ia/boveda?category=plugins', label: 'Plugins', icon: Plug, count: counts['plugins'] ?? 0, matchCategory: 'plugins' },
        { href: '/nucleo-de-la-ia/boveda?category=templates', label: 'Templates', icon: LayoutTemplate, count: counts['templates'] ?? 0, matchCategory: 'templates' },
        { href: '/nucleo-de-la-ia/boveda?category=prompts', label: 'Prompts', icon: MessageSquareText, count: counts['prompts'] ?? 0, matchCategory: 'prompts' },
        { href: '/nucleo-de-la-ia/boveda?category=agentes', label: 'Agentes', icon: Bot, count: counts['agentes'] ?? 0, matchCategory: 'agentes' },
        { href: '/nucleo-de-la-ia/boveda?category=mcp', label: 'MCPs', icon: Cloud, count: counts['mcp'] ?? 0, matchCategory: 'mcp' },
      ],
    },
  ]
}
