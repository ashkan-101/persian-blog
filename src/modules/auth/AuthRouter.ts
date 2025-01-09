import { Router } from "express";
import AuthController from "./AuthController";

const authRouter: Router = Router()
const controller: AuthController = new AuthController()

authRouter.post('/request-otp', controller.createOtp.bind(controller))
authRouter.post('/signin', controller.signin.bind(controller))

export default authRouter