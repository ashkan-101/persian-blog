import ICategoryPG from "../entity/contracts/ICategory.PG"
import CategoryService from "./CategoryService"
import { Request, Response, NextFunction } from "express"


export default class CategoryController {
  private readonly service: CategoryService

  constructor(){
    this.service = new CategoryService()
  }

  public async getAllCategoriesController(req: Request, res: Response, next: NextFunction){
    try {
      const page: number = req.query.page ? +req.query.page : 1

      const categories = await this.service.getAllCategoriesService(page)
      
      res.status(200).send({
        categories
      })
    } catch (error) {
      next(error)
    }
  }

}