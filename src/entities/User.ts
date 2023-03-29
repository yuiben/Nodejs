import { Entity, Column, OneToOne, JoinColumn, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { UserRole } from "../constant/Role";
import { BaseModel } from "./BaseModel";
import { Class } from "./Class";
import { UserInfo } from "./UserInfo";


@Entity({ name: 'user' })
export class User extends BaseModel {
  @Column()
  name: string

  @Column()
  password: string

  @Column({
    unique: true,
  })
  email: string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.STUDENT
  })
  role: UserRole

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  userInfo: UserInfo

  @ManyToOne(() => Class, (className) => className.users)
  @JoinColumn({ name: "class_id" })
  class: Class


  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      const salt: string = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }
}
