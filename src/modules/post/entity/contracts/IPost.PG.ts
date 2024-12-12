import ISubcategoryPG from "../../../category/entity/contracts/ISubcategory.PG"

export default interface IPostPG {
  id: string
  author: string
  title: string
  body: string
  thumbnail: string
  gallery: string[]
  slug: string
  subcategory: ISubcategoryPG
  views: number
  tags: string[]
  likes: string[]
  // comments: 
  createdAt: Date
  updatedAt: Date
}