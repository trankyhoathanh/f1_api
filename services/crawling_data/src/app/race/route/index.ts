import { Router } from 'express'
import { race_result } from '../controller'

const raceRouter = Router()

raceRouter.get('/race-result', race_result)

export default raceRouter
