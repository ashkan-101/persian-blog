import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, BaseEntity, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import ISubcategoryPG from "./contracts/ISubcategory.PG";
import CategoryPG from "./Category.PG";
import UserPG from "../../user/entity/User.PG";

@Entity('subcategory')
export default class SubcategoryPG extends BaseEntity implements ISubcategoryPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @ManyToOne(()=> CategoryPG, categoryPG => categoryPG.subcategories)
  @JoinColumn({name: 'category'})
  category!: CategoryPG;

  @ManyToMany(()=> UserPG, user => user.favoriteSubcategories)
  folowingUsers!: UserPG[]

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}