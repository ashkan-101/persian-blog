import IPostPG from "../../../post/entity/contracts/IPost.PG"
import IUserPG from "../../../user/entity/contracts/IUser.PG"
import ICategoryPG from "./ICategory.PG"

export default interface ISubcategoryPG{
  id: string
  title: string
  category: ICategoryPG
  posts: IPostPG[]
  folowingUsers: IUserPG[]
  createdAt: Date
  updatedAt: Date
}