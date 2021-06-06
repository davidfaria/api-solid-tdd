import { container } from 'tsyringe'
import { uploadConfig } from '@config/upload'

import {
  DiskStorageProvider,
  StorageProvider,
  S3StorageProvider
} from '@providers/storage'

const getProvider = () => {
  return uploadConfig.driver === 'disk'
    ? DiskStorageProvider
    : S3StorageProvider
}

container.registerSingleton<StorageProvider>('StorageProvider', getProvider())
