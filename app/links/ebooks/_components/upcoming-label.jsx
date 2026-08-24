'use client';

import { useTranslation } from '@/providers';

/** Overline "Próximos volúmenes" sobre la lista de ebooks que aún no salieron. */
export function UpcomingLabel() {
  const { t } = useTranslation();

  return (
    <p className='mt-10 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:mt-12'>
      {t('links.ebooksUpcoming')}
    </p>
  );
}
