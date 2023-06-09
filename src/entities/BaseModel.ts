import { UpdateDateColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export abstract class BaseModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}