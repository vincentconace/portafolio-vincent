import {
  LINKS_ENABLED,
  treeLinks,
  treeProfile,
  treeSocials,
} from '@/data';

import { Hero } from './_components/hero';
import { LinkCards } from './_components/link-cards';
import { Socials } from './_components/socials';

const LINKS_DESC =
  'La puerta de entrada a mi ecosistema: trabajá conmigo, mi comunidad de IA, mi web y StockGuardian.';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Vincent Conace — Links',
  description: LINKS_DESC,
  // OG propio del hub (la pantalla que más se comparte). metadataBase se hereda
  // del root, así que /og.jpg se resuelve absoluto.
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://vincentconace.com/links',
    siteName: 'Vincent Conace',
    title: 'Vincent Conace — Links',
    description: LINKS_DESC,
    images: [
      { url: '/og.jpg', width: 1200, height: 630, alt: 'Vincent Conace' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincent Conace — Links',
    description: LINKS_DESC,
    images: ['/og.jpg'],
  },
};

export default function Links() {
  return (
    <main className='flex min-h-[100dvh] w-full flex-col pb-6'>
      {/* Encabezado a sangre: foto entera → degradado → blanco */}
      <Hero profile={treeProfile} />

      {/* Sobre el blanco: opciones + pie, en columna centrada */}
      <div className='mx-auto w-full max-w-[680px] px-5'>
        <LinkCards links={treeLinks} enabled={LINKS_ENABLED} />

        <footer className='mt-6 flex flex-col items-center gap-3.5 sm:mt-12 sm:gap-6'>
          <Socials socials={treeSocials} enabled={LINKS_ENABLED} />
        </footer>
      </div>
    </main>
  );
}
