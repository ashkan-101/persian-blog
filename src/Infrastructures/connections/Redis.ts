import Redis from 'ioredis'
import { config } from 'dotenv'
config()

const redis = new Redis({
  host: process.env.REDIS_HOST as string,
  port: process.env.REDIS_PORT as unknown as number
})

const redisConnect = async () => {
  try {
    redis.on('connect', () => {
      console.log('success connect to redis ...');
    })
    redis.on('error', (error) => {
      console.log('failed to connected redis!: ' + error);
    })
  } catch (error) {
    console.log(error);
  }
}

export {
  redis,
  redisConnect
}