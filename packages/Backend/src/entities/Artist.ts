import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "artists" })
export class Artist {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  city!: string;

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
