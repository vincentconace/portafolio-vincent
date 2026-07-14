/**
 * Datos del hub "tree" (link-in-bio) de Vincent Conace.
 *
 * ESQUELETO: por ahora ningún vínculo navega. Cuando toque cablearlos,
 * poné `LINKS_ENABLED = true` y cada tarjeta con `href` se volverá un
 * enlace real. Las tarjetas sin `href` (placeholders) siguen inertes
 * hasta que exista su destino (p. ej. el núcleo de la IA que migraremos
 * a este repositorio).
 */
export const LINKS_ENABLED = true;

/** Perfil del hero. */
export const treeProfile = {
  name: 'Vincent Conace',
  bio: 'Diseñador · Web · Software · Automatización',
  location: 'Mar del Plata, Argentina',
  /** Misma foto que el "giro" de la web (public/hero.png). */
  avatar: '/hero.png',
};

/**
 * Destinos del hub.
 * variant: 'primary' → tarjeta destacada (CTA negra)
 *          'secondary' → tarjeta blanca con borde fino
 * icon: nombre de un ícono de `lucide-react`
 * href: destino final (null = placeholder, aún sin destino)
 * external: abre en pestaña nueva
 */
export const treeLinks = [
  {
    id: 'cliente',
    variant: 'primary',
    icon: 'Briefcase',
    title: 'Trabajá conmigo',
    subtitle: 'Portal + onboarding',
    href: null, // futuro: /cliente
    external: false,
    comingSoon: true, // placeholder → muestra "Próximamente / Coming soon"
  },
  {
    id: 'comunidad',
    variant: 'primary',
    icon: 'Users',
    title: 'Núcleo de la IA',
    subtitle: 'Mi comunidad',
    href: '/nucleo-de-la-ia', // la bóveda vive dentro de este repo
    external: true, // abrir en pestaña nueva
  },
  {
    id: 'web',
    variant: 'secondary',
    icon: 'Globe',
    title: 'Mi web',
    subtitle: 'Portfolio y servicios',
    href: 'https://vincentconace.com', // URL principal
    external: true,
  },
  {
    id: 'stockguardian',
    variant: 'secondary',
    icon: 'ShieldCheck',
    title: 'StockGuardian',
    subtitle: 'Mi producto',
    href: 'https://stock.guardiandz.com/',
    external: true,
  },
];

/** Redes del pie del hub. */
export const treeSocials = [
  {
    id: 'instagram',
    icon: 'Instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/vincent.webs/',
  },
  {
    id: 'whatsapp',
    icon: 'MessageCircle',
    label: 'WhatsApp',
    href: 'https://wa.me/542236368902',
  },
  {
    id: 'mail',
    icon: 'Mail',
    label: 'Mail',
    href: 'mailto:vincent97.web@gmail.com',
  },
];
