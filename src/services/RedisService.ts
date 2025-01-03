import { redis } from "../Infrastructures/connections/Redis";

const set = async (key: string, value: {value?: any, counter: number}) => {
  try {
    return await redis.set(key, JSON.stringify(value), 'EX', 60)
  } catch (error) {
    console.log(error);
    return 'NO'
  }
}

const get = async (key: string) => {
  try {
    return await redis.get(key)
  } catch (error) {
    console.log(error);
  }
}
