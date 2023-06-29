import { RaceResult } from '../db/entity/race_result';
import { AppDataSource } from "../db/data-source";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QueryRankingResults = async (req: any) => {
    try {
        let where_conditions = ``;
        let condition = ``;
        // eslint-disable-next-line no-prototype-builtins
        if (req.hasOwnProperty('year')) {
            req.year = parseInt(req.year) || 0;

            where_conditions = `where date between '${req.year}-1-1' and '${req.year}-12-31'`
        }

        // eslint-disable-next-line no-prototype-builtins
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
            // eslint-disable-next-line no-prototype-builtins
            if (req.hasOwnProperty('name')) {
                where_conditions += ` AND UPPER(winner) = UPPER('${req.name}')`
            }
        }

        const query = `
        SELECT  ${condition},
                count(${condition}) as times
        FROM    race_result 
        ${where_conditions} 
        GROUP BY    ${condition} 
        ORDER BY    count(${condition}) DESC`;

        return await AppDataSource.getRepository(RaceResult).query(query);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return [];
    }
};