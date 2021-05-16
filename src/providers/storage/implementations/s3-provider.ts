import fs from 'fs'
import mime from 'mime'
import path from 'path'
import { injectable } from 'tsyringe'
import aws from 'aws-sdk'
import { StorageProvider } from './storage-provider'

import { uploadConfig } from '@config/upload'

@injectable()
export class S3StorageProvider implements StorageProvider {
  private client: aws.S3

  constructor() {
    this.client = new aws.S3()
  }

  async saveFile(file: string, path_folder?: string): Promise<string> {
    const DESTINATION = `uploads/${path_folder}`
    // const DESTINATION = 'uploads/body/2021-04';
    // console.log('DESTINATION', DESTINATION);
    // console.log('BUCKET', `${uploadConfig.config.aws.bucket}/${DESTINATION}`);

    const originalPath = path.resolve(uploadConfig.tmpFolder, file)

    const ContentType = mime.getType(originalPath)

    if (!ContentType) {
      throw new Error('File not found')
    }

    const fileContent = await fs.promises.readFile(originalPath)
    await this.client
      .putObject({
        Bucket: `${uploadConfig.config.aws.bucket}/${DESTINATION}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType
      })
      .promise()

    await fs.promises.unlink(originalPath)

    return file
  }

  async deleteFile(file: string, path_folder?: string): Promise<void> {
    const DESTINATION = `uploads/${path_folder}`
    await this.client
      .deleteObject({
        Bucket: `${uploadConfig.config.aws.bucket}/${DESTINATION}`,
        Key: file
      })
      .promise()
  }
}
