'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { thumbnailOptions } from '@/data';
import { useTranslation } from '@/providers';

export function ThumbnailListMobile() {
  const { t } = useTranslation();
  const [expandedSlug, setExpandedSlug] = useState(null);

  return (
    <ul>
      {thumbnailOptions.map(item => {
        if (item.isPlaceholder) {
          return (
            <li
              key={`thumbnail-list-mobile-${item.slug}`}
              aria-disabled='true'
              className='border-t border-solid opacity-30 last-of-type:border-b'
            >
              <div className='flex items-center justify-between gap-4 px-4 py-6 sm:px-8 sm:py-8'>
                <h4 className='text-3xl sm:text-4xl'>
                  {t('thumbnail.comingSoon')}
                </h4>
                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                  {t('thumbnail.comingSoon')}
                </p>
              </div>
            </li>
          );
        }

        const isExpanded = expandedSlug === item.slug;
        const title = t(`projects.${item.slug}.title`);
        const type = t(`projects.${item.slug}.type`);

        return (
          <li
            key={`thumbnail-list-mobile-${item.slug}`}
            className='border-t border-solid last-of-type:border-b'
          >
            <button
              type='button'
              aria-expanded={isExpanded}
              aria-controls={`thumbnail-panel-${item.slug}`}
              onClick={() =>
                setExpandedSlug(prev => (prev === item.slug ? null : item.slug))
              }
              className='flex w-full items-center justify-between gap-4 px-4 py-6 text-left sm:px-8 sm:py-8'
            >
              <div className='flex min-w-0 flex-1 flex-col gap-1'>
                <h4 className='truncate text-3xl sm:text-4xl'>{title}</h4>
                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                  {type}
                </p>
              </div>
              <span className='relative h-12 w-12 shrink-0 overflow-hidden rounded bg-secondary'>
                <Image
                  src={item.thumbnailImage}
                  alt={title}
                  fill
                  sizes='48px'
                  className='object-cover'
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded ? (
                <motion.div
                  id={`thumbnail-panel-${item.slug}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className='overflow-hidden'
                >
                  <div className='flex flex-col gap-4 px-4 pb-8 sm:px-8'>
                    <div className='relative aspect-video w-full overflow-hidden rounded bg-secondary'>
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
                          alt={title}
                          fill
                          sizes='(max-width: 1024px) 100vw, 600px'
                          className='object-cover'
                        />
                      )}
                    </div>
                    <Link
                      href={`/work/${item.slug}`}
                      className='inline-flex items-center gap-2 self-start border-b border-solid border-current pb-1 text-sm font-medium uppercase tracking-widest active:border-b-transparent'
                    >
                      <span>{t('thumbnail.view')}</span>
                      <ArrowUpRight size={16} strokeWidth={1.75} />
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
