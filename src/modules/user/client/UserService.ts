import IUserPG from "../entity/contracts/IUser.PG"
import UserRepositoryProvider from "./UserRepositoryProvider"
import { deleteFile } from "../../../services/deleteFileService"
import { join } from 'path'
import ServerException from "../../../exceptions/ServerException"


export default class UserService{
  private readonly repositoryProvider: UserRepositoryProvider

  constructor(){
    this.repositoryProvider = new UserRepositoryProvider()
  }
  
  public async editProfile(params: Partial<IUserPG>, lastAvatar: string, userId: string){
    if(params.avatar && lastAvatar !== null){
      await deleteFile(join(process.cwd(), 'public', 'avatars', lastAvatar))
    }
    const updateResult = await this.repositoryProvider.saveNewProfile(params, userId)
    if(!updateResult){
      throw new ServerException('failed to updated profile')
    }
  }
}