import { Request, Response } from 'express'
import { TypeQuery } from '../../../constant/query_multiple'
import { QueryRaceMultipleResults } from '../service/query-race-multiple'
import { QueryRaceResults } from '../service/query-race-results'

export const grand_prix = async (req: Request, res: Response) => {
  const { params, query } = req
  const response = await QueryRaceMultipleResults(TypeQuery.GrandPrix, params.id, query)
  res.json({ list: response })
}

export const winner = async (req: Request, res: Response) => {
  const { params, query } = req
  const response = await QueryRaceMultipleResults(TypeQuery.Winner, params.id, query)
  res.json({ list: response })
}

export const car = async (req: Request, res: Response) => {
  const { params, query } = req
  const response = await QueryRaceMultipleResults(TypeQuery.Car, params.id, query)
  res.json({ list: response })
}

export const laps = async (req: Request, res: Response) => {
  const { params, query } = req
  const response = await QueryRaceMultipleResults(TypeQuery.Laps, params.id, query)
  res.json({ list: response })
}

export const year = async (req: Request, res: Response) => {
  const { params, query } = req
  const response = await QueryRaceMultipleResults(TypeQuery.Year, params.id, query)
  res.json({ list: response })
}

export const race = async (req: Request, res: Response) => {
  const { query } = req
  const response = await QueryRaceResults(query)
  res.json({ list: response })
}

export const race_default = async (req: Request, res: Response) => {
  const { query } = req
  const response = await QueryRaceResults(query)
  res.json({ list: response })
}
