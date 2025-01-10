import NotFoundException from "../../../exceptions/NotFoundException"
import ValidationException from "../../../exceptions/ValidationException"
import SubcategoryRepositoryProvider from "./SubcategoryRepositoryProvider"

export default class SubcategoryService{
  private readonly repositoryProvider: SubcategoryRepositoryProvider

  constructor(){
    this.repositoryProvider = new SubcategoryRepositoryProvider()
  }

  public async newSubcategory(subcategoryTitle: string, categoryId: string){
    const validateSubcategoryTitle = await this.repositoryProvider.getSubcategoryWithTitle(subcategoryTitle)
    if(validateSubcategoryTitle){
      throw new ValidationException('this title for subcategory already used')
    }
    return await this.repositoryProvider.saveNewSubcategory(subcategoryTitle, categoryId)
  }

  public async deleteSubcategory(subcategoryId: string){
    const deleteresult = await this.repositoryProvider.deleteSubcategoryWithId(subcategoryId)
    if(!deleteresult){
      throw new NotFoundException('not found any record')
    }
  }

  public async getSubcategories(){
    return await this.repositoryProvider.getAllSubcategories(['category'])
  }
}