import IPostPG from "../entity/contracts/IPost.PG"
import PostSorting from "../entity/contracts/PostSorting"
import PostService from "./PostService"
import { Request, Response, NextFunction } from "express"


export default class PostController {
  private readonly service

  constructor(){
    this.service = new PostService()
  }

  public async saveImageController(req: Request, res: Response, next: NextFunction){
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

  public async deleteImageController(req: Request, res: Response, next: NextFunction){
    try {
      const imageName = req.body.imageName
      const thumbnailName = req.body.thumbnailName

      await this.service.deleteImageService(imageName, thumbnailName)

      res.status(200).send({
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  public async newPostController(req: Request, res: Response, next: NextFunction){
    try {
      const postParams: Partial<IPostPG> = {
        title: req.body.title,
        metaTitle: req.body.metaTitle,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        thumbnailAltText: req.body.thumbnailAltText,
        gallery: req.body.gallery,
        tags: req.body.tags,
      }
      const subcategoryId: string = req.body.subcategoryId

      const newPost = await this.service.newPostService(postParams, subcategoryId)

      res.status(201).send({
        newPost
      })
    } catch (error) {
      next(error)
    }
  }

  public async deletePostController(req: Request, res: Response, next: NextFunction){
    try {
      const postId = req.params.id

      await this.service.deletePostService(postId)

      res.status(200).send({
        msg: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  public async getPostsController(req: Request, res: Response, next: NextFunction){
    try {
      const adminId = req.user?.id as string
      const page: number = req.query.page ? +req.query.page : 1
      const sorting: PostSorting | undefined = req.query.sorting ? req.query.sorting as PostSorting : undefined  //newest or popular

      const posts = await this.service.getPostsService(adminId, page, sorting)

      res.status(200).send({
        posts
      })
    } catch (error) {
      next(error)
    }
  }
}