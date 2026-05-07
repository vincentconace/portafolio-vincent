'use client';

import { Dot } from 'lucide-react';
import Link from 'next/link';

import { Center, LanguageToggle, MagneticButton } from '@/components';
import { navItems } from '@/data';
import { useTranslation } from '@/providers';
import { randomId } from '@/utils';

export function NavbarList() {
  const { t } = useTranslation();

  const items = navItems.slice(1).map(({ href, key }) => {
    const id = randomId();
    return (
      <li key={id} className='group p-4'>
        <Link href={href} passHref>
          <MagneticButton>
            <span className='text-base capitalize'>{t(`nav.${key}`)}</span>
            <Center>
              <Dot className='scale-0 transition-transform duration-200 ease-in-expo group-hover:scale-100' />
            </Center>
          </MagneticButton>
        </Link>
      </li>
    );
  });

  return (
    <ul className='flex items-center max-lg:hidden'>
      {items}
      <li className='ms-2 ps-4'>
        <LanguageToggle />
      </li>
    </ul>
  );
}
