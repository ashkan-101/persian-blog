import { Router } from "express";
import SubcategoryController from "./SubcategoryController";

const subcategoryClientRouter: Router = Router()
const controller = new SubcategoryController()

subcategoryClientRouter.get('/subcategory-list', controller.subcategoryList.bind(controller))

export default subcategoryClientRouter