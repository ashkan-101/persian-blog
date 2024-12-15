import { Router } from "express";
import CategoryController from "./CategoryController";

const categoryAdminRouter = Router()
const controller = new CategoryController()

categoryAdminRouter.post('/new-category', controller.newCategory.bind(controller))
categoryAdminRouter.patch('/edit-category/:id', controller.editCategory.bind(controller))
categoryAdminRouter.delete('/delete-category/:id', controller.deleteCategory.bind(controller))

export default categoryAdminRouter