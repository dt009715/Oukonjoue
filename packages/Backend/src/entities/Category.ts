import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Artist } from "./Artist";
import { Institution } from "./Institution";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Artist, (artist) => artist.category)
  artists!: Artist[];

  @OneToMany(() => Institution, (institution) => institution.category)
  institutions!: Institution[];
}

