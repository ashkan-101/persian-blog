import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, BaseEntity, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import ISubcategoryPG from "./contracts/ISubcategory.PG";
import CategoryPG from "../../category/entity/Category.PG";
import UserPG from "../../user/entity/User.PG";
import PostPG from "../../post/entity/Post.PG";
import ICategoryPG from "../../category/entity/contracts/ICategory.PG";
import IPostPG from "../../post/entity/contracts/IPost.PG";
import IUserPG from "../../user/entity/contracts/IUser.PG";

@Entity('subcategory')
export default class SubcategoryPG extends BaseEntity implements ISubcategoryPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @ManyToOne(()=> CategoryPG, categoryPG => categoryPG.subcategories, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'category'})
  category!: ICategoryPG;

  @OneToMany(()=> PostPG, post => post.subcategory)
  posts!: IPostPG[];

  @ManyToMany(()=> UserPG, user => user.favoriteSubcategories)
  folowingUsers!: IUserPG[]

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}