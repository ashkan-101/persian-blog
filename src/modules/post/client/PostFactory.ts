import IPagination from "../../contracts/IPaginaton";
import PostSorting from "../entity/contracts/PostSorting";
import IPostPGRepository from "../repositories/contracts/IPost.PG.Repository";
import PostPGRepository from "../repositories/Post.PG.Repository";


export default class PostFactory {
  private readonly postRepository: IPostPGRepository

  constructor(){
    this.postRepository = new PostPGRepository()
  }

  public async getSortingPosts(pagination: IPagination, sort?: PostSorting, relations?: string[]){
    return await this.postRepository.findMany({}, relations, pagination, sort)
  }
}