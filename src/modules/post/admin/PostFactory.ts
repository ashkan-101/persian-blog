import IPagination from "../../contracts/IPaginaton";
import SubcategoryPGRepository from "../../subcategory/repositories/Subcategory.PG.Repository";
import ISubcategoryPGRepository from "../../subcategory/repositories/contracts/ISubcategory.PG.Repository";
import IUserPG from "../../user/entity/contracts/IUser.PG";
import UserRole from "../../user/entity/contracts/UserRole";
import IPostPG from "../entity/contracts/IPost.PG";
import PostSorting from "../entity/contracts/PostSorting";
import PostPGRepository from "../repositories/Post.PG.Repository";
import IPostPGRepository from "../repositories/contracts/IPost.PG.Repository";

export default class PostFactory {
  private readonly postRepository: IPostPGRepository
  private readonly subcategoryRepository: ISubcategoryPGRepository

  constructor(){
    this.postRepository = new PostPGRepository()
    this.subcategoryRepository = new SubcategoryPGRepository()
  }

  public async findPostWithSlug(slug: string){
    return await this.postRepository.findOne({slug: slug})
  }

  public async saveNewPost(params: Partial<IPostPG>){
    return await this.postRepository.create(params)
  }

  public async findPostWithId(postId: string){
    return await this.postRepository.findOne({id: postId})
  }

  public async deletePostInRepository(postId: string){
    return await this.postRepository.deleteOne({id: postId})
  }

  public async getSubcategoryById(subcategoryId: string){
    return await this.subcategoryRepository.findById(subcategoryId)
  }

  public async getPostsByAuthorId(authorId: string, relations: string[], pagination: IPagination, sort?: PostSorting){
    return await this.postRepository.findMany(
      {author: {id: authorId, role: UserRole.ADMIN || UserRole.SUPERADMIN} as IUserPG},
      relations,
      pagination,
      sort
    )
  }
}