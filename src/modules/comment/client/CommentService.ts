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

  public async newCommentService(commentParams: Partial<ICommentPG>){
    if(!validateUUID(commentParams.post)){
      throw new ValidationException('Please enter the ID format correctly')
    }
    
    const validatePost = await this.postRepositoryProvider.getPostById(commentParams.post as string)

    if(!validatePost){
      throw new NotFoundException('post Not Found')
    }

    return await this.commentRepositoryProvider.saveNewComment(commentParams)
  }
}