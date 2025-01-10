import CategoryStatus from "../entity/contracts/CategoryStatus";
import CategoryPGRepository from "../repositories/Category.PG.Repository";
import ICategoryPGRepository from "../repositories/contracts/ICategory.PG.Repository";

export default class CategoryRepositoryProvider {
  private readonly categoryRepository: ICategoryPGRepository

  constructor(){
    this.categoryRepository = new CategoryPGRepository()
  }

  public async getActiveCategories(relations: string[]){
    return await this.categoryRepository.findMany({status: CategoryStatus.ACTIVE}, relations)
  }

}