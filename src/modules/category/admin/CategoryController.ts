import CategoryStatus from "../entity/contracts/CategoryStatus"
import ICategoryPG from "../entity/contracts/ICategory.PG"
import CategoryService from "./CategoryService"
import { Request, Response, NextFunction } from "express"


export default class CategoryController {
  private readonly service: CategoryService

  constructor(){
    this.service = new CategoryService()
  }

  public async newCategoryController(req: Request, res: Response, next: NextFunction){
    try {
      const categoryTitle: string = req.body.categoryTitle

      const category: ICategoryPG = await this.service.newCategoryService(categoryTitle)

      res.status(201).send({
        category
      })

    } catch (error) {
      next(error)
    }
  }

  public async editCategoryController(req: Request, res: Response, next: NextFunction){
    try {
      const categoryId: string = req.params.id
      const categoryParams: Partial<ICategoryPG> = {
        title: req.body.categoryTitle,
        status: req.body.categoryStatus
      }

      await this.service.editCategoryService(categoryId, categoryParams)

      res.status(200).send({
        msg: true
      })
    } catch (error) {
      next(error)
    }
  }

  public async deleteCategoryController(req: Request, res: Response, next: NextFunction){
    try {
      const categoryId: string = req.params.id

      await this.service.deleteCategory(categoryId)

      res.status(200).send({
        msg: true
      })
    } catch (error) {
      next(error)
    }
  }

  public async getAllCategoriesController(req: Request, res: Response, next: NextFunction){
    try {
      const page: number = req.query.page ? +req.query.page : 1

      const categories: ICategoryPG[] = await this.service.getCategoriesService(page)

      res.status(200).send({
        categories
      })
    } catch (error) {
      next(error)
    }
  }

}