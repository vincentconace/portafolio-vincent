'use client';

import { Center } from '@/components';
import { useTranslation } from '@/providers';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Center className='h-screen'>
      <div className='select-none'>
        <h1 className='text-[max(9.5em,16vw)]'>{t('notFound')}</h1>
      </div>
    </Center>
  );
}
