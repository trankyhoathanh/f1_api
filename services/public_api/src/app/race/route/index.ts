import { Router } from 'express'
import { grandprixSchema, winnerSchema, carSchema, lapsSchema, yearSchema, raceSchema } from '../validators/schema'
import { RaceValidator } from '../validators/joi_validate'
import { grand_prix, winner, car, laps, year, race } from '../controller'

const router = Router()
const raceValidator = new RaceValidator()

router.get('/race/grand_prix/:id', raceValidator.validateParams(grandprixSchema), grand_prix)
router.get('/race/winner/:id', raceValidator.validateParams(winnerSchema), winner)
router.get('/race/car/:id', raceValidator.validateParams(carSchema), car)
router.get('/race/laps/:id', raceValidator.validateParams(lapsSchema), laps)
router.get('/race/year/:id', raceValidator.validateParams(yearSchema), year)
router.get('/race', raceValidator.validateQuery(raceSchema), race)

export default router
