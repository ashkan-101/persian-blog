import NotFoundException from "../../../exceptions/NotFoundException";
import ServerException from "../../../exceptions/ServerException";
import ValidationException from "../../../exceptions/ValidationException";
import ICommentReplayPG from "../entity/contracts/ICommentReply.PG";
import CommentRepliesFactory from "./CommentRepliesFactory";
import { validate as validateUUID } from "uuid";


export default class CommentRepliesService{
  private readonly commentRepliesFactory: CommentRepliesFactory

  constructor(){
    this.commentRepliesFactory = new CommentRepliesFactory()
  }

  private async validateAndGetCommentService(commentId: string){
    if(!validateUUID(commentId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const comment = await this.commentRepliesFactory.getCommentById(commentId)

    if(!comment){
      throw new NotFoundException('not found any comment with this comment ID')
    }

    return comment
  }
  private async validateAndGetReplyService(replyId: string){
    if(!validateUUID(replyId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const commentReply = await this.commentRepliesFactory.getReplyById(replyId)

    if(!commentReply){
      throw new NotFoundException('not found any comment reply with this ID')
    }

    return commentReply
  }

  public async newReplyService(newReplyParams: Partial<ICommentReplayPG>, parentCommentId: string){
    const parentComment = await this.validateAndGetCommentService(parentCommentId)
    return await this.commentRepliesFactory.saveNewCommentReply({ ...newReplyParams, parentComment })
  }

  public async deleteReplyService(commentId: string, userId: string){
    if(!validateUUID(commentId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const deleteResult = await this.commentRepliesFactory.deleteCommentReply(commentId, userId)

    if(!deleteResult){
      throw new NotFoundException('not found any comment reply for delete with this information')
    }
  }

  public async replyLikeService(replyId: string, userId: string){
    const commentReply = await this.validateAndGetReplyService(replyId)
    const likes = commentReply.likes
    const userIndex = likes.indexOf(userId)

    if(userIndex > -1) {
      likes.splice(userIndex, 1)
      const result = await this.commentRepliesFactory.updateReplyLikesById(replyId, likes)
      if(!result){
        throw new ServerException('Unable to update comment likes')
      }
      return 'dislike'
    }
    if(userIndex < 0){
      likes.push(userId)
      const result = await this.commentRepliesFactory.updateReplyLikesById(replyId, likes)
      if(!result){
        throw new ServerException('Unable to update comment likes')
      }
      return 'like'
    }
  }
}