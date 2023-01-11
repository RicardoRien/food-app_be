import type { Request, Response, NextFunction } from "express"
import { HttpException } from "../common/http-exception"
import { Prisma } from '@prisma/client'

export function logErrors(
  error: HttpException,
  _request: Request,
  _response: Response,
  next: NextFunction
) {
  console.error(error)
  next(error)
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  res.status(500).json({
    data: {
      message: err.message,
      stack: err.stack,
    }
  })
}

export function boomErrorHandler(err: any, _req: Request, res: Response, next: NextFunction) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

export function ormErrorHandler(
  err: Prisma.PrismaClientKnownRequestError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2003') {
      res.status(409).json({
        data: { 
          statusCode: 409,
          error: 'ID not found',
          code: err.code,
          meta: err.meta,
          message: 'Check error code in https://www.prisma.io/docs/reference/api-reference/error-reference',
        }
      })
    } else {
      res.status(409).json({
        data: { 
          statusCode: 409,
          code: err.code,
          error: err.meta?.cause,
          message: 'Check error code in https://www.prisma.io/docs/reference/api-reference/error-reference',
        }
      })
    }
  }
  next(err)
}
