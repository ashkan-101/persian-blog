import NotFoundException from "../../../exceptions/NotFoundException"
import ValidationException from "../../../exceptions/ValidationException"
import SubcategoryFactory from "./SubcategoryFactory"

export default class SubcategoryService{
  private readonly factory: SubcategoryFactory

  constructor(){
    this.factory = new SubcategoryFactory()
  }

  public async newSubcategory(subcategoryTitle: string, categoryId: string){
    const validateSubcategoryTitle = await this.factory.getSubcategoryWithTitle(subcategoryTitle)
    if(validateSubcategoryTitle){
      throw new ValidationException('this title for subcategory already used')
    }
    return await this.factory.saveNewSubcategory(subcategoryTitle, categoryId)
  }

  public async deleteSubcategory(subcategoryId: string){
    const deleteresult = await this.factory.deleteSubcategoryWithId(subcategoryId)
    if(!deleteresult){
      throw new NotFoundException('not found any record')
    }
  }

  public async getSubcategories(){
    return await this.factory.getAllSubcategories(['category'])
  }
}