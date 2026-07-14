'use client'

import React, { useState } from 'react'
import { useTranslation } from '@/providers'
import { useLang } from '@nucleo/components/i18n/t'

type Lang = 'es' | 'en'
type Bi = { es: string; en: string }
type BiList = { es: string[]; en: string[] }
const L = (b: Bi, lang: Lang) => b[lang]

interface Question {
  id: string
  text: Bi
  options: { value: string; label: Bi; desc?: Bi }[]
}

interface Provider {
  name: string
  description: Bi
  pros: BiList
  conditions: (answers: Record<string, string>) => boolean
  color: string
  icon: string
  command: string
}

const questions: Question[] = [
  {
    id: 'location',
    text: { es: '¿De dónde son tus clientes?', en: 'Where are your customers from?' },
    options: [
      { value: 'latam', label: { es: 'América Latina', en: 'Latin America' }, desc: { es: 'México, Colombia, Argentina, Chile, etc.', en: 'Mexico, Colombia, Argentina, Chile, etc.' } },
      { value: 'global', label: { es: 'Internacional / Global', en: 'International / Global' }, desc: { es: 'EE.UU., Europa, o mixto', en: 'US, Europe, or mixed' } },
    ],
  },
  {
    id: 'model',
    text: { es: '¿Cómo vas a cobrar?', en: 'How will you charge?' },
    options: [
      { value: 'one-time', label: { es: 'Pago único', en: 'One-time payment' }, desc: { es: 'El cliente paga una sola vez', en: 'The customer pays once' } },
      { value: 'subscription', label: { es: 'Suscripción', en: 'Subscription' }, desc: { es: 'Cobros recurrentes mensuales/anuales', en: 'Recurring monthly/yearly charges' } },
    ],
  },
  {
    id: 'method',
    text: { es: '¿Qué métodos de pago necesitas?', en: 'What payment methods do you need?' },
    options: [
      { value: 'digital', label: { es: 'Solo tarjeta / digital', en: 'Card / digital only' }, desc: { es: 'Visa, Mastercard, PayPal', en: 'Visa, Mastercard, PayPal' } },
      { value: 'all', label: { es: 'Efectivo también', en: 'Cash too' }, desc: { es: 'OXXO, PSE, Efecty, transferencias', en: 'OXXO, PSE, Efecty, transfers' } },
    ],
  },
]

const providers: Provider[] = [
  {
    name: 'Mercado Pago',
    icon: '💙',
    color: '#009ee3',
    command: 'claude configure-payment mercado-pago',
    description: {
      es: 'El gigante de pagos latinoamericano. Cobre con tarjeta, efectivo (OXXO, Rapipago) y transferencia. Funciona perfecto en México, Argentina, Colombia, Chile, Brasil y más.',
      en: 'The Latin American payments giant. Charge by card, cash (OXXO, Rapipago) and transfer. Works perfectly in Mexico, Argentina, Colombia, Chile, Brazil and more.',
    },
    pros: {
      es: [
        'Acepta efectivo en más de 12 países LATAM',
        'Transferencias bancarias locales',
        'Comisión más baja para pagos locales',
        'No necesita cuenta bancaria el cliente',
      ],
      en: [
        'Accepts cash in 12+ LATAM countries',
        'Local bank transfers',
        'Lowest fee for local payments',
        'The customer needs no bank account',
      ],
    },
    conditions: (a) => a.location === 'latam' && a.method === 'all',
  },
  {
    name: 'Wompi',
    icon: '🇨🇴',
    color: '#5b6dd9',
    command: 'claude configure-payment wompi',
    description: {
      es: 'La opción preferida para Colombia. Acepta PSE (débito bancario), Nequi, Bancolombia y tarjetas. Comisiones muy competitivas para el mercado colombiano.',
      en: 'The preferred option for Colombia. Accepts PSE (bank debit), Nequi, Bancolombia and cards. Very competitive fees for the Colombian market.',
    },
    pros: {
      es: [
        'Integración nativa con PSE y Nequi',
        'Débito directo de cuentas Bancolombia',
        'Comisiones bajas para Colombia',
        'Soporte colombiano',
      ],
      en: [
        'Native PSE and Nequi integration',
        'Direct debit from Bancolombia accounts',
        'Low fees for Colombia',
        'Colombian support',
      ],
    },
    conditions: (a) => a.location === 'latam' && a.method !== 'all',
  },
  {
    name: 'Stripe',
    icon: '⚡',
    color: '#635bff',
    command: 'claude configure-payment stripe',
    description: {
      es: 'El estándar internacional. Si tienes clientes globales o necesitas suscripciones robustas, Stripe es insuperable. Documentación perfecta y las mejores integraciones.',
      en: 'The international standard. If you have global customers or need robust subscriptions, Stripe is unbeatable. Perfect documentation and the best integrations.',
    },
    pros: {
      es: [
        'Soporte para 135+ divisas',
        'Suscripciones y facturación avanzada',
        'Webhook system muy robusto',
        'Integra con casi todo el ecosistema SaaS',
      ],
      en: [
        'Support for 135+ currencies',
        'Advanced subscriptions and billing',
        'Very robust webhook system',
        'Integrates with almost the entire SaaS ecosystem',
      ],
    },
    conditions: (a) => a.location === 'global',
  },
  {
    name: 'Lemon Squeezy',
    icon: '🍋',
    color: '#1c1e21',
    command: 'claude configure-payment lemon-squeezy',
    description: {
      es: 'Merchant of Record — ellos manejan IVA, impuestos y cumplimiento fiscal por ti. Perfecto para productos digitales (cursos, software, ebooks) sin complicaciones legales.',
      en: 'Merchant of Record — they handle VAT, taxes and tax compliance for you. Perfect for digital products (courses, software, ebooks) with no legal hassle.',
    },
    pros: {
      es: [
        'Maneja impuestos automáticamente (IVA, sales tax)',
        'Ideal para software / productos digitales',
        'License key management incluido',
        'Sin complicaciones fiscales internacionales',
      ],
      en: [
        'Handles taxes automatically (VAT, sales tax)',
        'Ideal for software / digital products',
        'License key management included',
        'No international tax headaches',
      ],
    },
    conditions: (a) => a.location === 'global' && a.model === 'one-time',
  },
]

function getRecommendation(answers: Record<string, string>): Provider {
  const match = providers.find((p) => p.conditions(answers))
  if (!match) {
    return answers.location === 'latam' ? providers[0] : providers[2]
  }
  return match
}

export function ProviderSelector() {
  const { t } = useTranslation()
  const lang = useLang()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const allAnswered = questions.every((q) => answers[q.id])
  const answered = Object.keys(answers).length

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 200)
    } else {
      setTimeout(() => setShowResult(true), 200)
    }
  }

  const reset = () => {
    setAnswers({})
    setCurrentStep(0)
    setShowResult(false)
  }

  const recommended = allAnswered ? getRecommendation(answers) : null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .provider-selector {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin: 1.5rem 0;
        }
        .ps-header {
          padding: 1rem 1.25rem;
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ps-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .ps-progress {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .ps-body { padding: 1.25rem; }
        .ps-question {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .ps-options {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .ps-option {
          display: flex;
          flex-direction: column;
          padding: 0.875rem 1rem;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 150ms ease;
          background: var(--bg-base);
          text-align: left;
          font-family: inherit;
        }
        .ps-option:hover, .ps-option.selected {
          border-color: var(--accent);
          background: var(--accent-glow);
        }
        .ps-option-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .ps-option-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }
        .ps-result {
          animation: fade-in-up 0.3s ease-out;
        }
        .ps-result-header {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          margin-bottom: 1rem;
        }
        .ps-result-icon {
          font-size: 2rem;
          line-height: 1;
        }
        .ps-result-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .ps-result-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1rem;
        }
        .ps-pros {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .ps-pro {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.825rem;
          color: var(--text-secondary);
        }
        .ps-command {
          background: var(--bg-base);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 0.75rem 1rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.875rem;
          color: #52555a;
          margin-bottom: 1rem;
        }
        .ps-reset {
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
        .ps-reset:hover {
          color: var(--text-secondary);
          border-color: var(--text-muted);
        }
        .ps-step-dots {
          display: flex;
          gap: 0.375rem;
          margin-bottom: 1.25rem;
        }
        .ps-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border);
          transition: all 200ms ease;
        }
        .ps-dot.done { background: var(--accent); }
        .ps-dot.current { background: var(--accent); width: 16px; border-radius: 3px; }
      ` }} />

      <div className="provider-selector">
        <div className="ps-header">
          <span className="ps-title">
            🔀 {t('nucleo.widgets.psTitle')}
          </span>
          <span className="ps-progress">
            {showResult
              ? t('nucleo.widgets.psReady')
              : `${answered}/${questions.length} ${t('nucleo.widgets.psAnswered')}`}
          </span>
        </div>

        <div className="ps-body">
          {!showResult ? (
            <>
              <div className="ps-step-dots">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`ps-dot${i < answered ? ' done' : ''}${i === currentStep ? ' current' : ''}`}
                  />
                ))}
              </div>

              <p className="ps-question">
                {L(questions[currentStep].text, lang)}
              </p>
              <div className="ps-options">
                {questions[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    className={`ps-option${answers[questions[currentStep].id] === opt.value ? ' selected' : ''}`}
                    onClick={() => handleAnswer(questions[currentStep].id, opt.value)}
                  >
                    <span className="ps-option-label">{L(opt.label, lang)}</span>
                    {opt.desc && <span className="ps-option-desc">{L(opt.desc, lang)}</span>}
                  </button>
                ))}
              </div>
            </>
          ) : recommended ? (
            <div className="ps-result">
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '0.75rem',
                }}
              >
                ✓ {t('nucleo.widgets.psRecommend')}
              </div>
              <div className="ps-result-header">
                <span className="ps-result-icon">{recommended.icon}</span>
                <span className="ps-result-name" style={{ color: recommended.color }}>
                  {recommended.name}
                </span>
              </div>
              <p className="ps-result-desc">{L(recommended.description, lang)}</p>

              <ul className="ps-pros">
                {recommended.pros[lang].map((pro, i) => (
                  <li key={i} className="ps-pro">
                    <span style={{ color: '#4ade80', flexShrink: 0, marginTop: '1px' }}>✓</span>
                    {pro}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.5rem',
                }}
              >
                {t('nucleo.widgets.psCommand')}
              </div>
              <div className="ps-command">{recommended.command}</div>

              <button onClick={reset} className="ps-reset">
                ↩ {t('nucleo.widgets.psReset')}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
