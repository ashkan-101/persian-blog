import { Router } from "express";
import PostController from './PostController'

const postClientRouter: Router = Router()
const controller = new PostController()

postClientRouter.get('/all', controller.getPosts.bind(controller)) //get sorting and page in query
// postClientRouter.get()

export default postClientRouter