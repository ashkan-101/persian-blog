import IPagination from "../../contracts/IPaginaton";
import IPostPG from "../../post/entity/contracts/IPost.PG";
import IPostPGRepository from "../../post/repositories/contracts/IPost.PG.Repository";
import PostPGRepository from "../../post/repositories/Post.PG.Repository";
import IUserPG from "../../user/entity/contracts/IUser.PG";
import ICommentPG from "../entity/contracts/IComment.PG";
import CommentPGRepository from "../repositories/Comment.PG.Repository";
import ICommentPGRepository from "../repositories/contracts/IComment.PG.Repository";

export default class CommentFactory {
  private readonly commentRepository: ICommentPGRepository
  private readonly postRepository: IPostPGRepository

  constructor(){
    this.commentRepository = new CommentPGRepository()
    this.postRepository = new PostPGRepository()
  }

  public async saveNewComment(commentParams: Partial<ICommentPG>){
    return await this.commentRepository.create(commentParams)
  }

  public async deleteComment(commentId: string, userId: string){
    return await this.commentRepository.deleteOne({id: commentId, user: { id: userId } as IUserPG})
  }

  public async getCommentById(commentId: string){
    return await this.commentRepository.findById(commentId)
  }

  public async getPostById(postId: string){
    return await this.postRepository.findById(postId)
  }

  public async getCommentsWithPostId(postId: string, relations: string[], pagination: IPagination){
    return await this.commentRepository.findMany({post: {id: postId} as IPostPG}, relations, pagination)
  }

  public async updateCommentLikes(commentId: string, likes: string[]){
    return await this.commentRepository.updateOne({id: commentId}, {likes})
  }
}