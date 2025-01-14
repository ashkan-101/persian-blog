import NotFoundException from "../../../exceptions/NotFoundException";
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
}