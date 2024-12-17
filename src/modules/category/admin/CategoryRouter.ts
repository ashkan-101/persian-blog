import { Router } from "express";
import CategoryController from "./CategoryController";

const categoryAdminRouter = Router()
const controller = new CategoryController()

//category
categoryAdminRouter.post('/new-category', controller.newCategory.bind(controller))
categoryAdminRouter.patch('/edit-category/:id', controller.editCategory.bind(controller))
categoryAdminRouter.delete('/delete-category/:id', controller.deleteCategory.bind(controller))
categoryAdminRouter.get('/categories', controller.getCategories.bind(controller))
//subcategory
categoryAdminRouter.post('/new-subcategory', controller.newSubcategory.bind(controller))
categoryAdminRouter.delete('/delete-subcategory/:id', controller.deleteSubcategory.bind(controller))
categoryAdminRouter.get('/subcategories', controller.getSubcategories.bind(controller))

export default categoryAdminRouter