import ValidationException from "../../exceptions/ValidationException";
import AuthFactory from "./AuthFactory";

export default class AuthService {
  private readonly factory: AuthFactory

  constructor(){
    this.factory = new AuthFactory()
  }

  private async validateCode(code: string, mobile: string){
    const getCode = await this.factory.getCodeInRepository(code, mobile)
    if(!getCode){
      throw new ValidationException('this code is not valid')
    }
    if(getCode.expireAt < Date.now()){
      await this.factory.deleteCodeInRepository(getCode?.id)
      throw new ValidationException('this code is not valid')
    }
    await this.factory.deleteCodeInRepository(getCode?.id)
  }
  private async registerUser(mobile: string){
    return await this.factory.saveUserInRepository(mobile)
  }

  public async createNewCode(mobile: string){
    const code = Math.random().toString().slice(3, 8)
    return await this.factory.saveCodeInRepository(mobile, code)
  }
  public async signin(mobile: string, code: string){
    await this.validateCode(code, mobile)
    const user = await this.factory.getUserByMobile(mobile)
    if(!user){
      return await this.registerUser(mobile)
    }else{
      return user
    }
  }
}