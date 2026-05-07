'use client';

import { Copyright } from 'lucide-react';
import Link from 'next/link';

import { useTranslation } from '@/providers';

export function NavbarBrand() {
  const { t } = useTranslation();
  const prefix = t('brand.prefix');
  const name = t('brand.name');
  const lastName = t('brand.lastName');
  const hasLastName = lastName && lastName !== 'brand.lastName';

  return (
    <Link
      href='/'
      aria-label='Home'
      className='group flex cursor-pointer items-center pb-5'
    >
      <div className='transition-transform duration-500 ease-in-expo group-hover:rotate-[360deg]'>
        <Copyright />
      </div>

      <div className='ms-2 flex items-center overflow-hidden whitespace-nowrap'>
        <h5 className='inline-flex max-w-[14ch] overflow-hidden pe-1 transition-[max-width,padding] duration-500 ease-in-expo group-hover:max-w-0 group-hover:pe-0'>
          {prefix}
        </h5>
        <h5>{name}</h5>
        {hasLastName ? (
          <h5 className='inline-flex max-w-0 overflow-hidden ps-0 transition-[max-width,padding] duration-500 ease-in-expo group-hover:max-w-[14ch] group-hover:ps-1'>
            {lastName}
          </h5>
        ) : null}
      </div>
    </Link>
  );
}
