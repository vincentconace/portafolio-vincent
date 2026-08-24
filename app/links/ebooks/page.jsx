import { featuredEbook, upcomingEbooks, treeSocials } from '@/data';

import { LinkCards } from '../_components/link-cards';
import { Socials } from '../_components/socials';
import { EbooksHeader } from './_components/ebooks-header';
import { EbookFeatured } from './_components/ebook-featured';
import { UpcomingLabel } from './_components/upcoming-label';

const EBOOKS_DESC =
  'Mis ebooks descargables: guías prácticas para aprender y aplicar IA y automatización.';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Vincent Conace — Ebooks',
  description: EBOOKS_DESC,
  // OG propio. metadataBase se hereda del root, así que /og.jpg se resuelve absoluto.
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://vincentconace.com/links/ebooks',
    siteName: 'Vincent Conace',
    title: 'Vincent Conace — Ebooks',
    description: EBOOKS_DESC,
    images: [
      { url: '/og.jpg', width: 1200, height: 630, alt: 'Vincent Conace' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincent Conace — Ebooks',
    description: EBOOKS_DESC,
    images: ['/og.jpg'],
  },
};

export default function Ebooks() {
  return (
    <main className='flex min-h-[100dvh] w-full flex-col pb-6'>
      <EbooksHeader />

      <div className='mx-auto w-full max-w-[680px] px-5'>
        {/* Vol. 1: card destacada con portada real + CTA a Payhip. */}
        <EbookFeatured ebook={featuredEbook} />

        {/* Próximos volúmenes: lista "Próximamente" (una sola columna, títulos
            largos). Al salir cada uno, se activa desde app/_data/ebooks.js. */}
        <UpcomingLabel />
        <LinkCards links={upcomingEbooks} enabled singleColumn />

        <footer className='mt-8 flex flex-col items-center gap-3.5 sm:mt-12 sm:gap-6'>
          <Socials socials={treeSocials} enabled />
        </footer>
      </div>
    </main>
  );
}
