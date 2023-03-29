import { Column, Entity, OneToOne, JoinColumn } from "typeorm"
import { BaseModel } from "./BaseModel"
import { User } from "./User"

@Entity({ name: 'user_info' })
export class UserInfo extends BaseModel {
  @Column()
  fullname: string

  @Column({ type: 'date' })
  birthday: Date

  @OneToOne(() => User, (user) => user.userInfo, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User
}