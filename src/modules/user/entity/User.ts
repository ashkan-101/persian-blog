import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";
import IUserPG from "./contracts/IUser.PG";

@Entity('user')
export default class User extends BaseEntity implements IUserPG {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', length: 30, nullable: true})
  name!: string;

  @Column({type: 'varchar', length: 11, nullable: false})
  mobile!: string;

  @Column({type: 'text', nullable: true})
  avatar!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}