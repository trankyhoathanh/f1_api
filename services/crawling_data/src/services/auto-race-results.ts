import { AppDataSource } from '../db/data-source'
import { getRaceResults } from './race-results'
import { RaceResult } from '../db/entity/race_result'

export const autoGetRaceResults = async () => {
  try {
    for (let i = 2000; i < 2024; i++) {
      const result = await getRaceResults(i)
      const result_upset: RaceResult[] = []

      console.log(result)

      for (const item of result) {
        console.log(item)
        const new_race_result = new RaceResult({
          grand_prix: item.grand_prix,
          date: item.date,
          winner: item.winner,
          car: item.car,
          laps: item.laps,
          time: item.time
        })
        result_upset.push(new_race_result)
      }

      await AppDataSource.getRepository(RaceResult).upsert(result_upset, [
        'grand_prix',
        'date',
        'winner',
        'car',
        'laps'
      ])
      console.log('Saved all ---')
    }

    return 'Succeed'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error)
  }
}
