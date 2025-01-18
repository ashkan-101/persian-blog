import IPagination from "../../contracts/IPaginaton";
import ISubcategoryPG from "../../subcategory/entity/contracts/ISubcategory.PG";
import PostSorting from "../entity/contracts/PostSorting";
import IPostPGRepository from "../repositories/contracts/IPost.PG.Repository";
import PostPGRepository from "../repositories/Post.PG.Repository";


export default class PostFactory {
  private readonly postRepository: IPostPGRepository

  constructor(){
    this.postRepository = new PostPGRepository()
  }

  public async getSortingPosts(relations: string[], pagination: IPagination, sorting?: PostSorting){
    return await this.postRepository.findMany({}, relations, pagination, sorting)
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

  public async getPostsWithSubId(subId: string, relations?: string[], pageination?: IPagination, sorting?: PostSorting){
    return await this.postRepository.findMany(
      {subcategory: {id: subId} as ISubcategoryPG},
      relations,
      pageination,
      sorting
    )
  }
}