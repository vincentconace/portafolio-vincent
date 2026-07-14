'use client';

import { cn } from '@/utils';
import { useTranslation } from '@/providers';

/**
 * Toggle ES/EN del hub. En /links el menú (offcanvas) está oculto, así que el
 * cambio de idioma vive acá: pastilla flotante sobre la foto (arriba a la derecha).
 */
export function LangToggle() {
  const { lang, toggleLang } = useTranslation();

  return (
    <button
      type='button'
      onClick={toggleLang}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      className='absolute right-4 top-4 z-30 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition-all duration-500 ease-in-expo hover-hover:hover:bg-black/40 active:scale-95 sm:right-6 sm:top-6'
    >
      <span className={cn('transition-opacity', lang === 'es' ? 'opacity-100' : 'opacity-40')}>
        ES
      </span>
      <span className='opacity-30'>/</span>
      <span className={cn('transition-opacity', lang === 'en' ? 'opacity-100' : 'opacity-40')}>
        EN
      </span>
    </button>
  );
}
