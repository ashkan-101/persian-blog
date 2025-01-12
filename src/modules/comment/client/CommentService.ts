import NotFoundException from '../../../exceptions/NotFoundException'
import ValidationException from '../../../exceptions/ValidationException'
import PostRepositoryProvider from '../../post/client/PostRepositoryProvider'
import ICommentPG from '../entity/contracts/IComment.PG'
import CommentRepositoryProvider from './CommentRepositoryProvider'
import { validate as validateUUID } from 'uuid'

export default class CommentService {
  private readonly commentRepositoryProvider: CommentRepositoryProvider
  private readonly postRepositoryProvider: PostRepositoryProvider

  constructor(){
    this.commentRepositoryProvider = new CommentRepositoryProvider()
    this.postRepositoryProvider = new PostRepositoryProvider()
  }

  private async validateAndGetPostService(postId: string){
    if(!validateUUID(postId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const post = await this.postRepositoryProvider.getPostById(postId)

    if(!post){
      throw new NotFoundException('Not Found any post with this ID')
    }

    return post
  }

  public async newCommentService(commentParams: Partial<ICommentPG>, postId: string){
    const post = await this.validateAndGetPostService(postId)
    return await this.commentRepositoryProvider.saveNewComment({ ...commentParams, post })
  }
}