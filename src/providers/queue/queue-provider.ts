/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from 'amqplib'

type QueueOptions = {
  persistent: boolean
}

export type PublishInQueueProps = {
  queue: string
  message: string
  options?: QueueOptions
}

export type PublishInExchangeProps = {
  exchange: string
  routingKey: string
  message: string
}

export type ConsumerProps = {
  queue: string
  callback: (message: Message) => void
}

export interface QueueProvider {
  publishInQueue({ queue, message, options }: PublishInQueueProps): void
  publishInExchange({
    exchange,
    routingKey,
    message
  }: PublishInExchangeProps): void
  consumer({ queue, callback }: ConsumerProps): Promise<any>
}
