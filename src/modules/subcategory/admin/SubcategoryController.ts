import ISubcategoryPG from "../entity/contracts/ISubcategory.PG"
import { Request, Response, NextFunction } from "express"
import SubcategoryService from "./SubcategoryService"


export default class SubcategoryController {
  private readonly service: SubcategoryService

  constructor(){
    this.service = new SubcategoryService()
  }

  public async newSubcategory(req: Request, res: Response, next: NextFunction){
    try {
      const subcategoryTitle: string = req.body.subcategoryTitle
      const categoryId: string = req.body.categoryId
      
      const subcategory: ISubcategoryPG = await this.service.newSubcategory(subcategoryTitle, categoryId)
      
      res.status(201).send({
        msg: true,
        subcategory
      })
    } catch (error) {
      next(error)
    }
  }

  public async deleteSubcategory(req: Request, res: Response, next: NextFunction){
    try {
      const subcategoryId: string = req.params.id

      await this.service.deleteSubcategory(subcategoryId)

      res.status(200).send({
        msg: true
      })
    } catch (error) {
      next(error)
    }
  }

  public async getSubcategories(req: Request, res: Response, next: NextFunction){
    try {
      const subcategories: ISubcategoryPG[] = await this.service.getSubcategories()
      res.status(200).send({
        msg: true,
        subcategories
      })
    } catch (error) {
      next(error)
    }
  }

}