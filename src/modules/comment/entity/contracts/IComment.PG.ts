import ICommentReplayPG from "../../../comment-replies/entity/contracts/ICommentReply.PG"
import IPostPG from "../../../post/entity/contracts/IPost.PG"
import IUserPG from "../../../user/entity/contracts/IUser.PG"

export default interface ICommentPG {
  id: string
  title: string
  description: string
  user: IUserPG
  post: IPostPG
  replies: ICommentReplayPG[]
  likes: string[]
  createdAt: Date
  updatedAt: Date
}