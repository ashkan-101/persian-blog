import NotFoundException from '../../../exceptions/NotFoundException'
import ValidationException from '../../../exceptions/ValidationException'
import ICommentPG from '../entity/contracts/IComment.PG'
import CommentFactory from './CommentFactory'
import { validate as validateUUID } from 'uuid'

export default class CommentService {
  private readonly commentFactory: CommentFactory

  constructor(){
    this.commentFactory = new CommentFactory()
  }

  private async validateAndGetPostService(postId: string){
    if(!validateUUID(postId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const post = await this.commentFactory.getPostById(postId)

    if(!post){
      throw new NotFoundException('Not Found any post with this ID')
    }

    return post
  }

  public async newCommentService(commentParams: Partial<ICommentPG>, postId: string){
    const post = await this.validateAndGetPostService(postId)
    return await this.commentFactory.saveNewComment({ ...commentParams, post })
  }

  public async deleteCommentService(commentId: string, userId: string){
    if(!validateUUID(commentId)){
      throw new ValidationException('Please enter the ID format correctly')
    }
    
    const deleteResult = await this.commentFactory.deleteComment(commentId, userId)

    if(!deleteResult){
      throw new NotFoundException('not Found any comment for delete with this information')
    }
  }
}