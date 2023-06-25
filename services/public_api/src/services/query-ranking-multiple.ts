import { getRepository, Between } from "typeorm";
import { TypeQueryRanking } from '../constant/query_multiple';
import { RaceResult } from '../db/entity/race_result';

export const QueryRankingMultipleResults = async (type: TypeQueryRanking, id: any, req: any) => {
    const raceRepository = getRepository(RaceResult);
    try {
        let type_column = ``;
        let where_conditions = ``;
        switch (Number(type)) {
            case TypeQueryRanking.Car:
                req.grand_prix = id;
                type_column = `car`
                break;
            case TypeQueryRanking.Winner:
                req.winner = id;
                type_column = `winner`
                break;
        }

        if (id) {
            where_conditions = `where ${type_column} = '${id}'`
        }
        
        if (req.hasOwnProperty('from_year')) {
            where_conditions += ` and date >= '${req.from_year}-01-01'`;
        }
        
        if (req.hasOwnProperty('to_year')) {
            where_conditions += ` and date <= '${req.to_year}-12-31'`;
        }

        let query = `
        SELECT  EXTRACT(YEAR from date) as date_year,
                ${type_column},
                count(${type_column}) as times
        FROM    race_result
        ${where_conditions} 
        GROUP BY    date_year, ${type_column}
        ORDER BY    date_year`;

        return await raceRepository.query(query);
    } catch (error: any) {
        console.log(error);
        return [];
    }
};