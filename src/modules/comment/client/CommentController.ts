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
      const newCommentParams: Partial<ICommentPG> = {
        title: req.body.title,
        body: req.body.body,
        user: req.user?.id as string,
        post: req.params.postId
      }
      
      const newComment = await this.service.newCommentService(newCommentParams)

      res.status(201).send({
        newComment
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}