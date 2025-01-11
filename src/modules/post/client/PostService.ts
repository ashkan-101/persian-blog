import IPagination from "../../contracts/IPaginaton"
import PostSorting from "../entity/contracts/PostSorting"
import PostRepositoryProvider from "./PostRepositoryProvider"
import { collection } from "../services/TransformerPostList"
import { transform } from '../services/TransformerPostDetails'
import IPostPG from "../entity/contracts/IPost.PG"
import NotFoundException from "../../../exceptions/NotFoundException"
import ValidationException from "../../../exceptions/ValidationException"
import ServerException from "../../../exceptions/ServerException"

export default class PostService {
  private readonly repositoryProvider: PostRepositoryProvider

  constructor(){
    this.repositoryProvider = new PostRepositoryProvider()
  }

  public async getPostsService(sorting: PostSorting, page: number){
    const pagination: IPagination = {
      take: 20,
      skip: (page - 1) * 20
    }

    const getSortingPosts = await this.repositoryProvider.getSortingPosts(pagination, sorting)
    const transformPosts = await collection(getSortingPosts)
    return transformPosts
  }

  public async postDetailsService(slug: string){
    const resultQuery = await this.repositoryProvider.getPostBySlug(slug)
    if(!resultQuery){
      throw new NotFoundException('post Not Found!')
    }
    const postTransform = await transform(resultQuery)
    return postTransform
  }

  public async postViewsService(postId: string){
    const post = await this.repositoryProvider.getPostById(postId)
    if(!post){
      throw new NotFoundException('not found any post whit this ID')
    }
    const updateResult = await this.repositoryProvider.updatePostViews(postId, post.views)
    if(!updateResult){
      throw new ServerException('updating failed!')
    }
  } 

  public async postLikeService(postId: string, userId: string){
    const post = await this.repositoryProvider.getPostById(postId)
    if(!post){
      throw new NotFoundException('not found any post with this Id')
    }
    const likes = post.likes
    const userIndex = likes.indexOf(userId)

    if(userIndex > -1){
      likes.splice(userIndex, 1)
      await this.repositoryProvider.updatePostLikes(postId, likes)
      return 'dislike'
    }else {
      likes.push(userId)
      await this.repositoryProvider.updatePostLikes(postId, likes)
      return 'like'
    }
  }
}