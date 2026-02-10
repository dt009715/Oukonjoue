import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "institution_id", type: "uuid" })
  institutionId!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "text", nullable: true })
  author?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
