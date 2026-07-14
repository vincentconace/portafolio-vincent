'use client'

import { useEffect } from 'react'

/**
 * Reveal on scroll para el Núcleo (da vida al scrollear, sobre todo en mobile).
 *
 * Seguro sin JS: el estado oculto SOLO se activa cuando este componente monta y
 * agrega `.reveal-on` a `.nucleo-root`. Si no hay JS, `[data-reveal]` se ve normal.
 *
 * Robusto ante saltos de scroll: en vez de IntersectionObserver (que no dispara
 * cuando un elemento pasa de "abajo" a "arriba" sin intersectar, dejándolo oculto),
 * en cada scroll (rAF) revisa TODOS los pendientes: cualquiera cuyo tope entró por
 * debajo de la línea de disparo se revela y sale de la lista. Nunca queda contenido
 * escondido.
 *
 * Uso: `data-reveal` (+ opcional `data-reveal-delay="120"` en ms) en un contenedor.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector('.nucleo-root')
    if (!root) return

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (els.length === 0) return

    root.classList.add('reveal-on')

    const pending = new Set(els)
    let raf = 0

    const reveal = (el: HTMLElement) => {
      const delay = el.dataset.revealDelay
      if (delay) el.style.transitionDelay = `${delay}ms`
      el.classList.add('reveal-in')
      pending.delete(el)
    }

    const check = () => {
      raf = 0
      const trigger = window.innerHeight * 0.88
      for (const el of Array.from(pending)) {
        if (el.getBoundingClientRect().top < trigger) reveal(el)
      }
      if (pending.size === 0) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }

    check() // revela lo que ya está en pantalla al cargar
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
