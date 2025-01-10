import CategoryRepositoryProvider from "./CategoryRepositoryProvider"

export default class CategoryService{
  private readonly repositoryProvider: CategoryRepositoryProvider

  constructor(){
    this.repositoryProvider = new CategoryRepositoryProvider()
  }

  public async categoryList(){
    const list = await this.repositoryProvider.getActiveCategories(['subcategories'])
    return list
  }

}