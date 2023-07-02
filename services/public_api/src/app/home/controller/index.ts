import { Request, Response } from 'express'

export const home = async (req: Request, res: Response) => {
  res.json({ text: 'Hearth beat' })
}
