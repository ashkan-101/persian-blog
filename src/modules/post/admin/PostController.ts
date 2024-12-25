import PostService from "./PostService"
import { Request, Response, NextFunction } from "express"


export default class PostController {
  private readonly service

  constructor(){
    this.service = new PostService()
  }

  public async saveImage(req: Request, res: Response, next: NextFunction){
    try {
      const postImage = req.files as {[fieldname: string]: Express.Multer.File[]}

      let imageName: string | undefined
      if(postImage && postImage.postImage){
        postImage.postImage.forEach((image) => {
          imageName = image.filename
        })
      }

      res.status(200).send({
        imageName
      })
    } catch (error) {
      next(error)
    }
  }

  public async newPost(req: Request, res: Response, next: NextFunction){
    try {
      
    } catch (error) {
      next(error)
    }
  }
}