import { getRepository } from "typeorm";
import { RaceResult } from '../db/entity/race_result';

export const QueryRaceResults = async (req: any) => {
    const raceRepository = getRepository(RaceResult);
    try {
        if (req.hasOwnProperty("laps")) {
            req.laps = parseInt(req.laps) || 0;
        }

        return await raceRepository.find({ where: req });
    } catch (error: any) {
        console.log(error);
        return [];
    }
};