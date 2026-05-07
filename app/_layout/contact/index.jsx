'use client';

import { useRef } from 'react';

import { motion } from 'framer-motion';

import { useContactSlider } from '@/hooks';

import { SocialInfo, UserDetails } from './components';

export function Contact() {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const containerRef = useRef(null);
  const { transformX, transformY } = useContactSlider(containerRef);

  return (
    <motion.footer
      ref={containerRef}
      className='relative bg-foreground text-background lg:max-h-screen'
      style={{ y: transformY }}
    >
      <div className='pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-[clamp(5em,21vh,12em)] lg:pt-[clamp(5em,21vh,12em)]'>
        <UserDetails transformX={transformX} />
        <SocialInfo />
      </div>
    </motion.footer>
  );
}
