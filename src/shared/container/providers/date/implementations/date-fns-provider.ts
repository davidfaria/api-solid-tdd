// import {  } from 'date-fns'
// import { ptBR } from 'date-fns/locale'
import { DateProvider } from '@shared/container/providers/date/date-provider'

export class DateFnsProvider implements DateProvider {
  now(): Date {
    return new Date()
  }
}
