import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, OneToMany, BaseEntity } from "typeorm";
import ICategoryPG from "./contracts/ICategory.PG";
import CategoryStatus from "./contracts/CategoryStatus";
import SubcategoryPG from "../../subcategory/entity/Subcategory.PG";
import ISubcategoryPG from "../../subcategory/entity/contracts/ISubcategory.PG";

@Entity('category')
export default class CategoryPG extends BaseEntity implements ICategoryPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @Column({type: 'enum', enum: CategoryStatus, default: CategoryStatus.ACTIVE})
  status!: CategoryStatus;

  @OneToMany(()=> SubcategoryPG, subcategoryPG => subcategoryPG.category)
  subcategories!: ISubcategoryPG[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
}