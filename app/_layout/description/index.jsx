'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { MagneticButton, ParallaxFade, ParallaxReveal } from '@/components';
import { useTranslation } from '@/providers';

import { Title, Wrapper } from './index.styled';

export function Description() {
  const { t } = useTranslation();

  return (
    <article className='container relative'>
      <Wrapper>
        <div className='basis-full lg:basis-9/12'>
          <Title>
            <ParallaxReveal paragraph={t('description.phrase')} />
          </Title>
        </div>

        <div className='basis-7/12 lg:basis-3/12'>
          <ParallaxFade>
            <Balancer as='p' className='mt-2 text-base lg:text-lg'>
              {t('description.sub')}
            </Balancer>
          </ParallaxFade>
        </div>

        <motion.div
          className='basis-full lg:basis-auto'
          whileInView={{ y: '-15%' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className='mt-4 flex justify-end lg:absolute lg:right-0 lg:top-full lg:me-10 lg:mt-0 lg:block'>
            <Link href='/about' passHref>
              <MagneticButton
                variant='ghost'
                size='xl'
                className='aspect-square !h-28 !w-28 !p-0 sm:!h-32 sm:!w-32 lg:!h-40 lg:!w-40'
              >
                {t('description.cta')}
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
      </Wrapper>
    </article>
  );
}
