import ValidationException from "../../exceptions/ValidationException";
import AuthFactory from "./AuthFactory";
import { randomInt } from "node:crypto";
import { get, set, del } from '../../services/RedisService'
import TooManyRequestsException from "../../exceptions/TooManyRequestsException";
import ServerException from "../../exceptions/ServerException";
import { hashData, compareHash} from '../../services/HashService'

export default class AuthService {
  private readonly factory: AuthFactory

  constructor(){
    this.factory = new AuthFactory()
  }
  private async generateNewOtpCode(){
    const otp = randomInt(14267, 92167).toString()
    return otp
  }

  public async createOtp(mobile: string){
    const validateOtp = await get(mobile)
    if(validateOtp){
      throw new TooManyRequestsException('too many requests')
    }

    const newOtp = await this.generateNewOtpCode()
    const hashOtp = await hashData(newOtp)
    const saveOtpInRedis = await set(mobile, hashOtp, 120)

    if(saveOtpInRedis === 'NO'){
      throw new ServerException('request failed! try again later')
    }

    return newOtp
  }

  public async validateOtp(mobile: string, otp: string){
    const getOtp = await get(mobile)
    if(!getOtp){
      throw new ValidationException('wrong Otp')
    }
    const validateOtp = await compareHash(otp, getOtp)
    if(!validateOtp){
      throw new ValidationException('wrong Otp!')
    }
  }

  public async getUser(mobile: string){
    const user = await this.factory.getUserByMobile(mobile)
    if(!user){
      return await this.factory.saveUserInRepository(mobile)
    }
    return user
  }

}