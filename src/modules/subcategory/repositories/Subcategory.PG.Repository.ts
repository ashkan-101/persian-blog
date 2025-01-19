import { FindOptionsWhere } from "typeorm";
import ISubcategoryPGRepository from "./contracts/ISubcategory.PG.Repository";
import ISubcategoryPG from "../entity/contracts/ISubcategory.PG";
import SubcategoryPG from "../entity/Subcategory.PG";
import IPagination from "../../contracts/IPaginaton";

export default class SubcategoryPGRepository implements ISubcategoryPGRepository {
    public async findOne(params: Partial<ISubcategoryPG>, relations?: string[]): Promise<ISubcategoryPG | null> {
      const whereClause: FindOptionsWhere<SubcategoryPG> = { ...params } as FindOptionsWhere<SubcategoryPG>;
      return await SubcategoryPG.findOne({ where: whereClause, relations: relations });
    }
  
    public async findById(id: string, relations?: string[]): Promise<ISubcategoryPG | null> {
      return await SubcategoryPG.findOne({ where: { id }, relations });
    }
  
    public async findMany(params: Partial<ISubcategoryPG>, relations?: string[], pagination?: IPagination): Promise<ISubcategoryPG[]> {
      const whereClause: FindOptionsWhere<SubcategoryPG> = { ...params } as FindOptionsWhere<SubcategoryPG>;
      return await SubcategoryPG.find({ 
        where: whereClause, 
        relations: relations,
        take: pagination?.take,
        skip: pagination?.skip
      });
    }
  
    public async create(params: Partial<ISubcategoryPG>): Promise<ISubcategoryPG> {
      const subcategory = SubcategoryPG.create({...params});
      return await subcategory.save();
    }
  
    public async updateOne(where: Partial<ISubcategoryPG>, params: Partial<ISubcategoryPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<SubcategoryPG> = { ...where } as FindOptionsWhere<SubcategoryPG>;
      const result = await SubcategoryPG.update(whereClause, params);
      return result.affected !== 0;
    }
  
    public async updateMany(where: Partial<ISubcategoryPG>, params: Partial<ISubcategoryPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<SubcategoryPG> = { ...where } as FindOptionsWhere<SubcategoryPG>;
      const result = await SubcategoryPG.update(whereClause, params);
      return result.affected !== 0;
    }
  
    public async deleteOne(where: Partial<ISubcategoryPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<SubcategoryPG> = { ...where } as FindOptionsWhere<SubcategoryPG>;
      const result = await SubcategoryPG.delete(whereClause);
      return result.affected !== 0;
    }
  
    public async deleteMany(params: Partial<ISubcategoryPG>): Promise<boolean> {
      const whereClause: FindOptionsWhere<SubcategoryPG> = { ...params } as FindOptionsWhere<SubcategoryPG>;
      const result = await SubcategoryPG.delete(whereClause);
      return result.affected !== 0;
    }
}