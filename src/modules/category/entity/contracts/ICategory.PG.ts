import CategoryStatus from "./CategoryStatus"
import ISubcategoryPG from "../../../subcategory/entity/contracts/ISubcategory.PG"

export default interface ICategoryPG {
  id: string
  title: string
  status: CategoryStatus
  subcategories: string[]
  createdAt: Date
  updatedAt: Date
}