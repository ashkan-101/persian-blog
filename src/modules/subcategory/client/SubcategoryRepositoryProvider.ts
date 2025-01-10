import ISubcategoryPGRepository from "../repositories/contracts/ISubcategory.PG.Repository";
import SubcategoryPGRepository from "../repositories/Subcategory.PG.Repository";


export default class SubcategoryRepositoryProvider {
  private readonly subcategoryRepository: ISubcategoryPGRepository

  constructor(){
    this.subcategoryRepository = new SubcategoryPGRepository()
  }

  public async getAllSubcategories(relations: string[]){
    return await this.subcategoryRepository.findMany({}, relations)
  }

}