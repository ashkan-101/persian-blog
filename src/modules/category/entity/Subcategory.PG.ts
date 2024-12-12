import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, BaseEntity, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import ISubcategoryPG from "./contracts/ISubcategory.PG";
import CategoryPG from "./Category.PG";
import UserPG from "../../user/entity/User.PG";
import IPostPG from "../../post/entity/contracts/IPost.PG";
import PostPG from "../../post/entity/Post.PG";

@Entity('subcategory')
export default class SubcategoryPG extends BaseEntity implements ISubcategoryPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @ManyToOne(()=> CategoryPG, categoryPG => categoryPG.subcategories)
  @JoinColumn({name: 'category'})
  category!: CategoryPG;

  @OneToMany(()=> PostPG, post => post.subcategory, {onDelete: 'CASCADE'})
  posts!: PostPG[];

  @ManyToMany(()=> UserPG, user => user.favoriteSubcategories)
  folowingUsers!: UserPG[]

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}