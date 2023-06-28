import { Between } from "typeorm";
import { TypeQuery } from '../constant/query_multiple';
import { RaceResult } from '../db/entity/race_result';
import { DateUtils } from '../utils/date_utils';
import { AppDataSource } from "../db/data-source";

export const QueryRaceMultipleResults = async (type: TypeQuery, id: any, req: any) => {
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

        return await AppDataSource.getRepository(RaceResult).find({ where: req });
    } catch (error: any) {
        console.log(error);
        return [];
    }
};