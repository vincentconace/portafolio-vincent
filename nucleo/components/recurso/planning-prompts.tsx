'use client'

import React, { useState, useCallback } from 'react'
import { Copy, Check, CalendarClock } from 'lucide-react'
import { useTranslation } from '@/providers'
import { useLang } from '@nucleo/components/i18n/t'

type Lang = 'es' | 'en'
type Bi = { es: string; en: string }
const L = (b: Bi, lang: Lang) => b[lang]

// ---------------------------------------------------------------------------
// Los 3 prompts de planificación (mensual / semanal / diario), bilingües.
// El texto del prompt va en primera persona porque es lo que se le pega a Claude.
// ---------------------------------------------------------------------------
interface Plan {
  id: string
  emoji: string
  label: Bi
  when: Bi
  prompt: Bi
}

const PLANS: Plan[] = [
  {
    id: 'mensual',
    emoji: '🗓️',
    label: { es: 'Mensual', en: 'Monthly' },
    when: {
      es: 'Pegalo el día 1 para armar todo el mes — la vista de pájaro.',
      en: "Paste it on day 1 to lay out the whole month — the bird's-eye view.",
    },
    prompt: {
      es: `Actuá como mi asistente de planificación mensual. Zona horaria: Buenos Aires
(America/Argentina/Buenos_Aires). Mi Google Calendar está conectado; usá mi
calendario principal. El mes es el actual (del día 1 al último día).

Hacé las preguntas de forma INTERACTIVA y guiada (estilo híbrido):
- Usá la herramienta de preguntas con botones (AskUserQuestion) para el triage de
  categorías, para elegir prioridades y para confirmar antes de crear.
- Lo abierto (fechas y detalles puntuales, la lista de objetivos) lo escribo yo en
  texto o en el campo "Otro".
- No me tires todas las preguntas juntas en un bloque: llevame paso a paso.

Pasos:

1. Revisá con list_events qué ya tengo agendado este mes y mostrámelo por semana,
   para no duplicar. Si hay feriados relevantes, mencionámelos.

2. PREGUNTA CON BOTONES (multiSelect): "¿Qué querés organizar este mes?"
   Opciones: Fechas importantes / Deadlines de trabajo / Citas médicas /
   Vencimientos y pagos / Objetivos del mes. (Elijo una o varias.)

3. Para cada categoría que haya elegido, pedime los detalles (los escribo en texto):
   - Fechas importantes: viajes, cumpleaños, eventos sociales (qué y qué día).
   - Deadlines de trabajo: qué entrega o hito y para cuándo.
   - Citas médicas: día, hora, lugar.
   - Vencimientos y pagos: cuál y qué día (aclaro si se repite cada mes).
   - Objetivos del mes: mi lista de 3 a 5 metas.

4. Si cargué objetivos, preguntame CON BOTONES cuáles son los 2 más prioritarios.

5. Mostrame un RESUMEN de lo que vas a crear (por semana o fecha) y pedime
   confirmación CON BOTONES: "¿Creo estos eventos?" → Sí, crealos / Cambiar algo /
   No crear.

6. Con mi OK:
   - Creá SOLO los eventos (fechas importantes, deadlines, citas, vencimientos).
   - Cumpleaños, viajes o fechas sin hora → evento de día completo.
   - Pagos o vencimientos que se repiten cada mes → repetición mensual.
   - NO crees eventos para los objetivos / metas.

7. Los OBJETIVOS dejámelos como checklist acá en el chat, con la semana sugerida para
   encarar cada uno según cómo viene el mes. (No al calendar, solo sugerí.)

8. Cerrá con: (a) el panorama del mes ya creado (eventos clave por semana) y (b) la
   checklist de objetivos con la semana sugerida.`,
      en: `Act as my monthly planning assistant. Time zone: Buenos Aires
(America/Argentina/Buenos_Aires). My Google Calendar is connected; use my
primary calendar. The month is the current one (from day 1 to the last day).

Ask the questions in an INTERACTIVE, guided way (hybrid style):
- Use the button-question tool (AskUserQuestion) for triaging categories, choosing
  priorities, and confirming before creating.
- The open-ended parts (specific dates and details, the list of goals) I'll write in
  text or in the "Other" field.
- Don't throw all the questions at me in one block: take me step by step.

Steps:

1. Check with list_events what I already have scheduled this month and show it to me by
   week, to avoid duplicates. If there are relevant holidays, mention them.

2. BUTTON QUESTION (multiSelect): "What do you want to organize this month?"
   Options: Important dates / Work deadlines / Medical appointments /
   Due dates and payments / Goals for the month. (I pick one or several.)

3. For each category I chose, ask me for the details (I'll write them in text):
   - Important dates: trips, birthdays, social events (what and which day).
   - Work deadlines: which deliverable or milestone and by when.
   - Medical appointments: day, time, place.
   - Due dates and payments: which one and which day (I'll note if it repeats every month).
   - Goals for the month: my list of 3 to 5 goals.

4. If I entered goals, ask me WITH BUTTONS which 2 are the highest priority.

5. Show me a SUMMARY of what you're going to create (by week or date) and ask me for
   confirmation WITH BUTTONS: "Should I create these events?" → Yes, create them /
   Change something / Don't create.

6. With my OK:
   - Create ONLY the events (important dates, deadlines, appointments, due dates).
   - Birthdays, trips or dates without a time → all-day event.
   - Payments or due dates that repeat every month → monthly recurrence.
   - Do NOT create events for the goals.

7. Leave the GOALS as a checklist here in the chat, with the suggested week to tackle
   each one based on how the month looks. (Not to the calendar, just suggest.)

8. Wrap up with: (a) the month's overview already created (key events by week) and (b) the
   checklist of goals with the suggested week.`,
    },
  },
  {
    id: 'semanal',
    emoji: '📅',
    label: { es: 'Semanal', en: 'Weekly' },
    when: {
      es: 'Pegalo los lunes para bajar el mes a la semana.',
      en: 'Paste it on Mondays to break the month down into the week.',
    },
    prompt: {
      es: `Actuá como mi asistente de planificación semanal. Zona horaria: Buenos Aires
(America/Argentina/Buenos_Aires). Mi Google Calendar está conectado; usá mi
calendario principal. La semana es la actual (de lunes a domingo).

Hacé las preguntas de forma INTERACTIVA y guiada (estilo híbrido):
- Usá la herramienta de preguntas con botones (AskUserQuestion) para el triage de
  categorías, para elegir prioridades y para confirmar antes de crear.
- Lo abierto (horarios, nombres, lista de tareas) lo escribo yo en texto o en "Otro".
- No me tires todas las preguntas juntas: llevame paso a paso.

Pasos:

1. Revisá con list_events qué ya tengo agendado esta semana y mostrámelo en una lista
   corta, para no duplicar.

2. PREGUNTA CON BOTONES (multiSelect): "¿Qué querés organizar esta semana?"
   Opciones: Horario de trabajo / Reuniones / Citas médicas / Actividades /
   Tareas de la semana. (Elijo una o varias.)

3. Para cada categoría elegida, pedime los detalles (los escribo en texto):
   - Horario de trabajo: días y horas (aclaro si se repite igual toda la semana).
   - Reuniones: día, hora, duración, con quién o link.
   - Citas médicas: día, hora, lugar.
   - Actividades: qué, día y hora.
   - Tareas de la semana: mi lista de pendientes (sin horario).

4. Preguntame CON BOTONES mis 3 prioridades de la semana (elijo de lo que cargué).

5. Mostrame un RESUMEN de lo que vas a crear (tabla por día) y pedime confirmación
   CON BOTONES: "¿Creo estos eventos?" → Sí, crealos / Cambiar algo / No crear.

6. Con mi OK:
   - Creá SOLO los eventos (trabajo, reuniones, citas, actividades). Si algo se repite
     (ej. trabajo de lunes a viernes), usá repetición.
   - NO crees eventos para las tareas.

7. Las TAREAS dejámelas como checklist acá en el chat, agrupadas por prioridad, con el
   día sugerido para cada una según los huecos libres. (No al calendar, solo sugerí.)

8. Cerrá con: (a) la agenda de la semana ya creada y (b) la checklist de tareas con el
   día sugerido.`,
      en: `Act as my weekly planning assistant. Time zone: Buenos Aires
(America/Argentina/Buenos_Aires). My Google Calendar is connected; use my
primary calendar. The week is the current one (Monday to Sunday).

Ask the questions in an INTERACTIVE, guided way (hybrid style):
- Use the button-question tool (AskUserQuestion) for triaging categories, choosing
  priorities, and confirming before creating.
- The open-ended parts (schedules, names, task list) I'll write in text or in "Other".
- Don't throw all the questions at me at once: take me step by step.

Steps:

1. Check with list_events what I already have scheduled this week and show it to me in a
   short list, to avoid duplicates.

2. BUTTON QUESTION (multiSelect): "What do you want to organize this week?"
   Options: Work schedule / Meetings / Medical appointments / Activities /
   Tasks for the week. (I pick one or several.)

3. For each chosen category, ask me for the details (I'll write them in text):
   - Work schedule: days and hours (I'll note if it repeats the same all week).
   - Meetings: day, time, duration, with whom or link.
   - Medical appointments: day, time, place.
   - Activities: what, day and time.
   - Tasks for the week: my list of to-dos (no set time).

4. Ask me WITH BUTTONS for my 3 priorities of the week (I pick from what I entered).

5. Show me a SUMMARY of what you're going to create (a table by day) and ask me for
   confirmation WITH BUTTONS: "Should I create these events?" → Yes, create them /
   Change something / Don't create.

6. With my OK:
   - Create ONLY the events (work, meetings, appointments, activities). If something repeats
     (e.g. work Monday to Friday), use recurrence.
   - Do NOT create events for the tasks.

7. Leave the TASKS as a checklist here in the chat, grouped by priority, with the
   suggested day for each based on the free gaps. (Not to the calendar, just suggest.)

8. Wrap up with: (a) the week's agenda already created and (b) the checklist of tasks with
   the suggested day.`,
    },
  },
  {
    id: 'diario',
    emoji: '☀️',
    label: { es: 'Diario', en: 'Daily' },
    when: {
      es: 'Pegalo cualquier mañana para armar la jornada.',
      en: 'Paste it any morning to lay out the day.',
    },
    prompt: {
      es: `Actuá como mi asistente de planificación del día. Zona horaria: Buenos Aires
(America/Argentina/Buenos_Aires). Mi Google Calendar está conectado; usá mi
calendario principal. La fecha es hoy.

Hacé las preguntas de forma INTERACTIVA y guiada (estilo híbrido):
- Usá la herramienta de preguntas con botones (AskUserQuestion) para el triage de
  categorías, para elegir la prioridad y para confirmar antes de crear.
- Lo abierto (horarios puntuales, lista de tareas) lo escribo yo en texto o en "Otro".
- No me tires todas las preguntas juntas: llevame paso a paso.

Pasos:

1. Revisá con list_events qué tengo hoy (de 00:00 a 23:59) y mostrámelo como
   "Tu agenda de hoy hasta ahora".

2. PREGUNTA CON BOTONES (multiSelect): "¿Qué querés agregar hoy?"
   Opciones: Reuniones o llamadas / Citas médicas / Horario de trabajo /
   Actividad personal / Solo tareas. (Elijo una o varias.)

3. Para cada categoría elegida, pedime los detalles (los escribo en texto): hora,
   duración, lugar o con quién. Las tareas, mi lista (sin horario).

4. Si cargué varias tareas, preguntame CON BOTONES cuál es la prioridad del día.

5. Mostrame un RESUMEN de los eventos nuevos y pedime confirmación CON BOTONES:
   "¿Creo estos eventos?" → Sí, crealos / Cambiar algo / No crear.

6. Con mi OK, creá SOLO los eventos nuevos (no dupliques; no crees eventos para las
   tareas).

7. Las TAREAS dejámelas como checklist acá en el chat, con un horario sugerido para
   cada una según los huecos libres entre mis eventos de hoy (ej. "Tarea X →
   11:00–11:45"). Es sugerencia, no la cargues al calendar.

8. Cerrá con el plan del día: agenda con horarios arriba y checklist de tareas con
   horario sugerido abajo.`,
      en: `Act as my daily planning assistant. Time zone: Buenos Aires
(America/Argentina/Buenos_Aires). My Google Calendar is connected; use my
primary calendar. The date is today.

Ask the questions in an INTERACTIVE, guided way (hybrid style):
- Use the button-question tool (AskUserQuestion) for triaging categories, choosing
  the priority, and confirming before creating.
- The open-ended parts (specific times, task list) I'll write in text or in "Other".
- Don't throw all the questions at me at once: take me step by step.

Steps:

1. Check with list_events what I have today (from 00:00 to 23:59) and show it to me as
   "Your agenda for today so far".

2. BUTTON QUESTION (multiSelect): "What do you want to add today?"
   Options: Meetings or calls / Medical appointments / Work schedule /
   Personal activity / Tasks only. (I pick one or several.)

3. For each chosen category, ask me for the details (I'll write them in text): time,
   duration, place or with whom. Tasks, my list (no set time).

4. If I entered several tasks, ask me WITH BUTTONS which is the day's priority.

5. Show me a SUMMARY of the new events and ask me for confirmation WITH BUTTONS:
   "Should I create these events?" → Yes, create them / Change something / Don't create.

6. With my OK, create ONLY the new events (don't duplicate; don't create events for the
   tasks).

7. Leave the TASKS as a checklist here in the chat, with a suggested time slot for
   each based on the free gaps between my events today (e.g. "Task X →
   11:00–11:45"). It's a suggestion, don't add it to the calendar.

8. Wrap up with the day's plan: agenda with times at the top and checklist of tasks with
   the suggested time at the bottom.`,
    },
  },
]

const STYLES = `
  .plp-box {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    margin: 1.5rem 0;
  }
  .plp-tabs {
    display: flex;
    gap: 0.4rem;
    padding: 0.75rem 0.85rem;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: thin;
  }
  .plp-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.9rem;
    border-radius: 9999px;
    border: 1px solid var(--border);
    background: var(--bg-base);
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 150ms ease;
    font-family: inherit;
  }
  .plp-tab:hover { border-color: var(--accent); color: var(--text-primary); }
  .plp-tab.active {
    background: rgba(var(--accent-rgb), 0.12);
    border-color: rgba(var(--accent-rgb), 0.35);
    color: var(--accent);
  }
  .plp-tab:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .plp-body { padding: 1.1rem 1.25rem 1.35rem; }
  .plp-when {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.83rem;
    color: var(--text-muted);
    margin-bottom: 0.85rem;
  }
  .plp-code {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--bg-base);
  }
  .plp-code-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.55rem 0.85rem;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
  }
  .plp-code-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }
  .plp-copy {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 150ms ease;
    font-family: inherit;
    white-space: nowrap;
  }
  .plp-copy:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
  .plp-copy.copied { border-color: rgba(34,197,94,0.4); color: #4ade80; background: rgba(34,197,94,0.08); }
  .plp-copy:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .plp-pre {
    margin: 0;
    padding: 1rem 1.1rem;
    max-height: 340px;
    overflow: auto;
    font-family: var(--font-mono), 'Cascadia Code', 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    line-height: 1.65;
    color: var(--text-secondary);
    white-space: pre-wrap;
    word-break: break-word;
  }
`

function CopyButton({ text }: { text: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text.trim())
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
      className={`plp-copy${copied ? ' copied' : ''}`}
      aria-label={t('nucleo.widgets.copy')}
    >
      {copied ? <Check size={12} strokeWidth={2.2} /> : <Copy size={12} strokeWidth={1.7} />}
      {copied ? t('nucleo.widgets.copied') : t('nucleo.widgets.copy')}
    </button>
  )
}

export function PlanningPrompts() {
  const { t } = useTranslation()
  const lang = useLang()
  const [activeId, setActiveId] = useState(PLANS[0].id)
  const active = PLANS.find((p) => p.id === activeId) ?? PLANS[0]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="plp-box">
        <div className="plp-tabs" role="tablist" aria-label={t('nucleo.widgets.plpAria')}>
          {PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === activeId}
              className={`plp-tab${p.id === activeId ? ' active' : ''}`}
              onClick={() => setActiveId(p.id)}
            >
              <span aria-hidden>{p.emoji}</span>
              {L(p.label, lang)}
            </button>
          ))}
        </div>

        <div className="plp-body">
          <div className="plp-when">
            <CalendarClock size={14} strokeWidth={1.7} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            {L(active.when, lang)}
          </div>

          <div className="plp-code">
            <div className="plp-code-head">
              <span className="plp-code-label">{t('nucleo.widgets.promptLabel')} {L(active.label, lang)}</span>
              <CopyButton text={L(active.prompt, lang)} />
            </div>
            <pre className="plp-pre">{L(active.prompt, lang)}</pre>
          </div>
        </div>
      </div>
    </>
  )
}
