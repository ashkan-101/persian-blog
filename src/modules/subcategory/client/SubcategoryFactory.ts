import IPagination from "../../contracts/IPaginaton";
import ISubcategoryPGRepository from "../repositories/contracts/ISubcategory.PG.Repository";
import SubcategoryPGRepository from "../repositories/Subcategory.PG.Repository";


export default class SubcategoryFactory {
  private readonly subcategoryRepository: ISubcategoryPGRepository

  constructor(){
    this.subcategoryRepository = new SubcategoryPGRepository()
  }

  public async getAllSubcategories(relations: string[], pagination: IPagination){
    return await this.subcategoryRepository.findMany({}, relations, pagination)
  }

}