import { Router } from "express";
import CommentController from './CommentController'
import { auth } from "../../../middlewares/Auth";
import { validateRole } from "../../../middlewares/ValidateRole";

const commentClientRouter: Router = Router()
const controller = new CommentController()

commentClientRouter.post('/new/:postId', auth, controller.newCommentController.bind(controller))
commentClientRouter.delete('/delete/:id', auth, controller.deleteCommentController.bind(controller))
commentClientRouter.get('/all/:postId', auth, controller.getCommentsController.bind(controller))

export default commentClientRouter