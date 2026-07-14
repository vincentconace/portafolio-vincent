import React from 'react'
import Link from 'next/link'
import {
  BookOpen, Plug, Zap, LayoutTemplate, MessageSquareText,
  Target, Globe, RefreshCw, Unlock, BrainCircuit, Library,
  ArrowRight, ArrowDown, Star, Medal,
} from 'lucide-react'
import { getAllRecursos } from '@nucleo/lib/mdx'
import { getFeaturedRecursos, getCategoryCounts, toRecursoCardData } from '@nucleo/lib/recursos'
import { RecursoCard } from '@nucleo/components/boveda/recurso-card'
import { AnimatedGradientText } from '@nucleo/components/ui/animated-gradient-text'
import { MagneticButton } from '@/components'
import { Transition } from '@/layout'
import { T } from '@nucleo/components/i18n/t'
import { TextureCard } from '@nucleo/components/ui/texture-card'
import { LevelBadge, type LevelTier } from '@nucleo/components/ui/level-badge'

const categoryInfo = [
  { key: 'guías',     icon: BookOpen,          label: 'Guías',     color: 'rgba(28,30,33,0.05)',  borderColor: 'rgba(28,30,33,0.12)',  textColor: '#1c1e21' },
  { key: 'plugins',   icon: Plug,              label: 'Plugins',   color: 'rgba(28,30,33,0.05)',   borderColor: 'rgba(28,30,33,0.12)',   textColor: '#1c1e21' },
  { key: 'skills',    icon: Zap,               label: 'Skills',    color: 'rgba(28,30,33,0.05)',  borderColor: 'rgba(28,30,33,0.12)',  textColor: '#1c1e21' },
  { key: 'templates', icon: LayoutTemplate,    label: 'Templates', color: 'rgba(28,30,33,0.05)', borderColor: 'rgba(28,30,33,0.12)', textColor: '#1c1e21' },
  { key: 'prompts',   icon: MessageSquareText, label: 'Prompts',   color: 'rgba(28,30,33,0.05)',    borderColor: 'rgba(28,30,33,0.12)',    textColor: '#1c1e21' },
]

export default function HomePage() {
  const allRecursos = getAllRecursos()
  const featured = getFeaturedRecursos(allRecursos, 3).map(toRecursoCardData)
  const counts = getCategoryCounts(allRecursos)

  return (
    <Transition label="Núcleo IA">
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section {
          position: relative;
          overflow: visible;
          padding: 4rem 0 5rem;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }
        .hero-mascot {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          overflow: visible;
          /* No z-index here — we want the children's z-index values
             (set per-frame by HeroMascot) to compete with .hero-title
             inside .hero-content's stacking context. */
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.875rem;
          border-radius: 9999px;
          background: rgba(var(--accent-rgb), 0.1);
          border: 1px solid rgba(var(--accent-rgb), 0.2);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 1.75rem;
        }
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 2;
        }
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--text-secondary);
          max-width: 560px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }
        .hero-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }
        .stats-shell {
          display: inline-flex;
          padding: 0.875rem 0.5rem;
          border-radius: 9999px;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          box-shadow:
            inset 0 1px 0 var(--inset-highlight),
            0 22px 60px -24px rgba(var(--accent-rgb), 0.5),
            0 8px 24px -12px rgba(var(--shadow-color), calc(0.7 * var(--shadow-strength)));
        }
        .stats-row {
          display: flex;
          gap: 0;
          justify-content: center;
          flex-wrap: wrap;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
          padding: 0.25rem 1.5rem;
          position: relative;
        }
        .stat-item + .stat-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 25%;
          bottom: 25%;
          width: 1px;
          background: var(--border-subtle);
        }
        .stat-number {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .stat-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
        }
        .section-header {
          margin-bottom: 2.5rem;
        }
        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          line-height: 1.25;
        }
        .section-desc {
          font-size: 0.9375rem;
          color: var(--text-muted);
          max-width: 520px;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }
        .category-link {
          text-decoration: none;
          color: inherit;
        }
        .category-inner {
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          text-align: center;
          flex: 1;
        }
        .category-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          line-height: 1;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          box-shadow:
            inset 0 1px 0 var(--inset-highlight),
            0 2px 8px rgba(var(--shadow-color), calc(0.3 * var(--shadow-strength)));
        }
        .category-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
        .category-count {
          font-size: 0.7rem;
          color: var(--text-muted);
          padding: 0.15rem 0.55rem;
          border-radius: 9999px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          font-weight: 500;
        }
        .about-section {
          background: var(--bg-surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .feature-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .feature-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: var(--radius);
          background: linear-gradient(180deg, rgba(var(--accent-rgb),0.18), rgba(var(--accent-rgb),0.08));
          border: 1px solid rgba(var(--accent-rgb),0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
          box-shadow:
            inset 0 1px 0 var(--inset-highlight-strong),
            0 4px 12px -4px rgba(var(--accent-rgb),0.4);
        }
        .cta-banner {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(var(--accent-rgb),0.18), transparent 70%),
            linear-gradient(135deg, rgba(var(--accent-rgb),0.10) 0%, rgba(var(--accent-rgb),0.06) 100%),
            var(--bg-surface);
          border: 1px solid rgba(var(--accent-rgb),0.22);
          border-radius: var(--radius-xl);
          padding: 3.5rem 3rem;
          text-align: center;
          box-shadow:
            inset 0 1px 0 var(--inset-highlight),
            0 30px 80px -30px rgba(var(--accent-rgb),0.5),
            0 14px 32px -12px rgba(var(--shadow-color), calc(0.6 * var(--shadow-strength)));
        }
        .cta-banner-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(var(--accent-rgb),0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb),0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 0%, #000, transparent 70%);
          mask-image: radial-gradient(ellipse 70% 80% at 50% 0%, #000, transparent 70%);
          pointer-events: none;
        }

        /* Levels */
        .levels-section {
          padding: 5rem 0;
          position: relative;
        }
        .levels-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.75rem 2rem;
          max-width: 900px;
          margin: 0 auto;
          justify-items: center;
        }
        .level-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.875rem;
          text-align: center;
        }
        .level-criteria {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.5;
          max-width: 220px;
        }
        .level-criteria strong {
          color: var(--text-secondary);
          font-weight: 600;
        }
        @media (max-width: 640px) {
          .levels-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }
        @media (max-width: 1024px) {
          .category-grid { grid-template-columns: repeat(3, 1fr); }
          .about-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 640px) {
          .category-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-ctas { flex-direction: column; align-items: center; }
          .stats-row { gap: 1.5rem; }
          .cta-banner { padding: 2rem 1.25rem; }
        }
      ` }} />

      {/* Hero */}
      <section className="hero-section">
        <div className="grid-pattern" aria-hidden />
        <div className="hero-radial-glow" aria-hidden />
        <div className="hero-content">
          <h1 className="hero-title">
            <T k="nucleo.home.title1" />{' '}
            <AnimatedGradientText><T k="nucleo.home.titleAccent" /></AnimatedGradientText>
          </h1>

          <p className="hero-subtitle">
            <T k="nucleo.home.subtitle" />
          </p>

          <div className="hero-ctas">
            <Link href="/nucleo-de-la-ia/boveda" passHref>
              <MagneticButton variant="ghost" size="default" className="gap-2 px-6 py-3">
                <Library size={16} strokeWidth={1.75} />
                <T k="nucleo.home.ctaExplore" />
              </MagneticButton>
            </Link>
            <a
              href="#about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.875rem',
                fontWeight: 500,
                background: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                transition: 'all 150ms ease',
              }}
            >
              <T k="nucleo.home.ctaWhat" />
              <ArrowDown size={14} strokeWidth={1.75} />
            </a>
          </div>

          {/* Stats */}
          <div className="stats-shell">
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">{allRecursos.length}+</span>
                <span className="stat-label"><T k="nucleo.home.statResources" /></span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label"><T k="nucleo.home.statCategories" /></span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label"><T k="nucleo.home.statSpanish" /></span>
              </div>
              <div className="stat-item">
                <span className="stat-number"><T k="nucleo.home.statFree" /></span>
                <span className="stat-label"><T k="nucleo.home.statAlways" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured resources */}
      {featured.length > 0 && (
        <section style={{ padding: '5rem 0' }} data-reveal>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="section-header">
              <div className="section-eyebrow">
                <Star size={12} strokeWidth={2} fill="currentColor" /> <T k="nucleo.home.featuredEyebrow" />
              </div>
              <h2 className="section-title"><T k="nucleo.home.featuredTitle" /></h2>
              <p className="section-desc">
                <T k="nucleo.home.featuredDesc" />
              </p>
            </div>
            <div className="featured-grid stagger-children">
              {featured.map((recurso) => (
                <RecursoCard key={recurso.slug} recurso={recurso} featured />
              ))}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link
                href="/nucleo-de-la-ia/boveda"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
              >
                <T k="nucleo.home.viewAll" />
                <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section style={{ padding: '0 0 5rem' }} data-reveal>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-header">
            <div className="section-eyebrow">
              <Library size={12} strokeWidth={2} /> <T k="nucleo.home.catsEyebrow" />
            </div>
            <h2 className="section-title"><T k="nucleo.home.catsTitle" /></h2>
            <p className="section-desc">
              <T k="nucleo.home.catsDesc" />
            </p>
          </div>
          <div className="category-grid stagger-children">
            {categoryInfo.map((cat) => {
              const Icon = cat.icon
              return (
                <Link key={cat.key} href={`/nucleo-de-la-ia/boveda?category=${cat.key}`} className="category-link">
                  <TextureCard>
                    <div className="category-inner">
                      <div
                        className="category-icon-wrap"
                        style={{
                          background: cat.color,
                          borderColor: cat.borderColor,
                          color: cat.textColor,
                        }}
                      >
                        <Icon size={20} strokeWidth={1.6} />
                      </div>
                      <span className="category-name" style={{ color: cat.textColor }}>
                        <T k={`nucleo.cat.${cat.key}`} />
                      </span>
                      <span className="category-count">{counts[cat.key] ?? 0} <T k="nucleo.home.catsCount" /></span>
                    </div>
                  </TextureCard>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section" style={{ padding: '5rem 0' }} data-reveal>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="about-grid">
            <div>
              <div className="section-eyebrow">
                <BrainCircuit size={12} strokeWidth={2} /> <T k="nucleo.home.aboutEyebrow" />
              </div>
              <h2 className="section-title"><T k="nucleo.home.aboutTitle" /></h2>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '1.5rem',
                }}
              >
                <T k="nucleo.home.aboutP1" />
              </p>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                }}
              >
                <T k="nucleo.home.aboutP2" />
              </p>
              <Link href="/nucleo-de-la-ia/boveda" passHref>
                <MagneticButton variant="ghost" size="default" className="px-6 py-3">
                  <T k="nucleo.home.aboutCta" />
                </MagneticButton>
              </Link>
            </div>

            <div className="feature-list">
              {[
                { icon: Target, key: 'Curated' },
                { icon: Globe, key: 'Context' },
                { icon: RefreshCw, key: 'Updated' },
                { icon: Unlock, key: 'Free' },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                <div key={feature.key} className="feature-item">
                  <div className="feature-icon-wrapper">
                    <Icon size={18} strokeWidth={1.6} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <T k={`nucleo.home.feat${feature.key}Title`} />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <T k={`nucleo.home.feat${feature.key}Desc`} />
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Niveles de la comunidad — preview */}
      <section className="levels-section" data-reveal>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Medal size={12} strokeWidth={2} /> <T k="nucleo.home.levelsEyebrow" />
            </div>
            <h2 className="section-title" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <T k="nucleo.home.levelsTitle" />
            </h2>
            <p className="section-desc" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
              <T k="nucleo.home.levelsDesc" />
            </p>
          </div>

          <div className="levels-grid">
            {([
              { tier: 'bronce',  criteria: <>Primeros pasos · <strong>1+ recurso</strong> usado o comentado</> },
              { tier: 'plata',   criteria: <>Contribuyente activo · <strong>5+ aportes</strong> a la bóveda</> },
              { tier: 'oro',    criteria: <>Curador dedicado · <strong>20+ aportes</strong> + 1 guía publicada</> },
              { tier: 'titanio', criteria: <>Leyenda · <strong>50+ aportes</strong> y mentoría activa</> },
            ] as { tier: LevelTier; criteria: React.ReactNode }[]).map((lvl) => (
              <div key={lvl.tier} className="level-item">
                <LevelBadge tier={lvl.tier} size="md" />
                <p className="level-criteria">{lvl.criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '5rem 0' }} data-reveal>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="cta-banner">
            <div className="cta-banner-grid" aria-hidden />
            <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
              }}
            >
              <T k="nucleo.home.ctaBannerTitle" />
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9375rem',
                marginBottom: '2rem',
                maxWidth: '480px',
                margin: '0 auto 2rem',
                lineHeight: 1.7,
              }}
            >
              <T k="nucleo.home.ctaBannerDesc" />
            </p>
            <Link href="/nucleo-de-la-ia/boveda" passHref>
              <MagneticButton variant="ghost" size="default" className="gap-2 px-6 py-3">
                <T k="nucleo.home.ctaBannerBtn" />
                <ArrowRight size={14} strokeWidth={1.75} />
              </MagneticButton>
            </Link>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  )
}
