import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Artist } from "../entities/Artist";
import { Comment } from "../entities/Comment";
import { Institution } from "../entities/Institution";
import { User } from "../entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [User, Artist, Institution, Comment],
  migrations: [__dirname + "/../migrations/*.{ts,js}"],
});
