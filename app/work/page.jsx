'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { thumbnailOptions } from '@/data';
import { Contact, Navbar, Transition } from '@/layout';
import { useTranslation } from '@/providers';

export default function WorkPage() {
  const { t } = useTranslation();

  return (
    <Transition>
      <Navbar theme='light' />
      <main className='bg-gradient-to-b from-white from-0% via-neutral-200 via-50% to-white to-100% text-foreground'>
        <HeroSection
          title={t('workPage.title')}
          intro={t('workPage.intro')}
        />

        <ProjectsList items={thumbnailOptions} />
      </main>
      <Contact />
    </Transition>
  );
}

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function HeroSection({ title, intro }) {
  return (
    <section className='container mx-auto px-4 pb-16 pt-32 sm:px-6 md:px-8 lg:px-16 lg:pb-24 lg:pt-40'>
      <FadeIn>
        <h1 className='text-balance text-[clamp(2.5em,8vw,8em)] font-medium leading-[0.95] tracking-tight'>
          {title}
        </h1>
      </FadeIn>

      <FadeIn delay={0.1} className='mt-12 lg:mt-16'>
        <p className='max-w-3xl text-balance text-base text-foreground/70 lg:text-xl'>
          {intro}
        </p>
      </FadeIn>
    </section>
  );
}

function ProjectsList({ items }) {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const curveHeight = useTransform(scrollYProgress, [0, 0.9], [250, 0]);

  return (
    <section ref={ref} className='relative z-10'>
      <div className='border-t border-solid border-foreground/10 bg-white'>
        <div className='container mx-auto px-4 py-12 sm:px-6 md:px-8 lg:px-16 lg:py-16'>
          <ul className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12'>
            {items.map((item, index) => (
              <FadeIn
                key={item.slug}
                delay={index * 0.05}
                className='h-full'
              >
                {item.isPlaceholder ? (
                  <PlaceholderCard />
                ) : (
                  <ProjectCard item={item} />
                )}
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        className='w-screen bg-white'
        style={{
          height: curveHeight,
          borderRadius: '0 0 50% 50%',
        }}
      />
    </section>
  );
}

function ProjectCard({ item }) {
  const { t } = useTranslation();
  const title = t(`projects.${item.slug}.title`);
  const type = t(`projects.${item.slug}.type`);
  const description = t(`projects.${item.slug}.shortDescription`);

  return (
    <li className='h-full'>
      <Link
        href={`/work/${item.slug}`}
        className='group flex h-full flex-col gap-6'
      >
        <div className='relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-200'>
          <Image
            src={item.thumbnailImage}
            alt={title}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover transition-transform duration-700 ease-in-expo group-active:scale-[1.02] hover-hover:group-hover:scale-[1.03]'
          />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between gap-4'>
            <h2 className='text-2xl font-medium lg:text-3xl'>{title}</h2>
            <ArrowUpRight
              size={24}
              strokeWidth={1.5}
              className='shrink-0 transition-transform duration-300 ease-in-expo group-active:-translate-y-0.5 group-active:translate-x-0.5 hover-hover:group-hover:-translate-y-1 hover-hover:group-hover:translate-x-1'
            />
          </div>
          <p className='text-sm uppercase tracking-widest text-foreground/60'>
            {type} · {item.year}
          </p>
          <p className='max-w-md text-base text-foreground/70'>
            {description}
          </p>
        </div>
      </Link>
    </li>
  );
}

function PlaceholderCard() {
  const { t } = useTranslation();
  return (
    <li
      aria-disabled='true'
      className='pointer-events-none flex h-full flex-col gap-6 opacity-30'
    >
      <div className='relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-300' />
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-medium lg:text-3xl'>
          {t('thumbnail.comingSoon')}
        </h2>
        <p className='text-sm uppercase tracking-widest text-foreground/60'>
          {t('thumbnail.comingSoon')}
        </p>
      </div>
    </li>
  );
}
