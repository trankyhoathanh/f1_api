import { Router } from 'express'
import { RateLimitRule, rateLimitSchema } from '../../../system/rate_limit'
import { home } from '../controller'

const rate_limit = new rateLimitSchema()

const HEART_RATE_LIMIT_RULE: RateLimitRule = {
  endpoint: '/',
  rate_limit: {
    time: 1,
    limit: 1
  }
}

const homeRouter = Router()

homeRouter.get('/', rate_limit.limit(HEART_RATE_LIMIT_RULE), home)

export default homeRouter
