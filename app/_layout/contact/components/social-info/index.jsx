'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { MagneticButton } from '@/components';
import { socialMedias } from '@/data';
import { useTranslation } from '@/providers';
import { randomId } from '@/utils';

import { ListTitle } from './index.styled';

export function SocialInfo() {
  const { t, lang } = useTranslation();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString(lang === 'es' ? 'es-AR' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [lang]);

  const medias = socialMedias.map(({ href, title }) => {
    const id = randomId();
    return (
      <li
        key={id}
        className='border-b border-solid border-b-transparent transition-all duration-300 ease-in-expo hover:border-b-border'
      >
        <Link href={href} target='_blank' rel='noopener' passHref>
          <MagneticButton>{title}</MagneticButton>
        </Link>
      </li>
    );
  });

  return (
    <div className='px-12 pb-4 pt-10'>
      <div className='flex flex-wrap items-stretch justify-between gap-5'>
        <div className='flex gap-8'>
          <div>
            <ListTitle>{t('contact.version')}</ListTitle>
            <p className='mt-7'>{t('contact.edition')}</p>
          </div>
          <div>
            <ListTitle>{t('contact.localTime')}</ListTitle>
            <p className='mt-7'>
              <time>{time}</time>
            </p>
          </div>
        </div>

        <div className='flex flex-col'>
          <ListTitle>{t('contact.socials')}</ListTitle>
          <ul className='flex gap-8'>{medias}</ul>
        </div>
      </div>
    </div>
  );
}
