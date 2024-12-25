import PostFactory from "./PostFactory"
import { deleteFile } from "../../../services/deleteFileService"
import { join } from 'path'
import ServerException from "../../../exceptions/ServerException"


export default class PostService {
  private readonly factory

  constructor(){
    this.factory = new PostFactory()
  }

  public async deleteImage(imageName: string){
    const result = await deleteFile(join(process.cwd(), 'public', 'gallery', imageName))
    if(!result){
      throw new ServerException('failed to delete file')
    }
  }
}