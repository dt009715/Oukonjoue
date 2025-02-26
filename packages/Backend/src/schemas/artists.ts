import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { users } from "./users";

export const artists = pgTable("artists", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  address: text("adress"),
  category: text("category"),
  description: text("content").notNull(),
  number: varchar("phone", { length: 15 }),
  email: varchar("email", { length: 255 }).unique(),

  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),

  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
