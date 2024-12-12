import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import IPostPG from "./contracts/IPost.PG";
import SubcategoryPG from "../../category/entity/Subcategory.PG";
import CommentPG from "../../comment/entity/Comment.PG";
import UserPG from "../../user/entity/User.PG";

@Entity('post')
export default class PostPG extends BaseEntity implements IPostPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar'})
  author!: string;

  @Column({type: 'varchar'})
  title!: string;

  @Column({type: 'text'})
  body!: string;

  @Column({type: 'varchar'})
  thumbnail!: string;

  @Column({type: 'jsonb'})
  gallery!: string[];

  @Column({type: 'varchar'})
  slug!: string;

  @ManyToOne(()=> SubcategoryPG, subcategory => subcategory.posts)
  @JoinColumn({name: 'subcategory'})
  subcategory!: SubcategoryPG;

  @OneToMany(()=> CommentPG, comment => comment.post)
  comments!: CommentPG[];

  @ManyToMany(()=> UserPG, user => user.favoritePosts)
  favoriteBy!: UserPG[];

  @Column({type: 'int', default: 0})
  views!: number;

  @Column({type: 'jsonb', default: []})
  tags!: string[];

  @Column({type: 'jsonb', default: []})
  likes!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
}