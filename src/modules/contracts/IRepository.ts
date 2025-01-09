import IPagination from "./IPaginaton"

export default interface IRepository<T>{
  findOne(params: Partial<T>, relations?: string[]): Promise<T | null>
  findById(id: string, relations?: string[]): Promise<T | null>
  findMany(params: Partial<T>, relations?: string[], pagination?: IPagination, sort?: any): Promise<T[]>
  create(params: Partial<T>): Promise<T>
  updateOne(where: Partial<T>, params: Partial<T>): Promise<boolean>
  updateMany(where: Partial<T>, params: Partial<T>): Promise<boolean>
  deleteOne(where: Partial<T>): Promise<boolean>
  deleteMany(params: Partial<T>): Promise<boolean>
}