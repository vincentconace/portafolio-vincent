const SITE_URL = 'https://vincentconace.com';
const SITE_DESC =
  'Ayudo a negocios y emprendedores a hacer realidad sus ideas con soluciones de software a medida y automatizaciones con IA. Desde Mar del Plata, Argentina.';

/** @type {import('next').Metadata} */
export const rootMetadata = {
  // Base para que las URLs de imágenes (og.jpg) se resuelvan absolutas al compartir.
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Vincent Conace',
    default: 'Vincent Conace • Software & Automatizaciones con IA',
  },
  description: SITE_DESC,
  generator: 'Vincent Conace',
  applicationName: 'Vincent Conace',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Software',
    'Automatizaciones',
    'IA',
    'Web Development',
    'Mar del Plata',
  ],
  authors: [{ name: 'Vincent Conace' }],
  creator: 'Vincent Conace',
  publisher: 'Vincent Conace',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Tarjeta al compartir (WhatsApp, Instagram, X, Facebook…): antes salía en
  // negro porque no había og:image. Ahora usa /og.jpg (foto + marca).
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: 'Vincent Conace',
    title: 'Vincent Conace • Software & Automatizaciones con IA',
    description: SITE_DESC,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Vincent Conace — Software & Automatizaciones con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincent Conace • Software & Automatizaciones con IA',
    description: SITE_DESC,
    images: ['/og.jpg'],
  },
};
