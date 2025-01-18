import NotFoundException from "../../../exceptions/NotFoundException"
import ValidationException from "../../../exceptions/ValidationException"
import IPagination from "../../contracts/IPaginaton"
import SubcategoryFactory from "./SubcategoryFactory"
import { validate as ValidateUUID } from "uuid"

export default class SubcategoryService{
  private readonly subcategoryFactory: SubcategoryFactory

  constructor(){
    this.subcategoryFactory = new SubcategoryFactory()
  }

//---------------------------------private methods
  private async validateAndGetCategoryService(categoryId: string){
    if(!ValidateUUID(categoryId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const category = await this.subcategoryFactory.getCategoryWithId(categoryId)

    if(!category){
      throw new NotFoundException('not found any category with this ID')
    }

    return category
  }

//---------------------------------public methods
  public async newSubcategoryService(subcategoryTitle: string, categoryId: string){
    const validateSubcategoryTitle = await this.subcategoryFactory.getSubcategoryWithTitle(subcategoryTitle)

    if(validateSubcategoryTitle){
      throw new ValidationException('this title for subcategory already used')
    }

    const category = await this.validateAndGetCategoryService(categoryId)

    return await this.subcategoryFactory.saveNewSubcategory({title: subcategoryTitle, category})
  }

  public async deleteSubcategoryService(subcategoryId: string){
    if(!ValidateUUID(subcategoryId)){
      throw new ValidationException('Please enter the ID format correctly')
    }

    const deleteResult = await this.subcategoryFactory.deleteSubcategoryWithId(subcategoryId)

    if(!deleteResult){
      throw new NotFoundException('not found any subcategory for delete with this ID')
    }
  }

  public async getSubcategoriesService(page: number){
    const pagination: IPagination = {
      take: 20,
      skip: (page - 1) * 20
    }

    return await this.subcategoryFactory.getAllSubcategories({}, ['category'], pagination)
  }
}