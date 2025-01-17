import CommentPGRepository from "../../comment/repositories/Comment.PG.Repository";
import ICommentPGRepository from "../../comment/repositories/contracts/IComment.PG.Repository";
import IUserPG from "../../user/entity/contracts/IUser.PG";
import ICommentReplayPG from "../entity/contracts/ICommentReply.PG";
import CommentRepliesPGRepository from "../repositories/CommentReplies.PG.Repository";
import ICommentRepliesPGRepository from "../repositories/contracts/ICommentReplies.PG.Repository";

export default class CommentRepliesFactory {
  private readonly commentRepliesRepository: ICommentRepliesPGRepository
  private readonly commentRepository: ICommentPGRepository

  constructor(){
    this.commentRepliesRepository = new CommentRepliesPGRepository()
    this.commentRepository = new CommentPGRepository()
  }

  public async saveNewCommentReply(replyParams: Partial<ICommentReplayPG>){
    return await this.commentRepliesRepository.create(replyParams)
  }

  public async deleteCommentReply(commentId: string, userId: string){
    return await this.commentRepliesRepository.deleteOne({id: commentId, user: {id: userId} as IUserPG})
  }

  public async getCommentById(commentId: string){
    return await this.commentRepository.findById(commentId)
  }

  public async getReplyById(replyId: string){
    return await this.commentRepliesRepository.findById(replyId)
  }

  public async updateReplyLikesById(replyId: string, likes: string[]){
    return await this.commentRepliesRepository.updateOne({id: replyId}, {likes})
  }
} 