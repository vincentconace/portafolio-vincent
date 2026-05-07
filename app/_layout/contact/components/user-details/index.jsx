'use client';

import { motion } from 'framer-motion';
import { ArrowDownLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MagneticButton } from '@/components';
import { useTranslation } from '@/providers';

import { Container, MainTitle, Row } from './index.styled';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';

/**
 * @param {Object} props
 * @param {import('framer-motion').MotionValue<number>} props.transformX
 */
export function UserDetails({ transformX }) {
  const { t } = useTranslation();
  const whatsappLink = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : null;

  return (
    <Container>
      <Row>
        <div className='flex items-center gap-8'>
          <div className='relative aspect-square w-[clamp(3.5em,5.5vw,7em)] shrink-0 overflow-hidden rounded-full bg-secondary'>
            <Image
              src='/hero.png'
              alt='Vincent Conace'
              fill
              sizes='112px'
              className='object-cover'
            />
          </div>
          <MainTitle>{t('contact.lets')}</MainTitle>
        </div>
        <div className='flex items-center justify-between'>
          <MainTitle>{t('contact.together')}</MainTitle>
          <div>
            <ArrowDownLeft size={28} strokeWidth={1.25} />
          </div>
        </div>
      </Row>

      <Row>
        <div className='relative w-full'>
          <div className='h-[1px] bg-muted-foreground' />
          <div className='absolute right-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2'>
            <motion.div style={{ x: transformX }}>
              <Link href='/contact' passHref>
                <MagneticButton variant='primary' size='lg'>
                  {t('contact.cta')}
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </Row>

      <Row>
        <div className='flex w-full flex-col gap-4 lg:flex-row'>
          <div>
            <a href='mailto:conacevincent@gmail.com'>
              <MagneticButton
                variant='outline'
                size='md'
                className='w-full border-muted-foreground'
              >
                conacevincent@gmail.com
              </MagneticButton>
            </a>
          </div>
          {whatsappLink ? (
            <div>
              <a href={whatsappLink} target='_blank' rel='noopener'>
                <MagneticButton
                  variant='outline'
                  size='md'
                  className='w-full border-muted-foreground'
                >
                  WhatsApp
                </MagneticButton>
              </a>
            </div>
          ) : null}
        </div>
      </Row>
    </Container>
  );
}
