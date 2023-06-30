import { NextFunction, Request, Response } from 'express'

import { StartRedis } from './redis'

export interface RateLimitRule {
  endpoint: string
  rate_limit: {
    time: number
    limit: number
  }
}

export class rateLimitSchema {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  limit(rule: RateLimitRule) {
    const { endpoint, rate_limit } = rule
    return async (req: Request, res: Response, next: NextFunction) => {
      const ip = req.ip
      const redis_id = `${endpoint}_${ip}`

      const redis_client = await StartRedis()
      const request = await redis_client.incr(redis_id)

      if (request === 1) {
        await redis_client.expire(redis_id, rate_limit.time)
      }

      if (request > rate_limit.limit) {
        return res.status(429).send({
          message: 'too much requests'
        })
      }

      next()
    }
  }
}
