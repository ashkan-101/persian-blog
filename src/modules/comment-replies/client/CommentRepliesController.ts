import ICommentReplayPG from "../entity/contracts/ICommentReply.PG";
import CommentRepliesService from "./CommentRepliesService";
import { Request, Response, NextFunction } from "express";

export default class CommentRepliesController {
  private readonly service: CommentRepliesService

  constructor(){
    this.service = new CommentRepliesService()
  }

  public async newReplyController(req: Request, res: Response, next: NextFunction){
    try {
      const parentCommentId: string = req.params.commentId
      const newReplyParams: Partial<ICommentReplayPG> = {
        title: req.body.title,
        description: req.body.description,
        user: req.user
      }

      const newReply = await this.service.newReplyService(newReplyParams, parentCommentId)

      res.status(201).send({
        newReply
      })
    } catch (error) {
      next(error)
    }
  }

  public async deleteReplyController(req: Request, res: Response, next: NextFunction){
    try {
      const commentId: string = req.params.id as string
      const userId: string = req.user?.id as string

      await this.service.deleteReplyService(commentId, userId)

      res.status(200).send({
        msg: true
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  public async replyLikeController(req: Request, res: Response, next: NextFunction){
    try {
      const replyId: string = req.params.id
      const userId: string = req.user?.id as string

      const likeResult = await this.service.replyLikeService(replyId, userId)

      res.status(200).send({
        likeResult
      })
    } catch (error) {
      next(error)
    }
  }
}