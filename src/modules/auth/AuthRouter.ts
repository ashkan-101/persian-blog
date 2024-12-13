import { Router } from "express";
import AuthController from "./AuthController";

const authRouter: Router = Router()
const controller: AuthController = new AuthController()



export default authRouter