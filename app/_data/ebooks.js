/**
 * Ebooks — serie "Claude de Cero a Cien" (pantalla `/links/ebooks`).
 *
 * El Vol. 1 (a la venta) se muestra como card destacada con su portada real
 * (<EbookFeatured/>). Los próximos volúmenes van como lista "Próximamente",
 * reutilizando la grilla del hub (<LinkCards/>). Los textos (título/desc/CTA)
 * salen de `links.items.<id>` en `translations.js`, bilingües.
 */

/** Ebook destacado: portada + precio + link real de Payhip. */
export const featuredEbook = {
  id: 'ebook1',
  cover: '/ebooks/vol1-la-base.png',
  href: 'https://payhip.com/b/gDuES',
  price: '$30.000', // formato AR (punto de miles)
  currency: 'ARS',
};

/**
 * Próximos volúmenes (inertes hasta que existan sus links). Mismo esquema que
 * `treeLinks`. Cuando salgan: reemplazar `href: null` + `comingSoon: true` por
 * el `href` de Payhip + `external: true`.
 */
export const upcomingEbooks = [
  { id: 'ebook2', variant: 'secondary', icon: 'BookOpen', href: null, comingSoon: true },
  { id: 'ebook3', variant: 'secondary', icon: 'BookOpen', href: null, comingSoon: true },
];
