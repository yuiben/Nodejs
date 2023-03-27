import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./User";

@Entity({ name: 'class' })
export class Class extends BaseModel {
    @Column({
        name: 'class_name',
      })
    className: string;

    @OneToMany(() => User, (user) => user.class)
    users: User[];
}