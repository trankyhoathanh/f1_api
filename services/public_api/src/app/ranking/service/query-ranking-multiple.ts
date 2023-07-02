import { TypeQueryRanking } from '../../../constant/query_multiple'
import { RaceResult } from '../../../db/entity/race_result'
import { AppDataSource } from '../../../db/data-source'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QueryRankingMultipleResults = async (type: TypeQueryRanking, id: any, req: any) => {
  try {
    let type_column = ``
    const where_conditions_id = id
    switch (Number(type)) {
      case TypeQueryRanking.Car:
        type_column = `car`
        break
      case TypeQueryRanking.Winner:
        type_column = `winner`
        break
    }

    let where_conditions_date = ``
    // eslint-disable-next-line no-prototype-builtins
    if (req.hasOwnProperty('from_year')) {
      where_conditions_date += `WHERE BOARD.date_year >= ${req.from_year}`
    }

    // eslint-disable-next-line no-prototype-builtins
    if (req.hasOwnProperty('to_year')) {
      where_conditions_date += ` AND BOARD.date_year <= ${req.to_year}`
    }

    const query = `
        SELECT  RANKED.*
        FROM
        (
            SELECT	BOARD.date_year,
                    BOARD.win,
                    BOARD.times,
                    DENSE_RANK() OVER(PARTITION BY BOARD.date_year ORDER BY BOARD.times DESC) rank
            FROM (
                SELECT  	EXTRACT(YEAR from date) as date_year,
                            ${type_column} as win,
                            count(${type_column}) as times
                FROM    	race_result 
                GROUP BY    date_year, win
                ORDER BY    date_year
            ) AS BOARD
            ${where_conditions_date}
        ) AS RANKED
        WHERE UPPER(RANKED.win) = UPPER('${where_conditions_id}')
        `

    return await AppDataSource.getRepository(RaceResult).query(query)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
    return []
  }
}
