import ISubcategoryPGRepository from "../repositories/contracts/ISubcategory.PG.Repository";
import SubcategoryPGRepository from "../repositories/Subcategory.PG.Repository";


export default class CategoryFactory {
  private readonly subcategoryRepository: ISubcategoryPGRepository

  constructor(){
    this.subcategoryRepository = new SubcategoryPGRepository()
  }

  public async getSubcategoryWithTitle(subcategoryTitle: string){
    return await this.subcategoryRepository.findOne({title: subcategoryTitle})
  }

  public async saveNewSubcategory(subcategoryTitle: string, categoryId: string){
    return await this.subcategoryRepository.create({title: subcategoryTitle, category: categoryId})
  }

  public async deleteSubcategoryWithId(subcategoryId: string){
    return await this.subcategoryRepository.deleteOne({id: subcategoryId})
  }

  public async getAllSubcategories(relations?: string[]){
    return await this.subcategoryRepository.findMany({}, relations)
  }
}