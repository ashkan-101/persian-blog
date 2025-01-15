import { FindOptionsWhere } from "typeorm";
import ICategoryPGRepository from "./contracts/ICategory.PG.Repository";
import ICategoryPG from "../entity/contracts/ICategory.PG";
import CategoryPG from "../entity/Category.PG";
import IPagination from "../../contracts/IPaginaton";

export default class CategoryPGRepository implements ICategoryPGRepository {
    public async findOne(params: Partial<ICategoryPG>, relations?: string[]): Promise<ICategoryPG | null> {
      const whereClause: FindOptionsWhere<CategoryPG> = { ...params } as FindOptionsWhere<CategoryPG>;
      return await CategoryPG.findOne({ where: whereClause, relations: relations });
    }
  
    public async findById(id: string, relations?: string[]): Promise<ICategoryPG | null> {
      return await CategoryPG.findOne({ where: { id }, relations });
    }
  
    public async findMany(params: Partial<ICategoryPG>, relations?: string[], pagination?: IPagination): Promise<ICategoryPG[]> {
      const whereClause: FindOptionsWhere<CategoryPG> = { ...params } as FindOptionsWhere<CategoryPG>;
      return await CategoryPG.find({ 
        where: whereClause, 
        relations: relations,
        take: pagination?.take,
        skip: pagination?.skip,
       });
    }
  
    public async create(params: Partial<ICategoryPG>): Promise<ICategoryPG> {
      const user = CategoryPG.create({...params});
      return await user.save();
    }
  
    public async updateOne(where: Partial<ICategoryPG>, params: Partial<ICategoryPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CategoryPG> = { ...where } as FindOptionsWhere<CategoryPG>;
      const result = await CategoryPG.update(whereClause, params);
      return result.affected !== 0;
    }
  
    public async updateMany(where: Partial<ICategoryPG>, params: Partial<ICategoryPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CategoryPG> = { ...where } as FindOptionsWhere<CategoryPG>;
      const result = await CategoryPG.update(whereClause, params);
      return result.affected !== 0;
    }
  
    public async deleteOne(where: Partial<ICategoryPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CategoryPG> = { ...where } as FindOptionsWhere<CategoryPG>;
      const result = await CategoryPG.delete(whereClause);
      return result.affected !== 0;
    }
  
    public async deleteMany(params: Partial<ICategoryPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<CategoryPG> = { ...params } as FindOptionsWhere<CategoryPG>;
      const result = await CategoryPG.delete(whereClause);
      return result.affected !== 0;
    }
}