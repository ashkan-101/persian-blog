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

//category
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

  public async getAllCategories(relations?: string[]){
    return await this.categoryRepository.findMany({}, relations)
  }

//subcategory
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