import IPostPG from "../entity/contracts/IPost.PG"
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
      const thumbnail = req.files as {[fieldname: string]: Express.Multer.File[]}

      let imageName: string | undefined
      if(postImage && postImage.postImage){
        postImage.postImage.forEach((image) => {
          imageName = image.filename
        })
      }

      let thumbnailName: string | undefined
      if(thumbnail && thumbnail.thumbnail){
        thumbnail.thumbnail.forEach((image) => {
          thumbnailName = image.filename
        })
      }

      res.status(200).send({
        imageName,
        thumbnailName
      })
    } catch (error) {
      next(error)
    }
  }

  public async deleteImage(req: Request, res: Response, next: NextFunction){
    try {
      const imageName = req.body.imageName
      const thumbnailName = req.body.thumbnailName

      await this.service.deleteImage(imageName, thumbnailName)

      res.status(200).send({
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  public async newPost(req: Request, res: Response, next: NextFunction){
    try {
      const postParams: Partial<IPostPG> = {
        title: req.body.title as string,
        body: req.body.body as string,
        thumbnail: req.body.thumbnail as string,
        gallery: req.body.gallery as string[],
        tags: req.body.tags as string[],
        subcategory: req.body.subcategory as string        //subcategory id
      }

      const newPost = await this.service.newPost(postParams)

      res.status(201).send({
        msg: 'success',
        newPost
      })
    } catch (error) {
      next(error)
    }
  }

public async deletePost(req: Request, res: Response, next: NextFunction){
    try {
      const postId = req.params.id

      await this.service.deletePost(postId)

      res.status(200).send({
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  } 
}