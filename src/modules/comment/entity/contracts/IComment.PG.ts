import IPostPG from "../../../post/entity/contracts/IPost.PG"
import IUserPG from "../../../user/entity/contracts/IUser.PG"

export default interface ICommentPG {
  id: string
  title: string
  body: string
  user: IUserPG
  post: IPostPG
  createdAt: Date
  updatedAt: Date
}