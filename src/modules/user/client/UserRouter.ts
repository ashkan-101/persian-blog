import { Router } from "express";
import UserController from "./UserController";
import {auth} from '../../../middlewares/Auth'

const userClientRouter: Router = Router()
const controller = new UserController()

userClientRouter.use(auth)

userClientRouter.get('/profile', controller.profile.bind(controller))
userClientRouter.patch('/edit-profile', controller.editProfile.bind(controller))

export default userClientRouter