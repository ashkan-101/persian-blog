import IPostPG from "../entity/contracts/IPost.PG";
import { config } from "dotenv";
config()


const transform = async (item: IPostPG) => {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    thumbnail: `${process.env.APP_URL}:${process.env.APP_PORT}/pub/compressed-thumbnails/${item.compressedThumbnail}`,
    views: item.views,
    // commentsCount: 
    }
}


export const collection = async (items: IPostPG[]) => {
  return Promise.all(items.map(async(item: IPostPG) => await transform(item))) 
}

