import ISubcategoryPG from "../entity/contracts/ISubcategory.PG"
import { Request, Response, NextFunction } from "express"
import SubcategoryService from "./SubcategoryService"


export default class SubcategoryController {
  private readonly service: SubcategoryService

  constructor(){
    this.service = new SubcategoryService()
  }

  public async newSubcategoryController(req: Request, res: Response, next: NextFunction){
    try {
      const subcategoryTitle: string = req.body.subcategoryTitle
      const categoryId: string = req.body.categoryId
      
      const subcategory: ISubcategoryPG = await this.service.newSubcategoryService(subcategoryTitle, categoryId)
      
      res.status(201).send({
        subcategory
      })
    } catch (error) {
      next(error)
    }
  }

  public async deleteSubcategoryController(req: Request, res: Response, next: NextFunction){
    try {
      const subcategoryId: string = req.params.id

      await this.service.deleteSubcategoryService(subcategoryId)

      res.status(200).send({
        msg: true
      })
    } catch (error) {
      next(error)
    }
  }

  public async getSubcategoriesController(req: Request, res: Response, next: NextFunction){
    try {
      const page: number = req.query.page ? +req.query.page : 1

      const subcategories = await this.service.getSubcategoriesService(page)

      res.status(200).send({
        subcategories
      })
    } catch (error) {
      next(error)
    }
  }

}