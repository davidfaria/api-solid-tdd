import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  driver: 'disk' | 's3'
  tmpFolder: string
  uploadsFolder: string
  multer: {
    storage: StorageEngine
  }
  config: {
    // disk: {};
    aws: {
      bucket: string
    }
  }
}

export const uploadConfig = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`
        return callback(null, fileName)
      }
    }),
    limits: {
      // fileSize: 2 * 1024 * 1024, // 2MB
      fileSize: 512 * 1024 // 512MB
    },
    fileFilter: (
      _: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string | boolean) => void
    ) => {
      const allowedMimes = ['image/jpeg', 'image/jpg']
      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true)
      } else {
        callback(new Error('Invalid file type.'), 'Invalid file type.')
      }
    }
  },
  config: {
    // disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET
    }
  }
} as IUploadConfig
