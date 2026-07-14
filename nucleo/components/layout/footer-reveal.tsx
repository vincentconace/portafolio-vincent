'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Footer } from './footer'

/**
 * Curva de transición hacia el footer, igual que la home del portfolio:
 * una "tapa" del color del contenido (claro) que cubre el tope del footer
 * oscuro con las esquinas de abajo redondeadas (0 0 50% 50%).
 *
 * Se retrae con el scroll animando `scaleY` (1→0, origen arriba) — NO `height`.
 * El resultado visual es idéntico (el border-radius en % escala con la caja),
 * pero `transform` lo compone la GPU → fluido en mobile. Animar `height`
 * reflowea/repinta cada frame y se TRABA en el teléfono.
 */
export function FooterReveal() {
  const ref = useRef<HTMLDivElement>(null)
  // 'end end' → el progreso llega a 1 justo cuando el footer toca el fondo del
  // viewport (scroll máximo), así la curva se retrae del todo y no tapa el logo.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <div ref={ref} className="ni-footer-reveal">
      <Footer />
      <motion.div
        aria-hidden
        className="ni-footer-curve"
        style={{ scaleY, transformOrigin: 'top', borderRadius: '0 0 50% 50%' }}
      />
    </div>
  )
}
