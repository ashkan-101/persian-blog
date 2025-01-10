import IUserPGRepository from "../user/repositories/contracts/IUser.PG.Repository"
import UserPGRepository from "../user/repositories/User.PG.Repository"


export default class AuthRepositoryProvider {
  private readonly userRepository: IUserPGRepository

  constructor(){
    this.userRepository = new UserPGRepository()
  }

  public async saveUserInRepository(mobile: string){
    return await this.userRepository.create({mobile})
  }
  
  public async getUserByMobile(mobile: string){
    return await this.userRepository.findOne({mobile})
  }
}