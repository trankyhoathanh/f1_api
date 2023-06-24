import { getRepository, Between, SimpleConsoleLogger } from "typeorm";
import { RaceResult } from '../db/entity/race_result';

export const QueryRankingResults = async (req: any) => {
    const raceRepository = getRepository(RaceResult);
    try {
        let where_conditions = ``;
        let condition = ``;
        if (req.hasOwnProperty('year')) {
            req.year = parseInt(req.year) || 0;

            where_conditions = `where date between '${req.year}-1-1' and '${req.year}-12-31'`
        }

        if (req.hasOwnProperty('type')) {
            switch (req.type)
            {
                case 'winner': 
                    condition = req.type;
                    break;
                case 'car':
                    condition = req.type;
                    break;
            }
            if (req.hasOwnProperty('name')) {
                where_conditions += ` AND winner = '${req.name}'`
            }
        }

        let query = `
        SELECT  ${condition},
                count(${condition}) as times
        FROM    race_result 
        ${where_conditions} 
        GROUP BY    ${condition} 
        ORDER BY    count(${condition}) DESC`;

        return await raceRepository.query(query);
    } catch (error: any) {
        console.log(error);
        return [];
    }
};