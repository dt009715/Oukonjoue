import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity("institutions")
export class Institution {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  mail?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.institutions, {
    nullable: true,
  })
  @JoinColumn({ name: "categoryId" })
  category?: Category;

  @OneToOne(() => User, (user) => user.institution)
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.institution)
  comments!: Comment[];
}

