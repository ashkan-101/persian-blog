import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn, OneToMany,  } from "typeorm";
import ICommentPG from "./contracts/IComment.PG";
import UserPG from "../../user/entity/User.PG";
import PostPG from "../../post/entity/Post.PG";
import CommentReplayPG from "../../comment-replies/entity/CommentReply.PG";
import IPostPG from "../../post/entity/contracts/IPost.PG";
import ICommentReplayPG from "../../comment-replies/entity/contracts/ICommentReply.PG";
import IUserPG from "../../user/entity/contracts/IUser.PG";

@Entity('comment')
export default class CommentPG extends BaseEntity implements ICommentPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @Column({type: 'varchar', length: 250, nullable: false})
  description!: string;

  @ManyToOne(()=> UserPG, user => user.comment)
  @JoinColumn({name: 'user'})
  user!: IUserPG;
  
  @ManyToOne(() => PostPG, post => post.comments)
  @JoinColumn({name: 'post'})
  post!: IPostPG;

  @OneToMany(() => CommentReplayPG, commentReplay => commentReplay.parentComment)
  replies!: ICommentReplayPG[];

  @Column({type: 'jsonb', default: []})
  likes!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}