'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Globe } from 'lucide-react';
import Image from 'next/image';

import { useMagnetic } from '@/hooks';
import { Contact, Navbar, Transition } from '@/layout';
import { useTranslation } from '@/providers';

export default function About() {
  const { t } = useTranslation();
  const services = t('aboutPage.services.items');

  return (
    <Transition>
      <Navbar theme='light' />
      <main className='bg-gradient-to-b from-white from-0% via-neutral-300 via-50% to-white to-100% text-foreground'>
        <HeroSection
          heading={t('aboutPage.intro.heading')}
          paragraph={t('aboutPage.intro.paragraph')}
        />
        <ServicesSection
          title={t('aboutPage.services.title')}
          items={Array.isArray(services) ? services : []}
        />
        <CredentialsSection
          heading={t('aboutPage.credentials.heading')}
          paragraph={t('aboutPage.credentials.paragraph')}
        />
      </main>
      <Contact />
    </Transition>
  );
}

function GlobeCircle() {
  /** @type {import('react').MutableRefObject<HTMLDivElement>} */
  const ref = useRef(null);
  const { position, handleMagneticMove, handleMagneticOut } = useMagnetic(ref);
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#4f46e5', '#a855f7', '#ec4899', '#f97316', '#10b981'],
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMagneticMove}
      onPointerOut={handleMagneticOut}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 150,
        mass: 0.1,
      }}
      whileHover={{ scale: 1.1 }}
      style={{ backgroundColor }}
      className='flex h-32 w-32 shrink-0 items-center justify-center rounded-full text-background lg:h-40 lg:w-40'
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <Globe size={56} strokeWidth={1.25} />
      </motion.div>
    </motion.div>
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

function HeroSection({ heading, paragraph }) {
  return (
    <section className='container mx-auto px-8 pb-24 pt-32 lg:px-16 lg:pb-32 lg:pt-40'>
      <FadeIn>
        <h1 className='text-balance text-[clamp(2.5em,8vw,8em)] font-medium leading-[0.95] tracking-tight text-foreground'>
          {heading}
        </h1>
      </FadeIn>

      <FadeIn delay={0.1} className='mt-20 lg:mt-32'>
        <div className='relative flex items-center'>
          <div className='h-px flex-1 bg-foreground/15' />
          <GlobeCircle />
          <div className='hidden h-px w-12 bg-foreground/15 lg:block xl:w-32' />
        </div>
      </FadeIn>

      <FadeIn
        delay={0.2}
        className='mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-[1fr_2fr] lg:gap-16'
      >
        <div className='flex items-start gap-6'>
          <ArrowUpRight size={28} strokeWidth={1.25} className='shrink-0' />
          <p className='max-w-md text-balance text-base text-foreground/70 lg:text-lg'>
            {paragraph}
          </p>
        </div>

        <div className='relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-200 lg:aspect-[16/10]'>
          <Image
            src='/hero.png'
            alt='Vincent Conace'
            fill
            sizes='(max-width: 1024px) 100vw, 720px'
            className='object-cover'
            priority
          />
        </div>
      </FadeIn>
    </section>
  );
}

function ServicesSection({ title, items }) {
  return (
    <section className='border-t border-solid border-foreground/10'>
      <div className='container mx-auto px-8 py-24 lg:px-16 lg:py-32'>
        <FadeIn>
          <span className='text-xs uppercase tracking-widest text-foreground/60'>
            {title}
          </span>
        </FadeIn>

        <div className='mt-16 grid grid-cols-1 gap-16 md:grid-cols-3 lg:mt-24 lg:gap-12'>
          {items.map((item, index) => (
            <FadeIn key={item.number} delay={index * 0.1}>
              <article className='flex flex-col gap-8'>
                <span className='text-[clamp(2.5em,5vw,5em)] font-medium leading-none text-foreground/30'>
                  {item.number}
                </span>
                <h3 className='text-2xl font-medium leading-tight text-foreground lg:text-3xl'>
                  {item.title}
                </h3>
                <p className='text-base text-foreground/70'>
                  {item.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredentialsSection({ heading, paragraph }) {
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
        <div className='container mx-auto px-8 py-24 lg:px-16 lg:py-32'>
          <div className='flex items-start justify-between gap-8'>
            <FadeIn className='flex-1'>
              <div className='flex max-w-3xl flex-col gap-10'>
                <h2 className='text-balance text-[clamp(2em,4.5vw,4.5em)] font-medium leading-tight'>
                  {heading}
                </h2>
                <p className='max-w-2xl text-base text-foreground/70 lg:text-lg'>
                  {paragraph}
                </p>
              </div>
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
