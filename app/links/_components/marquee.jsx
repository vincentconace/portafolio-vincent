'use client';

import { useRef } from 'react';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';

/**
 * Marquee infinito reactivo al scroll — mismo lenguaje que el hero de la web:
 * se mueve solo a `baseVelocity` y la velocidad/dirección del scroll lo acelera
 * e invierte (scrolleás para un lado → va para el otro).
 *
 * Robusto: renderiza `repeat` copias y desplaza exactamente un segmento
 * (100/repeat %), así el loop es SIEMPRE sin cortes en cualquier ancho
 * (subí `repeat` para textos cortos en pantallas anchas).
 *
 * @param {{ children: React.ReactNode; baseVelocity?: number; repeat?: number; className?: string }} props
 */
export function Marquee({ children, baseVelocity = 2, repeat = 8, className = '' }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });

  const seg = 100 / repeat;
  // Desplaza como mucho un segmento (= el ancho de una copia) y vuelve: como las
  // copias son idénticas, el salto es invisible → loop infinito perfecto.
  const x = useTransform(baseX, v => `-${wrap(0, seg, v)}%`);

  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    moveBy += dir.current * moveBy * factor.get();
    baseX.set(baseX.get() + moveBy);
  });

  if (reduced) {
    return (
      <div className={`overflow-hidden whitespace-nowrap ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`flex flex-nowrap overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className='flex flex-none flex-nowrap' style={{ x }}>
        {Array.from({ length: repeat }, (_, i) => (
          <span key={i} className='flex-none'>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
