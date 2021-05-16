import { container } from 'tsyringe'
import { uploadConfig } from '@config/upload'

import {
  DiskStorageProvider,
  StorageProvider,
  S3StorageProvider
} from '@providers/storage'

const getProvider = () => {
  if (uploadConfig.driver === 'disk') {
    return DiskStorageProvider
  }

  return S3StorageProvider
}

container.registerSingleton<StorageProvider>('StorageProvider', getProvider())
