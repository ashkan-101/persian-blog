import PostFactory from "./PostFactory"
import { deleteFile } from "../../../services/deleteFileService"
import { join } from 'path'
import ServerException from "../../../exceptions/ServerException"
import IPostPG from "../entity/contracts/IPost.PG"
import compression from '../../../services/tumbnailCompressionService'


export default class PostService {
  private readonly factory

  constructor(){
    this.factory = new PostFactory()
  }
  private async slugGenerator(title: string){
    const newSlug = title.replaceAll(' ', '-')+'-'+Math.random().toString(16).slice(3,9)
    const result = await this.factory.findPostWithSlug(newSlug)
    if(result){
      await this.slugGenerator(title)
    }
    return newSlug
  }

  public async deleteImage(imageName?: string, thumbnailName?: string){
    let result
    if(imageName){
      result = await deleteFile(join(process.cwd(), 'public', 'gallery', imageName))
    }
    if(thumbnailName){
      result = await deleteFile(join(process.cwd(), 'public', 'thumbnails', thumbnailName))
    }
    if(result === false){
      throw new ServerException('failed to delete file')
    }
  }

  public async newPost(params: Partial<IPostPG>){
    const slug = await this.slugGenerator(params.title!)
    const compressedThumbnail = await compression(join(process.cwd(), 'public', 'thumbnails', params.thumbnail!))
    
    const newParams: Partial<IPostPG> = {
      ...params,
      slug,
      compressedThumbnail: compressedThumbnail? compressedThumbnail: undefined
    }

    return await this.factory.saveNewPost(newParams)
  }

}