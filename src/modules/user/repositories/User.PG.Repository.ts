import UserPG from "../entity/User.PG";
import IUserPG from "../entity/contracts/IUser.PG";
import IUserPGRepository from "./contracts/IUser.PG.Repository";
import { FindOptionsWhere } from 'typeorm';

export default class UserPGRepository implements IUserPGRepository {
  public async findOne(params: Partial<IUserPG>, relations?: string[]): Promise<IUserPG | null> {
    const whereClause: FindOptionsWhere<UserPG> = { ...params } as FindOptionsWhere<UserPG>;
    return await UserPG.findOne({ where: whereClause, relations: relations });
  }

  public async findById(id: string, relations?: string[]): Promise<IUserPG | null> {
    return await UserPG.findOne({ where: { id }, relations });
  }

  public async findMany(params: Partial<IUserPG>, relations?: string[]): Promise<IUserPG[]> {
    const whereClause: FindOptionsWhere<UserPG> = { ...params } as FindOptionsWhere<UserPG>;
    return await UserPG.find({ where: whereClause, relations: relations });
  }

  public async create(params: Partial<IUserPG>): Promise<IUserPG> {
    const user = UserPG.create({...params});
    return await user.save();
  }

  public async updateOne(where: Partial<IUserPG>, params: Partial<IUserPG>): Promise<boolean> {
    const whereClause: FindOptionsWhere<UserPG> = { ...where } as FindOptionsWhere<UserPG>;
    const result = await UserPG.update(whereClause, params);
    return result.affected !== 0;
  }

  public async updateMany(where: Partial<IUserPG>, params: Partial<IUserPG>): Promise<boolean> {
    const whereClause: FindOptionsWhere<UserPG> = { ...where } as FindOptionsWhere<UserPG>;
    const result = await UserPG.update(whereClause, params);
    return result.affected !== 0;
  }

  public async deleteOne(where: Partial<IUserPG>): Promise<boolean> {
    const whereClause: FindOptionsWhere<UserPG> = { ...where } as FindOptionsWhere<UserPG>;
    const result = await UserPG.delete(whereClause);
    return result.affected !== 0;
  }

  public async deleteMany(params: Partial<IUserPG>): Promise<boolean> {
    const whereClause: FindOptionsWhere<UserPG> = { ...params } as FindOptionsWhere<UserPG>;
    const result = await UserPG.delete(whereClause);
    return result.affected !== 0;
  }
}
