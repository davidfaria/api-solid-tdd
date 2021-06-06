import fs from 'fs'
import path from 'path'
import { injectable } from 'tsyringe'
import { StorageProvider } from '@shared/container/providers/storage/storage-provider'
import { uploadConfig } from '@config/upload'

@injectable()
export class DiskStorageProvider implements StorageProvider {
  async saveFile(file: string, path_folder?: string): Promise<string> {
    const DESTINATION = path_folder
      ? `${uploadConfig.uploadsFolder}/${path_folder}`
      : uploadConfig.uploadsFolder

    if (!fs.existsSync(DESTINATION)) {
      fs.mkdirSync(DESTINATION)
    }

    // await fs.promises.rename(
    //   path.resolve(uploadConfig.tmpFolder, file),
    //   path.resolve(DESTINATION, file),
    // );

    await fs.promises.copyFile(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(DESTINATION, file)
    )

    try {
      await fs.promises.stat(path.resolve(uploadConfig.tmpFolder, file))
    } catch (error) {
      console.log(error)
    }

    await fs.promises.unlink(path.resolve(uploadConfig.tmpFolder, file))

    return file
  }

  async deleteFile(file: string, path_folder?: string): Promise<void> {
    const DESTINATION = path_folder
      ? `${uploadConfig.uploadsFolder}/${path_folder}`
      : uploadConfig.uploadsFolder
    const filePath = path.resolve(DESTINATION, file)

    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
