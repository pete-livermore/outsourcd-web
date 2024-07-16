import winston from 'winston'

import { env } from '@/config/env'

const { combine, timestamp, printf, colorize, json } = winston.format

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const logger = winston.createLogger({
  level: env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    logFormat,
  ),
  transports: [new winston.transports.Console()],
})

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: json(),
    }),
  )
  logger.add(
    new winston.transports.File({ filename: 'combined.log', format: json() }),
  )
}

export { logger }
