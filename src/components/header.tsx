import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  isToday,
  subDays,
  subMonths,
  subWeeks,
  subYears
} from 'date-fns'
import { useAtom, useSetAtom } from 'jotai'
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { newEventStateAtom } from '~/stores/new-event-state.atom'
import { selectedDateAtom } from '~/stores/selected-date.atom'
import { sidebarStateAtom } from '~/stores/sidebar-state.atom'
import { type ViewState, viewStateAtom } from '~/stores/view-state.atom'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

function displayCurrentPeriod(viewState: ViewState, selectedDate: Date) {
  if (viewState === 'day') {
    return selectedDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (viewState === 'week' || viewState === 'month') {
    return selectedDate.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long'
    })
  }

  return selectedDate.toLocaleDateString('pt-BR', {
    year: 'numeric'
  })
}

export function Header() {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const [viewState, setViewState] = useAtom(viewStateAtom)
  const [sidebarState, setSidebarState] = useAtom(sidebarStateAtom)
  const setNewEventState = useSetAtom(newEventStateAtom)

  function addPeriod(viewState: ViewState, amount: number) {
    switch (viewState) {
      case 'day':
        return addDays(selectedDate, amount)
      case 'week':
        return addWeeks(selectedDate, amount)
      case 'month':
        return addMonths(selectedDate, amount)
      case 'year':
        return addYears(selectedDate, amount)
    }
  }

  function subPeriod(viewState: ViewState, amount: number) {
    switch (viewState) {
      case 'day':
        return subDays(selectedDate, amount)
      case 'week':
        return subWeeks(selectedDate, amount)
      case 'month':
        return subMonths(selectedDate, amount)
      case 'year':
        return subYears(selectedDate, amount)
    }
  }

  return (
    <header className="flex h-14 items-center border-b px-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() =>
            setSidebarState(sidebarState === 'open' ? 'closed' : 'open')
          }
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Agenda</h1>
        <Button
          className="shrink-0"
          variant="outline"
          disabled={isToday(selectedDate)}
          onClick={() => setSelectedDate(new Date().toISOString())}
        >
          Hoje
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() =>
              setSelectedDate(subPeriod(viewState, 1).toISOString())
            }
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() =>
              setSelectedDate(addPeriod(viewState, 1).toISOString())
            }
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-lg font-semibold">
          {displayCurrentPeriod(viewState, new Date(selectedDate))}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <ModeToggle />

        <Select
          value={viewState}
          onValueChange={(val: ViewState) => setViewState(val)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Dia</SelectItem>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mês</SelectItem>
            <SelectItem value="year">Ano</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => setNewEventState('open')} className="shrink-0">
          Novo evento
        </Button>
      </div>
    </header>
  )
}
