'use client';

import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Center } from '@/components';
import { thumbnailOptions } from '@/data';
import { useTranslation } from '@/providers';

const MotionComponent = motion(Center);

export const ThumbnailModal = forwardRef(
  /**
   * @param {import('react').HTMLAttributes<HTMLElement> & { variants: import('framer-motion').Variants; active: boolean; index: number;}} props
   * @param {import('react').ForwardedRef<HTMLElement>} ref
   */
  function ThumbnailModal({ variants, active, index, ...props }, ref) {
    const { t } = useTranslation();

    const items = thumbnailOptions.map(item => {
      if (item.isPlaceholder) {
        return (
          <Center
            key={`thumbnail-modal-${item.slug}`}
            className='h-full w-full bg-secondary text-muted-foreground'
          >
            <span className='text-xs uppercase tracking-widest'>
              {t('thumbnail.comingSoon')}
            </span>
          </Center>
        );
      }

      return (
        <Center
          key={`thumbnail-modal-${item.slug}`}
          className='relative h-full w-full overflow-hidden'
        >
          {item.thumbnailVideo ? (
            <video
              src={item.thumbnailVideo}
              autoPlay
              loop
              muted
              playsInline
              className='absolute inset-0 h-full w-full object-cover'
            />
          ) : (
            <Image
              src={item.thumbnailImage}
              fill
              sizes='320px'
              alt={t(`projects.${item.slug}.title`)}
              className='object-cover'
            />
          )}
        </Center>
      );
    });

    return (
      <MotionComponent
        ref={ref}
        className='pointer-events-none fixed left-1/2 top-1/2 h-80 w-80 overflow-hidden rounded bg-secondary-foreground'
        variants={variants}
        initial='initial'
        animate={active ? 'enter' : 'closed'}
        {...props}
      >
        <div
          className='relative h-full w-full'
          style={{
            top: `${index * -100}%`,
            transition: 'top 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        >
          {items}
        </div>
      </MotionComponent>
    );
  },
);
