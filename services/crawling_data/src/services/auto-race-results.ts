import { getManager } from "typeorm";
import { getRaceResults } from './race-results';
import { RaceResult } from '../db/entity/race_result';

export const autoGetRaceResults = async () => {
    try {
        const entityManager = getManager();
        for (let i = 2000; i < 2024; i++)
        {
            let result = await getRaceResults(i);
    
            console.log(result);
    
            for (let item of result) {
                console.log(item);
                const new_race_result = new RaceResult({
                grand_prix: item.grand_prix,
                date: item.date,
                winner: item.winner,
                car: item.car,
                laps: item.laps,
                time: item.time,
                })
                await entityManager.save(RaceResult, new_race_result);
                console.log('Saved ---');
            }
        }

        return 'Succeed';
    } catch (error: any) {
        throw new Error(error);
    }
};