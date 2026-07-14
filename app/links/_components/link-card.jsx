import { ArrowUpRight, Briefcase, Clock, Globe, ShieldCheck, Users } from 'lucide-react';

import { cn } from '@/utils';

const icons = { Briefcase, Users, Globe, ShieldCheck };

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
