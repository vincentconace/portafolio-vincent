'use client';

import { motion } from 'framer-motion';
import { Globe, MoveDownRight } from 'lucide-react';
import Image from 'next/image';

import { ParallaxSlider } from '@/components';
import { useTranslation } from '@/providers';

import { slideUp } from './variants';

export function Header() {
  const { t } = useTranslation();

  return (
    <motion.header
      className='relative h-screen overflow-hidden bg-secondary-foreground text-background'
      variants={slideUp}
      initial='initial'
      animate='enter'
    >
      <Image
        src='/hero.png'
        className='scale-110 object-contain md:scale-100'
        fill={true}
        sizes='100vw'
        priority
        alt='Vincent Conace Personal Picture'
      />

      <LocationPill text={t('header.location')} />

      <div className='relative flex h-full flex-col justify-end gap-2 md:flex-col-reverse md:justify-normal'>
        <div className='select-none'>
          <h1 className='text-[max(9em,15vw)]'>
            <ParallaxSlider repeat={4} baseVelocity={2}>
              <span className='pe-12'>
                Vincent Conace
                <span className='spacer'>—</span>
              </span>
            </ParallaxSlider>
          </h1>
        </div>

        <div className='md:ml-auto'>
          <div className='mx-10 max-md:my-12 md:mx-20 md:max-w-[22rem]'>
            <div className='mb-4 md:mb-12'>
              <MoveDownRight size={28} strokeWidth={1.25} />
            </div>

            <h4 className='text-[clamp(1em,1.2vw,1.4em)] leading-snug'>
              <span className='block'>{t('header.tagline1')}</span>
              <span className='block'>{t('header.tagline2')}</span>
            </h4>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function LocationPill({ text }) {
  return (
    <motion.div
      className='absolute left-4 top-1/2 z-20 -translate-y-1/2 md:left-8'
      initial={{ x: -140, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay: 2.8,
        duration: 1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      <motion.div
        className='flex items-center gap-4 rounded-full bg-foreground p-2 pl-7 text-background shadow-lg'
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      >
        <span className='whitespace-pre-line text-sm leading-tight md:text-base'>
          {text}
        </span>
        <span className='flex h-14 w-14 items-center justify-center rounded-full bg-muted-foreground/30 md:h-16 md:w-16'>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <Globe
              size={28}
              strokeWidth={1.5}
              className='text-background md:h-8 md:w-8'
            />
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  );
}
