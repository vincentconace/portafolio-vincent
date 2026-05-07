'use client';

import { useReducedMotion } from 'framer-motion';

import { thumbnailOptions } from '@/data';
import { useHasHover } from '@/hooks';
import { useTranslation } from '@/providers';

import {
  ThumbnailAction,
  ThumbnailLabel,
  ThumbnailListMobile,
} from './components';
import { ThumbnailDesktop } from './desktop';

export function Thumbnail() {
  const { t } = useTranslation();
  const hasHover = useHasHover();
  const reducedMotion = useReducedMotion();
  const realCount = thumbnailOptions.filter(item => !item.isPlaceholder).length;
  const showDesktop = hasHover && !reducedMotion;

  return (
    <section className='container relative'>
      <div className='my-8 flex flex-col gap-10'>
        <ThumbnailLabel>{t('thumbnail.title')}</ThumbnailLabel>

        {showDesktop ? <ThumbnailDesktop /> : <ThumbnailListMobile />}

        <ThumbnailAction>
          {t('thumbnail.more')}
          <sup className='text-muted-foreground'>{realCount}</sup>
        </ThumbnailAction>
      </div>
    </section>
  );
}
