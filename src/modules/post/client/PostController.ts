import PostSorting from "../entity/contracts/PostSorting";
import PostService from "./PostService";
import { Request, Response, NextFunction } from "express";

export default class PostController {
  private readonly service: PostService;
  
  constructor() {
    this.service = new PostService();
  }

  public async getPostsController(req: Request, res: Response, next: NextFunction){
    try {
      const sorting: PostSorting | undefined = req.query.sorting ? req.query.sorting as PostSorting : undefined
      const page: number = req.query.page ? +req.query.page : 1
 
      const posts = await this.service.getPostsService(page, sorting)

      res.status(200).send({
        posts
      })
    } catch (error) {
      next(error)
    }
  }

  public async postDetailsController(req: Request, res: Response, next: NextFunction){
    try {
      const slug: string = req.params.slug as string
      const post = await this.service.postDetailsService(slug)

      res.status(200).send({
        post,
        userId: req.user?.id
      })
    } catch (error) {
      next(error)
    }
  }

  public async postViewsController(req: Request, res: Response, next: NextFunction){
    try {
      const postId: string = req.params.id

      await this.service.postViewsService(postId)

      res.status(200).send({
        msg: true
      })
    } catch (error) {
      next(error)
    }
  }

  public async postLikeController(req: Request, res: Response, next: NextFunction){
    try {
      const postId: string = req.params.id
      const userId: string = req.user?.id as string

      const likeResult = await this.service.postLikeService(postId, userId)

      res.status(200).send({
        likeResult
      })
    } catch (error) {
      next(error)
    }
  }
}