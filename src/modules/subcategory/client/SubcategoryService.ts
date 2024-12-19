import SubcategoryFactory from "./SubcategoryFactory"


export default class SubcategoryService{
  private readonly factory: SubcategoryFactory

  constructor(){
    this.factory = new SubcategoryFactory()
  }

  public async subcategoryList(){
    const list = await this.factory.getAllSubcategories(['category'])
    return list
  }

}