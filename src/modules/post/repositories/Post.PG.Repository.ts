import { FindOptionsWhere } from "typeorm";
import IPostPG from "../entity/contracts/IPost.PG";
import IPostPGRepository from "./contracts/IPost.PG.Repository";
import PostPG from "../entity/Post.PG";
import IPagination from "../../contracts/IPaginaton";
import PostSorting from "../entity/contracts/PostSorting";

export default class PostPGRepository implements IPostPGRepository {
  public async findOne(params: Partial<IPostPG>, relations?: string[]): Promise<IPostPG | null> {
    const whereClause: FindOptionsWhere<PostPG> = { ...params } as FindOptionsWhere<PostPG>
    return await PostPG.findOne({where: whereClause, relations: relations})
  }

  public async findById(id: string, relations?: string[]): Promise<IPostPG | null> {
    return await PostPG.findOne({where: { id }, relations})
  }

  public async findMany(params: Partial<IPostPG>, relations?: string[], pagination?: IPagination, sort?: PostSorting): Promise<IPostPG[]> {
    const whereClause: FindOptionsWhere<PostPG> = { ...params } as FindOptionsWhere<PostPG>
    if(sort && sort === PostSorting.NEWEST){
      return await PostPG.find({
        where: whereClause, 
        order: {createdAt: 'DESC'}, 
        relations,
        take: pagination?.take, 
        skip: pagination?.skip, 
      })
    }
    if(sort && sort === PostSorting.POPULAR){
      return await PostPG.find({
        where: whereClause,
        order: {views: 'DESC'},
        relations,
        take: pagination?.take,
        skip: pagination?.skip,
      })
    }
    return await PostPG.find({
      where: whereClause, 
      relations,
      take: pagination?.take,
      skip: pagination?.skip,
      })
  }

  public async create(params: Partial<IPostPG>): Promise<IPostPG> {
    const post = PostPG.create({...params})
    return await post.save()
  }

  public async updateOne(where: Partial<IPostPG>, params: Partial<IPostPG>): Promise<boolean> {
    const whereClause: FindOptionsWhere<PostPG> = { ...where } as FindOptionsWhere<PostPG>
    const updateResult = await PostPG.update(whereClause, params)
    return updateResult.affected !== 0
  }

  public async updateMany(where: Partial<IPostPG>, params: Partial<IPostPG>): Promise<boolean> {
    const whereClause: FindOptionsWhere<PostPG> = { ...where } as FindOptionsWhere<PostPG>
    const updateResult = await PostPG.update(whereClause, params)
    return updateResult.affected !== 0
  }

  public async deleteOne(where: Partial<IPostPG>): Promise<boolean> {
    const whereClause: FindOptionsWhere<PostPG> = { ...where } as FindOptionsWhere<PostPG>
    const deleteResult = await PostPG.delete(whereClause)
    return deleteResult.affected !== 0
  }

  public async deleteMany(params: Partial<IPostPG>): Promise<boolean> {
    const whereClause: FindOptionsWhere<PostPG> = { ...params } as FindOptionsWhere<PostPG>
    const deleteResult = await PostPG.delete(whereClause)
    return deleteResult.affected !== 0
  }
}