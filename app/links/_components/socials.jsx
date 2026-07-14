'use client';

import { Instagram, Mail, MessageCircle } from 'lucide-react';

import { cn } from '@/utils';
import { useTranslation } from '@/providers';

const icons = { Instagram, MessageCircle, Mail };

/** Pie del hub: fila de redes + crédito bilingüe. */
export function Socials({ socials, enabled = false }) {
  const { t } = useTranslation();

  return (
    <>
      <nav aria-label='Redes' className='flex items-center justify-center gap-6'>
        {socials.map(({ id, icon, label, href }) => {
          const Icon = icons[icon] ?? Mail;
          const isLink = enabled && Boolean(href);
          const className = cn(
            'text-muted-foreground transition-all duration-500 ease-in-expo active:scale-90',
            isLink
              ? 'hover-hover:hover:scale-125 hover-hover:hover:text-foreground'
              : 'cursor-default'
          );

          if (isLink) {
            const external = href.startsWith('http');
            return (
              <a
                key={id}
                href={href}
                aria-label={label}
                className={className}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <Icon className='size-5' strokeWidth={1.75} aria-hidden />
              </a>
            );
          }

          return (
            <button
              key={id}
              type='button'
              aria-label={label}
              aria-disabled='true'
              className={className}
            >
              <Icon className='size-5' strokeWidth={1.75} aria-hidden />
            </button>
          );
        })}
      </nav>

      <p className='text-xs text-muted-foreground'>{t('links.madeBy')}</p>
    </>
  );
}
