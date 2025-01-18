import { Router } from "express";
import SubcategoryController from "./SubcategoryController";
import { auth } from "../../../middlewares/Auth";
import { validateRole } from "../../../middlewares/ValidateRole";

const subcategoryAdminRouter: Router = Router()
const controller = new SubcategoryController()

subcategoryAdminRouter.post('/new', 
  auth, validateRole(['admin', 'superadmin']), 
  controller.newSubcategoryController.bind(controller)
)

subcategoryAdminRouter.delete('/delete/:id', 
  auth, validateRole(['admin', 'superadmin']), 
  controller.deleteSubcategoryController.bind(controller)
)

subcategoryAdminRouter.get('/subcategories',                          //get pag number in query
  auth, validateRole(['admin', 'superadmin']), 
  controller.getSubcategoriesController.bind(controller)
)

export default subcategoryAdminRouter
