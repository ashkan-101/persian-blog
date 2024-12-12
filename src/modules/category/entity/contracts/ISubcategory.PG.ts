import ICategoryPG from "./ICategory.PG"

export default interface ISubcategoryPG{
  id: string
  title: string
  category: ICategoryPG
  // posts: 
  // folowingUsers: 
  createdAt: Date
  updatedAt: Date
}