import IPagination from "../../contracts/IPaginaton";
import PostSorting from "../entity/contracts/PostSorting";
import IPostPGRepository from "../repositories/contracts/IPost.PG.Repository";
import PostPGRepository from "../repositories/Post.PG.Repository";


export default class PostRepositoryProvider {
  private readonly postRepository: IPostPGRepository

  constructor(){
    this.postRepository = new PostPGRepository()
  }

  public async getSortingPosts(pagination: IPagination, sort: PostSorting, relations?: string[]){
    return await this.postRepository.findMany({}, relations, pagination, sort)
  }

  public async getPostBySlug(slug: string){
    return await this.postRepository.findOne({slug})
  }

  public async getPostById(postId: string){
    return await this.postRepository.findById(postId)
  }

  public async updatePostViews(postId: string, lastViewsCount: number){
    return await this.postRepository.updateOne({id: postId}, {views: lastViewsCount + 1})
  }

  public async updatePostLikes(postId: string, likesList: string[]){
    return await this.postRepository.updateOne({id: postId}, {likes: likesList})
  }
}