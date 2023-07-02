import { Request, Response } from 'express'
import { TypeQueryRanking } from '../../../constant/query_multiple'
import { QueryRankingMultipleResults } from '../service/query-ranking-multiple'
import { QueryRankingResults } from '../service/query-ranking-results'

export const car = async (req: Request, res: Response) => {
  const { params, query } = req
  const response = await QueryRankingMultipleResults(TypeQueryRanking.Car, params.id, query)
  res.json({ list: response })
}

export const winner = async (req: Request, res: Response) => {
  const { params, query } = req
  const response = await QueryRankingMultipleResults(TypeQueryRanking.Winner, params.id, query)
  res.json({ list: response })
}

export const ranking = async (req: Request, res: Response) => {
  const { query } = req
  const response = await QueryRankingResults(query)
  res.json({ list: response })
}
