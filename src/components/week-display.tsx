import { addDays, eachDayOfInterval, format, startOfWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useLiveQuery } from 'dexie-react-hooks'
import { useAtom } from 'jotai'
import { type Event, db } from '~/lib/db'
import { selectedDateAtom } from '~/stores/selected-date.atom'
import { DayGrid } from './day-grid'
import { TimeSlots } from './time-slots'

export function WeekDisplay() {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const weekStart = startOfWeek(selectedDate, { locale: ptBR })
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  })

  const formattedWeekDays = weekDays.map((day) => {
    return {
      primitiveDate: day,
      date: format(day, 'dd/MM', { locale: ptBR }),
      dayName: format(day, 'EEEE', { locale: ptBR })
    }
  })

  const weekEvents = useLiveQuery(async () => {
    const result: Event[][] = []

    for (const { primitiveDate } of formattedWeekDays) {
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

  if (!weekEvents) {
    return null
  }

  return (
    <div className="flex flex-col">
      <div className="flex border-b py-2">
        <div className="w-[72px]" />

        {formattedWeekDays.map(({ date, dayName }) => (
          <div key={date} className="flex-1 flex flex-col text-center">
            <div className="text-xs">{date}</div>
            {dayName}
          </div>
        ))}
      </div>

      <div className="flex">
        <TimeSlots />

        {weekEvents.map((events, index) => (
          <DayGrid key={index.toString()} events={events} />
        ))}
      </div>
    </div>
  )
}
