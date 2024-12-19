import CategoryStatus from "../entity/contracts/CategoryStatus"
import ICategoryPG from "../entity/contracts/ICategory.PG"
import CategoryService from "./CategoryService"
import { Request, Response, NextFunction } from "express"


export default class CategoryController {
  private readonly service: CategoryService

  constructor(){
    this.service = new CategoryService()
  }

  public async newCategory(req: Request, res: Response, next: NextFunction){
    try {
      const categoryTitle: string = req.body.categoryTitle

      const category: ICategoryPG = await this.service.newCategory(categoryTitle)

      res.status(201).send({
        msg: true,
        category
      })

    } catch (error) {
      next(error)
    }
  }

  public async editCategory(req: Request, res: Response, next: NextFunction){
    try {
      const categoryId: string = req.params.id
      const categoryTitle: string = req.body.categoryTitle
      const categoryStatus: CategoryStatus = req.body.categoryStatus
      if(categoryTitle || categoryStatus){
        await this.service.editCategory(categoryId ,categoryTitle, categoryStatus)
      } 
      res.status(200).send({
        msg: true
      })
    } catch (error) {
      next(error)
    }
  }

  public async deleteCategory(req: Request, res: Response, next: NextFunction){
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

  public async getCategories(req: Request, res: Response, next: NextFunction){
    try {
      const categories: ICategoryPG[] = await this.service.getCategories()
      res.status(200).send({
        msg: true,
        categories
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

}