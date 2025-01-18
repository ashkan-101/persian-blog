import ISubcategoryPGRepository from "../repositories/contracts/ISubcategory.PG.Repository";
import SubcategoryPGRepository from "../repositories/Subcategory.PG.Repository";
import CategoryPGRepository from "../../category/repositories/Category.PG.Repository";
import ICategoryPGRepository from "../../category/repositories/contracts/ICategory.PG.Repository";
import ISubcategoryPG from "../entity/contracts/ISubcategory.PG";
import IPagination from "../../contracts/IPaginaton";

export default class SubcategoryFactory {
  private readonly subcategoryRepository: ISubcategoryPGRepository
  private readonly categoryRepository: ICategoryPGRepository

  constructor(){
    this.subcategoryRepository = new SubcategoryPGRepository()
    this.categoryRepository = new CategoryPGRepository()
  }

  public async getSubcategoryWithTitle(subcategoryTitle: string){
    return await this.subcategoryRepository.findOne({title: subcategoryTitle})
  }

  public async saveNewSubcategory(subcategoryParams: Partial<ISubcategoryPG>){
    return await this.subcategoryRepository.create(subcategoryParams)
  }

  public async deleteSubcategoryWithId(subcategoryId: string){
    return await this.subcategoryRepository.deleteOne({id: subcategoryId})
  }

  public async getAllSubcategories(where: Partial<ISubcategoryPG>, relations?: string[], pagination?: IPagination){
    return await this.subcategoryRepository.findMany(where, relations, pagination)
  }

  public async getCategoryWithId(categoryId: string){
    return await this.categoryRepository.findById(categoryId)
  }
}