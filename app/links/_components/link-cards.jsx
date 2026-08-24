'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/utils';
import { useTranslation } from '@/providers';

import { LinkCard } from './link-card';

/** @type {import('framer-motion').Variants} */
const container = {
  enter: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

/** @type {import('framer-motion').Variants} */
const item = {
  initial: { opacity: 0, y: 26 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

/**
 * Grilla de destinos con entrada escalonada al entrar en viewport + textos
 * bilingües (título/subtítulo desde `t()`; el placeholder muestra "Próximamente").
 * `singleColumn` fuerza una sola columna (útil para títulos largos, ej. ebooks).
 * @param {{ links: any[]; enabled: boolean; singleColumn?: boolean }} props
 */
export function LinkCards({ links, enabled, singleColumn = false }) {
  const reduced = useReducedMotion();
  const { t } = useTranslation();

  return (
    <motion.section
      className={cn(
        'mt-4 grid grid-cols-1 gap-2.5 sm:mt-8 sm:gap-3.5',
        !singleColumn && 'sm:grid-cols-2'
      )}
      variants={container}
      initial={reduced ? false : 'initial'}
      whileInView='enter'
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
    >
      {links.map((link) => {
        const title = t(`links.items.${link.id}.title`);
        const subtitle = link.comingSoon
          ? t('links.comingSoon')
          : t(`links.items.${link.id}.subtitle`);

        // WhatsApp: adjuntar el mensaje pre-cargado en el idioma activo.
        const resolved = link.whatsapp
          ? {
              ...link,
              href: `${link.href}?text=${encodeURIComponent(
                t(`links.items.${link.id}.wa`)
              )}`,
            }
          : link;

        return (
          <motion.div
            key={link.id}
            variants={reduced ? undefined : item}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            <LinkCard
              link={resolved}
              title={title}
              subtitle={subtitle}
              enabled={enabled}
            />
          </motion.div>
        );
      })}
    </motion.section>
  );
}
