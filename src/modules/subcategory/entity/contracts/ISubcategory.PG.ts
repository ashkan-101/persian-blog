import ICategoryPG from "../../../category/entity/contracts/ICategory.PG"
import IPostPG from "../../../post/entity/contracts/IPost.PG"
import IUserPG from "../../../user/entity/contracts/IUser.PG"

export default interface ISubcategoryPG{
  id: string
  title: string
  category: ICategoryPG
  posts: IPostPG[]
  folowingUsers: IUserPG[]
  createdAt: Date
  updatedAt: Date
}