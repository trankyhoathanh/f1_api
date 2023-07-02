import { Request, Response } from 'express'
import { autoGetRaceResults } from '../service'

export const race_result = async (req: Request, res: Response) => {
  await autoGetRaceResults()
  res.json({ text: 'Get data from race result succeed !' })
}
