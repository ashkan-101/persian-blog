import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import ICommentReplayPG from "./contracts/ICommentReply.PG";
import CommentPG from "../../comment/entity/Comment.PG";
import UserPG from "../../user/entity/User.PG";
import IUserPG from "../../user/entity/contracts/IUser.PG";
import ICommentPG from "../../comment/entity/contracts/IComment.PG";

@Entity('comment-replaies')
export default class CommentReplayPG extends BaseEntity implements ICommentReplayPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
  @Column({type: 'varchar', nullable: false})
  title!: string;

  @Column({type: 'varchar', length: 250, nullable: false})
  description!: string;

  @ManyToOne(() => UserPG, user => user.commentReplies, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({name: 'user'})
  user!: IUserPG;

  @ManyToOne(() => CommentPG, commentPG => commentPG.replies, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'parentComment'})
  parentComment!: ICommentPG;

  @Column({type: 'jsonb', default: []})
  likes!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
}