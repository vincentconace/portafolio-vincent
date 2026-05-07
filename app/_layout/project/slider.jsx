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
    <Center className='relative h-[55vw] w-1/4 min-w-[60vw] overflow-hidden rounded sm:h-[35vw] sm:min-w-[40vw] md:h-[25vw] md:min-w-[200px] lg:h-[20vw] lg:min-w-[150px]'>
      {type === 'image' ? (
        <Image
          src={source}
          alt={alt}
          fill
          sizes='(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 25vw'
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
