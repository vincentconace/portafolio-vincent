'use client';

import Link from 'next/link';

import { thumbnailOptions } from '@/data';
import { useTranslation } from '@/providers';

/**
 * @param {Object} props
 * @param {(index: number) => void} props.handlePointerEnter
 * @param {(index: number) => void} props.handlePointerLeave
 * @param {(x: number, y: number) => void} props.moveItems
 */
export function ThumbnailList({
  handlePointerEnter,
  handlePointerLeave,
  moveItems,
}) {
  const { t } = useTranslation();

  const items = thumbnailOptions.map((item, index) => {
    const id = index;

    if (item.isPlaceholder) {
      return (
        <li
          key={`thumbnail-list-${item.slug}`}
          aria-disabled='true'
          className='pointer-events-none border-t border-solid opacity-30 last-of-type:border-b'
          style={{
            paddingInline: 'calc(clamp(1em,3vw,4em) * 2)',
            paddingBlock: 'clamp(1em,3vw,4em)',
          }}
        >
          <div className='flex items-center justify-between max-lg:flex-wrap'>
            <h4
              style={{
                fontSize: 'calc(clamp(3.25em, 7vw, 8em) * 0.75)',
              }}
            >
              {t('thumbnail.comingSoon')}
            </h4>
            <p className='text-lg font-medium text-muted-foreground'>
              {t('thumbnail.comingSoon')}
            </p>
          </div>
        </li>
      );
    }

    const title = t(`projects.${item.slug}.title`);
    const type = t(`projects.${item.slug}.type`);

    return (
      <li
        key={`thumbnail-list-${item.slug}`}
        className='border-t border-solid transition-all last-of-type:border-b hover-hover:group-hover:opacity-90'
        style={{
          paddingInline: 'calc(clamp(1em,3vw,4em) * 2)',
          paddingBlock: 'clamp(1em,3vw,4em)',
        }}
        onPointerEnter={({ clientX, clientY }) => {
          handlePointerEnter(id);
          moveItems(clientX, clientY);
        }}
        onPointerLeave={({ clientX, clientY }) => {
          handlePointerLeave(id);
          moveItems(clientX, clientY);
        }}
      >
        <Link
          href={`/work/${item.slug}`}
          className='flex items-center justify-between max-lg:flex-wrap'
          passHref
        >
          <h4
            style={{
              fontSize: 'calc(clamp(3.25em, 7vw, 8em) * 0.75)',
            }}
          >
            {title}
          </h4>
          <p className='text-lg font-medium'>{type}</p>
        </Link>
      </li>
    );
  });

  return <ul className='group'>{items}</ul>;
}
