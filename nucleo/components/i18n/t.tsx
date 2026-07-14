'use client'

import { useTranslation } from '@/providers'

/**
 * Devuelve el texto traducido de una clave. Pensado para usar dentro de
 * componentes de servidor (que no pueden llamar al hook), como hijo cliente:
 *   <h2><T k="nucleo.home.featuredTitle" /></h2>
 */
export function T({ k }: { k: string }) {
  const { t } = useTranslation()
  return <>{t(k)}</>
}

/** Hook de conveniencia para elegir contenido según idioma (es | en). */
export function useLang(): 'es' | 'en' {
  const { lang } = useTranslation() as { lang: 'es' | 'en' }
  return lang === 'en' ? 'en' : 'es'
}

/** Elige texto es/en según el idioma. Para títulos/descripciones de contenido. */
export function LocalizedText({ es, en }: { es: string; en: string }) {
  const lang = useLang()
  return <>{lang === 'en' ? en || es : es}</>
}

/** Elige entre dos nodos ya renderizados (cuerpo MDX es/en). */
export function LocalizedMDX({ es, en }: { es: React.ReactNode; en: React.ReactNode }) {
  const lang = useLang()
  return <>{lang === 'en' ? en : es}</>
}

/** Fecha formateada según el idioma. */
export function LocalizedDate({ iso }: { iso: string }) {
  const lang = useLang()
  const d = new Date(iso)
  return (
    <>
      {d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </>
  )
}
