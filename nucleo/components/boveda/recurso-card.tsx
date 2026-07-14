'use client'

import React from 'react'
import Link from 'next/link'
import {
  BookOpen, Zap, LayoutTemplate, MessageSquareText, Plug,
  FileText, Star, Clock, Download, ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { RecursoCardData } from '@nucleo/lib/types'
import { DifficultyBadge } from './difficulty-badge'
import { Badge } from '@nucleo/components/ui/badge'
import { TextureCard } from '@nucleo/components/ui/texture-card'
import { useTranslation } from '@/providers'
import { useLang } from '@nucleo/components/i18n/t'

interface RecursoCardProps {
  recurso: RecursoCardData
  featured?: boolean
}

const categoryIcons: Record<string, LucideIcon> = {
  guías: BookOpen,
  skills: Zap,
  templates: LayoutTemplate,
  prompts: MessageSquareText,
  plugins: Plug,
}

export function RecursoCard({ recurso, featured = false }: RecursoCardProps) {
  const { t } = useTranslation()
  const lang = useLang()
  const CatIcon = categoryIcons[recurso.category] ?? FileText
  const title = lang === 'en' ? recurso.title_en : recurso.title
  const description = lang === 'en' ? recurso.description_en : recurso.description
  const catLabel = t(`nucleo.catSingular.${recurso.category}`)
  const isFeatured = featured || recurso.featured

  return (
    <TextureCard featured={isFeatured}>
      <div className="recurso-card-inner">
        {/* Cabecera: categoría (overline) · dificultad | estado + estrella */}
        <div className="recurso-head">
          <div className="recurso-head-left">
            <span className="recurso-cat">
              <CatIcon size={12} strokeWidth={1.75} /> {catLabel}
            </span>
            <span className="recurso-dot" aria-hidden>·</span>
            <DifficultyBadge difficulty={recurso.difficulty} />
          </div>

          <div className="recurso-head-right">
            {recurso.badge && (
              <Badge variant={recurso.badge === 'nuevo' ? 'new' : recurso.badge === 'actualizado' ? 'updated' : 'popular'}>
                {t(`nucleo.badge.${recurso.badge}`)}
              </Badge>
            )}
            {recurso.featured && (
              <Star
                size={14}
                strokeWidth={1.6}
                fill="var(--accent)"
                className="recurso-star"
                aria-label="Recurso destacado"
              />
            )}
          </div>
        </div>

        {/* Título + descripción */}
        <div className="recurso-body">
          <h3 className="recurso-title">{title}</h3>
          <p className="recurso-desc">{description}</p>
        </div>

        {/* Tools */}
        {recurso.tools.length > 0 && (
          <div className="recurso-tools">
            {recurso.tools.slice(0, 4).map((tool) => (
              <span key={tool} className="tool-pill">{tool}</span>
            ))}
            {recurso.tools.length > 4 && (
              <span className="tool-pill">+{recurso.tools.length - 4}</span>
            )}
          </div>
        )}

        {/* Pie */}
        <div className="recurso-foot">
          <div className="recurso-meta">
            {recurso.version && <span className="recurso-ver">{recurso.version}</span>}
            {recurso.readingTime && (
              <span className="recurso-time">
                <Clock size={11} strokeWidth={1.6} />
                {recurso.readingTime}
              </span>
            )}
          </div>

          <div className="recurso-actions">
            {recurso.downloadUrl && (
              <a
                href={recurso.downloadUrl}
                onClick={(e) => e.stopPropagation()}
                className="recurso-dl"
                title="Descargar"
              >
                <Download size={14} strokeWidth={1.6} />
              </a>
            )}
            <Link href={`/nucleo-de-la-ia/boveda/${recurso.slug}`} className="recurso-cta-link">
              {t('nucleo.recurso.view')}
              <ArrowRight size={12} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </TextureCard>
  )
}
