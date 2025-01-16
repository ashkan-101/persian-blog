import ICommentPG from '../entity/contracts/IComment.PG'
import CommentService from './CommentService'
import { Request, Response, NextFunction } from 'express'

export default class CommentController {
  private readonly commentService: CommentService

  constructor(){
    this.commentService = new CommentService()
  }

  public async newCommentController(req: Request, res: Response, next: NextFunction){
    try {
      const postId: string = req.params.postId as string
      const newCommentParams: Partial<ICommentPG> = {
        title: req.body.title,
        description: req.body.description,
        user: req.user,
      }

      const newComment = await this.commentService.newCommentService(newCommentParams, postId)

      res.status(201).send({
        newComment
      })
    } catch (error) {
      next(error)
    }
  }

  public async deleteCommentController(req: Request, res: Response, next: NextFunction){
    try {
      const commentId: string = req.params.id as string
      const userId: string = req.user?.id as string

      await this.commentService.deleteCommentService(commentId, userId)

      res.status(200).send({
        msg: true
      })
    } catch (error) {
      next(error)
    }
  }

  public async getCommentsController(req: Request, res: Response, next: NextFunction){
    try {
      const postId: string = req.params.postId
      const page: number = req.query.page ? +req.query.page : 1

      const comments = await this.commentService.getCommentsService(postId, page)
      res.status(200).send({
        comments,
        userId: req.user?.id
      })
    } catch (error) {
      next(error)
    }
  }

  public async commentLikeController(req: Request, res: Response, next: NextFunction){
    try {
      const commentId: string = req.params.id
      const userId = req.user?.id as string

      const likeResult = await this.commentService.commentLikeService(commentId, userId)

      res.status(200).send({
        likeResult
      })
    } catch (error) {
      next(error)
    }
  }
}