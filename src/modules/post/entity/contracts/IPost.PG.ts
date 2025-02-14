import ISubcategoryPG from "../../../subcategory/entity/contracts/ISubcategory.PG"
import ICommentPG from "../../../comment/entity/contracts/IComment.PG"
import IUserPG from "../../../user/entity/contracts/IUser.PG"

export default interface IPostPG {
  id: string
  author: IUserPG
  title: string
  metaTitle: string
  description: string
  metaDescription: string
  thumbnail: string
  thumbnailAltText: string
  compressedThumbnail: string
  gallery: string[]
  slug: string
  subcategory: ISubcategoryPG
  views: number
  tags: string[]
  likes: string[]
  comments: ICommentPG[]
  // favoriteBy: IUserPG[]
  createdAt: Date
  updatedAt: Date
}