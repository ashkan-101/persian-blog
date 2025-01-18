import { Router } from "express";
import PostController from "./PostController";
import { auth } from "../../../middlewares/Auth";
import { validateRole } from "../../../middlewares/ValidateRole";

const postAdminRouter: Router = Router()
const controller = new PostController()

postAdminRouter.post('/save-image', 
  auth, validateRole(['admin', 'superadmin']), 
  controller.saveImageController.bind(controller)
)

postAdminRouter.delete('/delete-image', 
  auth, validateRole(['admin', 'superadmin']), 
  controller.deleteImageController.bind(controller)
)

postAdminRouter.post('/new-post', 
  auth, validateRole(['admin', 'superadmin']), 
  controller.newPostController.bind(controller)
)

postAdminRouter.delete('/delete-post/:id', 
  auth, validateRole(['admin', 'superadmin']), 
  controller.deletePostController.bind(controller)
)
  
postAdminRouter.get('/my-posts', 
  auth, validateRole(['admin', 'superadmin']), 
  controller.getPostsController.bind(controller)
)

export default postAdminRouter