import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity, BaseEntity, ManyToMany, OneToMany, JoinTable } from "typeorm";
import IUserPG from "./contracts/IUser.PG";
import SubcategoryPG from "../../subcategory/entity/Subcategory.PG";
import CommentPG from "../../comment/entity/Comment.PG";
import PostPG from "../../post/entity/Post.PG";

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
  favoriteSubcategories!: string[]

  @OneToMany(()=> CommentPG, comment => comment.user)
  comment!: CommentPG[];

  @ManyToMany(()=> PostPG, post => post.favoriteBy)
  @JoinTable()
  favoritePosts!: PostPG[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}