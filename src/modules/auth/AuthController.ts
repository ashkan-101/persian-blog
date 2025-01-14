import AuthService from "./AuthService";
import { sign } from '../../services/TokenService'
import { Request, Response, NextFunction } from "express";

export default class AuthController {
  private readonly service: AuthService

  constructor(){
    this.service = new AuthService()
  }

  public async createOtpController(req: Request, res: Response, next: NextFunction){
    try {
      const phoneNumber: string = req.body.mobile as string
      const otp = await this.service.createOtpService(phoneNumber)

      res.status(200).send({
        otp
      })
    } catch (error) {
      next(error)
    }
  }

  public async signinController(req: Request, res: Response, next: NextFunction){
    try {
      const phoneNumber: string = req.body.mobile as string
      const otp: string = req.body.otp as string

      await this.service.validateOtpService(phoneNumber, otp)
      const user = await this.service.getUserService(phoneNumber)

      res.status(200).send({
        token: sign(user.id)
      })
    } catch (error) {
      next(error)
    }
  }
}