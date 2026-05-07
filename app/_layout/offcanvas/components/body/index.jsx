'use client';

import { motion } from 'framer-motion';

import { FixedOverlay } from '@/components';

import { OffcanvasBackdrop } from './back-drop';
import { OffcanvasFooter } from './footer';
import { OffcanvasLinks } from './links';
import { slideLeft } from './variants';

const MotionComponent = motion(FixedOverlay);

export function OffcanvasBody() {
  return (
    <MotionComponent
      className='z-40'
      variants={slideLeft}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <OffcanvasBackdrop />

      <div className='absolute right-0 top-0 h-screen w-full max-w-[100vw] bg-foreground text-background sm:w-[420px] md:w-[520px] lg:w-[600px]'>
        <div className='flex h-full flex-col justify-between p-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:p-12 sm:pb-[max(3rem,env(safe-area-inset-bottom))] sm:pt-[max(3rem,env(safe-area-inset-top))] md:p-16 lg:p-24'>
          <OffcanvasLinks />
          <OffcanvasFooter />
        </div>
      </div>
    </MotionComponent>
  );
}
