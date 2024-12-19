import { Router } from "express";
import CategoryController from "./CategoryController";

const categoryClientRouter = Router()
const controller = new CategoryController()

categoryClientRouter.get('/list', controller.categoryList.bind(controller))

export default categoryClientRouter
