import IPagination from "../../contracts/IPaginaton"
import PostSorting from "../entity/contracts/PostSorting"
import PostFactory from "./PostFactory"
import { collection } from "../services/TransformerPostList"
import { transform } from '../services/TransformerPostDetails'

export default class PostService {
  private readonly factory: PostFactory

  constructor(){
    this.factory = new PostFactory()
  }

  public async getPosts(sorting: PostSorting, page: number){
    const pagination: IPagination = {
      take: 20,
      skip: (page - 1) * 20
    }

    const getSortingPosts = await this.factory.getSortingPosts(pagination, sorting)
    const transformPosts = await collection(getSortingPosts)
    return transformPosts
  }
}