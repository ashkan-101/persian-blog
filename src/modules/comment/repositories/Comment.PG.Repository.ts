import { FindOptionsWhere } from "typeorm";
import ICommentPGRepository from "./contracts/IComment.PG.Repository";
import ICommentPG from "../entity/contracts/IComment.PG";
import CommentPG from "../entity/Comment.PG";

export default class CommentPGRepository implements ICommentPGRepository {
    public async findOne(params: Partial<ICommentPG>, relations?: string[]): Promise<ICommentPG | null> {
      const whereClause: FindOptionsWhere<CommentPG> = { ...params } as FindOptionsWhere<CommentPG>
      return await CommentPG.findOne({where: whereClause, relations: relations})
    }
  
    public async findById(id: string, relations?: string[]): Promise<ICommentPG | null> {
      return await CommentPG.findOne({where: { id }, relations})
    }
  
    public async findMany(params: Partial<ICommentPG>, relations?: string[]): Promise<ICommentPG[]> {
      const whereClause: FindOptionsWhere<CommentPG> = { ...params } as FindOptionsWhere<CommentPG>
      return await CommentPG.find({where: whereClause, relations})
    }
  
    public async create(params: Partial<ICommentPG>): Promise<ICommentPG> {
      const user = CommentPG.create({...params})
      return await user.save()
    }
  
    public async updateOne(where: Partial<ICommentPG>, params: Partial<ICommentPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CommentPG> = { ...where } as FindOptionsWhere<CommentPG>
      const updateResult = await CommentPG.update(whereClause, params)
      return updateResult.affected !== 0
    }
  
    public async updateMany(where: Partial<ICommentPG>, params: Partial<ICommentPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CommentPG> = { ...where } as FindOptionsWhere<CommentPG>
      const updateResult = await CommentPG.update(whereClause, params)
      return updateResult.affected !== 0
    }
  
    public async deleteOne(where: Partial<ICommentPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CommentPG> = { ...where } as FindOptionsWhere<CommentPG>
      const deleteResult = await CommentPG.delete(whereClause)
      return deleteResult.affected !== 0
    }
  
    public async deleteMany(params: Partial<ICommentPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CommentPG> = { ...params } as FindOptionsWhere<CommentPG>
      const deleteResult = await CommentPG.delete(whereClause)
      return deleteResult.affected !== 0
    }
}