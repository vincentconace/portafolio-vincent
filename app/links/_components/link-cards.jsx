'use client';

import { motion, useReducedMotion } from 'framer-motion';

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
 * @param {{ links: any[]; enabled: boolean }} props
 */
export function LinkCards({ links, enabled }) {
  const reduced = useReducedMotion();
  const { t } = useTranslation();

  return (
    <motion.section
      className='mt-4 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3.5'
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

        return (
          <motion.div
            key={link.id}
            variants={reduced ? undefined : item}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            <LinkCard link={link} title={title} subtitle={subtitle} enabled={enabled} />
          </motion.div>
        );
      })}
    </motion.section>
  );
}
