'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Dot } from 'lucide-react';

import { Center } from '@/components';
import { preloaderWords } from '@/data';
import { useTimeOut } from '@/hooks';

import { fade, slideUp } from './variants';

const MotionComponent = motion(Center);

/**
 * @param {Object} props
 * @param {'greeting' | 'section'} [props.mode]
 * @param {string} [props.sectionLabel]
 */
export function Preloader({ mode = 'greeting', sectionLabel = '' }) {
  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const { width, height } = dimensions;

  useTimeOut({
    callback: () => {
      if (mode === 'greeting') {
        setIndex(prevIndex => prevIndex + 1);
      }
    },
    duration: index === 0 ? 500 : 250,
    deps: [index, mode],
  });

  const flatPath = `M0 0 L${width} 0 L${width} ${height} Q${
    width / 2
  } ${height} 0 ${height}  L0 0`;
  const bulgePath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${
    height + 300
  } 0 ${height}  L0 0`;

  /** @type {import('framer-motion').Variants} */
  const curve = {
    initial: {
      d: flatPath,
      transition: { duration: 0, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: bulgePath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <MotionComponent
      className='fixed z-50 h-screen w-screen cursor-wait bg-foreground'
      variants={slideUp}
      initial='initial'
      exit='exit'
    >
      {width > 0 ? (
        <>
          <MotionComponent
            className='text-3xl text-background md:text-4xl'
            variants={fade}
            initial='initial'
            animate='enter'
          >
            <Dot size={48} className='me-3' />
            <p className='capitalize'>
              {mode === 'greeting' ? preloaderWords[index] : sectionLabel}
            </p>
          </MotionComponent>
          <motion.svg className='absolute top-0 -z-10 h-[calc(100%+300px)] w-full'>
            <motion.path
              className='fill-foreground'
              variants={curve}
              initial='initial'
              exit='exit'
            />
          </motion.svg>
        </>
      ) : null}
    </MotionComponent>
  );
}
