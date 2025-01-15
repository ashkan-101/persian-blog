import { Router } from "express";
import CategoryController from "./CategoryController";

const categoryClientRouter = Router()
const controller = new CategoryController()

categoryClientRouter.get('/all', controller.getAllCategoriesController.bind(controller))

export default categoryClientRouter
