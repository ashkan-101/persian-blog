import TooManyRequestsException from "../../exceptions/TooManyRequestsException";
import ValidationException from "../../exceptions/ValidationException";
import ServerException from "../../exceptions/ServerException";
import { hashData, compareHash} from '../../services/HashService'
import { get, set, del } from '../../services/RedisService'
import AuthFactory from "./AuthFactory";
import { randomInt } from "node:crypto";

export default class AuthService {
  private readonly authFactory: AuthFactory

  constructor(){
    this.authFactory = new AuthFactory()
  }

  private async generateNewOtpCode(){
    const otp = randomInt(14267, 92167).toString()
    return otp
  }

  public async createOtpService(mobile: string){
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

  public async validateOtpService(mobile: string, otp: string){
    const getOtp = await get(mobile)
    if(!getOtp){
      throw new ValidationException('wrong Otp')
    }
    const validateOtp = await compareHash(otp, getOtp)
    if(!validateOtp){
      throw new ValidationException('wrong Otp!')
    }
  }

  public async getUserService(mobile: string){
    const user = await this.authFactory.getUserByMobile(mobile)
    if(!user){
      return await this.authFactory.saveUserInRepository(mobile)
    }
    return user
  }
}