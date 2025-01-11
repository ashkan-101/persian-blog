import IPostPG from "../entity/contracts/IPost.PG";
import { config } from "dotenv";
config()

export const transform = async(item: IPostPG) => {
  return {
    id: item.id,
    thumbnail: `${process.env.APP_URL}:${process.env.APP_PORT}/pub/thumbnails/${item.thumbnail}`,
    title: item.title,
    likes: item.likes,
    likesCount: item.likes.length,
    // commentsCount:
    body: item.body,
    tags: item.tags,
    createdAt: item.createdAt
  }
}
