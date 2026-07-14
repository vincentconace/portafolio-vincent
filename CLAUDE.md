# Guía del proyecto — Portfolio Vincent Conace

Sitio personal (Next.js 14 App Router, Tailwind v3, framer-motion, GSAP + Lenis,
styled-components, fuente Neue Montreal). Incluye el **Núcleo de la IA** en
`/nucleo-de-la-ia`, que debe sentirse como "otra parte más de la web": misma
paleta, tipografía, menú, botones y **las mismas animaciones**.

Todo el sitio es **bilingüe ES/EN con español por defecto** (`LanguageProvider`
+ `useTranslation()` → `{ lang, setLang, toggleLang, t }`, localStorage
`portfolio-lang`). Los server components no pueden leer el idioma; para
contenido bilingüe usar los helpers de `nucleo/components/i18n/t.tsx`.

---

# Guía de estilos — Animaciones

> Cuando pidan replicar un efecto "como el de la web", el patrón vive acá.
> Copiar los valores **exactos**; no aproximar.

## Efecto: curva de transición hacia el footer (el "redondeo")

Lo que se ve: el contenido **claro** de la página termina con las **esquinas de
abajo redondeadas** y se hunde **hacia abajo** dentro del footer **oscuro**. Al
scrollear, esa tapa clara se retrae (su altura baja de `250px` a `0`) y revela
el footer plano.

### Regla de orientación (esto es lo que se hace mal)

- ✅ **Correcto**: tapa **CLARA** (color del fondo del contenido),
  `border-radius: 0 0 50% 50%` (redondeo **ABAJO**), posicionada sobre el
  **tope** del footer oscuro, hundiéndose hacia **ABAJO**.
- ❌ **Al revés** (error cometido): cúpula **OSCURA** con
  `border-radius: 50% 50% 0 0` (redondeo **ARRIBA**) sobresaliendo hacia arriba.

### Referencia: home (`app/_layout/project/index.jsx`)

```jsx
// Al final de la sección <Project/>, ANTES del <Contact/> oscuro:
<motion.div
  className='w-screen bg-background'
  style={{ height: transformY, borderRadius: '0 0 50% 50%' }}
/>
```

`transformY` sale de `useProjectSlider` (`app/_hooks/use-project-slider.js`):

```js
const { scrollYProgress } = useScroll({
  target: element,
  offset: ['start end', 'end start'], // <Project/> NO es el último: le sigue <Contact/>
});
const transformY = useTransform(scrollYProgress, [0, 0.9], [250, 0]);
```

### Réplica en el Núcleo (`nucleo/components/layout/footer-reveal.tsx`)

Envuelve `<Footer/>` con una tapa clara `.ni-footer-curve`. **Diferencia clave**:
acá el footer **sí es el último elemento del documento**, por eso el `offset`
debe terminar en `'end end'` (no `'end start'`). Si no, el progreso nunca llega
a 1, la curva no se retrae del todo y **tapa el logo `núcleo.ia`**.

```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end end'], // footer = último elemento → 'end end'
});
const height = useTransform(scrollYProgress, [0, 0.85], [250, 0]);
// ...
<div ref={ref} className="ni-footer-reveal">
  <Footer />
  <motion.div aria-hidden className="ni-footer-curve"
    style={{ height, borderRadius: '0 0 50% 50%' }} />
</div>
```

CSS (`nucleo/styles/nucleo.css`):

```css
.ni-footer-reveal { position: relative; }
.ni-footer-curve {
  position: absolute; top: 0; left: 0; width: 100%;
  background: var(--bg-base);   /* color del contenido, NO del footer */
  z-index: 2; pointer-events: none;
}
```

### Checklist para replicar la curva en cualquier sección → footer oscuro

1. Contenedor de la zona oscura en `position: relative`.
2. `motion.div` **clara** absoluta sobre el tope (`top:0; left:0; width:100%`),
   `background` = color del contenido, `borderRadius: '0 0 50% 50%'`,
   `pointer-events:none`, `z-index` por encima.
3. Animar `height` de `250 → 0` con
   `useTransform(scrollYProgress, [0, 0.85–0.9], [250, 0])`.
4. Elegir el `offset` según la posición del target:
   - Con contenido debajo → `['start end', 'end start']`.
   - **Footer = último elemento del documento → `['start end', 'end end']`**
     (para que la curva se retraiga por completo al llegar al fondo).

## Otros hooks de scroll disponibles

- `useProjectSlider` (`app/_hooks/use-project-slider.js`): sliders horizontales
  (`transformX1` 0→-250, `transformX2` -250→0) + la curva (`transformY`).
- `useContactSlider` (`app/_hooks/use-contact-slider.js`): parallax suave
  (`transformX`/`transformY` -50→50 sobre `[0,1]`). Se usa en el
  `.ni-footer-inner` del footer del Núcleo (no en el `<footer>`, para no dejar
  hueco abajo).

## TOC lateral (índice "En esta página")

`nucleo/components/recurso/table-of-contents.tsx`. Look editorial de la web:
- **Riel vertical** (`.toc-rail`, hairline `--border`) + **thumb de tinta**
  (`.toc-thumb`, `--text-primary`) que **se desliza** al item activo: `translateY` +
  `height` medidos del `.toc-item.active` (transición ease-in-expo). Es el indicador
  "estás acá" — reemplaza el punto por-item.
- **Scrollspy robusto**: NO usar `IntersectionObserver` con banda `-80px/-80%` (se
  saltea al hacer scroll de golpe y no marca nada). En `scroll` (rAF), el activo es el
  último encabezado con `top ≤ scrollY + 120`; siempre marca algo (por defecto el
  primero) → el thumb nunca desaparece.
- Overline fino (weight 500, tracking 0.14em, `--text-muted`), hover que desliza el
  item (`padding-left`) con ease-in-expo, colapso animado (`grid-template-rows 1fr→0fr`).
- Desktop-only: en el detalle, `.recurso-toc` es `display:none` bajo 1024px.

## Convenciones de motion / transiciones

- Curva de easing de la marca: **ease-in-expo** →
  `cubic-bezier(0.1, 0, 0.3, 1)` (subrayados, hovers, cards del Núcleo).
- Respetar `prefers-reduced-motion` (ya contemplado en los hooks/animaciones).
- Tokens del Núcleo (monocromo, alineado a la web) en `nucleo/styles/nucleo.css`,
  scopeados a `.nucleo-root`: `--bg-base:#f4f4f6`, `--bg-surface:#fff`,
  `--accent:#1c1e21`, `--text-primary:#1c1e21`, `--text-inverse:#fff`.
- `.cult-card`: `border-radius: 24px` + transición ease-in-expo (cards redondeadas
  al estilo de los botones).

# Guía de estilos — Tipografía y cards

## La fuente y los "grosores"

Neue Montreal está cargada **solo en peso regular** (`app/_fonts/neue-montreal/`,
`weight: 'normal'`). `font-medium`/`font-bold` son **sintéticos** → un
`font-weight: 700` se ve pesado y ajeno a la web. La home NO se apoya en pesos
gruesos: la jerarquía la dan el **TAMAÑO** y el **TRACKING** en peso regular/medium.

Regla al tipografiar cualquier cosa del Núcleo (igual que el inicio de la home):
- **Títulos display**: grandes con `font-weight: 500`, `letter-spacing` negativo
  (`-0.02em`/`-0.03em`), `line-height` ajustado (1.0–1.16). Nada de 700.
- **Overlines/labels**: `uppercase`, `font-size` ~0.68rem,
  `letter-spacing: 0.12–0.14em`, color `--text-muted` (como "BÓVEDA DE RECURSOS").
- Escala fluida con `clamp(min, vw, max)` (patrón de toda la home).

## Cards de contenido (recurso-card)

Fuente: `nucleo/components/boveda/recurso-card.tsx` + estilos en `nucleo.css`
(bloque "RECURSO CARD"). NO poner `<style>` inline por card (se duplicaba 458 veces).

Anatomía (editorial, monocromo, como la web):
- **Cabecera**: overline de categoría (icono + `.recurso-cat`) · **medidor de
  dificultad** monocromo (`.recurso-meter`, 1/2/3 barras ascendentes en tinta —
  NUNCA verde/ámbar/rojo) | estado (`Badge`) + estrella.
- **Título** `.recurso-title`: `clamp(1.1rem,1.5vw,1.3rem)`, weight 500, `-0.02em`,
  line-height 1.16. Destacada (`.cult-card-featured`): mini-hero
  `clamp(1.3rem,1.9vw,1.7rem)` + descripción a 3 líneas (contraste de escala tipo home).
- Chips de tools mono (`.tool-pill`); pie con hairline (`.recurso-foot`), meta mono y
  CTA `.recurso-cta-link` que **invierte a tinta** al hover (botón estilo web).
- Contenedor: `.cult-card` (lift + spotlight + ring en hover, ease-in-expo).

**Color: todo grises/tinta.** Los badges de estado son monocromos (`.badge-new` =
tag tinta sólido; `.badge-updated/-popular` = contorno gris). La dificultad se
codifica por el medidor, no por color.

**Entrada**: `.recurso-grid-item` usa `fade-in-up` con el easing de la home
(`cubic-bezier(0.215, 0.61, 0.355, 1)`, ~0.6s) + delay por índice.

## Mobile / touch (vida sin hover)

En pantallas touch el hover NO dispara → dar feedback con `:active`, scopeado a
`@media (hover: none)` en `nucleo.css`:
- `.cult-card:active` → press (scale 0.982). Las category cards ya son `<Link>` enteras.
- Recurso card **tappable entera**: `.recurso-cta-link::after { position:absolute; inset:0 }`
  estira el link sobre toda la card (el ancestro posicionado es el `div` interno de
  `TextureCard`); `.recurso-dl` va con `z-index` por encima para seguir clickeable.
  Solo en touch, para no cambiar el click del desktop.
- CTA/dropdowns/TOC con `:active`; `-webkit-tap-highlight-color: transparent` global en
  `.nucleo-root a/button` (así se ven nuestros estados y no el flash gris del browser).

Filtros de la bóveda (`search-filter.tsx`): en `≤640px` grilla 2-col (buscador ancho
arriba, los dos dropdowns lado a lado, botones inline) para no comerse el scroll.

**En el teléfono NUNCA scroll horizontal, siempre vertical.** Los bloques de código
(`code-block.tsx`) traían `white-space: pre` + `overflow-x: auto` → una línea larga de
bash empujaba el ancho de TODA la página. En `≤640px` el código **envuelve**:
`white-space: pre-wrap` + `overflow-wrap: anywhere` (corta URLs/hashes) + `overflow-x:
hidden`. En desktop se mantiene el scroll interno del bloque. Regla general: cualquier
elemento ancho (código, tablas, `<pre>`) debe envolver o contenerse en mobile, nunca
desbordar la página.

**Reveal on scroll** (`nucleo/components/ux/scroll-reveal.tsx` + `.reveal-on [data-reveal]`
en `nucleo.css`): fade + slide-up de secciones al scrollear. Dos claves:
- **NO usar `IntersectionObserver`**: no dispara cuando un elemento pasa de "abajo" a
  "arriba" de un salto → queda **oculto** (opacity 0). Chequear en `scroll`/rAF el
  `getBoundingClientRect().top` de TODOS los pendientes (revela cualquiera con
  `top < innerHeight*0.88`).
- **Guardia anti-flash**: el estado oculto solo aplica bajo `.nucleo-root.reveal-on`, que
  agrega el componente al montar → sin JS/observer se ve todo. Respeta reduced-motion.
- Poner `data-reveal` (+ opcional `data-reveal-delay="120"` ms) en el contenedor. El hero
  NO lleva (debe verse en carga).

## Hub /links

- **Bilingüe**: como en /links se oculta el offcanvas, el cambio de idioma vive en la
  página (`app/links/_components/lang-toggle.jsx`, pastilla ES/EN sobre la foto). Textos
  desde `translations.js` namespace `links` (bio, location, madeBy, comingSoon, items).
- **Marquees** (`app/links/_components/marquee.jsx`): infinitos y reactivos al scroll
  (mismo lenguaje que el hero de la home). NO reusar el `ParallaxSlider` de la home: su
  `wrap(-20,-45)` está hardcodeado a 4 copias y deja **huecos** con textos cortos en
  pantallas anchas. El `Marquee` de /links parametriza `repeat` y desplaza un segmento
  exacto (`seg = 100/repeat`) → loop sin cortes a cualquier ancho. Nombre `baseVelocity`
  +, bio `-` → van en direcciones opuestas. Scroll abajo→izquierda, arriba→derecha.
- Botones inertes (`href: null`) marcados con `comingSoon: true` en `tree-links.js`:
  muestran "Próximamente/Coming soon" + reloj, y NO llevan el brillo `.link-sheen`.

## Compartir (Open Graph) e íconos

Metadata en `app/_config/metadata.config.js` (root) y `app/links/page.jsx` (/links,
la pantalla que más se comparte). Claves para que NO salga en negro al compartir:
- `metadataBase: new URL('https://vincentconace.com')` → resuelve `/og.jpg` a absoluto.
- `openGraph.images` + `twitter` (`summary_large_image`) apuntando a `/og.jpg`
  (`public/og.jpg`, 1200×630, foto + marca).
- Favicon por convención de Next: `app/icon.png` (monograma) + `app/apple-icon.png`.
  NO setear `icons` a mano (Next los auto-linkea; un path a mano choca).
- **Post-deploy**: las redes CACHEAN el OG. Tras deployar hay que re-scrapear:
  Facebook/WhatsApp/Instagram → developers.facebook.com/tools/debug ("Scrape Again");
  LinkedIn → Post Inspector. Si no, sigue mostrando la caché vieja (negra).
- Las imágenes OG/íconos se regeneran renderizando HTML de marca con Playwright y
  capturando (usa la woff2 de Neue Montreal vía `file://` para coherencia).

## Gotcha recurrente

- Inyectar CSS con `<style>{cssString}</style>` cuando el CSS contiene `>` o `&`
  provoca **hydration mismatch** (el server escapa a `&gt;`/`&amp;`). Usar siempre
  `<style dangerouslySetInnerHTML={{ __html: cssString }} />`.
- Si `next start` sirve los estáticos con **500 "Internal Server Error"** (CSS de
  ~21 bytes → toda la página sale sin estilos, fuente serif) es un `.next` corrupto
  (`MODULE_NOT_FOUND` en el server log), NO el código. Fix: `rm -rf .next && next build`.
