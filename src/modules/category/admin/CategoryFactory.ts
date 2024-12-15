import CategoryStatus from "../entity/contracts/CategoryStatus";
import CategoryPGRepository from "../repositories/Category.PG.Repository";
import ICategoryPGRepository from "../repositories/contracts/ICategory.PG.Repository";
import ISubcategoryPGRepository from "../repositories/contracts/ISubcategory.PG.Repository";
import SubcategoryPGRepository from "../repositories/Subcategory.PG.Repository";


export default class CategoryFactory {
  private readonly categoryRepository: ICategoryPGRepository
  private readonly subcategoryRepository: ISubcategoryPGRepository

  constructor(){
    this.categoryRepository = new CategoryPGRepository()
    this.subcategoryRepository = new SubcategoryPGRepository()
  }

  public async saveNewCategory(categoryTitle: string){
    return await this.categoryRepository.create({title: categoryTitle})
  }
  
  public async getCategoryWithTitle(categoryTitle: string){
    return await this.categoryRepository.findOne({title: categoryTitle})
  }

  public async saveUpdateCategory(categoryId: string ,categoryTitle?: string, categoryStatus?: CategoryStatus){
    return await this.categoryRepository.updateOne({id: categoryId}, {title: categoryTitle, status: categoryStatus})
  }

  public async deleteCategoryWithId(categoryId: string){
    return await this.categoryRepository.deleteOne({id: categoryId})
  }
}