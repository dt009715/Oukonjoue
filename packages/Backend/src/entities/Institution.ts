import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "institutions" })
export class Institution {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  city!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  mail!: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "user_id", type: "uuid", nullable: true, unique: true })
  userId?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
