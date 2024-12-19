import CategoryFactory from "./CategoryFactory"


export default class CategoryService{
  private readonly factory: CategoryFactory

  constructor(){
    this.factory = new CategoryFactory()
  }

  public async categoryList(){
    const list = await this.factory.getActiveCategories(['subcategories'])
    return list
  }

}