import NotFoundException from '../../../exceptions/NotFoundException'
import ServerException from '../../../exceptions/ServerException'
import ValidationException from '../../../exceptions/ValidationException'
import IPagination from '../../contracts/IPaginaton'
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
  private async validateAndGetCommentService(commentId: string){
    if(!validateUUID(commentId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const comment = await this.commentFactory.getCommentById(commentId)

    if(!comment){
      throw new NotFoundException('not found any comment with this id')
    }

    return comment
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

  public async getCommentsService(postId: string, page: number){
    if(!validateUUID(postId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const pagination: IPagination = {
      take: 5,
      skip: (page - 1) * 5
    }

    const comments = await this.commentFactory.getCommentsWithPostId(postId, ['replies.user', 'user'], pagination)
    return comments
  }

  public async commentLikeService(commentId: string, userId: string){
    const comment = await this.validateAndGetCommentService(commentId)
    const likes = comment.likes
    const userIndex = likes.indexOf(userId)

    if(userIndex > -1){
      likes.splice(userIndex, 1)
      const result = await this.commentFactory.updateCommentLikes(commentId, likes)
      if(!result){
        throw new ServerException('Unable to update comment likes')
      }
      return 'dislike'
    }
    if(userIndex < 0){
      likes.push(userId)
      const result = await this.commentFactory.updateCommentLikes(commentId, likes)
      if(!result){
        throw new ServerException('Unable to update comment likes')
      }
      return 'like'
    }
  }
}