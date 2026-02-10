import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  ARTISTS = "ARTISTS",
  INSTITUTIONS = "INSTITUTIONS",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: UserRole, enumName: "user_role_enum" })
  role!: UserRole;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
