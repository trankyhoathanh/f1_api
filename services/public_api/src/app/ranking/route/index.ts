import { Router } from 'express'
import { rankingMultipleSchema, rankingSchema } from '../validators/schema'
import { RaceValidator } from '../validators/joi_validate'
import { winner, car, ranking } from '../controller'

const router = Router()
const raceValidator = new RaceValidator()

router.get('/ranking/car/:id', raceValidator.validateQuery(rankingMultipleSchema), car)
router.get('/ranking/winner/:id', raceValidator.validateQuery(rankingMultipleSchema), winner)
router.get('/ranking', raceValidator.validateQuery(rankingSchema), ranking)

export default router
