import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const validatorHandler = (schema: any) => (req: Request, res: Response, next: NextFunction) => {

  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    })

    return next()

  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('validatorHandler: ', err)
      return res.status(400).json(err.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
      })))
    } else {
      return res.status(400)
    }
  }
}

