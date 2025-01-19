import { Router } from "express";
import SubcategoryController from "./SubcategoryController";

const subcategoryClientRouter: Router = Router()
const controller = new SubcategoryController()

subcategoryClientRouter.get('/all', controller.subcategoryList.bind(controller)) //get page number in query

export default subcategoryClientRouter