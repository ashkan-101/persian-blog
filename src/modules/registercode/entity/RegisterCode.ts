import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import IRegisterCode from "./contracts/IRegisterCode";

@Entity('registerCode')
export default class RegisterCode extends BaseEntity implements IRegisterCode {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', length: 15, nullable: false})
  mobile!: string;

  @Column({type: 'varchar', nullable: false})
  code!: string;

  @Column({type: 'numeric', default: Date.now() + 120000})
  expireAt!: number;
}