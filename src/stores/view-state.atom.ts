import { atomWithStorage } from 'jotai/utils'

export type ViewState = 'month' | 'week' | 'day' | 'year'

export const viewStateAtom = atomWithStorage<ViewState>('view-state', 'week')
