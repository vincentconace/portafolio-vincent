'use client';

import Image from 'next/image';

import { useTranslation } from '@/providers';

import { LangToggle } from './lang-toggle';
import { Marquee } from './marquee';

/**
 * Cabecera del hub: la foto ocupa el encabezado y se degrada hacia el blanco.
 * Sobre el blanco, dos marquees infinitos y reactivos al scroll (como la web):
 * el nombre grande y la bio chica, en direcciones opuestas.
 */
export function Hero({ profile }) {
  const { t } = useTranslation();
  const { name, avatar } = profile;

  return (
    <header className='relative'>
      <LangToggle />

      {/* Foto a sangre (todo el ancho), degradando al blanco */}
      <div className='relative h-[34dvh] min-h-[220px] w-full sm:h-[46vh]'>
        <Image
          src={avatar}
          alt={name}
          fill
          sizes='100vw'
          priority
          className='object-cover object-[center_25%]'
        />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-b from-transparent to-background' />
      </div>

      {/* Marquees sobre el blanco (solapan el degradado) */}
      <div className='relative -mt-14 select-none sm:-mt-16'>
        {/* Nombre — grande, reactivo al scroll */}
        <Marquee baseVelocity={2.2} repeat={6} className='text-foreground'>
          <span className='pe-8 text-[clamp(2.5rem,10vw,4.25rem)] font-medium leading-none tracking-tight'>
            {name}
            <span className='px-6 font-light text-muted-foreground'>—</span>
          </span>
        </Marquee>

        {/* Bio — chica, dirección opuesta */}
        <Marquee baseVelocity={-1.3} repeat={10} className='mt-2 text-muted-foreground'>
          <span className='pe-5 text-sm sm:text-base'>
            {t('links.bio')}
            <span className='px-4 opacity-50'>·</span>
          </span>
        </Marquee>

        <p className='mt-3 px-5 text-center text-sm text-muted-foreground'>
          {t('links.location')}
        </p>
      </div>
    </header>
  );
}
