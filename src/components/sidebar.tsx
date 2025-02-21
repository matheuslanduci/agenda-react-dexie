import { useLiveQuery } from 'dexie-react-hooks'
import { useAtom, useAtomValue } from 'jotai'
import { db } from '~/lib/db'
import { cn } from '~/lib/utils'
import { selectedDateAtom } from '~/stores/selected-date.atom'
import { sidebarStateAtom } from '~/stores/sidebar-state.atom'
import { Calendar } from './ui/calendar'

export function Sidebar() {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const sidebarState = useAtomValue(sidebarStateAtom)
  const nextEvents = useLiveQuery(() => {
    return db.events
      .where('from')
      .above(new Date().getTime())
      .limit(5)
      .sortBy('day.start')
  })

  if (!nextEvents) {
    return null
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-4 p-4 transition-all duration-300 border-r mt-14 fixed top-0 left-0 bottom-0 overflow-hidden',
        sidebarState === 'open' ? 'w-[282px]' : 'w-0 px-0'
      )}
    >
      <Calendar
        mode="single"
        selected={new Date(selectedDate)}
        onSelect={(date) => {
          if (date) {
            setSelectedDate(date.toISOString())
          }
        }}
        className="rounded-md border"
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">
          Próximos eventos ({nextEvents.length})
        </h2>
        <ul className="flex flex-col gap-2">
          {nextEvents.map((event) => (
            <li key={event.id} className="flex flex-col gap-1 border p-2">
              <h3 className="text-sm font-bold">{event.title}</h3>
              <p className="text-xs">
                {new Date(event.day.start).toLocaleString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
