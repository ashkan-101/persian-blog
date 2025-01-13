import ICommentPG from "../../../comment/entity/contracts/IComment.PG"
import IUserPG from "../../../user/entity/contracts/IUser.PG"


export default interface ICommentReplayPG {
  id: string
  title: string
  description: string
  user: IUserPG
  parentComment: ICommentPG
  likes: string[]
  createdAt: Date
  updatedAt: Date
}