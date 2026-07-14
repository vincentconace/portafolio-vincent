'use client'

import React, { useState, useCallback } from 'react'
import { Copy, Check, RotateCcw, ArrowRight, MessageCircle } from 'lucide-react'
import { useTranslation } from '@/providers'
import { useLang } from '@nucleo/components/i18n/t'

type Lang = 'es' | 'en'
type Bi = { es: string; en: string }
const L = (b: Bi, lang: Lang) => b[lang]

// ---------------------------------------------------------------------------
// Datos compartidos: los 6 tipos de proyecto que arma Núcleo Web (bilingües).
// ---------------------------------------------------------------------------
interface Project {
  id: string
  name: Bi
  icon: string
  color: string
  tagline: Bi
  forWho: Bi
  cta: Bi
  integracion: Bi
  prompt: Bi
}

const PROJECTS: Project[] = [
  {
    id: 'negocio',
    icon: '🏢',
    color: '#1c1e21',
    name: { es: 'Negocio / Servicios', en: 'Business / Services' },
    tagline: {
      es: 'Una landing que genera contactos y presupuestos para tu servicio.',
      en: 'A landing page that generates leads and quotes for your service.',
    },
    forWho: {
      es: 'Estudios, consultoras, oficios y profesionales.',
      en: 'Studios, consultancies, trades and professionals.',
    },
    cta: { es: 'Contactanos por WhatsApp', en: 'Contact us on WhatsApp' },
    integracion: {
      es: 'WhatsApp + SEO local si tenés local físico',
      en: 'WhatsApp + local SEO if you have a physical location',
    },
    prompt: {
      es: 'Quiero armar una landing de negocio/servicios. Mi negocio es [nombre] y ofrece [qué servicio] para [a quién]. Quiero que me contacten por WhatsApp y, si tengo local físico, aparecer en Google con SEO local.',
      en: 'I want to build a business/services landing page. My business is [name] and offers [what service] for [whom]. I want people to contact me on WhatsApp and, if I have a physical location, to appear on Google with local SEO.',
    },
  },
  {
    id: 'evento',
    icon: '🎟️',
    color: '#52555a',
    name: { es: 'Evento con entradas', en: 'Event with tickets' },
    tagline: {
      es: 'Una página para llenar tu evento y vender entradas online.',
      en: 'A page to fill your event and sell tickets online.',
    },
    forWho: { es: 'Talleres, shows, conferencias y fiestas.', en: 'Workshops, shows, conferences and parties.' },
    cta: { es: 'Comprá tu entrada', en: 'Buy your ticket' },
    integracion: { es: 'Cobro con Mercado Pago (sin backend)', en: 'Payments with Mercado Pago (no backend)' },
    prompt: {
      es: 'Quiero armar una landing para un evento con venta de entradas. El evento es [nombre], el [fecha] en [lugar]. Quiero cobrar las entradas con Mercado Pago.',
      en: 'I want to build a landing page for an event with ticket sales. The event is [name], on [date] at [location]. I want to charge for tickets with Mercado Pago.',
    },
  },
  {
    id: 'catalogo',
    icon: '🛍️',
    color: '#8a8d93',
    name: { es: 'Catálogo / Producto', en: 'Catalog / Product' },
    tagline: {
      es: 'Mostrá tus productos y recibí pedidos directo por WhatsApp.',
      en: 'Show your products and receive orders directly on WhatsApp.',
    },
    forWho: { es: 'Tiendas, emprendimientos y productos físicos.', en: 'Shops, small businesses and physical products.' },
    cta: { es: 'Pedí por WhatsApp', en: 'Order on WhatsApp' },
    integracion: {
      es: 'Pedido por WhatsApp con mensaje precargado',
      en: 'Order via WhatsApp with a pre-filled message',
    },
    prompt: {
      es: 'Quiero armar una landing tipo catálogo de productos. Mi negocio es [nombre] y vende [qué productos]. Quiero que los pedidos lleguen por WhatsApp con el producto ya cargado en el mensaje.',
      en: 'I want to build a product-catalog landing page. My business is [name] and sells [what products]. I want orders to arrive on WhatsApp with the product already included in the message.',
    },
  },
  {
    id: 'portfolio',
    icon: '🎨',
    color: '#52555a',
    name: { es: 'Portfolio / Marca personal', en: 'Portfolio / Personal brand' },
    tagline: { es: 'Mostrá tu trabajo y conseguí proyectos nuevos.', en: 'Show your work and land new projects.' },
    forWho: {
      es: 'Diseñadores, fotógrafos, freelancers y creadores.',
      en: 'Designers, photographers, freelancers and creators.',
    },
    cta: { es: 'Trabajemos juntos', en: "Let's work together" },
    integracion: { es: 'Galería visual + contacto por WhatsApp', en: 'Visual gallery + WhatsApp contact' },
    prompt: {
      es: 'Quiero armar un portfolio / marca personal. Soy [tu nombre] y hago [a qué te dedicás]. Quiero mostrar mis proyectos en una galería y que me contacten para trabajar juntos.',
      en: "I want to build a portfolio / personal brand. I'm [your name] and I do [what you do]. I want to show my projects in a gallery and have people contact me to work together.",
    },
  },
  {
    id: 'reservas',
    icon: '📅',
    color: '#e7c79c',
    name: { es: 'Reservas profesionales', en: 'Professional bookings' },
    tagline: {
      es: 'Que tus clientes reserven turnos sin idas y vueltas.',
      en: 'Let your clients book appointments without back-and-forth.',
    },
    forWho: {
      es: 'Peluquerías, consultorios, coaches y servicios con turnos.',
      en: 'Salons, clinics, coaches and appointment-based services.',
    },
    cta: { es: 'Reservá tu turno', en: 'Book your appointment' },
    integracion: {
      es: 'WhatsApp/Calendly + seña opcional con Mercado Pago',
      en: 'WhatsApp/Calendly + optional deposit with Mercado Pago',
    },
    prompt: {
      es: 'Quiero armar una landing de reservas con turnos. Mi servicio es [nombre] y ofrece [qué]. Quiero que reserven por WhatsApp o Calendly, y poder cobrar una seña con Mercado Pago.',
      en: 'I want to build a bookings/appointments landing page. My service is [name] and offers [what]. I want people to book via WhatsApp or Calendly, and to charge an optional deposit with Mercado Pago.',
    },
  },
  {
    id: 'lista-espera',
    icon: '🚀',
    color: '#fb923c',
    name: { es: 'Lista de espera', en: 'Waitlist' },
    tagline: { es: 'Validá tu idea juntando emails antes de lanzar.', en: 'Validate your idea by collecting emails before launching.' },
    forWho: {
      es: 'Cualquiera que quiera testear una idea antes de salir al ruedo.',
      en: 'Anyone who wants to test an idea before going all in.',
    },
    cta: { es: 'Sumate a la lista', en: 'Join the list' },
    integracion: { es: 'Captura de email de un solo campo', en: 'Single-field email capture' },
    prompt: {
      es: 'Quiero armar una landing de lista de espera (pre-lanzamiento) para validar una idea: [describí la idea]. Quiero capturar emails con un solo campo y mostrar un mensaje de éxito.',
      en: 'I want to build a waitlist (pre-launch) landing page to validate an idea: [describe the idea]. I want to capture emails with a single field and show a success message.',
    },
  },
]

const STYLES = `
  .npw-box {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    margin: 1.5rem 0;
  }
  .npw-head {
    padding: 1rem 1.25rem;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .npw-head-title {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .npw-head-meta { font-size: 0.75rem; color: var(--text-muted); }
  .npw-body { padding: 1.25rem; }
  .npw-q {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
    line-height: 1.4;
  }
  .npw-opts { display: flex; flex-direction: column; gap: 0.625rem; }
  .npw-opt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 150ms ease;
    background: var(--bg-base);
    text-align: left;
    font-family: inherit;
    width: 100%;
  }
  .npw-opt:hover {
    border-color: var(--accent);
    background: var(--accent-glow);
    transform: translateX(2px);
  }
  .npw-opt:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .npw-opt-main { display: flex; align-items: center; gap: 0.7rem; }
  .npw-opt-emoji { font-size: 1.15rem; line-height: 1; }
  .npw-opt-label { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
  .npw-opt-arrow { color: var(--text-muted); flex-shrink: 0; transition: color 150ms ease; }
  .npw-opt:hover .npw-opt-arrow { color: var(--accent); }

  .npw-detail { animation: fade-in-up 0.3s ease-out; }
  .npw-detail-eyebrow {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }
  .npw-detail-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.6rem; }
  .npw-detail-icon { font-size: 1.85rem; line-height: 1; }
  .npw-detail-name { font-size: 1.2rem; font-weight: 800; letter-spacing: -0.02em; }
  .npw-tagline { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem; }
  .npw-meta { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.1rem; }
  .npw-meta-item { display: flex; flex-direction: column; gap: 0.15rem; }
  .npw-meta-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }
  .npw-meta-value { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; }
  .npw-cta-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    align-self: flex-start;
    padding: 0.3rem 0.7rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 600;
    background: rgba(var(--accent-rgb), 0.12);
    border: 1px solid rgba(var(--accent-rgb), 0.3);
    color: var(--accent);
  }
  .npw-prompt-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }
  .npw-prompt-box {
    position: relative;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.9rem 1rem;
  }
  .npw-prompt-text {
    font-size: 0.83rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 0.75rem;
    white-space: pre-wrap;
  }
  .npw-copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.85rem;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-secondary);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 150ms ease;
    font-family: inherit;
  }
  .npw-copy-btn:hover { border-color: var(--accent); color: var(--accent); }
  .npw-copy-btn.copied { border-color: #22c55e; color: #4ade80; }
  .npw-copy-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  .npw-actions { display: flex; gap: 0.6rem; align-items: center; margin-top: 1.1rem; flex-wrap: wrap; }
  .npw-reset {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    cursor: pointer;
    font-family: inherit;
    transition: all 150ms ease;
  }
  .npw-reset:hover { color: var(--text-secondary); border-color: var(--text-muted); }

  .npw-tabs {
    display: flex;
    gap: 0.4rem;
    padding: 0.75rem 0.85rem;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: thin;
  }
  .npw-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.8rem;
    border-radius: 9999px;
    border: 1px solid var(--border);
    background: var(--bg-base);
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 150ms ease;
    font-family: inherit;
  }
  .npw-tab:hover { border-color: var(--accent); color: var(--text-primary); }
  .npw-tab.active {
    background: rgba(var(--accent-rgb), 0.12);
    border-color: rgba(var(--accent-rgb), 0.35);
    color: var(--accent);
  }
  .npw-tab:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
`

function CopyButton({ text }: { text: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // navegadores sin permiso de clipboard: no rompemos nada
    }
  }, [text])

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`npw-copy-btn${copied ? ' copied' : ''}`}
      aria-label={t('nucleo.widgets.copy')}
    >
      {copied ? <Check size={13} strokeWidth={2.2} /> : <Copy size={13} strokeWidth={1.8} />}
      {copied ? t('nucleo.widgets.copied') : t('nucleo.widgets.copy')}
    </button>
  )
}

function ProjectDetail({ project, eyebrow }: { project: Project; eyebrow?: string }) {
  const { t } = useTranslation()
  const lang = useLang()
  return (
    <div className="npw-detail">
      {eyebrow && <div className="npw-detail-eyebrow">{eyebrow}</div>}
      <div className="npw-detail-head">
        <span className="npw-detail-icon">{project.icon}</span>
        <span className="npw-detail-name" style={{ color: project.color }}>
          {L(project.name, lang)}
        </span>
      </div>
      <p className="npw-tagline">{L(project.tagline, lang)}</p>

      <div className="npw-meta">
        <div className="npw-meta-item">
          <span className="npw-meta-label">{t('nucleo.widgets.npwForWho')}</span>
          <span className="npw-meta-value">{L(project.forWho, lang)}</span>
        </div>
        <div className="npw-meta-item">
          <span className="npw-meta-label">{t('nucleo.widgets.npwMainBtn')}</span>
          <span className="npw-cta-badge">
            <MessageCircle size={12} strokeWidth={1.9} /> {L(project.cta, lang)}
          </span>
        </div>
        <div className="npw-meta-item">
          <span className="npw-meta-label">{t('nucleo.widgets.npwIntegration')}</span>
          <span className="npw-meta-value">{L(project.integracion, lang)}</span>
        </div>
      </div>

      <div className="npw-prompt-label">{t('nucleo.widgets.npwPromptReady')}</div>
      <div className="npw-prompt-box">
        <p className="npw-prompt-text">{L(project.prompt, lang)}</p>
        <CopyButton text={L(project.prompt, lang)} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Wizard: 1-2 preguntas y recomienda un tipo de proyecto + prompt para copiar.
// ---------------------------------------------------------------------------
const Q1_OPTIONS: { value: string; emoji: string; label: Bi }[] = [
  { value: 'vender', emoji: '🛍️', label: { es: 'Vender productos', en: 'Sell products' } },
  { value: 'evento', emoji: '🎟️', label: { es: 'Vender entradas a un evento', en: 'Sell tickets to an event' } },
  { value: 'clientes', emoji: '🤝', label: { es: 'Conseguir clientes para un servicio', en: 'Get clients for a service' } },
  { value: 'mostrar', emoji: '🎨', label: { es: 'Mostrar mi trabajo / marca personal', en: 'Show my work / personal brand' } },
  { value: 'validar', emoji: '🚀', label: { es: 'Validar una idea antes de lanzar', en: 'Validate an idea before launching' } },
]

const DIRECT_MAP: Record<string, string> = {
  vender: 'catalogo',
  evento: 'evento',
  mostrar: 'portfolio',
  validar: 'lista-espera',
}

export function ProjectPicker() {
  const { t } = useTranslation()
  const lang = useLang()
  const [objetivo, setObjetivo] = useState<string | null>(null)
  const [turnos, setTurnos] = useState<string | null>(null)

  const resultId =
    objetivo && objetivo !== 'clientes'
      ? DIRECT_MAP[objetivo]
      : objetivo === 'clientes' && turnos
        ? turnos === 'si'
          ? 'reservas'
          : 'negocio'
        : null

  const result = resultId ? PROJECTS.find((p) => p.id === resultId) ?? null : null
  const showQ2 = objetivo === 'clientes' && !turnos

  const reset = () => {
    setObjetivo(null)
    setTurnos(null)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="npw-box">
        <div className="npw-head">
          <span className="npw-head-title">🧭 {t('nucleo.widgets.npwTitle')}</span>
          <span className="npw-head-meta">
            {result
              ? t('nucleo.widgets.psReady')
              : showQ2
                ? t('nucleo.widgets.npwStep2')
                : t('nucleo.widgets.npwStep1')}
          </span>
        </div>

        <div className="npw-body">
          {!objetivo && (
            <>
              <p className="npw-q">{t('nucleo.widgets.npwQ1')}</p>
              <div className="npw-opts">
                {Q1_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className="npw-opt"
                    onClick={() => setObjetivo(opt.value)}
                  >
                    <span className="npw-opt-main">
                      <span className="npw-opt-emoji">{opt.emoji}</span>
                      <span className="npw-opt-label">{L(opt.label, lang)}</span>
                    </span>
                    <ArrowRight className="npw-opt-arrow" size={15} strokeWidth={1.8} />
                  </button>
                ))}
              </div>
            </>
          )}

          {showQ2 && (
            <>
              <p className="npw-q">{t('nucleo.widgets.npwQ2')}</p>
              <div className="npw-opts">
                <button type="button" className="npw-opt" onClick={() => setTurnos('si')}>
                  <span className="npw-opt-main">
                    <span className="npw-opt-emoji">📅</span>
                    <span className="npw-opt-label">{t('nucleo.widgets.npwYes')}</span>
                  </span>
                  <ArrowRight className="npw-opt-arrow" size={15} strokeWidth={1.8} />
                </button>
                <button type="button" className="npw-opt" onClick={() => setTurnos('no')}>
                  <span className="npw-opt-main">
                    <span className="npw-opt-emoji">💬</span>
                    <span className="npw-opt-label">{t('nucleo.widgets.npwNo')}</span>
                  </span>
                  <ArrowRight className="npw-opt-arrow" size={15} strokeWidth={1.8} />
                </button>
              </div>
            </>
          )}

          {result && (
            <>
              <ProjectDetail project={result} eyebrow={`✓ ${t('nucleo.widgets.npwRecommend')}`} />
              <div className="npw-actions">
                <button type="button" onClick={reset} className="npw-reset">
                  <RotateCcw size={13} strokeWidth={1.8} /> {t('nucleo.widgets.psReset')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Galería: pestañas para explorar los 6 proyectos a mano.
// ---------------------------------------------------------------------------
export function ProjectGallery() {
  const { t } = useTranslation()
  const lang = useLang()
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="npw-box">
        <div className="npw-tabs" role="tablist" aria-label={t('nucleo.widgets.npwTypes')}>
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === activeId}
              className={`npw-tab${p.id === activeId ? ' active' : ''}`}
              onClick={() => setActiveId(p.id)}
            >
              <span aria-hidden>{p.icon}</span>
              {L(p.name, lang)}
            </button>
          ))}
        </div>
        <div className="npw-body">
          <ProjectDetail project={active} />
        </div>
      </div>
    </>
  )
}
