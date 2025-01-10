import PostRepositoryProvider from "./PostRepositoryProvider"
import { deleteFile } from "../../../services/deleteFileService"
import { join } from 'path'
import ServerException from "../../../exceptions/ServerException"
import IPostPG from "../entity/contracts/IPost.PG"
import compression from '../../../services/tumbnailCompressionService'
import NotFoundException from "../../../exceptions/NotFoundException"


export default class PostService {
  private readonly repositoryProvider

  constructor(){
    this.repositoryProvider = new PostRepositoryProvider()
  }
  private async slugGenerator(title: string){
    const newSlug = title.replaceAll(' ', '-')+'-'+Math.random().toString(16).slice(3,9)
    const result = await this.repositoryProvider.findPostWithSlug(newSlug)
    if(result){
      await this.slugGenerator(title)
    }
    return newSlug
  }

  public async deleteImage(imageName?: string, thumbnailName?: string, compressedThumbnail?: string){
    let result
    if(imageName){
      result = await deleteFile(join(process.cwd(), 'public', 'gallery', imageName))
    }
    if(thumbnailName){
      result = await deleteFile(join(process.cwd(), 'public', 'thumbnails', thumbnailName))
    }
    if(compressedThumbnail){
      result = await deleteFile(join(process.cwd(), 'public', 'compressed-thumbnails', compressedThumbnail))
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

    return await this.repositoryProvider.saveNewPost(newParams)
  }

  public async deletePost(postId: string){
    // validate and get post
    const post = await this.repositoryProvider.findPostWithId(postId)
    if(!post){
      throw new NotFoundException('post not Found!')
    }
    //delete thumbnail and gallery in public 
    post.gallery.forEach(async (imageName) => {
      await this.deleteImage(imageName)
    })
    await this.deleteImage(undefined, post.thumbnail, post.compressedThumbnail)
    //delete post in repository
    await this.repositoryProvider.deletePostInRepository(postId)
  }

}