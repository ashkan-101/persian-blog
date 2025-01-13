import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import ICommentReplayPG from "./contracts/ICommentReplay.PG";
import CommentPG from "../../comment/entity/Comment.PG";
import UserPG from "../../user/entity/User.PG";
import IUserPG from "../../user/entity/contracts/IUser.PG";
import ICommentPG from "../../comment/entity/contracts/IComment.PG";

@Entity('comment-replaies')
export default class CommentReplayPG extends BaseEntity implements ICommentReplayPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
  @Column({type: 'varchar'})
  title!: string;

  @Column({type: 'varchar', length: 250})
  description!: string;

  @ManyToOne(() => UserPG, user => user.commentReplies)
  @JoinColumn({name: 'user'})
  user!: IUserPG;

  @ManyToOne(() => CommentPG, commentPG => commentPG.replies)
  @JoinColumn({name: 'parentComment'})
  parentComment!: ICommentPG;

  @Column({type: 'jsonb'})
  likes!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
}