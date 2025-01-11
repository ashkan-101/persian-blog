import { Router } from "express";
import PostController from './PostController'

const postClientRouter: Router = Router()
const controller = new PostController()

postClientRouter.get('/all', controller.getPosts.bind(controller)) //get sorting and page number in query
postClientRouter.get('/:slug', controller.postDetailsBySlug.bind(controller))

export default postClientRouter