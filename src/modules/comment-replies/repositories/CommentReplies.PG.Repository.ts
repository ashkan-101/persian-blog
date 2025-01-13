import ICommentReplaiesPGRepository from "./contracts/ICommentReplies.PG.Repository";
import { FindOptionsWhere } from "typeorm";
import ICommentReplayPG from "../entity/contracts/ICommentReplay.PG";
import CommentReplayPG from "../entity/CommentReplay.PG";


export default class CommentRepliesPGRepository implements ICommentReplaiesPGRepository {
    public async findOne(params: Partial<ICommentReplayPG>, relations?: string[]): Promise<ICommentReplayPG | null> {
      const whereClause: FindOptionsWhere<CommentReplayPG> = { ...params } as FindOptionsWhere<CommentReplayPG>
      return await CommentReplayPG.findOne({where: whereClause, relations: relations})
    }
  
    public async findById(id: string, relations?: string[]): Promise<ICommentReplayPG | null> {
      return await CommentReplayPG.findOne({where: { id }, relations})
    }
  
    public async findMany(params: Partial<ICommentReplayPG>, relations?: string[]): Promise<ICommentReplayPG[]> {
      const whereClause: FindOptionsWhere<CommentReplayPG> = { ...params } as FindOptionsWhere<CommentReplayPG>
      return await CommentReplayPG.find({where: whereClause, relations})
    }
  
    public async create(params: Partial<ICommentReplayPG>): Promise<ICommentReplayPG> {
      const commentReplies = CommentReplayPG.create({...params})
      return await commentReplies.save()
    }
  
    public async updateOne(where: Partial<ICommentReplayPG>, params: Partial<ICommentReplayPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CommentReplayPG> = { ...where } as FindOptionsWhere<CommentReplayPG>
      const updateResult = await CommentReplayPG.update(whereClause, params)
      return updateResult.affected !== 0
    }
  
    public async updateMany(where: Partial<ICommentReplayPG>, params: Partial<ICommentReplayPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CommentReplayPG> = { ...where } as FindOptionsWhere<CommentReplayPG>
      const updateResult = await CommentReplayPG.update(whereClause, params)
      return updateResult.affected !== 0
    }
  
    public async deleteOne(where: Partial<ICommentReplayPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CommentReplayPG> = { ...where } as FindOptionsWhere<CommentReplayPG>
      const deleteResult = await CommentReplayPG.delete(whereClause)
      return deleteResult.affected !== 0
    }
  
    public async deleteMany(params: Partial<ICommentReplayPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CommentReplayPG> = { ...params } as FindOptionsWhere<CommentReplayPG>
      const deleteResult = await CommentReplayPG.delete(whereClause)
      return deleteResult.affected !== 0
    }
}