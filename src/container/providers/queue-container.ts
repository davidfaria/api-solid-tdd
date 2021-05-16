import { container } from 'tsyringe'
import { QueueProvider, RabbitMQProvider } from '@providers/queue'
container.registerSingleton<QueueProvider>('QueueProvider', RabbitMQProvider)
