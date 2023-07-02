import { Request, Response, NextFunction } from 'express'

export class RaceValidator {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateQuery(schema: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validateAsync(req.query)
        next()
      } catch (error) {
        res.status(400).json(error)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateParams(schema: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validateAsync(req.params)
        next()
      } catch (error) {
        res.status(400).json(error)
      }
    }
  }
}
