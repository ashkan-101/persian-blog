import IPagination from "../../contracts/IPaginaton"
import CategoryStatus from "../entity/contracts/CategoryStatus"
import CategoryFactory from "./CategoryFactory"

export default class CategoryService{
  private readonly categoryFactory: CategoryFactory

  constructor(){
    this.categoryFactory = new CategoryFactory()
  }

  public async getAllCategoriesService(page: number){
    const pagination: IPagination = {
      take: 20,
      skip: (page - 1) * 20
    }
    const cotegories = await this.categoryFactory.getCategoriesList({status: CategoryStatus.ACTIVE}, ["subcategories"], pagination)
    return cotegories
  }

}