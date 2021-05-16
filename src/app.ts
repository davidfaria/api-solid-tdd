import 'reflect-metadata'
import './bootstrap'
import './database'
import './container'
// import connection from '@database/index'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'
import helmet from 'helmet'
import { errors } from 'celebrate'
import swaggerFile from './docs/swagger.json'

import { uploadConfig } from '@config/upload'
import { logger } from '@config/logger'
import { AppError } from '@errors/app-error'

// connection.create()
import { routes } from './routes'
// import rateLimiter from './middlewares/rate-limiter';

const app = express()

// Middlewares
app.use(cors())
// app.use(rateLimiter);
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)
app.use(express.json())

// docs
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

// file path
app.use('/files', express.static(uploadConfig.uploadsFolder))

// Routes
app.use('/api', routes)

// Erros
app.use(errors())

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  logger.error({
    status: 'error',
    message: err.message
  })

  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: 'error',
      message: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})

export { app }
