import { Request, Response, NextFunction } from 'express';

export class RaceValidator {
  constructor() { }

  validateQuery(schema: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const val = await schema.validateAsync(req.query);
        next();
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}