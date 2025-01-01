import IPostPG from "../entity/contracts/IPost.PG";
import PostPGRepository from "../repositories/Post.PG.Repository";
import IPostPGRepository from "../repositories/contracts/IPost.PG.Repository";

export default class PostFactory {
  private readonly postRepository: IPostPGRepository

  constructor(){
    this.postRepository = new PostPGRepository()
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
}