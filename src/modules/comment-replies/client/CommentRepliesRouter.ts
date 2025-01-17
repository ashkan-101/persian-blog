import { Router } from "express";
import CommentRepliesController from "./CommentRepliesController";
import { auth } from "../../../middlewares/Auth";

const commentRepliesClientRouter: Router = Router()
const controller = new CommentRepliesController()

commentRepliesClientRouter.post('/new/:commentId', auth, controller.newReplyController.bind(controller)) //get parent comment in query
commentRepliesClientRouter.delete('/delete/:id', auth, controller.deleteReplyController.bind(controller))
commentRepliesClientRouter.patch('/like/:id', auth, controller.replyLikeController.bind(controller))

export default commentRepliesClientRouter