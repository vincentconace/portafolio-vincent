'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MagneticButton } from '@/components';
import { Contact, Navbar, Transition } from '@/layout';
import { useTranslation } from '@/providers';

/**
 * @param {Object} props
 * @param {{
 *   slug: string;
 *   year: number;
 *   thumbnailImage: string;
 *   externalUrl?: string;
 *   tech: string[];
 *   gallery?: { src: string; altKey?: string }[];
 * }} props.project
 */
export function ProjectDetail({ project }) {
  const { t } = useTranslation();

  const title = t(`projects.${project.slug}.title`);
  const type = t(`projects.${project.slug}.type`);
  const longDescription = t(`projects.${project.slug}.longDescription`);
  const viewSiteLabel = t(`projects.${project.slug}.viewSite`);
  const hasExternalUrl = Boolean(project.externalUrl);
  const gallery = project.gallery ?? [];

  return (
    <Transition>
      <Navbar theme='light' />
      <main className='bg-gradient-to-b from-white from-0% via-neutral-200 via-50% to-white to-100% text-foreground'>
        <HeroSection
          title={title}
          year={project.year}
          type={type}
          tech={project.tech}
          externalUrl={project.externalUrl}
          hasExternalUrl={hasExternalUrl}
          viewSiteLabel={viewSiteLabel}
        />

        <CoverSection
          src={project.thumbnailImage}
          alt={title}
        />

        <DescriptionSection
          description={longDescription}
          slug={project.slug}
        />

        {gallery.length > 0 ? (
          <GallerySection items={gallery} title={title} t={t} />
        ) : null}
      </main>
      <ClosingSection
        backLabel={t('projectDetail.backToWork')}
      />
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

function HeroSection({
  title,
  year,
  type,
  tech,
  externalUrl,
  hasExternalUrl,
  viewSiteLabel,
}) {
  const { t } = useTranslation();

  return (
    <section className='container mx-auto px-4 pb-16 pt-32 sm:px-6 md:px-8 lg:px-16 lg:pb-24 lg:pt-40'>
      <FadeIn>
        <h1 className='text-balance text-[clamp(2.5em,9vw,9em)] font-medium leading-[0.95] tracking-tight'>
          {title}
        </h1>
      </FadeIn>

      <FadeIn delay={0.1} className='mt-12 lg:mt-20'>
        <div className='grid grid-cols-1 gap-8 border-t border-solid border-foreground/10 pt-8 md:grid-cols-3 lg:gap-12'>
          <MetaBlock label={t('projectDetail.year')} value={year} />
          <MetaBlock label={t('projectDetail.type')} value={type} />
          <div>
            {hasExternalUrl ? (
              <Link
                href={externalUrl}
                target='_blank'
                rel='noopener'
                passHref
              >
                <MagneticButton variant='ghost' size='md'>
                  <span className='flex items-center gap-2'>
                    {viewSiteLabel}
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                  </span>
                </MagneticButton>
              </Link>
            ) : (
              <span className='text-sm text-foreground/50'>
                {t('projectDetail.viewSiteFallback')}
              </span>
            )}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} className='mt-12 lg:mt-16'>
        <div className='border-t border-solid border-foreground/10 pt-8'>
          <h2 className='mb-6 text-xs uppercase tracking-widest text-foreground/60'>
            {t('projectDetail.stack')}
          </h2>
          <ul className='flex flex-wrap gap-2'>
            {tech.map(tag => (
              <li
                key={tag}
                className='rounded-full border border-solid border-foreground/20 px-4 py-1.5 text-xs uppercase tracking-wider text-foreground/70'
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}

function MetaBlock({ label, value }) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs uppercase tracking-widest text-foreground/60'>
        {label}
      </span>
      <span className='text-base lg:text-lg'>{value}</span>
    </div>
  );
}

function CoverSection({ src, alt }) {
  return (
    <section className='container mx-auto px-4 pb-16 sm:px-6 md:px-8 lg:px-16 lg:pb-24'>
      <FadeIn>
        <div className='relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-200'>
          <Image
            src={src}
            alt={alt}
            fill
            sizes='(max-width: 1024px) 100vw, 1280px'
            priority
            className='object-cover'
          />
        </div>
      </FadeIn>
    </section>
  );
}

function DescriptionSection({ description, slug }) {
  const { t } = useTranslation();
  return (
    <section className='container mx-auto px-4 pb-24 sm:px-6 md:px-8 lg:px-16 lg:pb-32'>
      <FadeIn>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:gap-16'>
          <h2 className='text-xs uppercase tracking-widest text-foreground/60 lg:pt-2'>
            {t('projectDetail.about')}
          </h2>
          <p className='text-balance text-lg leading-relaxed text-foreground/80 lg:text-2xl'>
            {description}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

function GallerySection({ items, title, t }) {
  return (
    <section className='container mx-auto px-4 pb-16 sm:px-6 md:px-8 lg:px-16 lg:pb-24'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-10'>
        {items.map((item, index) => (
          <FadeIn key={item.src} delay={index * 0.05}>
            <div className='relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-200'>
              <Image
                src={item.src}
                alt={item.altKey ? t(`projects.${item.altKey}`) : title}
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-cover'
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ClosingSection({ backLabel }) {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const curveHeight = useTransform(scrollYProgress, [0, 0.9], [250, 0]);

  return (
    <section ref={ref} className='relative z-10'>
      <div className='border-t border-solid border-foreground/10 bg-white text-foreground'>
        <div className='container mx-auto px-4 py-24 sm:px-6 md:px-8 lg:px-16 lg:py-32'>
          <div className='flex items-start justify-between gap-8'>
            <FadeIn className='flex-1'>
              <Link
                href='/work'
                className='group inline-flex items-center gap-3 text-sm uppercase tracking-widest text-foreground/70 transition-colors active:text-foreground hover-hover:hover:text-foreground'
              >
                <MoveLeft
                  size={20}
                  strokeWidth={1.5}
                  className='transition-transform duration-300 ease-in-expo group-active:-translate-x-1 hover-hover:group-hover:-translate-x-1'
                />
                {backLabel}
              </Link>
            </FadeIn>
            <FadeIn delay={0.15}>
              <ArrowDownRight size={36} strokeWidth={1.25} />
            </FadeIn>
          </div>
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
