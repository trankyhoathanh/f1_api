import { getRepository, Between } from "typeorm";
import { TypeQuery } from '../constant/query_multiple';
import { RaceResult } from '../db/entity/race_result';
import { DateUtils } from '../utils/date_utils';

export const QueryRaceMultipleResults = async (type: TypeQuery, id: any, req: any) => {
    const raceRepository = getRepository(RaceResult);
    try {
        switch (Number(type)) {
            case TypeQuery.GrandPrix:
                req.grand_prix = id;
                break;
            case TypeQuery.Car:
                req.car = id;
                break;
            case TypeQuery.Laps:
                req.laps = parseInt(id);
                break;
            case TypeQuery.Winner:
                req.winner = id;
                break;
            case TypeQuery.Year:
                req.year = id;
                break;
        }

        if (req.year) {
            const date_range = DateUtils.getStartEndYear(req.year);
            req.date = Between(date_range.from, date_range.to);
            delete req.year;
        }

        if (req.hasOwnProperty("laps")) {
            req.laps = parseInt(req.laps) || 0;
        }

        return await raceRepository.find({ where: req });
    } catch (error: any) {
        console.log(error);
        return [];
    }
};