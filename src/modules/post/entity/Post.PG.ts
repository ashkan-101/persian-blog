import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import IPostPG from "./contracts/IPost.PG";
import SubcategoryPG from "../../subcategory/entity/Subcategory.PG";
import CommentPG from "../../comment/entity/Comment.PG";
import ICommentPG from "../../comment/entity/contracts/IComment.PG";
import ISubcategoryPG from "../../subcategory/entity/contracts/ISubcategory.PG";
import IUserPG from "../../user/entity/contracts/IUser.PG";
import UserPG from "../../user/entity/User.PG";

@Entity('post')
export default class PostPG extends BaseEntity implements IPostPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserPG, user => user.posts, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'authorId'})
  author!: IUserPG;

  @Column({type: 'varchar'})
  title!: string;

  @Column({type: 'varchar', length: 70, nullable: true})
  metaTitle!: string;

  @Column({type: 'text'})
  description!: string;

  @Column({type: 'varchar', length: 170, nullable: true})
  metaDescription!: string;

  @Column({type: 'varchar', nullable: true})
  thumbnail!: string;

  @Column({type: 'varchar', nullable: true})
  thumbnailAltText!: string;

  @Column({type: 'varchar'})
  compressedThumbnail!: string;

  @Column({type: 'jsonb'})
  gallery!: string[];

  @Column({type: 'varchar'})
  slug!: string;

  @ManyToOne(()=> SubcategoryPG, subcategory => subcategory.posts, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'subcategory'})
  subcategory!: ISubcategoryPG;

  @OneToMany(()=> CommentPG, comment => comment.post)
  comments!: ICommentPG[];

  // @ManyToMany(()=> UserPG, user => user.favoritePosts)
  // favoriteBy!: UserPG[];

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