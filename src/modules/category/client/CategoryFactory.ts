import IPagination from "../../contracts/IPaginaton";
import CategoryStatus from "../entity/contracts/CategoryStatus";
import ICategoryPG from "../entity/contracts/ICategory.PG";
import CategoryPGRepository from "../repositories/Category.PG.Repository";
import ICategoryPGRepository from "../repositories/contracts/ICategory.PG.Repository";

export default class CategoryFactory {
  private readonly categoryRepository: ICategoryPGRepository

  constructor(){
    this.categoryRepository = new CategoryPGRepository()
  }

  public async getCategoriesList(where: Partial<ICategoryPG>, relations?: string[], pageination?: IPagination){
    return await this.categoryRepository.findMany(where, relations, pageination)
  }

}