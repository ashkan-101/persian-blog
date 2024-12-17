import CategoryStatus from "../entity/contracts/CategoryStatus"
import ICategoryPG from "../entity/contracts/ICategory.PG"
import ISubcategoryPG from "../entity/contracts/ISubcategory.PG"
import CategoryService from "./CategoryService"
import { Request, Response, NextFunction } from "express"


export default class CategoryController {
  private readonly service: CategoryService

  constructor(){
    this.service = new CategoryService()
  }
//category
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

//subcategory
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