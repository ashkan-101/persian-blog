import IPagination from "../../contracts/IPaginaton"
import PostSorting from "../entity/contracts/PostSorting"
import PostFactory from "./PostFactory"
import { collection } from "../services/TransformerPostList"
import { transform } from '../services/TransformerPostDetails'
import NotFoundException from "../../../exceptions/NotFoundException"
import ValidationException from "../../../exceptions/ValidationException"
import ServerException from "../../../exceptions/ServerException"
import { validate as validateUUID } from "uuid"

export default class PostService {
  private readonly postFactory: PostFactory

  constructor(){
    this.postFactory = new PostFactory()
  }
  //-----------------------------------private methods
  private async validateAndGetPost(postId: string){
    if(!validateUUID){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const post = await this.postFactory.getPostById(postId)

    if(!post){
      throw new NotFoundException('not found any post with this ID')
    }

    return post
  }
  //-----------------------------------public methods
  public async getPostsService(page: number, sorting?: PostSorting){
    const pagination: IPagination = {
      take: 20,
      skip: (page - 1) * 20
    }

    const getSortingPosts = await this.postFactory.getSortingPosts(['author', 'subcategory.category'], pagination, sorting)
    const transformPosts = await collection(getSortingPosts)
    return transformPosts
  }

  public async postDetailsService(slug: string){
    const resultQuery = await this.postFactory.getPostBySlug(slug)
    if(!resultQuery){
      throw new NotFoundException('post Not Found!')
    }
    const postTransform = await transform(resultQuery)
    return postTransform
  }

  public async postViewsService(postId: string){
    const post = await this.validateAndGetPost(postId)
    const updateResult = await this.postFactory.updatePostViews(postId, post.views)
    if(!updateResult){
      throw new ServerException('updating failed!')
    }
  } 

  public async postLikeService(postId: string, userId: string){
    const post = await this.validateAndGetPost(postId)
    const likes = post.likes
    const userIndex = likes.indexOf(userId)

    if(userIndex > -1){
      likes.splice(userIndex, 1)
      const result = await this.postFactory.updatePostLikes(postId, likes)
      if(result){
        throw new ServerException('Unable to update post likes')
      }
      return 'dislike'
    }
    if(userIndex < 0){
      likes.push(userId)
      const result = await this.postFactory.updatePostLikes(postId, likes)
      if(!result){
        throw new ServerException('Unable to update post likes')
      }
      return 'like'
    }
  }

  public async getSubcategoryPosts(subId: string, page: number, sorting?: PostSorting){
    if(!validateUUID(subId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const pagination: IPagination = {
      take: 20,
      skip: (page - 1) * 20
    }

    return await this.postFactory.getPostsWithSubId(subId, [], pagination, sorting)
  }
}