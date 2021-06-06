/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'tsyringe'
import { connect, Connection, Channel } from 'amqplib'
import {
  QueueProvider,
  PublishInQueueProps,
  PublishInExchangeProps,
  ConsumerProps
} from '@shared/container/providers/queue/queue-provider'

import { queueConfig } from '@config/queue'

@injectable()
export class RabbitMQProvider implements QueueProvider {
  private conn: Connection

  private channel: Channel

  public async start(): Promise<void> {
    this.conn = this.conn || (await connect(queueConfig))
    this.channel = this.channel || (await this.conn.createChannel())
  }

  async publishInQueue({
    queue,
    message,
    options = { persistent: true }
  }: PublishInQueueProps): Promise<boolean> {
    const { persistent } = options
    await this.start()
    return this.channel.sendToQueue(queue, Buffer.from(message), {
      persistent
    })
  }

  async publishInExchange({
    exchange,
    routingKey,
    message
  }: PublishInExchangeProps): Promise<boolean> {
    await this.start()
    return this.channel.publish(exchange, routingKey, Buffer.from(message))
  }

  async close(): Promise<void> {
    await this.conn.close()
  }

  async consumer({ queue, callback }: ConsumerProps): Promise<any> {
    return this.channel.consume(queue, (message) => {
      if (message) {
        callback(message)
        this.channel.ack(message)
      }
    })
  }
}

// const consumer = async () => {
//   const server = new QueueProvider();
//   await server.start();

//   await server.consume('email', (message) =>
//     console.log(message.content.toString())
//   );
// };

// consumer();
