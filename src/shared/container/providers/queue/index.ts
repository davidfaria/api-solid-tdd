import { container } from 'tsyringe'
import { QueueProvider } from './queue-provider'
import { RabbitMQProvider } from './implementations/rabbitmq-provider'
container.registerSingleton<QueueProvider>('QueueProvider', RabbitMQProvider)
