'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Globe, MoveDownRight } from 'lucide-react';
import Image from 'next/image';

import { ParallaxSlider } from '@/components';
import { useHasHover } from '@/hooks';
import { useTranslation } from '@/providers';

import { slideUp } from './variants';

export function Header() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const hasHover = useHasHover();

  const sliderRepeat = hasHover ? 4 : 3;
  const sliderVelocity = hasHover ? 2 : 1;

  return (
    <motion.header
      className='relative h-screen overflow-hidden bg-secondary-foreground text-background'
      variants={slideUp}
      initial='initial'
      animate='enter'
    >
      <Image
        src='/hero.png'
        className='scale-110 object-cover object-[center_30%] md:scale-100 md:object-contain'
        fill={true}
        sizes='100vw'
        priority
        alt='Vincent Conace Personal Picture'
      />

      <LocationPill text={t('header.location')} />

      <div className='relative flex h-full flex-col justify-end gap-2 md:flex-col-reverse md:justify-normal'>
        <div className='select-none'>
          <h1 className='text-[clamp(4.5rem,15vw,9em)]'>
            {reducedMotion ? (
              <span className='block whitespace-nowrap'>
                Vincent Conace<span className='spacer'>—</span>
              </span>
            ) : (
              <ParallaxSlider repeat={sliderRepeat} baseVelocity={sliderVelocity}>
                <span className='pe-12'>
                  Vincent Conace
                  <span className='spacer'>—</span>
                </span>
              </ParallaxSlider>
            )}
          </h1>
        </div>

        <div className='md:ml-auto'>
          <div className='mx-4 max-md:my-8 sm:mx-6 md:mx-20 md:max-w-[22rem]'>
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
  const reducedMotion = useReducedMotion();
  const hasHover = useHasHover();

  return (
    <motion.div
      className='absolute left-4 top-[62%] z-20 md:left-8 md:top-1/2 md:-translate-y-1/2'
      initial={{ x: -140, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay: reducedMotion ? 0 : 2.8,
        duration: reducedMotion ? 0 : 1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      <motion.div
        className='flex items-center gap-2 rounded-full bg-foreground p-1.5 pl-4 text-background shadow-lg md:gap-4 md:p-2 md:pl-7'
        whileHover={hasHover && !reducedMotion ? { scale: 1.04 } : undefined}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      >
        <span className='whitespace-pre-line text-xs leading-tight md:text-base'>
          {text}
        </span>
        <span className='flex h-9 w-9 items-center justify-center rounded-full bg-muted-foreground/30 md:h-16 md:w-16'>
          <motion.span
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 18, repeat: Infinity, ease: 'linear' }
            }
          >
            <Globe
              size={20}
              strokeWidth={1.5}
              className='text-background md:h-8 md:w-8'
            />
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  );
}
