import IUserPG from "../../../user/entity/contracts/IUser.PG"
import ICategoryPG from "./ICategory.PG"

export default interface ISubcategoryPG{
  id: string
  title: string
  category: ICategoryPG
  // posts: 
  folowingUsers: IUserPG[]
  createdAt: Date
  updatedAt: Date
}