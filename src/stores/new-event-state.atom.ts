import { atom } from 'jotai'

type NewEventState = 'open' | 'closed'

export const newEventStateAtom =
  atom<NewEventState>(
    'closed'
  )
