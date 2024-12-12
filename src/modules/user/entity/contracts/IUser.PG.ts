import ISubcategoryPG from "../../../category/entity/contracts/ISubcategory.PG"

export default interface IUserPG {
  id: string
  name: string
  mobile: string
  avatar: string
  favoriteSubcategories: ISubcategoryPG[]
  // favoritePosts:
  // favoriteAuthors: 
  // comment: 
  createdAt: Date
  updatedAt: Date
}