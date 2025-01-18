import PostFactory from "./PostFactory"
import { deleteFile } from "../../../services/deleteFileService"
import { join } from 'path'
import ServerException from "../../../exceptions/ServerException"
import IPostPG from "../entity/contracts/IPost.PG"
import compression from '../../../services/tumbnailCompressionService'
import NotFoundException from "../../../exceptions/NotFoundException"
import { validate as validateUUID} from 'uuid'
import ValidationException from "../../../exceptions/ValidationException"
import IPagination from "../../contracts/IPaginaton"
import PostSorting from "../entity/contracts/PostSorting"


export default class PostService {
  private readonly postFactory: PostFactory

  constructor(){
    this.postFactory = new PostFactory()
  }
  
  private async slugGeneratorService(title: string){
    const newSlug = title.replaceAll(' ', '-')+'-'+Math.random().toString(16).slice(3,9)
    const result = await this.postFactory.findPostWithSlug(newSlug)
    if(result){
      await this.slugGeneratorService(title)
    }
    return newSlug
  }
  private async validateAndGetSubcategory(subcategoryId: string){
    if(!validateUUID(subcategoryId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const subcategory = await this.postFactory.getSubcategoryById(subcategoryId)

    if(!subcategory){
      throw new NotFoundException('not found any subcategory with this id')
    }
    
    return subcategory
  }
  private async validateAndGetPost(postId: string){
    if(!validateUUID(postId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const post = await this.postFactory.findPostWithId(postId)

    if(!post){
      throw new NotFoundException('not found any post with this ID')
    }

    return post
  }

  public async deleteImageService(imageName?: string, thumbnailName?: string, compressedThumbnail?: string){
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

  public async newPostService(params: Partial<IPostPG>, subcategoryId: string){
    const subcategory = await this.validateAndGetSubcategory(subcategoryId)
    const slug = await this.slugGeneratorService(params.title!)
    const compressedThumbnail = await compression(join(process.cwd(), 'public', 'thumbnails', params.thumbnail!))
    
    const newParams: Partial<IPostPG> = {
      ...params,
      slug,
      subcategory,
      compressedThumbnail: compressedThumbnail? compressedThumbnail: undefined
    }

    return await this.postFactory.saveNewPost(newParams)
  }

  public async deletePostService(postId: string){
    const post = await this.validateAndGetPost(postId)
    //delete thumbnail and gallery in public directory
    post.gallery.forEach(async (imageName) => {
      await this.deleteImageService(imageName)
    })
    await this.deleteImageService(undefined, post.thumbnail, post.compressedThumbnail)
    //delete post in repository
    await this.postFactory.deletePostInRepository(postId)
  }

  public async getPostsService(adminId: string, page: number, sorting?: PostSorting){
    const pagination: IPagination = {
      take: 5,
      skip: (page - 1) * 5
    }

    return await this.postFactory.getPostsByAuthorId(adminId, ['subcategory'], pagination, sorting)
  }

}