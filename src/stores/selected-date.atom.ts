import { atomWithStorage } from 'jotai/utils'

export const selectedDateAtom = atomWithStorage<string>(
  'selected-date',
  new Date().toISOString()
)
