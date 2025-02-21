import { arktypeResolver } from '@hookform/resolvers/arktype'
import { type } from 'arktype'
import { useAtom } from 'jotai'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { db } from '~/lib/db'
import { newEventStateAtom } from '~/stores/new-event-state.atom'
import { DateTimePicker } from './date-time-picker'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const formSchema = type({
  title: type('string & string.trim & string > 0 & string < 60').configure({
    message: () => 'O título deve ter entre 1 e 60 caracteres'
  }),
  description: type('string & string < 500 | string').configure({
    message: () => 'A descrição deve ter no máximo 500 caracteres'
  }),
  from: type('Date').configure({
    message: () => 'Data de início inválida'
  }),
  to: type('Date').configure({
    message: () => 'Data de término inválida'
  })
}).narrow((data, ctx) => {
  if (data.from && data.to && data.from > data.to) {
    return ctx.reject({
      message: 'A data de início deve ser anterior à data de término',
      path: ['to']
    })
  }

  return true
})

type FormValues = typeof formSchema.inferIn

export function NewEventModal() {
  const form = useForm<FormValues>({
    resolver: arktypeResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })
  const [newEventState, setNewEventState] = useAtom(newEventStateAtom)

  async function handleSubmit(values: FormValues) {
    const startDay = new Date(values.from)
    startDay.setHours(0, 0, 0, 0)

    const endDay = new Date(values.to)
    endDay.setHours(23, 59, 59, 999)

    await db.events.add({
      id: nanoid(),
      day: {
        start: startDay.getTime(),
        end: endDay.getTime()
      },
      title: values.title,
      description: values.description,
      from: values.from.getTime(),
      to: values.to.getTime()
    })
    setNewEventState('closed')
    toast('Evento criado com sucesso')
    form.reset({ title: '', description: '' })
  }

  return (
    <Dialog
      open={newEventState === 'open'}
      onOpenChange={(open) => setNewEventState(open ? 'open' : 'closed')}
    >
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Novo evento</DialogTitle>
          <DialogDescription>
            Adicione um novo evento ao calendário
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="new-event-form"
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do evento</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="Reunião com a equipe" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Reunião para discutir o planejamento do próximo trimestre"
                      rows={4}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Início do evento</FormLabel>

                  <DateTimePicker
                    field={field}
                    onDateSelect={(date) => {
                      if (date) {
                        form.setValue('from', date)
                        form.setValue('to', date)
                      }
                    }}
                    onTimeChange={(type, value) => {
                      const currentDate = field.value || new Date()
                      const newDate = new Date(currentDate)

                      if (type === 'hour') {
                        const hour = Number.parseInt(value, 10)
                        newDate.setHours(hour)
                      } else {
                        const minute = Number.parseInt(value, 10)
                        newDate.setMinutes(minute)
                      }

                      form.setValue('from', newDate)
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Término do evento</FormLabel>

                  <DateTimePicker
                    field={field}
                    onDateSelect={(date) => {
                      if (date) {
                        form.setValue('to', date)
                      }
                    }}
                    onTimeChange={(type, value) => {
                      const currentDate = field.value || new Date()
                      const newDate = new Date(currentDate)

                      if (type === 'hour') {
                        const hour = Number.parseInt(value, 10)
                        newDate.setHours(hour)
                      } else {
                        const minute = Number.parseInt(value, 10)
                        newDate.setMinutes(minute)
                      }

                      form.setValue('to', newDate)
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            form="new-event-form"
            disabled={form.formState.isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
