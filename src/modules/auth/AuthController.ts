import AuthService from "./AuthService";
import { sign } from '../../services/TokenService'
import { Request, Response, NextFunction } from "express";

export default class AuthController {
  private readonly service: AuthService

  constructor(){
    this.service = new AuthService()
  }

  public async createOtp(req: Request, res: Response, next: NextFunction){
    try {
      const phoneNumber: string = req.body.mobile as string
      const otp = await this.service.createOtp(phoneNumber)

      res.status(200).send({
        otp
      })
    } catch (error) {
      next(error)
    }
  }

  public async signin(req: Request, res: Response, next: NextFunction){
    try {
      const phoneNumber: string = req.body.mobile as string
      const otp: string = req.body.otp as string

      await this.service.validateOtp(phoneNumber, otp)
      const user = await this.service.getUser(phoneNumber)

      res.status(200).send({
        token: sign(user.id)
      })
    } catch (error) {
      next(error)
    }
  }
}