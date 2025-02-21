import { useAtomValue } from 'jotai'
import { Agenda } from './components/agenda'
import { EditEventModal } from './components/edit-event-modal'
import { Header } from './components/header'
import { NewEventModal } from './components/new-event-modal'
import { Sidebar } from './components/sidebar'
import { cn } from './lib/utils'
import { sidebarStateAtom } from './stores/sidebar-state.atom'

export function App() {
  const sidebarState = useAtomValue(sidebarStateAtom)
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Header />
      <Sidebar />

      <main
        className={cn(
          'flex-1 ml-[282px] overflow-auto h-full transition-all duration-300',
          sidebarState === 'closed' && 'ml-0'
        )}
      >
        <Agenda />
      </main>

      <NewEventModal />
      <EditEventModal />
    </div>
  )
}
