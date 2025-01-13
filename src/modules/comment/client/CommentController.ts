import ICommentPG from '../entity/contracts/IComment.PG'
import CommentService from './CommentService'
import { Request, Response, NextFunction } from 'express'

export default class CommentController {
  private readonly service: CommentService

  constructor(){
    this.service = new CommentService()
  }

  public async newCommentController(req: Request, res: Response, next: NextFunction){
    try {
      const postId: string = req.params.postId as string
      const newCommentParams: Partial<ICommentPG> = {
        title: req.body.title,
        description: req.body.description,
        user: req.user,
      }

      const newComment = await this.service.newCommentService(newCommentParams, postId)

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

      await this.service.deleteCommentService(commentId, userId)

      res.status(200).send({
        msg: true
      })
    } catch (error) {
      next(error)
    }
  }
}