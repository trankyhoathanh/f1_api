import { getRepository, Between } from "typeorm";
import { RaceResult } from '../db/entity/race_result';
import { DateUtils } from '../utils/date_utils';

export const QueryRaceResults = async (req: any) => {
    const raceRepository = getRepository(RaceResult);
    try {
        if (req.hasOwnProperty("laps")) {
            req.laps = parseInt(req.laps) || 0;
        }

        if (req.year) {
            const date_range = DateUtils.getStartEndYear(req.year);
            req.date = Between(date_range.from, date_range.to);
            delete req.year;
        }

        return await raceRepository.find({ where: req });
    } catch (error: any) {
        console.log(error);
        return [];
    }
};