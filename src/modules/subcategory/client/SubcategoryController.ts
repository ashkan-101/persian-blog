import ISubcategoryPG from "../../subcategory/entity/contracts/ISubcategory.PG"
import { Request, Response, NextFunction } from "express"
import SubcategoryService from "./SubcategoryService"


export default class SubcategoryController {
  private readonly service: SubcategoryService

  constructor(){
    this.service = new SubcategoryService()
  }

  public async subcategoryList(req: Request, res: Response, next: NextFunction){
    try {
      const subcategories: ISubcategoryPG[] = await this.service.subcategoryList()
      res.status(200).send({
        msg: true,
        userId: req.user?.id,
        subcategories
      })
    } catch (error) {
      next(error)
    }
  }

}