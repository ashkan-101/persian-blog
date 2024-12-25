import PostPGRepository from "../repositories/Post.PG.Repository";
import IPostPGRepository from "../repositories/contracts/IPost.PG.Repository";

export default class PostFactory {
  private readonly postRepository: IPostPGRepository

  constructor(){
    this.postRepository = new PostPGRepository()
  }
}