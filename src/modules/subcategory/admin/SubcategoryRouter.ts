import { Router } from "express";
import SubcategoryController from "./SubcategoryController";

const subcategoryAdminRouter: Router = Router()
const controller = new SubcategoryController()

subcategoryAdminRouter.post('/new-subcategory', controller.newSubcategory.bind(controller))
subcategoryAdminRouter.delete('/delete-subcategory/:id', controller.deleteSubcategory.bind(controller))
subcategoryAdminRouter.get('/subcategories', controller.getSubcategories.bind(controller))

export default subcategoryAdminRouter
