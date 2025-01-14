import { Router } from "express";
import AuthController from "./AuthController";

const authRouter: Router = Router()
const controller: AuthController = new AuthController()

authRouter.post('/request-otp', controller.createOtpController.bind(controller))
authRouter.post('/signin', controller.signinController.bind(controller))

export default authRouter