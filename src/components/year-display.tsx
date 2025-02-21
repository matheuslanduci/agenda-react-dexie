import { eachMonthOfInterval, endOfYear, format, startOfYear } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useAtom, useSetAtom } from 'jotai'
import { selectedDateAtom } from '~/stores/selected-date.atom'
import { viewStateAtom } from '~/stores/view-state.atom'
import { Calendar } from './ui/calendar'

export function YearDisplay() {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const setViewState = useSetAtom(viewStateAtom)
  const yearStart = startOfYear(selectedDate)
  const yearEnd = endOfYear(selectedDate)
  const monthsInYear = eachMonthOfInterval({ start: yearStart, end: yearEnd })

  return (
    <div className="py-4 pb-12">
      <div className="flex justify-center mb-4 font-bold">
        {format(selectedDate, 'yyyy', { locale: ptBR })}
      </div>
      <div className="grid grid-cols-4 justify-items-center">
        {monthsInYear.map((month) => (
          <Calendar
            key={month.getTime()}
            mode="default"
            month={month}
            hideHead
            numberOfMonths={1}
            disableNavigation
            fixedWeeks
            onDayClick={(date) => {
              setSelectedDate(date.toISOString())
              setViewState('day')
            }}
          />
        ))}
      </div>
    </div>
  )
}
