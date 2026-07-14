'use client'

import React from 'react'
import { useTranslation } from '@/providers'

type Difficulty = 'fácil' | 'intermedio' | 'avanzado'

// Nivel monocromo: el color no distingue dificultad (la web es en grises),
// lo hace un medidor ascendente de 1/2/3 barras.
const levelMap: Record<Difficulty, number> = {
  'fácil': 1,
  'intermedio': 2,
  'avanzado': 3,
}

interface DifficultyBadgeProps {
  difficulty: Difficulty
  className?: string
}

export function DifficultyBadge({ difficulty, className = '' }: DifficultyBadgeProps) {
  const { t } = useTranslation()
  const level = levelMap[difficulty] ?? 1
  const label = t(`nucleo.difficulty.${difficulty}`)

  return (
    <span className={`recurso-difficulty ${className}`.trim()} title={label}>
      <span className="recurso-meter" aria-hidden="true">
        <i className={level >= 1 ? 'on' : ''} />
        <i className={level >= 2 ? 'on' : ''} />
        <i className={level >= 3 ? 'on' : ''} />
      </span>
      {label}
    </span>
  )
}
