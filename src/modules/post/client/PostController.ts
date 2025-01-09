import PostSorting from "../entity/contracts/PostSorting";
import PostService from "./PostService";
import { Request, Response, NextFunction } from "express";

export default class PostController {
  private readonly service: PostService;
  
  constructor() {
    this.service = new PostService();
  }

  public async getPosts(req: Request, res: Response, next: NextFunction){
    try {
      const sorting: PostSorting = req.query.sorting as PostSorting
      const page: number = req.query.page ? +req.query.page : 1
 
      const posts = await this.service.getPosts(sorting, page)

      res.status(200).send({
        posts
      })
    } catch (error) {
      next(error)
    }
  }
}