'use client';

import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { useLenis, useTimeOut } from '@/hooks';
import { useTranslation } from '@/providers';

import { Preloader } from './preloader';

let hasShownInitialGreeting = false;

function getSectionKey(pathname) {
  if (pathname === '/' || pathname === '') return 'home';
  const segments = pathname.split('/').filter(Boolean);
  return segments[0];
}

/**
 * @param {import('react').PropsWithChildren<{ label?: string }>} props
 * `label` fuerza el preloader de sección con ese texto (sin el saludo inicial),
 * útil para secciones que se abren en pestaña nueva y deben mostrar su nombre.
 */
export function Transition({ children, label }) {
  const pathname = usePathname();
  return (
    <TransitionInner key={pathname} pathname={pathname} label={label}>
      {children}
    </TransitionInner>
  );
}

/**
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} props.pathname
 * @param {string} [props.label]
 */
function TransitionInner({ children, pathname, label }) {
  const { t } = useTranslation();
  const forced = Boolean(label);
  const isFirstVisit = !hasShownInitialGreeting && !forced;
  const [isLoading, setLoading] = useState(true);

  useLenis();
  useTimeOut({
    callback: () => {
      setLoading(false);
      window.scrollTo(0, 0);
      hasShownInitialGreeting = true;
    },
    duration: isFirstVisit ? 2000 : 1400,
    deps: [],
  });

  const sectionLabel = forced ? label : t(`nav.${getSectionKey(pathname)}`);

  return (
    <div className='overflow-hidden'>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <Preloader
            mode={isFirstVisit ? 'greeting' : 'section'}
            sectionLabel={sectionLabel}
          />
        ) : null}
      </AnimatePresence>
      {children}
    </div>
  );
}
