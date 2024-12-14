import IRegisterCodePGRepository from "../registerCode/repositories/contracts/IRegisterCode.PG.Repository"
import RegisterCodePGRepository from "../registerCode/repositories/RegisterCode.PG.Repository"
import IUserPGRepository from "../user/repositories/contracts/IUser.PG.Repository"
import UserPGRepository from "../user/repositories/User.PG.Repository"


export default class AuthFactory {
  private readonly userRepository: IUserPGRepository
  private readonly codeRepository: IRegisterCodePGRepository

  constructor(){
    this.userRepository = new UserPGRepository()
    this.codeRepository = new RegisterCodePGRepository()
  }

  public async saveCodeInRepository(mobile: string, code: string){
    return await this.codeRepository.create({mobile, code})
  }
  public async saveUserInRepository(mobile: string){
    return await this.userRepository.create({mobile})
  }
  public async getUserByMobile(mobile: string){
    return await this.userRepository.findOne({mobile})
  }
  public async getCodeInRepository(code: string, mobile: string){
    return await this.codeRepository.findOne({code, mobile})
  }
  public async deleteCodeInRepository(id: string){
    return await this.codeRepository.deleteOne({id})
  }
}