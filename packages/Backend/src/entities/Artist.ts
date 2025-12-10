import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity("artists")
export class Artist {
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

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => Category, (category) => category.artists, { nullable: true })
  @JoinColumn({ name: "categoryId" })
  category?: Category;

  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: "userId" })
  user!: User;
}

