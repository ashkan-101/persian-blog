import IPagination from "../../contracts/IPaginaton"
import PostSorting from "../entity/contracts/PostSorting"
import PostRepositoryProvider from "./PostRepositoryProvider"
import { collection } from "../services/TransformerPostList"
import { transform } from '../services/TransformerPostDetails'
import IPostPG from "../entity/contracts/IPost.PG"
import NotFoundException from "../../../exceptions/NotFoundException"

export default class PostService {
  private readonly repositoryProvider: PostRepositoryProvider

  constructor(){
    this.repositoryProvider = new PostRepositoryProvider()
  }

  public async getPosts(sorting: PostSorting, page: number){
    const pagination: IPagination = {
      take: 20,
      skip: (page - 1) * 20
    }

    const getSortingPosts = await this.repositoryProvider.getSortingPosts(pagination, sorting)
    const transformPosts = await collection(getSortingPosts)
    return transformPosts
  }
}