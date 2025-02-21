import { useSetAtom } from 'jotai'
import { PenIcon, TrashIcon } from 'lucide-react'
import { type Event, db } from '~/lib/db'
import {
  editEventIdAtom,
  editEventStateAtom
} from '~/stores/edit-event-state.atom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

type DayGridProps = {
  events: Event[]
}

const timeSlots = new Array(24).fill(0).map((_, i) => i)

export function DayGrid({ events }: DayGridProps) {
  const setEditEventId = useSetAtom(editEventIdAtom)
  const setEditEventState = useSetAtom(editEventStateAtom)

  return (
    <div className="flex relative flex-1">
      <div className="absolute top-0 left-0 right-0 bottom-0 border-b border-r">
        {timeSlots.map((hour) => (
          <div key={hour} className="h-[60px] text-right border-b" />
        ))}
      </div>

      <div className="flex-1 border-b border-r">
        {events.map((event) => (
          <DropdownMenu key={event.id}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="absolute text-left bg-primary text-primary-foreground rounded-md px-2 py-1 flex flex-col"
                style={{
                  top:
                    new Date(event.from).getHours() * 60 +
                    new Date(event.from).getMinutes(),
                  height:
                    new Date(event.to).getHours() * 60 +
                    new Date(event.to).getMinutes() -
                    new Date(event.from).getHours() * 60 -
                    new Date(event.from).getMinutes(),
                  left: 4,
                  right: 4
                }}
              >
                <div>{event.title}</div>

                <div className="text-xs">
                  {new Date(event.from).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}{' '}
                  -{' '}
                  {new Date(event.to).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onSelect={() => {
                  setEditEventId(event.id)
                  setEditEventState('open')
                }}
              >
                <PenIcon size={16} className="mr-2" />
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive"
                onSelect={() => {
                  db.events.delete(event.id)
                }}
              >
                <TrashIcon size={16} className="mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  )
}
