import type { Metadata } from 'next'
import { Navbar } from '@/layout'
import { FooterReveal } from '@nucleo/components/layout/footer-reveal'
import { ScrollReveal } from '@nucleo/components/ux/scroll-reveal'
import '@nucleo/styles/nucleo.css'

export const metadata: Metadata = {
  title: {
    default: 'Núcleo IA — Comunidad de IA en español',
    template: '%s | Núcleo IA',
  },
  description:
    'La bóveda de conocimiento de IA más completa en español. Guías, plugins, prompts y templates para construir con inteligencia artificial.',
}

export default function NucleoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // La navegación es la misma que el portfolio: <Navbar/> arriba (links en
  // desktop, marca) + el <Offcanvas/> global (hamburguesa magnética que crece
  // al scrollear en desktop y siempre visible en móvil).
  return (
    <div className="nucleo-root">
      <Navbar theme="light" />
      <div className="ni-main">{children}</div>
      <FooterReveal />
      <ScrollReveal />
      <style dangerouslySetInnerHTML={{ __html: `
        .nucleo-root { display: flex; flex-direction: column; }
        .ni-main { flex: 1; padding-top: 3.5rem; }
      ` }} />
    </div>
  )
}
