import NotFoundException from "../../../exceptions/NotFoundException"
import ServerException from "../../../exceptions/ServerException"
import ValidationException from "../../../exceptions/ValidationException"
import CategoryStatus from "../entity/contracts/CategoryStatus"
import CategoryRepositoryProvider from "./CategoryRepositoryProvider"


export default class CategoryService{
  private readonly repositoryProvider: CategoryRepositoryProvider

  constructor(){
    this.repositoryProvider = new CategoryRepositoryProvider()
  }

  public async newCategory(categoryTitle: string){
    const validateCategoryTitle = await this.repositoryProvider.getCategoryWithTitle(categoryTitle)
    if(validateCategoryTitle){
      throw new ValidationException('this title for category already used')
    }
    return await this.repositoryProvider.saveNewCategory(categoryTitle)
  }

  public async editCategory(categoryId: string, categoryTitle?: string, categoryStatus?: CategoryStatus){
    if(categoryTitle){
      const validateCategoryTitle = await this.repositoryProvider.getCategoryWithTitle(categoryTitle)
      if(validateCategoryTitle){
        throw new ValidationException('this title for category already used')
      }
    }
    const updateResult = await this.repositoryProvider.saveUpdateCategory(categoryId, categoryTitle, categoryStatus)
    if(!updateResult){
      throw new ServerException('update process faile')
    }
  }

  public async deleteCategory(categoryId: string){
    const deleteResult = await this.repositoryProvider.deleteCategoryWithId(categoryId)
    if(!deleteResult){
      throw new NotFoundException('not found any record')
    }
  }

  public async getCategories(){
    return await this.repositoryProvider.getAllCategories(['subcategories'])
  }
}