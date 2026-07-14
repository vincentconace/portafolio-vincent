'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components'
import { useContactSlider } from '@/hooks'
import { useTranslation } from '@/providers'

export function Footer() {
  const { t, lang } = useTranslation() as { t: (k: string) => string; lang: string }
  const containerRef = useRef<HTMLElement>(null)
  const { transformY } = useContactSlider(containerRef)
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString(lang === 'es' ? 'es-AR' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [lang])

  const links = [
    { label: t('nucleo.recurso.boveda'), href: '/nucleo-de-la-ia/boveda' },
    { label: t('nucleo.cat.guías'), href: '/nucleo-de-la-ia/boveda?category=guías' },
    { label: t('nucleo.cat.plugins'), href: '/nucleo-de-la-ia/boveda?category=plugins' },
    { label: t('nucleo.cat.templates'), href: '/nucleo-de-la-ia/boveda?category=templates' },
  ]

  return (
    <footer ref={containerRef} className="ni-footer">
      <motion.div className="ni-footer-inner" style={{ y: transformY }}>
        <div className="ni-footer-top">
          {/* Brand */}
          <div>
            <Link href="/nucleo-de-la-ia" className="ni-footer-word" aria-label="Núcleo IA">
              núcleo<span>.</span>ia
            </Link>
            <p className="ni-footer-tagline">{t('nucleo.footer.tagline')}</p>
          </div>

          {/* Explore */}
          <div className="ni-footer-col">
            <h4>{t('nucleo.footer.explore')}</h4>
            <ul>
              {links.map((l) => (
                <li key={l.label} className="ni-footer-item">
                  <Link href={l.href} passHref>
                    <MagneticButton>{l.label}</MagneticButton>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Local time */}
          <div className="ni-footer-col">
            <h4>{t('contact.localTime')}</h4>
            <p className="ni-footer-time">
              <time>{time}</time>
            </p>
          </div>
        </div>

        <div className="ni-footer-bottom">
          <p>© {new Date().getFullYear()} {t('nucleo.footer.rights')}</p>
          <p>{t('nucleo.footer.madeWith')}</p>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ni-footer {
          margin-top: auto;
          background: var(--text-primary);
          color: var(--text-inverse);
          padding: 4.5rem 0 2.5rem;
        }
        .ni-footer-inner { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
        .ni-footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
        }
        .ni-footer-wordwrap { display: inline-block; will-change: transform; }
        .ni-footer-word {
          display: inline-block;
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--text-inverse);
          text-decoration: none;
        }
        .ni-footer-word span { opacity: 0.4; }
        .ni-footer-tagline {
          margin-top: 1.1rem;
          max-width: 340px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .ni-footer-col h4 {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.45);
          margin: 0 0 1.1rem;
        }
        .ni-footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          align-items: flex-start;
        }
        /* Link estilo web: subrayado que aparece al hover con ease-in-expo */
        .ni-footer-item {
          border-bottom: 1px solid transparent;
          transition: border-color 300ms cubic-bezier(0.1, 0, 0.3, 1);
        }
        .ni-footer-item:hover { border-bottom-color: rgba(255, 255, 255, 0.6); }
        .ni-footer-item .magnetic-item,
        .ni-footer-item button { color: rgba(255, 255, 255, 0.85); }
        .ni-footer-item button { padding: 0.25rem 0 !important; min-height: 0 !important; min-width: 0 !important; }
        .ni-footer-time {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          font-variant-numeric: tabular-nums;
          margin: 0;
        }
        .ni-footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          padding-top: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.8rem;
        }
        .ni-footer-bottom p { margin: 0; }
        @media (max-width: 768px) {
          .ni-footer-top { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 480px) {
          .ni-footer-top { grid-template-columns: 1fr; gap: 2rem; }
        }
      ` }} />
    </footer>
  )
}
