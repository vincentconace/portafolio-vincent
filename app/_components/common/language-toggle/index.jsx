'use client';

import { MagneticButton } from '@/components';
import { useTranslation } from '@/providers';
import { cn } from '@/utils';

/**
 * @param {Object} props
 * @param {string} [props.className]
 */
export function LanguageToggle({ className }) {
  const { t, toggleLang } = useTranslation();

  return (
    <MagneticButton
      size='md'
      variant='ghost'
      onClick={toggleLang}
      className={cn([
        'aspect-square !h-24 !w-24 !p-0 border border-solid border-muted-foreground',
        className,
      ])}
    >
      <span className='text-sm font-medium uppercase'>{t('toggle.lang')}</span>
      <span className='sr-only'>{t('toggle.a11y')}</span>
    </MagneticButton>
  );
}
