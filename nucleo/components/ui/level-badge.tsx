'use client'

import React, { useEffect, useRef, useId } from 'react'
import { Medal, Award, Trophy, Crown, type LucideIcon } from 'lucide-react'

export type LevelTier = 'bronce' | 'plata' | 'oro' | 'titanio'

interface LevelBadgeProps {
  tier: LevelTier
  eyebrow?: string
  title?: string
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

interface TierConfig {
  base: string
  innerStroke: string
  textColor: string
  iconBg: string
  iconColor: string
  icon: LucideIcon
  defaultTitle: string
  defaultEyebrow: string
  shineColor: string
}

const TIERS: Record<LevelTier, TierConfig> = {
  bronce: {
    base: '#c2864a',
    innerStroke: 'rgba(255, 220, 180, 0.55)',
    textColor: '#3a1d08',
    iconBg: 'rgba(255, 235, 210, 0.95)',
    iconColor: '#8a4b15',
    icon: Medal,
    defaultTitle: 'Bronce',
    defaultEyebrow: 'NIVEL · INICIAL',
    shineColor: '255, 230, 200',
  },
  plata: {
    base: '#a8b2bd',
    innerStroke: 'rgba(245, 250, 255, 0.7)',
    textColor: '#0f172a',
    iconBg: 'rgba(245, 250, 255, 0.97)',
    iconColor: '#334155',
    icon: Award,
    defaultTitle: 'Plata',
    defaultEyebrow: 'NIVEL · ACTIVO',
    shineColor: '220, 235, 250',
  },
  oro: {
    base: '#caa14d',
    innerStroke: 'rgba(255, 235, 180, 0.7)',
    textColor: '#2a1804',
    iconBg: 'rgba(255, 250, 230, 0.97)',
    iconColor: '#6a3f04',
    icon: Trophy,
    defaultTitle: 'Oro',
    defaultEyebrow: 'NIVEL · DEDICADO',
    shineColor: '255, 225, 160',
  },
  titanio: {
    base: '#3d4148',
    innerStroke: 'rgba(180, 200, 220, 0.45)',
    textColor: '#f1f5f9',
    iconBg: 'rgba(30, 35, 42, 0.95)',
    iconColor: '#a5b4fc',
    icon: Crown,
    defaultTitle: 'Titanio',
    defaultEyebrow: 'NIVEL · LEYENDA',
    shineColor: '200, 220, 255',
  },
}

// Mismos 10 colores y rotaciones base — capas holográficas.
const HOLO_LAYERS: Array<{ color: string; base: number; opacity: number }> = [
  { color: 'hsl(358, 100%, 62%)', base: 0,  opacity: 0.55 },
  { color: 'hsl(30, 100%, 55%)',  base: 10, opacity: 0.55 },
  { color: 'hsl(55, 100%, 58%)',  base: 20, opacity: 0.7  },
  { color: 'hsl(96, 100%, 50%)',  base: 30, opacity: 0.5  },
  { color: 'hsl(195, 90%, 55%)',  base: 40, opacity: 0.55 },
  { color: 'hsl(271, 85%, 55%)',  base: 50, opacity: 0.55 },
  { color: 'hsl(300, 30%, 45%)',  base: 60, opacity: 0.45 },
  { color: 'transparent',          base: 70, opacity: 0.5  },
  { color: 'transparent',          base: 80, opacity: 0.5  },
  { color: 'white',                base: 90, opacity: 0.7  },
]

const SIZE_MAP = {
  sm: { width: 200, vbWidth: 260, vbHeight: 54 },
  md: { width: 260, vbWidth: 260, vbHeight: 54 },
  lg: { width: 320, vbWidth: 260, vbHeight: 54 },
}

export function LevelBadge({
  tier,
  eyebrow,
  title,
  href,
  size = 'md',
}: LevelBadgeProps) {
  const config = TIERS[tier]
  const dims = SIZE_MAP[size]
  const Icon = config.icon
  const rootRef = useRef<HTMLElement | null>(null)
  const tiltRef = useRef<HTMLDivElement | null>(null)
  const layerRefs = useRef<(SVGGElement | null)[]>([])
  const hoverCapableRef = useRef<boolean>(false)
  const leaveTimerRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const pendingPosRef = useRef<{ x: number; y: number } | null>(null)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')

  // Swing por capa (debe coincidir con el del CSS generado en layerCSS).
  const swingFor = (i: number) => 26 + (i % 3) * 4

  // Pausar la animación hasta que la card entra al viewport, y
  // detectar si el dispositivo es hover-capable (mouse desktop).
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      hoverCapableRef.current = window.matchMedia('(hover: hover)').matches
    }
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current !== null) {
        window.clearTimeout(leaveTimerRef.current)
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  // Pinta tilt + capas holo a partir de la posición normalizada del
  // cursor. Se llama desde un rAF para coalescer múltiples mousemove
  // en un único paint por frame.
  const paintFromPos = (x: number, y: number) => {
    const tilt = tiltRef.current
    if (!tilt) return
    const rotY = (x - 0.5) * 28       // -14..+14
    const rotX = -(y - 0.5) * 10      // -5..+5
    tilt.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`
    const sweep = (x - 0.5) * 64       // -32..+32
    const wobble = (y - 0.5) * 18      // -9..+9
    for (let i = 0; i < layerRefs.current.length; i++) {
      const g = layerRefs.current[i]
      if (!g) continue
      const angle = HOLO_LAYERS[i].base + sweep + wobble
      g.style.transform = `rotate(${angle}deg)`
    }
  }

  // Aplica la posición del cursor. Si `immediate`, pinta sincrónico
  // (necesario en handleEnter para evitar flash); si no, agenda un rAF.
  const applyCursor = (
    e: React.MouseEvent<HTMLDivElement>,
    immediate = false,
  ) => {
    const tilt = tiltRef.current
    if (!tilt) return
    const rect = tilt.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    if (immediate) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      pendingPosRef.current = null
      paintFromPos(x, y)
      return
    }
    pendingPosRef.current = { x, y }
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const pos = pendingPosRef.current
      pendingPosRef.current = null
      if (pos) paintFromPos(pos.x, pos.y)
    })
  }

  // Cursor entra: el JS toma el dominio. Apagamos los loops (.is-hovering
  // les setea animation: none vía CSS) y aplicamos pose inline.
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverCapableRef.current) return
    const root = rootRef.current
    if (!root) return
    if (leaveTimerRef.current !== null) {
      window.clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
      root.classList.remove('is-leaving')
    }
    // Aplicar la pose del cursor ANTES de quitar la animation, así
    // el cambio visible coincide con el nuevo estado, sin flash.
    applyCursor(e, true)
    void root.offsetWidth // forzar reflow
    root.classList.add('is-hovering')
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverCapableRef.current) return
    applyCursor(e)
  }

  // Cursor sale: viajamos suave a la pose inicial del loop (frame 0%),
  // y después soltamos el control para que la animation retome.
  const handleLeave = () => {
    if (!hoverCapableRef.current) return
    const root = rootRef.current
    const tilt = tiltRef.current
    if (!root || !tilt) return
    // Cancelar cualquier paint pendiente del cursor.
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    pendingPosRef.current = null
    // Frame 0% del tilt: rotateX(4deg) rotateY(-14deg) scale(1.02).
    tilt.style.transform = 'rotateX(4deg) rotateY(-14deg) scale(1.02)'
    // Frame 0% de cada capa holo: base - swing.
    for (let i = 0; i < layerRefs.current.length; i++) {
      const g = layerRefs.current[i]
      if (!g) continue
      const angle = HOLO_LAYERS[i].base - swingFor(i)
      g.style.transform = `rotate(${angle}deg)`
    }
    // is-leaving activa una transition más larga (smooth) y mantiene
    // animation: none hasta que terminemos el viaje.
    root.classList.add('is-leaving')
    leaveTimerRef.current = window.setTimeout(() => {
      root.classList.remove('is-hovering')
      root.classList.remove('is-leaving')
      tilt.style.transform = ''
      for (const g of layerRefs.current) {
        if (g) g.style.transform = ''
      }
      leaveTimerRef.current = null
    }, 360)
  }

  const Wrapper = (href ? 'a' : 'div') as React.ElementType
  const wrapperProps = href ? { href } : {}

  // Cada capa holográfica se anima INDEPENDIENTEMENTE — con su propia
  // duración, su propio retraso y un swing amplio. Como nunca están
  // sincronizadas, el ojo no percibe "dos imágenes" sino un flujo
  // continuo de iridiscencia, igual que las cartas holo reales.
  const layerCSS = HOLO_LAYERS.map((layer, i) => {
    // Distribuir duraciones entre 4.8s y 6.6s, delays escalonados.
    const duration = 4.8 + (i % 5) * 0.45      // 4.8, 5.25, 5.7, 6.15, 6.6...
    const delay = -(i * 0.37).toFixed(2)        // 0, -0.37, -0.74, -1.11, ...
    const swing = 26 + (i % 3) * 4               // 26, 30, 34, 26, 30, ...
    return `@keyframes holoSwing_${uid}_${i} {
      0%   { transform: rotate(${layer.base - swing}deg); }
      100% { transform: rotate(${layer.base + swing}deg); }
    }
    .lvl-${uid}-holo > g:nth-child(${i + 1}) {
      animation: holoSwing_${uid}_${i} ${duration}s cubic-bezier(0.45, 0, 0.55, 1) ${delay}s infinite alternate;
      animation-play-state: paused;
    }
    .lvl-${uid}.is-visible .lvl-${uid}-holo > g:nth-child(${i + 1}) {
      animation-play-state: running;
    }`
  }).join('\n')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .lvl-${uid} {
          display: inline-block;
          width: ${dims.width}px;
          max-width: 100%;
          cursor: ${href ? 'pointer' : 'default'};
          text-decoration: none;
          perspective: 800px;
          filter: drop-shadow(0 18px 36px rgba(0, 0, 0, 0.45))
                  drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
        }

        /* ============================================
           TILT 3D — la card se ladea suave izq ↔ der.
           ease-in-out hace una pausa en los extremos, como
           cuando un mouse imaginario llega al borde y vuelve.
           ============================================ */
        @keyframes tiltLoop_${uid} {
          0%, 100% { transform: rotateX(4deg) rotateY(-14deg) scale(1.02); }
          50%      { transform: rotateX(-3deg) rotateY(14deg) scale(1.02); }
        }

        .lvl-${uid}-tilt {
          position: relative;
          transform-origin: center center;
          transform-style: preserve-3d;
          will-change: transform;
          animation: tiltLoop_${uid} 5.5s ease-in-out infinite;
          animation-play-state: paused;
        }
        .lvl-${uid}.is-visible .lvl-${uid}-tilt {
          animation-play-state: running;
        }
        /* Cursor toma control (desktop): se apaga la animation y el JS
           controla el transform vía inline-style. Una transition muy
           corta suaviza el tracking sin que se sienta perezoso. */
        .lvl-${uid}.is-hovering .lvl-${uid}-tilt {
          animation: none;
          transition: transform 40ms linear;
        }
        /* Al salir: transition más larga para el viaje al frame 0. */
        .lvl-${uid}.is-leaving .lvl-${uid}-tilt {
          animation: none;
          transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lvl-${uid}-clip {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }

        .lvl-${uid}-clip svg {
          display: block;
          width: 100%;
          height: auto;
        }

        /* ============================================
           HOLO LAYERS — cada banda iridiscente se mueve
           independientemente: duraciones, retrasos y
           amplitudes desfasados. El resultado es un flujo
           continuo, sin "snap" entre dos posiciones.
           ============================================ */
        .lvl-${uid}-holo > g {
          transform-origin: center center;
          will-change: transform;
        }
        ${layerCSS}
        /* Cuando el cursor toma control, las animations por capa se
           apagan y la rotación queda dictada por el JS (sweep + wobble
           del mouse). Sin transition para que las capas sigan al puntero
           sin retraso: los mousemove (~60-120Hz) ya dan suavidad, y la
           transition de 90ms hacía que el holo "persiguiera" al cursor. */
        .lvl-${uid}.is-hovering .lvl-${uid}-holo > g {
          animation: none !important;
          transition: none;
        }
        /* Al salir, cada capa viaja suave a su frame 0 (base - swing) y
           después soltamos el control para que su loop staggered retome. */
        .lvl-${uid}.is-leaving .lvl-${uid}-holo > g {
          animation: none !important;
          transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lvl-${uid}-holo {
          filter: saturate(1.35) brightness(1.12) contrast(1.04);
          transition: filter 240ms ease;
        }
        /* El holo se intensifica mientras el cursor manda. */
        .lvl-${uid}.is-hovering .lvl-${uid}-holo {
          filter: saturate(1.75) brightness(1.28) contrast(1.08);
        }

        /* ============================================
           TOUCH / MOBILE — sin puntero no hay tilt-tracking, así que
           los 11 loops infinitos por chapita (10 capas holo con blur
           SVG + mix-blend + 1 tilt) son puro costo: 4 chapitas = 44
           animaciones re-rasterizando blur cada frame → la home se
           CUELGA en el teléfono. Los CONGELAMOS: la chapita se queda
           en su primer frame (pose 3D + spread holográfico estáticos,
           igual de linda) con costo por frame = 0, y despromovemos las
           ~44 capas (will-change) para liberar memoria del compositor.
           ============================================ */
        @media (hover: none) {
          .lvl-${uid} {
            /* Una sola sombra (más barata de pintar que dos drop-shadow). */
            filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.4));
          }
          .lvl-${uid}-tilt,
          .lvl-${uid}-holo > g {
            animation-play-state: paused !important;
            will-change: auto;
          }
          .lvl-${uid}-holo {
            /* El blend-mode + saturate se pinta una sola vez (sin loops),
               pero le bajamos la carga de compositing en scroll. */
            transition: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lvl-${uid}-tilt,
          .lvl-${uid}-clip {
            animation: none !important;
          }
          .lvl-${uid}-holo > g {
            transform: none !important;
          }
        }
      ` }} />

      <Wrapper
        {...wrapperProps}
        ref={rootRef as React.Ref<HTMLElement>}
        className={`lvl-${uid}`}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div ref={tiltRef} className={`lvl-${uid}-tilt`}>
          <div className={`lvl-${uid}-clip`}>
            <svg
              viewBox={`0 0 ${dims.vbWidth} ${dims.vbHeight}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id={`mask-${uid}`}>
                  <rect x="0" y="0" width={dims.vbWidth} height={dims.vbHeight} rx="10" fill="white" />
                </mask>
                <filter id={`blur-${uid}`}>
                  <feGaussianBlur stdDeviation="7" />
                </filter>
                <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="0.45" />
                  <stop offset="55%" stopColor={config.base} stopOpacity="1" />
                  <stop offset="100%" stopColor={config.base} stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Base */}
              <rect x="0" y="0" width={dims.vbWidth} height={dims.vbHeight} rx="10" fill={config.base} />
              {/* Highlight superior */}
              <rect x="0" y="0" width={dims.vbWidth} height={dims.vbHeight} rx="10" fill={`url(#grad-${uid})`} opacity="0.75" />
              {/* Borde interno */}
              <rect x="4" y="4" width={dims.vbWidth - 8} height={dims.vbHeight - 8} rx="8" fill="transparent" stroke={config.innerStroke} strokeWidth="1" />

              {/* Icon */}
              <circle cx="28" cy="27" r="18" fill={config.iconBg} />
              <foreignObject x="14" y="13" width="28" height="28">
                <div {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as React.HTMLAttributes<HTMLDivElement>)} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} strokeWidth={1.75} style={{ color: config.iconColor }} />
                </div>
              </foreignObject>

              {/* Textos */}
              <text x="55" y="22" fontFamily="var(--font-sans), Helvetica, sans-serif" fontSize="9" fontWeight="700" fill={config.textColor} letterSpacing="0.06em">
                {eyebrow ?? config.defaultEyebrow}
              </text>
              <text x="54" y="42" fontFamily="var(--font-sans), Helvetica, sans-serif" fontSize="17" fontWeight="800" fill={config.textColor} letterSpacing="-0.02em">
                {title ?? config.defaultTitle}
              </text>

              {/* Overlay holográfico — 10 capas */}
              <g
                className={`lvl-${uid}-holo`}
                style={{ mixBlendMode: 'overlay' }}
                mask={`url(#mask-${uid})`}
              >
                {HOLO_LAYERS.map((layer, i) => (
                  <g
                    key={i}
                    ref={(el) => {
                      layerRefs.current[i] = el
                    }}
                  >
                    <polygon
                      points={`0,0 ${dims.vbWidth},${dims.vbHeight} ${dims.vbWidth},0 0,${dims.vbHeight}`}
                      fill={layer.color}
                      filter={`url(#blur-${uid})`}
                      opacity={layer.opacity}
                    />
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
