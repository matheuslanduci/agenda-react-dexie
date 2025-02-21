import { useAtomValue } from 'jotai'
import { viewStateAtom } from '~/stores/view-state.atom'
import { DayDisplay } from './day-display'
import { MonthDisplay } from './month-display'
import { WeekDisplay } from './week-display'
import { YearDisplay } from './year-display'

export function Agenda() {
  const viewState = useAtomValue(viewStateAtom)

  if (viewState === 'day') {
    return <DayDisplay />
  }

  if (viewState === 'week') {
    return <WeekDisplay />
  }

  if (viewState === 'month') {
    return <MonthDisplay />
  }

  return <YearDisplay />
}
