'use client';

import { useRef } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { useHasHover, useMagnetic } from '@/hooks';
import { cn } from '@/utils';

import { MagneticItem } from './index.styled';
import { magneticVariance } from './index.variance';

/** @param {import('react').ButtonHTMLAttributes<HTMLButtonElement> & { variant: 'default' | 'primary' | 'destructive' | 'secondary' | 'ghost' | 'outline'; size: 'default' | 'md' | 'lg' | 'xl';}} */
export function MagneticButton({
  children,
  className,
  variant,
  size,
  ...props
}) {
  /** @type {import('react').MutableRefObject<HTMLButtonElement>} */
  const elementRef = useRef(null);
  const hasHover = useHasHover();
  const reducedMotion = useReducedMotion();
  const interactive = hasHover && !reducedMotion;

  const {
    position: { x, y },
    handleMagneticMove,
    handleMagneticOut,
  } = useMagnetic(elementRef);

  return (
    <motion.button
      ref={elementRef}
      className={cn(magneticVariance({ variant, size, className }))}
      animate={interactive ? { x, y } : { x: 0, y: 0 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }
      }
      onPointerMove={interactive ? handleMagneticMove : undefined}
      onPointerOut={interactive ? handleMagneticOut : undefined}
      whileHover={interactive ? { scale: 1.1 } : undefined}
      whileTap={reducedMotion ? undefined : { scale: 0.95 }}
      {...props}
    >
      <MagneticItem>{children}</MagneticItem>
    </motion.button>
  );
}
