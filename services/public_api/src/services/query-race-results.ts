import { Between } from "typeorm";
import { RaceResult } from '../db/entity/race_result';
import { DateUtils } from '../utils/date_utils';
import { AppDataSource } from "../db/data-source";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QueryRaceResults = async (req: any) => {
    try {
        // eslint-disable-next-line no-prototype-builtins
        if (req.hasOwnProperty("laps")) {
            req.laps = parseInt(req.laps) || 0;
        }

        if (req.year) {
            const date_range = DateUtils.getStartEndYear(req.year);
            req.date = Between(date_range.from, date_range.to);
            delete req.year;
        }

        return await AppDataSource.getRepository(RaceResult).find({ where: req });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return [];
    }
};