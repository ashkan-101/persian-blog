import ICategoryPG from "../entity/contracts/ICategory.PG"
import CategoryService from "./CategoryService"
import { Request, Response, NextFunction } from "express"


export default class CategoryController {
  private readonly service: CategoryService

  constructor(){
    this.service = new CategoryService()
  }

  public async categoryList(req: Request, res: Response, next: NextFunction){
    try {
      const categories: ICategoryPG[] = await this.service.categoryList()
      res.status(200).send({
        msg: true,
        categories
      })
    } catch (error) {
      next(error)
    }
  }

}