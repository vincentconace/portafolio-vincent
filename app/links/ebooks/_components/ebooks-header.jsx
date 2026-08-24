'use client';

import { ArrowLeft } from 'lucide-react';

import { cn } from '@/utils';
import { useTranslation } from '@/providers';

/**
 * Cabecera de la pantalla /links/ebooks. A diferencia del hub, no lleva la foto
 * a sangre: es una sub-pantalla, así que va liviana (volver + idioma + título).
 *
 * El toggle ES/EN vive acá porque en /links* el offcanvas global está oculto.
 * No se reutiliza <LangToggle/> del hub: ese está estilado en blanco para ir
 * sobre la foto; acá el fondo es claro, así que va en tinta.
 */
export function EbooksHeader() {
  const { lang, toggleLang, t } = useTranslation();

  return (
    <header className='mx-auto w-full max-w-[680px] px-5 pt-6 sm:pt-10'>
      {/* Fila superior: volver a /links + toggle de idioma */}
      <div className='flex items-center justify-between'>
        <a
          href='/links'
          className='group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all duration-500 ease-in-expo hover-hover:hover:border-foreground/25 hover-hover:hover:text-foreground active:scale-95'
        >
          <ArrowLeft
            className='size-4 transition-transform duration-500 ease-in-expo hover-hover:group-hover:-translate-x-0.5'
            strokeWidth={1.75}
            aria-hidden
          />
          {t('links.ebooksBack')}
        </a>

        <button
          type='button'
          onClick={toggleLang}
          aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
          className='flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition-all duration-500 ease-in-expo hover-hover:hover:border-foreground/25 active:scale-95'
        >
          <span className={cn('transition-opacity', lang === 'es' ? 'opacity-100' : 'opacity-40')}>
            ES
          </span>
          <span className='opacity-30'>/</span>
          <span className={cn('transition-opacity', lang === 'en' ? 'opacity-100' : 'opacity-40')}>
            EN
          </span>
        </button>
      </div>

      {/* Título display + tagline (tipografía de la web: weight 500, tracking negativo) */}
      <div className='mt-10 sm:mt-14'>
        <h1 className='text-[clamp(2.5rem,9vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-foreground'>
          {t('links.ebooksTitle')}
        </h1>
        <p className='mt-3 max-w-[42ch] text-base text-muted-foreground sm:text-lg'>
          {t('links.ebooksTagline')}
        </p>
      </div>
    </header>
  );
}
