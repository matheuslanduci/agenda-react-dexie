import Dexie, { type EntityTable } from 'dexie'

export type Event = {
  id: string
  title: string
  description: string
  from: number
  to: number
  day: {
    start: number
    end: number
  }
}

export const db = new Dexie('CalendarDB') as Dexie & {
  events: EntityTable<Event, 'id'>
}

db.version(1).stores({
  events: 'id, title, description, from, to, day.start, day.end'
})
