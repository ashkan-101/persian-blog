import { FindOptionsWhere } from "typeorm";
import IRegisterCodePGRepository from "./contracts/IRegisterCode.PG.Repository";
import IRegisterCode from "../entity/contracts/IRegisterCode";
import RegisterCode from "../entity/RegisterCode";


export default class RegisterCodePGRepository implements IRegisterCodePGRepository {
    public async findOne(params: Partial<IRegisterCode>, relations?: string[]): Promise<IRegisterCode | null> {
      const whereClause: FindOptionsWhere<RegisterCode> = { ...params } as FindOptionsWhere<RegisterCode>;
      return await RegisterCode.findOne({ where: whereClause, relations: relations });
    }
  
    public async findById(id: string, relations?: string[]): Promise<IRegisterCode | null> {
      return await RegisterCode.findOne({ where: { id }, relations });
    }
  
    public async findMany(params: Partial<IRegisterCode>, relations?: string[]): Promise<IRegisterCode[]> {
      const whereClause: FindOptionsWhere<RegisterCode> = { ...params } as FindOptionsWhere<RegisterCode>;
      return await RegisterCode.find({ where: whereClause, relations: relations });
    }
  
    public async create(params: Partial<IRegisterCode>): Promise<IRegisterCode> {
      const user = RegisterCode.create({...params});
      return await user.save();
    }
  
    public async updateOne(where: Partial<IRegisterCode>, params: Partial<IRegisterCode>): Promise<boolean> {
      const whereClause: FindOptionsWhere<RegisterCode> = { ...where } as FindOptionsWhere<RegisterCode>;
      const result = await RegisterCode.update(whereClause, params);
      return result.affected !== 0;
    }
  
    public async updateMany(where: Partial<IRegisterCode>, params: Partial<IRegisterCode>): Promise<boolean> {
      const whereClause: FindOptionsWhere<RegisterCode> = { ...where } as FindOptionsWhere<RegisterCode>;
      const result = await RegisterCode.update(whereClause, params);
      return result.affected !== 0;
    }
  
    public async deleteOne(where: Partial<IRegisterCode>): Promise<boolean> {
      const whereClause: FindOptionsWhere<RegisterCode> = { ...where } as FindOptionsWhere<RegisterCode>;
      const result = await RegisterCode.delete(whereClause);
      return result.affected !== 0;
    }
  
    public async deleteMany(params: Partial<IRegisterCode>): Promise<boolean> {
      const whereClause: FindOptionsWhere<RegisterCode> = { ...params } as FindOptionsWhere<RegisterCode>;
      const result = await RegisterCode.delete(whereClause);
      return result.affected !== 0;
    }
}