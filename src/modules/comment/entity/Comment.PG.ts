import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn,  } from "typeorm";
import ICommentPG from "./contracts/IComment.PG";
import UserPG from "../../user/entity/User.PG";
import PostPG from "../../post/entity/Post.PG";

@Entity('comment')
export default class CommentPG extends BaseEntity implements ICommentPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @Column({type: 'text', nullable: false, length: 150})
  body!: string;

  @ManyToOne(()=> UserPG, user => user.comment)
  @JoinColumn({name: 'user'})
  user!: UserPG;
  
  @ManyToOne(() => PostPG, post => post.comments)
  @JoinColumn({name: 'post'})
  post!: PostPG;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}