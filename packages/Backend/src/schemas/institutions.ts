import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const institutions = pgTable("institutions", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  address: text("adress"),
  description: text("content").notNull(),
  number: varchar("phone", { length: 15 }),
  email: varchar("email", { length: 255 }).unique(),

  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});
