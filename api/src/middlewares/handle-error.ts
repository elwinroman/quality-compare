import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { MyCustomError } from '@/models/schemas'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handleError(err: unknown, req: Request, res: Response, _next: NextFunction) {
  // Manejar errores de conexión a la base de datos
  if (err instanceof MyCustomError) {
    console.error(err.stack)
    const { status, statusCode, message, originalError } = err
    return res.status(statusCode).json({ status, statusCode, message, originalError })
  }

  // Manejar errores de validación (zod)
  if (err instanceof z.ZodError) {
    console.error(err.stack)
    const formattedError = err.errors.map(error => ({
      field: error.path.join('.'),
      message: error.message,
    }))
    return res.status(400).json({ status: 'error', statusCode: 400, message: 'Error en la validación', originalError: formattedError })
  }

  // Otro tipo de error
  console.error(err)
  return res.status(500).json({ status: 'error', statusCode: 500, message: 'Internal server error' })
}
