'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

export function OffcanvasBackdrop() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const update = () => setWindowHeight(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (windowHeight === 0) return null;

  const initialPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${
    windowHeight / 2
  } 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${
    windowHeight / 2
  } 100 0`;

  /** @type {import('framer-motion').Variants} */
  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1,
      },
    },
    exit: {
      d: initialPath,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: -0.2,
      },
    },
  };

  return (
    <motion.svg className='absolute right-full top-0 h-full w-[100px] overflow-visible fill-foreground stroke-none sm:right-[420px] md:right-[520px] lg:right-[600px]'>
      <motion.path
        variants={curve}
        initial='initial'
        animate='enter'
        exit='exit'
      />
    </motion.svg>
  );
}
