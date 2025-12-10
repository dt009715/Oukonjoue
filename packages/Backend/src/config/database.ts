import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, Artist, Institution, Comment, Category, Department } from "../entities";

let AppDataSource: DataSource;

export const initializeDatabase = async (): Promise<void> => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User, Artist, Institution, Comment, Category, Department],
    synchronize: false, // Use migrations instead
    logging: process.env.NODE_ENV === "development",
  });

  try {
    await AppDataSource.initialize();
    console.log("Database connection initialized successfully");
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error;
  }
};

export const getDataSource = (): DataSource => {
  if (!AppDataSource || !AppDataSource.isInitialized) {
    throw new Error(
      "DataSource is not initialized. Call initializeDatabase() first."
    );
  }
  return AppDataSource;
};

export default AppDataSource;
