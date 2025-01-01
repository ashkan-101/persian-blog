import IPostPG from "../../../post/entity/contracts/IPost.PG"

export default interface ISubcategoryPG{
  id: string
  title: string
  category: string
  posts: string[]
  folowingUsers: string[]
  createdAt: Date
  updatedAt: Date
}