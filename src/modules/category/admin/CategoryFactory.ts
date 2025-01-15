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

  public async saveNewCategory(categoryTitle: string){
    return await this.categoryRepository.create({title: categoryTitle})
  }
  
  public async getCategoryWithTitle(categoryTitle: string){
    return await this.categoryRepository.findOne({title: categoryTitle})
  }

  public async saveUpdateCategory(categoryId: string, categoryParams: Partial<ICategoryPG>){
    return await this.categoryRepository.updateOne({id: categoryId}, categoryParams)
  }

  public async deleteCategoryWithId(categoryId: string){
    return await this.categoryRepository.deleteOne({id: categoryId})
  }

  public async getAllCategories(pagination: IPagination, relations?: string[]){
    return await this.categoryRepository.findMany({}, relations, pagination)
  }
}