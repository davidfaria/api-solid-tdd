import { container } from 'tsyringe'
import { uploadConfig } from '@config/upload'

import { StorageProvider } from './storage-provider'
import { DiskStorageProvider } from './implementations/disk-provider'
import { S3StorageProvider } from './implementations/s3-provider'

const getProvider = () => {
  return uploadConfig.driver === 'disk'
    ? DiskStorageProvider
    : S3StorageProvider
}

container.registerSingleton<StorageProvider>('StorageProvider', getProvider())
