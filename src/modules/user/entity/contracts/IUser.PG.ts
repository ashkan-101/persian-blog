import ISubcategoryPG from "../../../category/entity/contracts/ISubcategory.PG"
import ICommentPG from "../../../comment/entity/contracts/IComment.PG"
import IPostPG from "../../../post/entity/contracts/IPost.PG"

export default interface IUserPG {
  id: string
  name: string
  mobile: string
  avatar: string
  favoriteSubcategories: ISubcategoryPG[]
  favoritePosts: IPostPG[]
  // favoriteAuthors: 
  comment: ICommentPG[]
  createdAt: Date
  updatedAt: Date
}