import { Router } from 'express'
import { home } from '../controller'

const homeRouter = Router()

homeRouter.get('/', home)

export default homeRouter
