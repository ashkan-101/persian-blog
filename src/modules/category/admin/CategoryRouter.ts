import { Router } from "express";
import CategoryController from "./CategoryController";
import { auth } from "../../../middlewares/Auth";
import { validateRole } from "../../../middlewares/ValidateRole";

const categoryAdminRouter = Router()
const controller = new CategoryController()

categoryAdminRouter.post('/new', auth, validateRole(['admin', 'superadmin']), controller.newCategoryController.bind(controller))
categoryAdminRouter.patch('/edit/:id', auth, validateRole(['admin', 'superadmin']), controller.editCategoryController.bind(controller))
categoryAdminRouter.delete('/delete/:id', auth, validateRole(['admin', 'superadmin']), controller.deleteCategoryController.bind(controller))
categoryAdminRouter.get('/all', auth, validateRole(['admin', 'superadmin']), controller.getAllCategoriesController.bind(controller))

export default categoryAdminRouter