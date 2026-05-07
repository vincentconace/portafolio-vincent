'use client';

import Image from 'next/image';

import { Center } from '@/components';

/**
 * @param {Object} props
 * @param {'image' | 'video'} props.type
 * @param {string} props.source
 * @param {string} [props.alt]
 */
export function ProjectSlider({ type, source, alt = 'project item' }) {
  return (
    <Center
      className='relative w-1/4 overflow-hidden rounded'
      style={{
        minWidth: '150px',
        height: '20vw',
      }}
    >
      {type === 'image' ? (
        <Image
          src={source}
          alt={alt}
          fill
          sizes='25vw'
          className='object-cover'
        />
      ) : (
        <video
          src={source}
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 h-full w-full object-cover'
        />
      )}
    </Center>
  );
}
