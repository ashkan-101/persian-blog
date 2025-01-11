
export default interface ICommentPG {
  id: string
  title: string
  body: string
  user: string
  post: string
  likes: string[]
  createdAt: Date
  updatedAt: Date
}