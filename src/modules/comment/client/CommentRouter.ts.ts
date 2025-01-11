import { Router } from "express";
import CommentController from './CommentController'
import { auth } from "../../../middlewares/Auth";

const commentClientRouter: Router = Router()
const controller = new CommentController()

commentClientRouter.post('/new/:postId', auth, controller.newCommentController.bind(controller))

export default commentClientRouter