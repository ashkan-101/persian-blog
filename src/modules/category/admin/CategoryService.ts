import NotFoundException from "../../../exceptions/NotFoundException"
import ServerException from "../../../exceptions/ServerException"
import ValidationException from "../../../exceptions/ValidationException"
import CategoryStatus from "../entity/contracts/CategoryStatus"
import CategoryFactory from "./CategoryFactory"


export default class CategoryService{
  private readonly factory: CategoryFactory

  constructor(){
    this.factory = new CategoryFactory()
  }

//category
  public async newCategory(categoryTitle: string){
    const validateCategoryTitle = await this.factory.getCategoryWithTitle(categoryTitle)
    if(validateCategoryTitle){
      throw new ValidationException('this title for category already used')
    }
    return await this.factory.saveNewCategory(categoryTitle)
  }

  public async editCategory(categoryId: string, categoryTitle?: string, categoryStatus?: CategoryStatus){
    if(categoryTitle){
      const validateCategoryTitle = await this.factory.getCategoryWithTitle(categoryTitle)
      if(validateCategoryTitle){
        throw new ValidationException('this title for category already used')
      }
    }
    const updateResult = await this.factory.saveUpdateCategory(categoryId, categoryTitle, categoryStatus)
    if(!updateResult){
      throw new ServerException('update process faile')
    }
  }

  public async deleteCategory(categoryId: string){
    const deleteResult = await this.factory.deleteCategoryWithId(categoryId)
    if(!deleteResult){
      throw new NotFoundException('not found any record')
    }
  }

  public async getCategories(){
    return await this.factory.getAllCategories(['subcategories'])
  }

//subcategory
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
}