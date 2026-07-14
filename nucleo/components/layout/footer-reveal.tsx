'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Footer } from './footer'

/**
 * Curva de transición hacia el footer, igual que la home del portfolio:
 * una "tapa" del color del contenido (claro) que cubre el tope del footer
 * oscuro con las esquinas de abajo redondeadas (0 0 50% 50%). Su altura se
 * anima con el scroll (250→0), así el footer se revela con la curva.
 */
export function FooterReveal() {
  const ref = useRef<HTMLDivElement>(null)
  // 'end end' → el progreso llega a 1 justo cuando el footer toca el fondo del
  // viewport (scroll máximo), así la curva se retrae del todo y no tapa el logo.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const height = useTransform(scrollYProgress, [0, 0.85], [250, 0])

  return (
    <div ref={ref} className="ni-footer-reveal">
      <Footer />
      <motion.div
        aria-hidden
        className="ni-footer-curve"
        style={{ height, borderRadius: '0 0 50% 50%' }}
      />
    </div>
  )
}
