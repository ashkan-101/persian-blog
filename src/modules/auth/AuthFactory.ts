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
}