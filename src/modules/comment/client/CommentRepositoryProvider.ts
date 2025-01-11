import ICommentPG from "../entity/contracts/IComment.PG";
import CommentPGRepository from "../repositories/Comment.PG.Repository";
import ICommentPGRepository from "../repositories/contracts/IComment.PG.Repository";

export default class CommentRepositoryProvider {
  private readonly commentRepository: ICommentPGRepository

  constructor(){
    this.commentRepository = new CommentPGRepository()
  }

  public async saveNewComment(commentParams: Partial<ICommentPG>){
    return await this.commentRepository.create(commentParams)
  }
}