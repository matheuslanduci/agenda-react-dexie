import { atom } from 'jotai'

type EditEventState = 'open' | 'closed'

export const editEventStateAtom = atom<EditEventState>('closed')

export const editEventIdAtom = atom<string | null>(null)
