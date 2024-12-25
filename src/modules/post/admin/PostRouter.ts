import { Router } from "express";
import PostController from "./PostController";

const postAdminRouter: Router = Router()
const controller = new PostController()

postAdminRouter.post('/save-image', controller.saveImage.bind(controller))
postAdminRouter.post('/new-post', controller.newPost.bind(controller))

export default postAdminRouter