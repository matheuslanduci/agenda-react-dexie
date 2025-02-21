import { atomWithStorage } from 'jotai/utils'

type SidebarState = 'open' | 'closed'

export const sidebarStateAtom = atomWithStorage<SidebarState>(
  'sidebar-state',
  'open'
)
