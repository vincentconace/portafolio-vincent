'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LanguageToggle } from '@/components';
import { navItems } from '@/data';
import { useTranslation } from '@/providers';

import { scale, slideOut } from './variants';

export function OffcanvasLinks() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const { t } = useTranslation();

  const items = navItems.map(({ href, key }, index) => {
    const id = index;
    return (
      <motion.li
        key={id}
        className='relative my-4 flex items-center'
        variants={slideOut}
        custom={id}
        initial='initial'
        animate='enter'
        exit='exit'
        onPointerEnter={() => setActiveLink(href)}
        onFocus={() => setActiveLink(href)}
        onTouchStart={() => setActiveLink(href)}
      >
        <motion.div
          className='absolute -left-7 sm:-left-9 md:-left-11'
          variants={scale}
          animate={activeLink === href ? 'open' : 'closed'}
        >
          <Dot size={36} />
        </motion.div>
        <Link href={href} className='text-4xl capitalize sm:text-5xl md:text-6xl'>
          {t(`nav.${key}`)}
        </Link>
      </motion.li>
    );
  });

  return (
    <div className='mt-10 flex flex-col gap-3 md:mt-20'>
      <div className='mb-6 flex items-center justify-between border-b border-solid pb-2 md:mb-10'>
        <h5 className='text-xs uppercase text-secondary-foreground'>
          {t('nav.label')}
        </h5>
        <LanguageToggle />
      </div>
      <ul onPointerLeave={() => setActiveLink(pathname)}>{items}</ul>
    </div>
  );
}
