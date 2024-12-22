import UserService from "./UserService"
import { Request, Response, NextFunction } from "express"



export default class UserController {
  private readonly service: UserService

  constructor(){
    this.service = new UserService()
  }

  public async profile(req: Request, res: Response, next: NextFunction){
    try {
      res.status(200).send({
        id: req.user?.id,
        name: req.user?.name,
        mobile: req.user?.mobile,
        avatar: req.user?.avatar
      })
    } catch (error) {
      next(error)
    }
  }

  public async editProfile(req: Request, res: Response, next: NextFunction){
    try {
      const name: string = req.body.userName
      const avatar = req.files as {[fieldname: string]: Express.Multer.File[];}

      let avatarName: string | undefined
      if(req.files && avatar.avatar){
        avatar.avatar.forEach((fileInformation) => {
          avatarName = fileInformation.filename
        })
      }

      const lastAvatar = req.user?.avatar as string
      const userId = req.user?.id as string

      await this.service.editProfile({
        name,
        avatar: avatarName
      }, lastAvatar, userId)

      res.status(200)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  
}