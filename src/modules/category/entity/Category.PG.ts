import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, OneToMany, BaseEntity } from "typeorm";
import ICategoryPG from "./contracts/ICategory.PG";
import CategoryStatus from "./contracts/CategoryStatus";
import SubcategoryPG from "./Subcategory.PG";

@Entity('category')
export default class CategoryPG extends BaseEntity implements ICategoryPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @Column({type: 'varchar', enum: CategoryStatus, default: CategoryStatus.ACTIVE})
  status!: CategoryStatus;

  @OneToMany(()=> SubcategoryPG, subcategoryPG => subcategoryPG.category, {onDelete: 'CASCADE'})
  subcategories!: SubcategoryPG[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
}