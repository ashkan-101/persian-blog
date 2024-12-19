import ISubcategoryPGRepository from "../repositories/contracts/ISubcategory.PG.Repository";
import SubcategoryPGRepository from "../../subcategory/repositories/Subcategory.PG.Repository";


export default class CategoryFactory {
  private readonly subcategoryRepository: ISubcategoryPGRepository

  constructor(){
    this.subcategoryRepository = new SubcategoryPGRepository()
  }

  public async getAllSubcategories(relations: string[]){
    return await this.subcategoryRepository.findMany({}, relations)
  }

}