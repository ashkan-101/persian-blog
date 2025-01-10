import SubcategoryRepositoryProvider from "./SubcategoryRepositoryProvider"


export default class SubcategoryService{
  private readonly repositoryProvider: SubcategoryRepositoryProvider

  constructor(){
    this.repositoryProvider = new SubcategoryRepositoryProvider()
  }

  public async subcategoryList(){
    const list = await this.repositoryProvider.getAllSubcategories(['category'])
    return list
  }

}