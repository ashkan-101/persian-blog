import AuthService from "./AuthService";
import { sign } from '../../services/TokenService'
import { Request, Response, NextFunction } from "express";

export default class AuthController {
  private readonly service: AuthService

  constructor(){
    this.service = new AuthService()
  }

  public async createNewCode(req: Request, res: Response, next: NextFunction){
    try {
      const mobile: string = req.body.mobile as string
      const code = await this.service.createNewCode(mobile)
      res.status(200).send({
        code: code.code
      })
    } catch (error) {
      next(error)
    }
  }

  public async signin(req: Request, res: Response, next: NextFunction){
    try {
      const mobile: string = req.body.mobile as string
      const code: string = req.body.code as string

      const user = await this.service.signin(mobile, code)

      res.status(200).send({
        msg: true,
        token: sign({userId: user.id}),
        userId: user.id
      })

    } catch (error) {
      next(error)
    }
  }
}