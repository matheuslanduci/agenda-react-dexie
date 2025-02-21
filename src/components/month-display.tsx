import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useLiveQuery } from 'dexie-react-hooks'
import { useAtom, useSetAtom } from 'jotai'
import { type Event, db } from '~/lib/db'
import { cn } from '~/lib/utils'
import { selectedDateAtom } from '~/stores/selected-date.atom'
import { viewStateAtom } from '~/stores/view-state.atom'

export function MonthDisplay() {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const setViewState = useSetAtom(viewStateAtom)
  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const formattedDays = daysInMonth.flatMap((day, i) => {
    const dayIndex = getDay(day)

    if (i === 0 && dayIndex !== 0) {
      const firstWeek = eachDayOfInterval({
        start: startOfWeek(day),
        end: day
      })

      return firstWeek.map((day) => {
        return {
          primitiveDate: day,
          index: getDay(day),
          date: format(day, 'dd', { locale: ptBR }),
          dayName: format(day, 'EEEE', { locale: ptBR })
        }
      })
    }

    if (i === daysInMonth.length - 1 && dayIndex !== 6) {
      const lastWeek = eachDayOfInterval({
        start: day,
        end: endOfWeek(day)
      })

      return lastWeek.map((day) => {
        return {
          primitiveDate: day,
          index: getDay(day),
          date: format(day, 'dd', { locale: ptBR }),
          dayName: format(day, 'EEEE', { locale: ptBR })
        }
      })
    }

    return {
      primitiveDate: day,
      date: format(day, 'dd', { locale: ptBR }),
      dayName: format(day, 'EEEE', { locale: ptBR })
    }
  })

  const monthEvents = useLiveQuery(async () => {
    const result: Event[][] = []

    for (const { primitiveDate } of formattedDays) {
      const filter = new Date(primitiveDate)
      filter.setHours(0, 0, 0, 0)

      const events = await db.events
        .where('day.start')
        .equals(filter.getTime())
        .sortBy('start')

      result.push(events)
    }

    return result
  }, [selectedDate])

  if (!monthEvents) {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-7 gap-px rounded-lg bg-muted text-sm border-b border-b-muted">
        {[
          'domingo',
          'segunda',
          'terça',
          'quarta',
          'quinta',
          'sexta',
          'sábado'
        ].map((dayName) => (
          <div key={dayName} className="bg-background p-3 text-center">
            {dayName}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 gap-px bg-muted">
        {formattedDays.map(({ date, primitiveDate }, i) => {
          const events = monthEvents[i]

          if (!events) {
            return null
          }

          return (
            <button
              type="button"
              onClick={() => {
                setSelectedDate(primitiveDate.toISOString())
                setViewState('day')
              }}
              key={primitiveDate.toISOString()}
              className={cn(
                'relative bg-background p-3 h-full flex flex-col justify-between',
                !isSameMonth(primitiveDate, new Date(selectedDate)) &&
                  'text-muted-foreground'
              )}
            >
              <span className="text-center w-full block text-xs">{date}</span>
              {events.length > 0 && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="rounded bg-primary/10 p-1 text-xs">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="text-primary">
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
