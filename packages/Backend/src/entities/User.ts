import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Artist } from "./Artist";
import { Institution } from "./Institution";
import { Comment } from "./Comment";

export enum UserRole {
  ARTISTS = "ARTISTS",
  INSTITUTIONS = "INSTITUTIONS",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role!: UserRole;

  @OneToOne(() => Artist, (artist) => artist.user, { nullable: true })
  artist?: Artist;

  @OneToOne(() => Institution, (institution) => institution.user, {
    nullable: true,
  })
  institution?: Institution;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];
}

