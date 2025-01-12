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
}