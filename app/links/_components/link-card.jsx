import {
  ArrowUpRight,
  Briefcase,
  Clock,
  Globe,
  ShieldCheck,
  Users,
} from 'lucide-react';

import { cn } from '@/utils';

/**
 * Logo oficial de WhatsApp (glifo relleno con `currentColor` → monocromo,
 * hereda el color de la card: blanco sobre la CTA negra). lucide no trae
 * íconos de marca, por eso va inline.
 */
function WhatsApp({ className, ...props }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      className={className}
      {...props}
    >
      <path d='M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.988-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z' />
    </svg>
  );
}

const icons = { Briefcase, Users, Globe, ShieldCheck, WhatsApp };

/**
 * Tarjeta de destino del hub (pill estilo web).
 * - variant 'primary'  → CTA en negro pleno (con brillo sutil si está activa).
 * - variant 'secondary'→ tarjeta blanca con borde fino.
 * - comingSoon         → placeholder "Próximamente" (inerte, sin brillo, reloj).
 *
 * `title`/`subtitle` llegan ya traducidos desde <LinkCards/>.
 */
export function LinkCard({ link, title, subtitle, enabled = false }) {
  const { variant, icon, href, external, comingSoon } = link;
  const Icon = icons[icon] ?? Globe;
  const isPrimary = variant === 'primary';
  const isLink = enabled && Boolean(href) && !comingSoon;

  const className = cn(
    // Pill como los botones de la web (rounded-full) + brillo sutil en los primary.
    'group relative flex w-full items-center gap-4 overflow-hidden rounded-full px-5 py-4 text-left transition-all duration-500 ease-in-expo sm:px-6 sm:py-5',
    isPrimary
      ? 'bg-foreground text-background'
      : 'border border-border bg-background text-foreground',
    isPrimary && !comingSoon && 'link-sheen',
    isLink &&
      (isPrimary
        ? 'hover-hover:hover:-translate-y-1 hover-hover:hover:scale-[1.015] hover-hover:hover:shadow-[0_22px_46px_-14px_rgba(28,30,33,0.55)]'
        : 'hover-hover:hover:-translate-y-1 hover-hover:hover:scale-[1.015] hover-hover:hover:border-foreground/25 hover-hover:hover:shadow-[0_22px_46px_-16px_rgba(28,30,33,0.28)]'),
    !isLink && 'cursor-default'
  );

  const content = (
    <>
      <span
        className={cn(
          'relative z-[1] flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ease-in-expo',
          isPrimary ? 'bg-background/10' : 'bg-muted'
        )}
      >
        <Icon className='size-5' strokeWidth={1.75} aria-hidden />
      </span>

      <span className='relative z-[1] min-w-0 flex-1'>
        <span className='block truncate text-base font-medium leading-tight'>
          {title}
        </span>
        <span
          className={cn(
            'block truncate text-sm leading-tight',
            isPrimary ? 'text-background/60' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </span>
      </span>

      {comingSoon ? (
        <Clock
          className={cn(
            'relative z-[1] size-5 shrink-0',
            isPrimary ? 'text-background/70' : 'text-muted-foreground'
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      ) : (
        <ArrowUpRight
          className={cn(
            'relative z-[1] size-5 shrink-0 transition-transform duration-500 ease-in-expo',
            'hover-hover:group-hover:-translate-y-1 hover-hover:group-hover:translate-x-1',
            isPrimary ? 'text-background/70' : 'text-muted-foreground'
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      )}
    </>
  );

  if (isLink) {
    return (
      <a
        href={href}
        className={className}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type='button' className={className} aria-disabled='true'>
      {content}
    </button>
  );
}
