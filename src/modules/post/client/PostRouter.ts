import { Router } from "express";
import PostController from './PostController'
import { auth } from '../../../middlewares/Auth'

const postClientRouter: Router = Router()
const controller = new PostController()

postClientRouter.get('/all', controller.getPostsController.bind(controller)) //get sorting and page number in query
postClientRouter.get('/:slug', auth, controller.postDetailsController.bind(controller))
postClientRouter.patch('/add-views/:id', controller.postViewsController.bind(controller))
postClientRouter.patch('/like/:id', auth, controller.postLikeController.bind(controller))

export default postClientRouter