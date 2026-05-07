'use client';

import { useRef } from 'react';

import { useFollowPointer } from '@/hooks';
import { useTranslation } from '@/providers';

import {
  ThumbnailCursorCircle,
  ThumbnailCursorLabel,
  ThumbnailList,
  ThumbnailModal,
} from './components';
import { scaleUp } from './variants';

export function ThumbnailDesktop() {
  const { t } = useTranslation();
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const modal = useRef(null);
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const cursor = useRef(null);
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const label = useRef(null);

  const {
    item: { active, index },
    handlePointerEnter,
    handlePointerLeave,
    moveItems,
  } = useFollowPointer({ modal, cursor, label });

  return (
    <div
      onPointerMove={({ clientX, clientY }) => moveItems(clientX, clientY)}
    >
      <ThumbnailList
        handlePointerEnter={handlePointerEnter}
        handlePointerLeave={handlePointerLeave}
        moveItems={moveItems}
      />
      <ThumbnailModal
        ref={modal}
        variants={scaleUp}
        active={active}
        index={index}
      />
      <ThumbnailCursorCircle
        ref={cursor}
        variants={scaleUp}
        active={active}
      />
      <ThumbnailCursorLabel ref={label} variants={scaleUp} active={active}>
        {t('thumbnail.view')}
      </ThumbnailCursorLabel>
    </div>
  );
}
