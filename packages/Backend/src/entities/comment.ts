import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Institution } from "./Institution";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "authorId" })
  author!: User;

  @ManyToOne(() => Institution, (institution) => institution.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "institutionId" })
  institution!: Institution;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parentId" })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies!: Comment[];
}
