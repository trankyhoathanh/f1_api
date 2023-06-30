import axios from 'axios'
import cheerio from 'cheerio'

import { dynamicLinks } from '../model/endpoints'
import { isRaceResult } from '../model/types'

export const getRaceResults = async (year: number): Promise<isRaceResult[]> => {
  try {
    const raceResults: isRaceResult[] = []

    const link = `${dynamicLinks.rootLink}/${year}/${dynamicLinks.results}`
    console.log(link)

    const response = await axios(link)
    const $ = cheerio.load(response.data)

    $('tr').each(function () {
      const grand_prix: string = $(this).find('td:nth-child(2) > a:nth-child(1)').text().trim() || ''
      const raceDate: string = $(this).find('td:nth-child(3)').text().trim() || ''
      let winner: string = $(this).find('td:nth-child(4) > span:nth-child(1)').text().trim() || ''
      winner += ' ' + $(this).find('td:nth-child(4) > span:nth-child(2)').text().trim() || ''
      const car: string = $(this).find('td:nth-child(5)').text().trim() || ''
      const laps: number = parseInt($(this).find('td:nth-child(6)').text().trim()) || 0
      const time: string = $(this).find('td:nth-child(7)').text().trim() || ''

      if (
        (grand_prix.length !== 0 && raceDate.length !== 0 && winner.length !== 0,
        car.length !== 0,
        !Number.isNaN(laps),
        time.length !== 0)
      ) {
        const raceResult: isRaceResult = {
          grand_prix,
          date: new Date(raceDate),
          winner,
          car,
          laps,
          time
        }
        raceResults.push(raceResult)
      }
    })
    return raceResults
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error)
  }
}
