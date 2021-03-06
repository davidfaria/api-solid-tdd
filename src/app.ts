import 'reflect-metadata'
import './bootstrap'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'
import helmet from 'helmet'
import { errors } from 'celebrate'
import swaggerFile from './docs/swagger.json'
import { uploadConfig } from '@config/upload'
import { AppError } from '@shared/errors/app-error'

import connection from '@shared/infra/typeorm'
connection.create()
import '@shared/container'

import { routes } from '@shared/infra/http/routes'
// import { rateLimiter } from '@shared/infra/http/middlewares'

const app = express()

// Middlewares
app.use(cors())
// app.use(rateLimiter)
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
