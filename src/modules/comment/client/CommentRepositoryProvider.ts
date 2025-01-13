import IUserPG from "../../user/entity/contracts/IUser.PG";
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

  public async deleteComment(commentId: string, userId: string){
    return await this.commentRepository.deleteOne({id: commentId, user: { id: userId } as IUserPG})
  }
}