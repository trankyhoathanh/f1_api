import { createClient, RedisClientType } from 'redis'

const redis_config = {
  host: 'cache',
  port: 6379
}

export const StartRedis = async () => {
  const redis: RedisClientType = createClient({
    socket: {
      host: redis_config.host,
      port: redis_config.port
    }
  })

  await redis.connect().then(() => {
    console.log('Connected redis')
  })

  return redis
}

export default StartRedis
