import NotFoundException from "../../../exceptions/NotFoundException"
import ServerException from "../../../exceptions/ServerException"
import ValidationException from "../../../exceptions/ValidationException"
import ICommentPG from "../../comment/entity/contracts/IComment.PG"
import IPagination from "../../contracts/IPaginaton"
import CategoryStatus from "../entity/contracts/CategoryStatus"
import ICategoryPG from "../entity/contracts/ICategory.PG"
import CategoryFactory from "./CategoryFactory"


export default class CategoryService{
  private readonly categoryFactory: CategoryFactory

  constructor(){
    this.categoryFactory = new CategoryFactory()
  }

  public async newCategoryService(categoryTitle: string){
    const validateCategoryTitle = await this.categoryFactory.getCategoryWithTitle(categoryTitle)
    if(validateCategoryTitle){
      throw new ValidationException('this title for category already used')
    }
    return await this.categoryFactory.saveNewCategory(categoryTitle)
  }

  public async editCategoryService(categoryId: string, categoryParams: Partial<Pick<ICategoryPG, 'title' | 'status'>>){
    if(categoryParams.title){
      const validateCategoryTitle = await this.categoryFactory.getCategoryWithTitle(categoryParams.title)
      if(validateCategoryTitle){
        throw new ValidationException('this title for category already used')
      }
    }
    const updateResult = await this.categoryFactory.saveUpdateCategory(categoryId, categoryParams)
    if(!updateResult){
      throw new ServerException('update process faile')
    }
  }

  public async deleteCategory(categoryId: string){
    const deleteResult = await this.categoryFactory.deleteCategoryWithId(categoryId)
    if(!deleteResult){
      throw new NotFoundException('not found any category with this id')
    }
  }

  public async getCategoriesService(page: number){
    const pagination: IPagination = {
      take: 20,
      skip: (page - 1) * 20
    }
    return await this.categoryFactory.getAllCategories(pagination, ['subcategories'])
  }
}