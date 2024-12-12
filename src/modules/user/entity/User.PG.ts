import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import IUserPG from "./contracts/IUser.PG";
import SubcategoryPG from "../../category/entity/Subcategory.PG";

@Entity('user')
export default class UserPG extends BaseEntity implements IUserPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', length: 30, nullable: true})
  name!: string;

  @Column({type: 'varchar', length: 11, nullable: false})
  mobile!: string;

  @Column({type: 'text', nullable: true})
  avatar!: string;

  @ManyToMany(()=> SubcategoryPG, subcategory => subcategory.folowingUsers)
  @JoinTable()
  favoriteSubcategories!: SubcategoryPG[]

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}