// import {  } from 'date-fns'
// import { ptBR } from 'date-fns/locale'
import { DateProvider } from '@providers/date'

export class DateFnsProvider implements DateProvider {
  now(): Date {
    return new Date()
  }
}
