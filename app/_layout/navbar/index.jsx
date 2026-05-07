'use client';

import { cn } from '@/utils';

import { NavbarBrand } from './brand';
import { NavbarList } from './list';

/**
 * @param {Object} props
 * @param {'dark'|'light'} [props.theme]
 */
export function Navbar({ theme = 'dark' }) {
  return (
    <nav className='absolute inset-x-0 top-0 z-10'>
      <div
        className={cn(
          'flex items-center justify-between px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 md:px-8 md:py-4',
          theme === 'light' ? 'text-foreground' : 'text-background',
        )}
      >
        <NavbarBrand />
        <NavbarList />
      </div>
    </nav>
  );
}
