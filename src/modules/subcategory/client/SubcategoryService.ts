import IPagination from "../../contracts/IPaginaton"
import SubcategoryFactory from "./SubcategoryFactory"


export default class SubcategoryService{
  private readonly subcategoryFactory: SubcategoryFactory

  constructor(){
    this.subcategoryFactory = new SubcategoryFactory()
  }

  public async subcategoryList(page: number){
    const pagination: IPagination = {
      take: 30,
      skip: (page - 1) * 30
    }

    const subcategories = await this.subcategoryFactory.getAllSubcategories(['category'], pagination)
    return subcategories
  }

}