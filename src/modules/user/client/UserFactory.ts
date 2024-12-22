import IUserPG from "../entity/contracts/IUser.PG";
import IUserPGRepository from "../repositories/contracts/IUser.PG.Repository";
import UserPGRepository from "../repositories/User.PG.Repository";



export default class UserFactory {
  private readonly userRepository: IUserPGRepository

  constructor(){
    this.userRepository = new UserPGRepository()
  }

  public async saveNewProfile(params: Partial<IUserPG>, userId: string){
    return await this.userRepository.updateOne({id: userId}, params)
  }
}