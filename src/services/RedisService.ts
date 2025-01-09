import { redis } from "../Infrastructures/connections/Redis";

const set = async (key: string, value: any, ttlInSeconds?: number) => {
  try {
    if(ttlInSeconds){
      return await redis.set(key, JSON.stringify(value), 'EX', ttlInSeconds)
    }else{
      return await redis.set(key, JSON.stringify(value))
    }
    
  } catch (error) {
    console.log(error);
    return 'NO'
  }
}

const get = async (key: string) => {
  try {
    const result = await redis.get(key)
    if(!result){
      return null
    }
    return JSON.parse(result)
  } catch (error) {
    console.log(error);
  }
}

const del = async (key: string) => {
  try {
    return await redis.del(key)
  } catch (error) {
    console.log(error);
  }
}

export {
  set,
  get,
  del
}