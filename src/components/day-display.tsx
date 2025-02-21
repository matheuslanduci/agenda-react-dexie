import { useLiveQuery } from 'dexie-react-hooks'
import { useAtomValue } from 'jotai'
import { db } from '~/lib/db'
import { selectedDateAtom } from '~/stores/selected-date.atom'
import { DayGrid } from './day-grid'
import { TimeSlots } from './time-slots'

export function DayDisplay() {
  const selectedDate = useAtomValue(selectedDateAtom)
  const events = useLiveQuery(() => {
    const filter = new Date(selectedDate)
    filter.setHours(0, 0, 0, 0)

    return db.events.where('day.start').equals(filter.getTime()).sortBy('start')
  }, [selectedDate])

  if (!events) {
    return null
  }

  return (
    <div className="flex">
      <TimeSlots />
      <DayGrid events={events} />
    </div>
  )
}
